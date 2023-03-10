local count = 0

local function placeObject(object)
  count = count + 1
  spawnObjectData({
    data = object,
    position = { 0, 2, 0 },
    callback_function = function(o)
      o.destruct()
    end
  })
end

local function getAllContainedObjects(tag)
  local obj = getObjectsWithTag(tag)[1]
  return obj.getData().ContainedObjects or {}
end

local function placeAllObjects(objects)
  for _, object in ipairs(objects) do
    placeObject(object)
  end
end

local function extractScenarios()
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
end

placeAllObjects(getAllContainedObjects("LockedCharacters"))
placeAllObjects(getAllContainedObjects("UnlockedScenarios"))
placeAllObjects(getAllContainedObjects("LockedScenarios"))
print(count)
Wait.time(extractScenarios, 1)
