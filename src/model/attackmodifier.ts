import { Deck } from "./component";

export interface AttackModifierDeck extends Deck<AttackModifier> {
  name?: string;
  id?: string;
}

export interface AttackModifier {
  value: number | string;
  amount?: number;
  effects?: string[];
  rolling?: boolean
}