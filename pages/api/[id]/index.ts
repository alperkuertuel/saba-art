import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ArtPieceType } from 'types/types';

import ArtPiece from '../../../db/art-piece-modal';
import databaseConnect from '../../../db/connect';
import { authOptions } from '../auth/[...nextauth]';

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
  const { id } = request.query;

  // todo: CORS?
  if (request.method === 'GET') {
    try {
      const artPiece: ArtPieceType = (await ArtPiece.findById(id))!;
      if (!artPiece) {
        return response.status(404).json({ status: 'Not Found' });
      }
      return response.status(200).json(artPiece);
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Error fetching art piece', error });
    }
  }

  switch (request.method) {
    case 'PATCH': {
      try {
        const session = (await getServerSession(
          request,
          response,
          authOptions
        ))!;
        if (!session?.user) {
          return response.status(401).json({
            message:
              'Status 401: You are not authorized! Only administrators can update pictures!',
          });
        }
        if (
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_MAIL) ||
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_2)
        ) {
          const artPieceData: ArtPieceType = request.body as ArtPieceType;
          await ArtPiece.findByIdAndUpdate(id, artPieceData);
          response.status(200).json({ status: 'Art piece updated!' });
        }
      } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Error!' });
      }
      break;
    }

    case 'DELETE': {
      try {
        const session = (await getServerSession(
          request,
          response,
          authOptions
        ))!;
        if (!session?.user) {
          return response.status(401).json({
            message:
              'Status 401: You are not authorized! Only administrators can delete pictures!',
          });
        }
        if (
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_MAIL) ||
          (session.user.role === 'Admin' &&
            session.user.email === process.env.ADMIN_2)
        ) {
          await ArtPiece.findByIdAndDelete(id);
          response
            .status(200)
            .json({ message: 'Art piece was deleted successfully!' });
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
