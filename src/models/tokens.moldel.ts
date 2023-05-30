import { Schema, model, Model, Document } from "mongoose";
import { IAccessToken } from "../interfaces";

export type AccessTokenType = IAccessToken & Document;

const tokensSchema: Schema = new Schema<IAccessToken>(
  {
    access_token: { type: String, require: true },
    refresh_token: { type: String, require: true },
  },
  { timestamps: true }
);

export const TokensDb: Model<AccessTokenType> = model<AccessTokenType>("Tokens", tokensSchema);
