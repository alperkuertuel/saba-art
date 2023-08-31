import dbConnect from "@/db/connect";
import ArtPiece from "@/db/ArtPiece";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  await dbConnect();

  // switch (request.method) {
  //   case "GET":
  //     try {
  //       const session = await getServerSession(request, response, authOptions);

  //       if (!session) {
  //         return response.status(401).json({ message: "Unauthorized" });
  //       }

  //       const artPieces = await ArtPiece.find();
  //       if (!artPieces) {
  //         return response.status(404).json({ message: "Art piece not found!" });
  //       }

  //       if (session.user.email !== artPieces.author) {
  //         return response.status(401).json({ message: "Unauthorized, wrong!" });
  //       }
  //       return response.status(200).json(artPieces);
  //     } catch (error) {
  //       console.log(error);
  //       return response.status(500).json({ error: "Error!" });
  //     }
  //   default:
  //     response.status(500).json({ error: "Method is not allowed" });
  // }

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
            message: "Status 401: You are not authorized! Only logged in users can add pictures!",
          });
        }
        if (session.user.role === "Admin" && session.user.email === process.env.ADMIN_MAIL) {
          const newArtPieceData = request.body;
          await ArtPiece.create(newArtPieceData);
          return response.status(201).json(newArtPieceData);
        }
      } catch (error) {
        return response.status(500).json({ error: "Error!" });
      }
    default:
      response.status(405).json({ error: "Method not allowed" });
  }
}

// if (request.method === "POST") {
//   try {
//     const newArtPieceData = request.body;
//     await ArtPiece.create(newArtPieceData);

//     response.status(201).json({ status: "Art piece created" });
//   } catch (error) {
//     response
//       .status(400)
//       .json({ error: "Something went wrong during the upload of your art piece" });
//   }
// }
