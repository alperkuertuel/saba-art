import dbConnect from "@/db/connect";
import ArtPiece from "@/db/ArtPiece";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const artPieces = await ArtPiece.find();
    return response.status(200).json(artPieces);
  }
}
