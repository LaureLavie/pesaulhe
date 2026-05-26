import { NextApiRequest } from 'next';
import { serialize, parse } from 'cookie';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin_auth';
const COOKIE_VALUE = 'admin_logged_in';

export function isAdminAuthenticated(req: NextApiRequest) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  return cookies[COOKIE_NAME] === COOKIE_VALUE;
}

export function setAdminCookie(res: any) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 8, // 8h
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }));
}

export function clearAdminCookie(res: any) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }));
}

export { ADMIN_PASSWORD };
