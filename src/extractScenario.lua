local scenarios = Global.getTable("ScenarioInformation_All")

local function copy(element)
  if type(element) ~= "table" then
    return element
  end

  local newTable = {}
  for key, value in pairs(element) do
    if key == "numCharacters" or key == "characterCount" then
      local newValue = {}
      for cKey, cValue in pairs(value) do
        newValue[tostring(cKey)] = copy(cValue)
      end
      newTable[key] = newValue
    else
      newTable[key] = copy(value)
    end
  end

  return newTable
end

local scenariosReal = {}

for id, scenario in pairs(scenarios) do
  scenariosReal[tostring(id)] = copy(scenario)
end

local json = json.serialize(scenariosReal)
print(json)
