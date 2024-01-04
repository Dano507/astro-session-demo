import { Session } from './sessions/main'

export function onRequest({ locals, cookies }, next) {
  let uuid = cookies.get("session")?.value
  let sessionObj = Session.createIfAbsent(uuid)
  uuid = sessionObj.uuid
  cookies.set("session", uuid, { path: "/" })
  
  locals.session = sessionObj
  //console.log("middleware->sessObj:", sessionObj)  //DEBUG
  
  next()
}

