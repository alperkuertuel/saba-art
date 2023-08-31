import dbConnect from "@/db/connect";
import ArtPiece from "@/db/ArtPiece";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const artPieces = await ArtPiece.find();
    return response.status(200).json(artPieces);
  }

  switch (request.method) {
    case "POST":
      try {
        const session = await getServerSession(request, response, authOptions);
        if (!session || !session.user) {
          return response.status(401).json({
            message: "Status 401: You are not authorized! Only administrators can add pictures!",
          });
        }
        if (session.user.role === "Admin" && session.user.email === process.env.ADMIN_MAIL) {
          const newArtPieceData = request.body;
          await ArtPiece.create(newArtPieceData);
          return response.status(201).json(newArtPieceData);
        }
      } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ error: "Error!" });
      }
    default:
      response.status(405).json({ error: "Method not allowed" });
  }
}
