import type { DBInterface, DBBackend } from "./types"
import { SQLiteDB } from "./backends/sqlite"
import { JSONDB } from "./backends/json"


export function dbFactory(
  backend: DBBackend
): DBInterface {
  let possibleBackends = {
    "json": () => {
      return new JSONDB()
    },
    "better-sqlite": () => {
      return new SQLiteDB()
    },
  }
  return possibleBackends[backend]()
}