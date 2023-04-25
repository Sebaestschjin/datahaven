import { readdirSync, writeFileSync } from "fs";
import prettier from "prettier";

import { transformClassData } from "./classData";

const main = () => {
  const rawData = `${__dirname}/../raw/`;
  const outPath = `${__dirname}/../data/`;
  for (const edition of readdirSync(`${rawData}/class`)) {
    const editionPath = `${rawData}/class/${edition}`;
    for (const file of readdirSync(editionPath)) {
      const outputFile = `${outPath}/class/${edition}/${file}`;
      const output = transformClassData(`${editionPath}/${file}`);
      const content = prettier.format(JSON.stringify(output), {
        parser: "json",
      });
      writeFileSync(outputFile, content, { encoding: "utf-8" });
    }
  }
};

main();
