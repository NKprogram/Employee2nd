import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-auth-callback`
);

// Helper function to get tokens from cookies
function getTokensFromCookies(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || '');
  return {
    accessToken: cookies.access_token,
    refreshToken: cookies.refresh_token,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken, refreshToken } = getTokensFromCookies(req);

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ error: 'Unauthorized: Missing tokens' });
    }

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Get the file name from the request body
    const { newFileName } = req.body;

    // The file ID of the "Master Resume"
    const masterResumeFileId = '1N07O7v3mfKhSSE5BEbWAPPyWOhN1LnbFruhT9CsWyVY'; // Replace with your actual "Master Resume" file ID

    // Copy the file
    const copyResponse = await drive.files.copy({
      fileId: masterResumeFileId,
      requestBody: {
        name: newFileName, // Set the new file name
      },
    });

    // Return the ID of the new copied file
    res.status(200).json({ newFileId: copyResponse.data.id });
  } catch (error) {
    console.error('Error copying and renaming file:', error);
    res.status(500).json({ error: 'Failed to copy and rename the file' });
  }
}
