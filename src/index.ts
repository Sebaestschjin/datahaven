import { readdirSync, writeFileSync } from "fs";
import prettier from "prettier";

import { transformClassData } from "./transform/classData";

const main = () => {
  const classPath = "class/forgotten-circles";
  const rawData = `${__dirname}/../raw/${classPath}`;
  const outPath = `${__dirname}/../data/${classPath}`;
  for (const file of readdirSync(rawData)) {
    const output = transformClassData(`${rawData}/${file}`);
    const content = prettier.format(JSON.stringify(output), { parser: "json" });
    writeFileSync(`${outPath}/${file}`, content, { encoding: "utf-8" });
  }
};

main();
