import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import ApiError from "../utils/apiError";

const secret = new TextEncoder().encode(process.env["JWT_KEY"] as string);
const ALGORITHM = "HS256";

export const generateToken = async <T>(payload: T, expiresIn = "14d") => {
  const jwt = await new SignJWT(payload as unknown as JWTPayload)
    .setIssuedAt()
    .setProtectedHeader({ alg: ALGORITHM })
    .setExpirationTime(expiresIn)
    .sign(secret);

  return jwt;
};

export const verifyToken = async <T = unknown>(token: string): Promise<T> => {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [ALGORITHM],
    });
    return payload as T;
  } catch {
    throw new ApiError("Invalid or expired token", 401);
  }
};
