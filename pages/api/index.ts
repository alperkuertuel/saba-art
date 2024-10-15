import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ArtPieceType } from 'types/types';

import { isAdmin } from '@/utils/utils';

import ArtPiece from '../../db/art-piece-modal';
import databaseConnect from '../../db/connect';
import { authOptions } from './auth/[...nextauth]';

export const config = {
  api: {
    responseLimit: false,
  },
};

// GET UND POST

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await databaseConnect();
  const session = await getServerSession(request, response, authOptions);

  if (request.method === 'GET') {
    try {
      const artPieces = await ArtPiece.find().setOptions({ lean: true });
      if (!artPieces) {
        return response.status(404).json({ status: 'Not Found' });
      }
      return response.status(200).json(artPieces);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error && error.message === 'Request timed out') {
        return response.status(408).json({ message: 'Request timed out' });
      }
      return response
        .status(500)
        .json({ message: 'Error fetching art piece', error });
    }
  }

  switch (request.method) {
    case 'POST': {
      if (!session) {
        return response.status(401).json({
          message: '401 Unauthorized: You are not authorized!',
        });
      }
      try {
        if (!isAdmin(session)) {
          return response.status(403).json({
            message:
              '403 FORBIDDEN: You do not have permission to perform this action.',
          });
        }
        const newArtPieceData: ArtPieceType = request.body as ArtPieceType;
        await ArtPiece.create(newArtPieceData);
        return response.status(201).json(newArtPieceData);
      } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Error adding art piece!' });
      }
    }
    default: {
      return response.status(405).json({
        error:
          '405 METHOD NOT ALLOWED: Something went wrong with your request!',
      });
    }
  }
}
