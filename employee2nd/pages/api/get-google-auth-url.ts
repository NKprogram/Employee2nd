import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-auth-callback`
);

// Define the required Google Drive scopes
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file', // Allows read/write access to files created or opened by the app
  'https://www.googleapis.com/auth/drive' // Full access to the user's Google Drive
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Required to get refresh_token
    scope: SCOPES,
    prompt: 'consent', // Ensure user sees the consent screen
  });

  // Redirect the user to Google's OAuth consent page
  res.redirect(authUrl);
}
