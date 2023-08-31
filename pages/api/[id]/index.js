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

  switch (request.method) {
    case "PATCH":
      try {
        const session = await getServerSession(request, response, authOptions);
        if (!session || !session.user) {
          return response.status(401).json({
            message: "Status 401: You are not authorized! Only administrators can update pictures!",
          });
        }
        if (session.user.role === "Admin" && session.user.email === process.env.ADMIN_MAIL) {
          const artPieceData = request.body;
          await ArtPiece.findByIdAndUpdate(id, artPieceData);
          response.status(200).json({ status: "Art piece updated!" });
        }
      } catch (error) {
        return response.status(500).json({ error: "Error!" });
      }
    default:
      response.status(405).json({ error: "Method not allowed" });
  }

  if (request.method === "DELETE") {
    await ArtPiece.findByIdAndDelete(id);
    response.status(200).json({ message: "Art piece was deleted successfully!" });
  }
}

// if (request.method === "PATCH") {
//   const artPieceData = request.body;
//   await ArtPiece.findByIdAndUpdate(id, artPieceData);
//   response.status(200).json({ status: "Art piece updated!" });
// }
