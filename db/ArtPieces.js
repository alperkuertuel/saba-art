import mongoose from "mongoose";

const { Schema } = mongoose;

const artPieceSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  technique: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heightReal: { type: String, required: true },
  widthReal: { type: String, required: true },
});

const artPiece = mongoose.models.artPiece || mongoose.model("artPiece", artPieceSchema);

export default artPiece;
