import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { ArtPieceType } from 'pages/_app';

import ArtPiece from '../../db/art-piece-modal';
import databaseConnect from '../../db/connect';
import { authOptions } from './auth/[...nextauth]';

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await databaseConnect();

  // todo: CORS?
  if (request.method === 'GET') {
    const artPieces = await ArtPiece.find().setOptions({ lean: true });
    return response.status(200).json(artPieces);
  }

  switch (request.method) {
    case 'POST': {
      try {
        const session: Session | null = await getServerSession(
          request,
          response,
          authOptions
        );
        if (!session || session.user.role !== 'Admin') {
          return response.status(401).json({
            message:
              'Status 401: You are not authorized! Only administrators can add pictures!',
          });
        }
        if (
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_MAIL) ||
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_2)
        ) {
          const newArtPieceData: ArtPieceType = request.body as ArtPieceType;
          await ArtPiece.create(newArtPieceData);
          return response.status(201).json(newArtPieceData);
        }
      } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Error!' });
      }
      break;
    }
    default: {
      response.status(405).json({ error: 'Method not allowed' });
    }
  }
}
