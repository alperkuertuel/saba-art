import mongoose from "mongoose";

const { Schema } = mongoose;

const artPieceSchema = new Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    available: { type: Boolean, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    technique: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heightReal: { type: String, required: true },
    widthReal: { type: String, required: true },
  },
  {
    collection: "artpieces",
  }
);

const ArtPiece = mongoose.models.artpiece || mongoose.model("artpiece", artPieceSchema);

export default ArtPiece;
