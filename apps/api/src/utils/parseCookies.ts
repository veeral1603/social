// parses cookies from a cookie string and returns an object with key-value pairs of cookies.
export default function parseCookiesFromString(cookieString: string) {
  const cookies: Record<string, string> = {};
  const cookiePairs = cookieString.split(";").map((cookie) => cookie.trim());
  for (const pair of cookiePairs) {
    const [key, value] = pair.split("=");
    if (key && value) {
      cookies[key.trim()] = value.trim();
    }
  }
  return cookies;
}
