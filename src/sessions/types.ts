export interface DBSessionRow {
  id: number;
  uuid: string;
  timeLastSeen: number | undefined;
  data: object | undefined;
}

// New Database Backends should implement this interface
export interface DBInterface {
  // Create new "DBSessionRow" in database with passed UUID
  create(uuid: string, data: object): undefined;
  // Get "DBSessionRow" by UUID. Return undefined if no 
  // matching UUID is found
  get(uuid: string): DBSessionRow | undefined;
  // Return all "DBSessionRow"s from database
  getAll(): DBSessionRow[];
  // Find "DBSessionRow" by UUID, replace "data" field with
  // Passed parameter
  update(uuid: string, data: object): undefined;
  // Find "DBSessionRow" by UUID and delete it
  remove(uuid: string): undefined;
}

export interface SessionInterface {
  // NOTE: I couldn't figure out a way to type static 
  // methods for classes. I decided it doesn't matter
  // anyway, since I won't need to reuse this interface.
  // They are already typed on the "Session" class and
  // if I really need other classes to have the "Session"
  // class methods, I could probably utilize a base class
  // instead.
  
  /*get(): DBSessionRow | undefined;
  getAll(): DBSessionRow[] | undefined;
  static createIfAbsent(uuid: string): Session;*/
  getData(key: string): string|undefined;
  setData(key: string, data: string|number): undefined;
  destroy(uuid: string): undefined;
}


export type DBBackend = "json" | "better-sqlite"
