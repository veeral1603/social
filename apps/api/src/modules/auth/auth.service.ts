import type {
  LoginFormData,
  RegisterFormData,
  PublicUser,
} from "@repo/shared-types";
import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";
import { comparePassword, hashPassword } from "../../lib/password";
import { generateToken, verifyToken } from "../../lib/jwt";
import { sendVerificationEmail } from "../../lib/email";

async function registerUser(data: RegisterFormData): Promise<PublicUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new ApiError("A user with this email already exists.", 400);
  }

  const hashedPassword = await hashPassword(data.password);
  const emailVerificationToken = await generateToken(
    { email: data.email },
    "15m",
  );

  const user = await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName || null,
      username: data.username,
      password: hashedPassword,
      verifyToken: emailVerificationToken,
      verifyTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    throw new ApiError("Failed to create user.", 500);
  }

  // console.log(`Verification Token: ${emailVerificationToken}`);
  await sendVerificationEmail(user.email, emailVerificationToken);

  return user;
}

async function verifyUserEmail(token: string): Promise<string> {
  const user = await prisma.user.findFirst({ where: { verifyToken: token } });
  if (!user) {
    throw new ApiError("Invalid or expired verification token.", 400);
  }
  if (user.isVerified) {
    throw new ApiError("Email is already verified.", 400);
  }
  const payload = await verifyToken<{ email: string }>(token);
  if (payload.email !== user.email) {
    throw new ApiError("Invalid verification token.", 400);
  }
  await prisma.user.update({
    where: { email: user.email },
    data: {
      isVerified: true,
      verifyToken: null,
      verifyTokenExpiry: null,
    },
  });
  const access_token = await generateToken(
    { userId: user.id, email: user.email },
    "14d",
  );
  return access_token;
}

async function resendVerificationLink(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError("User not found.", 404);
  }
  if (user.isVerified) {
    throw new ApiError("Email is already verified.", 400);
  }
  const emailVerificationToken = await generateToken(
    { email: user.email },
    "15m",
  );
  await prisma.user.update({
    where: { email: user.email },
    data: {
      verifyToken: emailVerificationToken,
      verifyTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    },
  });
  // console.log(`Resent Verification Token: ${emailVerificationToken}`);
  await sendVerificationEmail(user.email, emailVerificationToken);
}

async function loginUser(
  data: LoginFormData,
): Promise<{ user: PublicUser; access_token: string }> {
  const isEmail = data.usernameOrEmail.includes("@");
  const user = await prisma.user.findUnique({
    where: isEmail
      ? { email: data.usernameOrEmail }
      : { username: data.usernameOrEmail },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ApiError("Invalid credentials.", 401);
  }

  if (!(await comparePassword(data.password, user.password))) {
    throw new ApiError("Invalid credentials.", 401);
  }

  const publicUser: PublicUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  const access_token = await generateToken(
    { userId: user.id, email: user.email },
    "14d",
  );

  return { user: publicUser, access_token };
}

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationLink,
  loginUser,
};
