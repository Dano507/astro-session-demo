<script>
  export let name
  let nameInput = ""
  
  if (name != null) {
    name = `Welcome, ${name}`
  }


  const submitToServer = async (newName) => {
    const res = await fetch("/api/changename", {
      method: "POST",
      body: JSON.stringify({ value: newName })
    }) 
    if (res.status !== 200) {
      throw new Error("Received non 200 HTTP response")
    }
    return res
  }

  const inputHandler = async (e) => {    
    name = "[Loading...]"
    try {
      await submitToServer(nameInput)
      name = `Welcome, ${nameInput}`
      nameInput = ""
    }
    catch {
      name = "[Network Error]"
      nameInput = ""
    }
  }
</script>



<div class="root">
  <p>{name ? name : "[no name]"}</p>
  <input bind:value={nameInput} 
    on:keydown={(e) => {if (e.key === "Enter") inputHandler()}}
    type="text" placeholder="What's your name?"
  >
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 2rem;
  }

  input {
    margin-top: 0.5rem;
    padding: 8px;
    font-size: 14px;
  }
</style>
