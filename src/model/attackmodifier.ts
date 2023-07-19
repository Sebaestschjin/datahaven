import { Deck } from "./component";

export type AttackModifierDeck = Deck<AttackModifier>;

export interface AttackModifier {
  value: number | string;
  amount?: number;
  effects?: string[];
  rolling?: boolean;
}
