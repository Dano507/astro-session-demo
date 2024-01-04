import { Session } from '../../sessions/main'

export async function GET({ params, request }) {
  return new Response("HELLO")
}

export async function POST({ cookies, request }) {
  const sessionID = cookies.get("session").value
  const body = await request.json()

  if (!body.value) {
    return new Response(
      JSON.stringify({
        error: "Must Provide 'count' field in request"
      }),
      { status: 400 }
    )
  }

  let session = Session.createIfAbsent(sessionID)
  cookies.set("session", session.uuid, { path:"/" })
  //console.log("changecount->session:", session)
  //console.log("changecount->sessionID:", sessionID)

  session.setData("count", body.value)

  return new Response(JSON.stringify({
    message: "success"
  }))
}
