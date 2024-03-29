import { URL } from "./base";

/** A unity asset bundle. */
export interface AssetBundle {
  /** The URL to the asset bundle. */
  assetBundle: URL;
  // scale: number;
}

/** An obj model and its texture. */
export interface Model {
  /** The URL to the obj model. */
  model: URL;
  /** The URL to the texture image. */
  texture: URL;
  // scale: number;
}

export interface Deck<T> extends NameObject {
  id?: string;
  front: URL;
  back: URL;
  width: number;
  height: number;
  cards: T[];
}

export interface NameObject {
  name: string;
  description?: string;
  tags?: string[];
}

export type BaseDeck = Deck<NameObject>;

export interface Card {
  front: URL;
  back: URL;
}
