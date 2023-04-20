import { HexColor, URL } from "./base";
import { AssetBundle, Deck, Model } from "./component";

export interface Class {
  /** The name of the class. */
  name: string;
  /** The version of the class. Defaults to 1. Can be used to distinguish different revisions of the class. */
  version?: number;
  /** The official spoiler name of the class. */
  spoilerName?: string;
  /** The ancestry of the class. */
  ancestry: string;
  /** Number of max HP per level. */
  hpProgression: HpProgression;
  /** A URL to the class icon. Needs to be all white. */
  icon: URL;
  /** A URL to the tracker icon. */
  tracker: URL;
  /** Colors used for the class. */
  colors: {
    /** The primary class color. */
    primary: HexColor;
    /** The color used for text that is written onto the primary color. */
    primaryText?: HexColor;
    /** The secondary class color */
    secondary?: HexColor;
  };
  /** Describes the character figure. */
  figure: AssetBundle | Model;
  /** The information about the character mat. */
  characterMat: {
    /** A URL to the front of the character mat. */
    front: URL;
    /** A URL to the back of the character mat. */
    back: URL;
  };
  /** The list of abilities for this class. */
  abilities: AbilityDeck;
  characterSheet: {
    image: URL;
    style: Style;
  };
  perks: Perk[];
  attackModifiers: AttackModifierDeck;
  reminderCards?: Deck<ReminderCard>;
  additionalContent?: any[];
}

interface AbilityDeck extends Deck<Ability> {
  style: Style;
}

type AttackModifierDeck = Omit<Deck<AttackModifier>, "back">;

type HpProgression = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

interface Ability {
  name: string;
  initiative: number;
  level: number | "X";
  top?: AbilityAction[];
  bottom?: AbilityAction[];
}

interface AttackModifier {
  name: string;
  amount?: number;
}

interface ReminderCard {
  name: string;
}

interface AbilityAction {
  type: AbilityType;
  range?: {
    count: number;
    marks?: EnhancementMark[];
  };
  effects?: [
    {
      name: string;
      marks?: EnhancementMark[];
    }
  ];
  targets?: {
    count: number;
    marks?: EnhancementMark[];
  };
  area?: {
    size: number;
    marks?: EnhancementMark[];
  };
  spawns?: Spawn[];
  marks?: EnhancementMark[];
}

interface EnhancementMark {
  shape?: EnhancementMarkShape;
  position: [number, number];
}

type EnhancementMarkShape =
  | "square"
  | "circle"
  | "diamond"
  | "diamond-plus"
  | "hex";
type AbilityType = "attack" | "move" | "push" | "pull" | "pierce" | string;

interface Perk {
  /** The number of times this perk can be acquired. Defaults to 1. */
  amount?: number;
  /** The number of checkmarks required to unlock this perk. Defaults to 1. */
  requires?: number;
  /** The list of attack modifiers that are added through this perk. */
  add?: string[];
  /** The list of attack modifiers that are removed through this perk. */
  remove?: string[];
  /** The list of reminder cards for this perk. */
  reminder?: string[];
  /** The effects that are ignored when having this perk. */
  ignore?: IgnoreType[];
}

type IgnoreType = "Item" | "Scenario";

type Style = "Gloomhaven" | "Frosthaven";

interface Spawn {}
