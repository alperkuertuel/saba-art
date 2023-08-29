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
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    await ArtPiece.findByIdAndDelete(slug);
    response.status(200).json({ message: "Art piece was deleted successfully!" });
  }
}
