import { readFileSync } from "fs";
import { Class } from "../model/class";

export const transformClassData = (inputPath: string): Class => {
  const fileContent = readFileSync(inputPath, { encoding: "utf-8" });
  const classData = JSON.parse(fileContent);

  return {
    name: classData.name,
    version: 1,
    spoilerName: "",
    hpProgression: classData.hp,
    ancestry: "",
    icon: "",
    tracker: classData.tracker.image,
    colors: {
      primary: "",
    },
    figure: {
      model: "",
      texture: "",
    },
    characterMat: {
      front: "",
      back: "",
    },
    abilities: transformAbilities(classData.abilities),
    characterSheet: {
      image: "",
      style: "Gloomhaven",
    },
    perks: transformPerks(classData.perks),
    attackModifiers: {
      front: "",
      cards: [],
    },
    additionalContent: classData.extra,
  };
};

const transformPerks = (perks: any[]): Class["perks"] => {
  return perks.map(transformPerk);
};

const transformPerk = (perk: any): Class["perks"][0] => {
  return {
    amount: 1,
    add: perk.add,
    remove: perk.remove,
    ignore:
      perk.ignore === "I"
        ? ["Item"]
        : perk.ignore === "S"
        ? ["Scenario"]
        : undefined,
  };
};

const transformAbilities = (abilities: any): Class["abilities"] => {
  return {
    front: "",
    back: "",
    style: "Gloomhaven",
    cards: sortAbilities(abilities).map(transformAbilitiy),
  };
};

const sortAbilities = (abilities: any) => {
  const abilitiesChanged: any[] = [];
  for (const [name, ability] of Object.entries(abilities)) {
    abilitiesChanged.push({
      name: name,
      ...(ability as any),
    });
  }

  abilitiesChanged.sort((a: any, b: any) => {
    if (a.level === b.level) {
      return 0;
    }
    if (a.level === "X") {
      return b.level === 1 ? 1 : -1;
    }
    if (b.level === "X") {
      return a.level === 1 ? -1 : 1;
    }

    return a.level < b.level ? -1 : 1;
  });

  return abilitiesChanged;
};

const transformAbilitiy = (ability: any): Class["abilities"]["cards"][0] => {
  const enhancements: any[] = ability.enhancements || [];
  const transformed = enhancements
    .map((_, index) => transformEnhancement(enhancements, index))
    .filter((e: any) => e !== undefined);

  const filterBySide = (side: string): any => {
    return transformed
      .filter((e: any) => e.side == side)
      .map((e) => {
        return { ...e, side: undefined };
      });
  };

  return {
    name: ability.name,
    level: ability.level,
    initiative: 0,
    top: filterBySide("T"),
    bottom: filterBySide("B"),
  };
};

const transformEnhancement = (enhancements: any[], index: number) => {
  const enhancement = enhancements[index];
  const totalSize = enhancements.length;
  if (enhancement.handled) {
    return undefined;
  }

  const toMark = (enh: any, shape?: string) => {
    return {
      shape: shape,
      position: enh.position,
    };
  };

  const getMarks = () => {
    const marks = [toMark(enhancement)];
    const y = enhancement.position[1];
    for (let i = index + 1; i < totalSize; i++) {
      const otherEnhancement = enhancements[i];
      if (Math.abs(otherEnhancement.position[1] - y) <= 0.03) {
        marks.push(toMark(otherEnhancement));
        otherEnhancement.handled = true;
      } else {
        break;
      }
    }

    return marks;
  };

  let type = enhancement.type;
  let range: any = undefined;
  let targets: any = undefined;
  let effects: any = undefined;
  let area: any = undefined;
  let marks: any = getMarks();
  if (type === "range") {
    type = "attack";
    marks = undefined;
    range = {
      count: 2,
      marks: [toMark(enhancement, "square")],
    };
  } else if (type === "target") {
    type = "attack";
    marks = undefined;
    targets = {
      count: 2,
      marks: [toMark(enhancement, "square")],
    };
  } else if (enhancement.type === "hex") {
    type = "attack";
    marks = undefined;
    const areaMarks = [toMark(enhancement, "hex")];

    if (enhancement.otherHex) {
      for (const i of enhancement.otherHex) {
        const otherEnhancement = enhancements[i - 1];
        otherEnhancement.handled = true;
        areaMarks.push(toMark(otherEnhancement, "hex"));
      }
    }

    area = {
      size: enhancement.baseHex,
      marks: areaMarks,
    };
  } else if (enhancement.main === false) {
    type = "attack";
    marks = undefined;
    effects = [
      {
        name: enhancement.type,
        marks: [toMark(enhancement)],
      },
    ];
  }

  return {
    side: enhancement.side,
    type: type,
    range: range,
    targets: targets,
    area: area,
    effects: effects,
    marks: marks,
  };
};
