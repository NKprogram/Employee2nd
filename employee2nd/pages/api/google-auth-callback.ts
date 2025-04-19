import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie'; // For handling cookies

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-auth-callback`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store the access_token and refresh_token in secure HTTP-only cookies
    res.setHeader('Set-Cookie', [
      serialize('access_token', tokens.access_token!, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' }),
      serialize('refresh_token', tokens.refresh_token!, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' }),
    ]);

    // Redirect the user back to the original page (e.g., Resume Management page)
    res.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/resume-management`);
  } catch (error) {
    console.error('Error exchanging code for tokens', error);
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
}
