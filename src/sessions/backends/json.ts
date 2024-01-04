import type { DBSessionRow, DBInterface } from "../types";
import fs from 'fs'

export let DBFILE = "database.json"

interface DBObject {
  sessions: DBSessionRow[]
}

// Helper Functions
const nextID = (sessions: DBSessionRow[]) => {
  let maxID = sessions
    //.map(x => x.id||0)
    .reduce((acc, el) => {
      if (acc == null) { return el.id }
      if (el.id > acc) { return el.id }
      return acc
    }, 0)
  
  return maxID + 1
}


export class JSONDB implements DBInterface {
  dbObject: DBObject

  constructor() {
    this.dbObject = {
      sessions: [],
    }

    if (!fs.existsSync(DBFILE)) { this.writeToJSON() }
    this.dbObject = JSON.parse(fs.readFileSync(DBFILE, 'utf-8'))
  }

  writeToJSON() {
    fs.writeFileSync(DBFILE, JSON.stringify(this.dbObject))
  }

  create(uuid: string, data: object): undefined {
    const id = nextID(this.dbObject.sessions)

    this.dbObject.sessions.push({
      id: id,
      uuid: uuid,
      timeLastSeen: new Date().getTime(),
      data: {}
    })
    this.writeToJSON()
  }

  get(uuid: string): DBSessionRow | undefined {
    let row = this.dbObject.sessions.filter(x => x.uuid === uuid)[0];
    return row
  }

  getAll(): DBSessionRow[] {
    return this.dbObject.sessions;  
  }

  update(uuid: string, data: object): undefined {
    let index = this.dbObject.sessions.findIndex(x => x.uuid === uuid)
    this.dbObject.sessions[index].data = data
    this.writeToJSON()
  }

  remove(uuid: string): undefined {
    let index = this.dbObject.sessions.findIndex(x => x.uuid === uuid)
    this.dbObject.sessions = this.dbObject.sessions
      .filter((val,i) => i !== index)
    this.writeToJSON()
  }
}

