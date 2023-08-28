import dbConnect from "@/db/connect";
import artPiece from "@/db/ArtPieces";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const artPieces = await artPiece.find();
    return response.status(200).json(artPieces);
  }
}
