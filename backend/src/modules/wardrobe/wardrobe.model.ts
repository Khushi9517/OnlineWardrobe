import {
  Schema,
  model,
  Document,
  Types,
} from "mongoose";

export interface IWardrobeItem
  extends Document {
  user: Types.ObjectId;

  name: string;

  category: string;

  color: string;

  brand?: string;

  createdAt: Date;

  updatedAt: Date;
}

const wardrobeSchema =
  new Schema<IWardrobeItem>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      color: {
        type: String,
        required: true,
        trim: true,
      },

      brand: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export const WardrobeItem =
  model<IWardrobeItem>(
    "WardrobeItem",
    wardrobeSchema
  );