import type { CookieOptions, Response } from "express";

const isProd = process.env["NODE_ENV"] === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "strict",
  domain: isProd ? ".yourdomain.com" : undefined,
  path: "/",
  maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
};

export const setCookie = (res: Response, name: string, value: string) => {
  res.cookie(name, value, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    domain: cookieOptions.domain,
    path: cookieOptions.path,
    maxAge: cookieOptions.maxAge,
  });
};

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(name, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    domain: cookieOptions.domain,
    path: cookieOptions.path,
  });
};
