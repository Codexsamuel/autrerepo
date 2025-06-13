import { novaworldWorkflows } from "./novaworld-workflows"
import { dlStyleWorkflows } from "./dl-style-workflows"
import { dlTravelWorkflows } from "./dl-travel-workflows"
import { dlBookmakerWorkflows } from "./dl-bookmaker-workflows"
import { dlTradingWorkflows } from "./dl-trading-workflows"

export const allWorkflows = [
  ...novaworldWorkflows,
  ...dlStyleWorkflows,
  ...dlTravelWorkflows,
  ...dlBookmakerWorkflows,
  ...dlTradingWorkflows,
]

export {
  novaworldWorkflows,
  dlStyleWorkflows,
  dlTravelWorkflows,
  dlBookmakerWorkflows,
  dlTradingWorkflows,
} 