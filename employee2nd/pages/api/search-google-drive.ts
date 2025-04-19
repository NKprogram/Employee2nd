import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-auth-callback`
);

// Helper function to get the tokens from cookies
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

    // Search for the file in Google Drive
    const response = await drive.files.list({
      q: `name='Master Resume' and mimeType='application/vnd.google-apps.document'`,
      fields: 'files(id, name)',
    });

    const files = response.data.files;

    if (files && files.length > 0) {
      const fileId = files[0].id;
      const docUrl = `https://docs.google.com/document/d/${fileId}/edit`;

      // Return the Google Docs URL for "Master Resume"
      res.status(200).json({ url: docUrl });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error searching Google Drive:', error);
    res.status(500).json({ error: 'Failed to search Google Drive' });
  }
}
