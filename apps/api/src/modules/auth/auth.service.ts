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
  if (existingUser)
    throw new ApiError("User with this email already exists.", 400);

  const existingUsername = await prisma.profile.findUnique({
    where: { username: data.username },
  });
  if (existingUsername) throw new ApiError("Username is already taken.", 400);

  const hashedPassword = await hashPassword(data.password);
  const emailVerificationToken = await generateToken(
    { email: data.email },
    "15m",
  );
  const tempUser = await prisma.signupSession.create({
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

  await sendVerificationEmail(tempUser.email, emailVerificationToken);

  return tempUser as PublicUser;
}

async function verifyUserEmail(
  token: string,
): Promise<{ user: PublicUser; access_token: string }> {
  const payload = await verifyToken<{ email: string }>(token);
  if (!payload || !payload.email) {
    throw new ApiError("Token payload is invalid.", 400);
  }

  const tempUser = await prisma.signupSession.findFirst({
    where: { email: payload.email, verifyToken: token },
  });

  if (!tempUser) {
    throw new ApiError("Invalid or expired token.", 400);
  }

  if (tempUser.verifyTokenExpiry < new Date()) {
    throw new ApiError("Token has expired.", 400);
  }

  const { userId } = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    await tx.profile.create({
      data: {
        userId: newUser.id,
        firstName: tempUser.firstName,
        lastName: tempUser.lastName ?? null,
        username: tempUser.username,
      },
    });

    await tx.signupSession.delete({
      where: { id: tempUser.id },
    });

    return { userId: newUser.id };
  });

  const access_token = await generateToken(
    { userId, email: tempUser.email },
    "14d",
  );

  const publicUser: PublicUser = {
    id: userId,
    firstName: tempUser.firstName,
    lastName: tempUser.lastName ?? null,
    email: tempUser.email,
    username: tempUser.username,
  };

  return { user: publicUser, access_token };
}

async function resendVerificationLink(email: string): Promise<void> {
  const tempUser = await prisma.signupSession.findUnique({
    where: { email },
  });
  if (!tempUser) {
    throw new ApiError("Account not found or already verified.", 400);
  }

  const emailVerificationToken = await generateToken(
    { email: tempUser.email },
    "15m",
  );

  // console.log(`Resent Verification Token: ${emailVerificationToken}`);
  await sendVerificationEmail(tempUser.email, emailVerificationToken);
}

async function loginUser(
  data: LoginFormData,
): Promise<{ user: PublicUser; access_token: string }> {
  const isEmail = data.usernameOrEmail.includes("@");

  const userWithProfile = await prisma.user.findFirst({
    where: isEmail
      ? { email: data.usernameOrEmail }
      : { profile: { username: data.usernameOrEmail } },
    include: { profile: true },
  });
  if (!userWithProfile) {
    throw new ApiError("Invalid credentials.", 400);
  }
  const isPasswordValid = await comparePassword(
    data.password,
    userWithProfile.password,
  );
  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials.", 400);
  }
  const access_token = await generateToken(
    { userId: userWithProfile.id, email: userWithProfile.email },
    "14d",
  );
  if (!userWithProfile.profile) {
    throw new ApiError("User profile not found.", 500);
  }
  const publicUser: PublicUser = {
    id: userWithProfile.id,
    firstName: userWithProfile.profile?.firstName,
    lastName: userWithProfile.profile?.lastName,
    email: userWithProfile.email,
    username: userWithProfile.profile?.username,
  };
  return { user: publicUser, access_token };
}

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationLink,
  loginUser,
};
