import type { DBInterface, DBSessionRow } from "../types";
import BetterSQLite from 'better-sqlite3'

export let DBFILE = "database.db"

function createTablesIfAbsent(): undefined {
  console.log("Creating Tables If Non Existent...")
  new BetterSQLite(DBFILE).exec(`CREATE TABLE IF NOT EXISTS sessions(
    'id' INTEGER PRIMARY KEY,
    'uuid' TEXT NOT NULL UNIQUE,

    'timeLastSeen' INTEGER,
    'data' TEXT
  )`)
};
createTablesIfAbsent()


export class SQLiteDB implements DBInterface {
  db: any;
  constructor() {
    this.db = new BetterSQLite(DBFILE)
    //this.createTablesIfAbsent()
  }
  
  createIfAbsent(): undefined {
    console.log("Creating Tables If Non Existent...")
    this.db.exec(`CREATE TABLE IF NOT EXISTS sessions(
      'id' INTEGER PRIMARY KEY,
      'uuid' TEXT NOT NULL UNIQUE,

      'timeLastSeen' INTEGER,
      'data' TEXT
    )`)
  };

  create(uuid: string, data: object): undefined {
    let sql = this.db.prepare(`INSERT INTO 
      sessions (uuid, timeLastSeen, data)
      VALUES (?, ?, ?)
    `)
    sql.run(uuid, new Date().getTime(), JSON.stringify(data))
  };

  get(uuid: string): DBSessionRow | undefined {
    const sql = this.db.prepare(`SELECT * FROM sessions
      WHERE uuid = ?
    `)
    const data = sql.get(uuid)
    if (!data) { return undefined }
    
    if (data.data != undefined) { 
      data.data = JSON.parse(data.data)
    }
    return data
  };

  getAll(): DBSessionRow[] {
    let sql = this.db.prepare(`SELECT * FROM sessions`)
    return sql.all()
  };

  update(uuid: string, data: object): undefined {
    const sql = this.db.prepare(`UPDATE sessions 
      SET timeLastSeen = ?, data = ?
      WHERE uuid = ?
    `)
    sql.run(
      new Date().getTime(), 
      JSON.stringify(data), 
      uuid,
    )
  };

  remove(uuid: string): undefined {
    const sql = this.db.prepare(`DELETE FROM sessions 
      WHERE uuid = ?
    `)
    sql.run(uuid)
  }
}