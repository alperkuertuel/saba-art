import { NextApiRequest, NextApiResponse } from 'next';

import ArtPiece from '../../db/art-piece-modal';
import databaseConnect from '../../db/connect';

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

  switch (request.method) {
    case 'GET': {
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

    default: {
      return response.status(405).json({
        error:
          '405 METHOD NOT ALLOWED: Something went wrong with your request!',
      });
    }
  }
}
