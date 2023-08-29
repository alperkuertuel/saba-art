import dbConnect from "@/db/connect";
import ArtPiece from "@/db/ArtPiece";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    console.log("nothing here!");
  }
  if (request.method === "GET") {
    const artPiece = await ArtPiece.findById(id);
    if (!artPiece) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(artPiece);
  }

  if (request.method === "PATCH") {
    const artPieceData = request.body;
    await ArtPiece.findByIdAndUpdate(id, artPieceData);
    response.status(200).json({ status: "Art piece updated!" });
  }

  if (request.method === "DELETE") {
    await ArtPiece.findByIdAndDelete(id);
    response.status(200).json({ message: "Art piece was deleted successfully!" });
  }
}
