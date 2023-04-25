import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const main = () => {
  const scenarioFile = readFileSync("raw/scenarios.json", {
    encoding: "utf-8",
  });
  const scenarios = JSON.parse(scenarioFile) as Record<string, any>;

  for (const [id, scenario] of Object.entries(scenarios)) {
    scenario.id = id;
    const campaign = scenario.campaign || "Other";

    const scenarioPath = `data/scenario/${campaign}`.replace(":", "_");
    if (!existsSync(scenarioPath)) {
      mkdirSync(scenarioPath);
    }

    const scenarioContent = JSON.stringify(scenario, null, 2);
    const name = scenario.name.replace(/:\?/, "_");
    const filePath = `${id} - ${name}`;
    writeFileSync(`${scenarioPath}/${filePath}.json`, scenarioContent, {
      encoding: "utf-8",
    });
  }
};

main();
