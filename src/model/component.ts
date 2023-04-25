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

export interface Deck<T> {
  front: URL;
  back: URL;
  width?: number;
  height?: number;
  cards: T[];
}

export interface Card {
  front: URL;
  back: URL;
}
