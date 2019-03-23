import { version } from "../../package.json"
import { Debug } from "./Debug.js"
Debug("elect:version")(version)
export { version as appVersion }
