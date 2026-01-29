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
import generateOtp from "../../utils/generateOtp";

async function registerUser(
  data: RegisterFormData,
): Promise<{ user: PublicUser; temp_token: string }> {
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
  const emailVerificationOtp = generateOtp(6);

  const tempUser = await prisma.signupSession.create({
    data: {
      email: data.email,
      name: data.name ?? null,
      username: data.username,
      password: hashedPassword,
      verifyOtp: emailVerificationOtp,
      verifyOtpExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
    },
  });

  const temp_token = await generateToken(
    {
      id: tempUser.id,
      email: tempUser.email,
    },
    "15m",
  );

  await sendVerificationEmail(tempUser.email, emailVerificationOtp);

  return { user: tempUser as PublicUser, temp_token };
}

async function verifyUserEmail(
  otp: string,
): Promise<{ user: PublicUser; access_token: string }> {
  const tempUser = await prisma.signupSession.findFirst({
    where: { verifyOtp: otp },
  });

  if (!tempUser) {
    throw new ApiError("Invalid or expired OTP.", 400);
  }

  if (tempUser.verifyOtpExpiry < new Date()) {
    throw new ApiError("Invalid or expired OTP.", 400);
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
        name: tempUser.name ?? null,
        username: tempUser.username,
      },
    });

    await tx.signupSession.delete({
      where: { id: tempUser.id },
    });

    return { userId: newUser.id };
  });

  const access_token = await generateToken(
    { id: userId, email: tempUser.email },
    "14d",
  );

  const publicUser: PublicUser = {
    id: userId,
    name: tempUser.name,
    email: tempUser.email,
    username: tempUser.username,
  };

  return { user: publicUser, access_token };
}

async function resendVerificationOtp(
  temp_token: string | undefined,
): Promise<void> {
  const payload = await verifyToken<{ id: string; email: string }>(
    temp_token || "",
  );
  if (!payload || !payload.email || !payload.id || !temp_token) {
    throw new ApiError("Invalid or expired token.", 400);
  }
  const email = payload.email;
  const tempUser = await prisma.signupSession.findUnique({
    where: { email },
  });
  if (!tempUser) {
    throw new ApiError("Account not found or already verified.", 400);
  }

  const emailVerificationOtp = generateOtp(6);

  await prisma.signupSession.update({
    where: { email },
    data: {
      verifyOtp: emailVerificationOtp,
      verifyOtpExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    },
  });

  // console.log(`Resent Verification OTP: ${emailVerificationOtp}`);
  await sendVerificationEmail(tempUser.email, emailVerificationOtp);
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
    { id: userWithProfile.id, email: userWithProfile.email },
    "14d",
  );
  if (!userWithProfile.profile) {
    throw new ApiError("User profile not found.", 500);
  }
  const publicUser: PublicUser = {
    id: userWithProfile.id,
    name: userWithProfile.profile.name ?? null,
    email: userWithProfile.email,
    username: userWithProfile.profile?.username,
  };
  return { user: publicUser, access_token };
}

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationOtp,
  loginUser,
};
