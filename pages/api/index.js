import dbConnect from "@/db/connect";
import ArtPiece from "@/db/ArtPiece";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const artPieces = await ArtPiece.find();
    return response.status(200).json(artPieces);
  }

  if (request.method === "POST") {
    try {
      const newArtPieceData = request.body;
      await ArtPiece.create(newArtPieceData);

      response.status(201).json({ status: "Art piece created" });
    } catch (error) {
      response
        .status(400)
        .json({ error: "Something went wrong during the upload of your art piece" });
    }
  }
}
