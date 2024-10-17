import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ArtPieceType } from 'types/types';

import { isAdmin } from '@/utils/utils';

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
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({
      message: '401 Unauthorized: You are not authorized!',
    });
  }

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

    case 'PATCH': {
      try {
        if (!isAdmin(session)) {
          return response.status(403).json({
            message:
              '403 FORBIDDEN: You do not have permission to perform this action.',
          });
        }
        const artPieceData: ArtPieceType = request.body as ArtPieceType;
        const updatedArtPiece: ArtPieceType | null =
          await ArtPiece.findByIdAndUpdate(id, artPieceData, { new: true });
        if (!updatedArtPiece) {
          return response.status(404).json({ message: 'Art piece not found' });
        }
        return response.status(200).json(updatedArtPiece);
      } catch (error) {
        console.error('Error:', error);
        return response
          .status(500)
          .json({ message: 'Error updating art piece.' });
      }
    }

    case 'DELETE': {
      try {
        if (!isAdmin(session)) {
          return response.status(403).json({
            message:
              '403 FORBIDDEN: You do not have permission to perform this action.',
          });
        }
        const deletedArtPiece: ArtPieceType | null =
          await ArtPiece.findByIdAndDelete(id);
        if (!deletedArtPiece) {
          return response.status(404).json({ message: 'Art piece not found' });
        }
        return response.status(200).json(deletedArtPiece);
      } catch (error) {
        console.error('Error:', error);
        return response
          .status(500)
          .json({ message: 'Error deleting art piece.' });
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
