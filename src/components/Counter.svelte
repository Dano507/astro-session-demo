<script>
  export let count = 0

  let lastCountUpdate = new Date().getTime()
  const updateCount = async () => {
    // Update local
    count += 1
    lastCountUpdate = new Date().getTime()

    // Update count after timeWindow millis of inactivity
    const timeWindow = 400
    window.setTimeout(async () => {
      const expectedLastUpdate = (new Date().getTime() - timeWindow)
      if (lastCountUpdate > expectedLastUpdate) { return }
      
      // Submit to server
      const res = await fetch("/api/changecount", {
        method: "POST",
        body: JSON.stringify({value: count})
      })
      if (res.status !== 200) {
        console.log("COUNTER SUBMISSION NETWORK ERROR")
      }
    }, timeWindow + 1)

  }
</script>


<div class="root">
  <p>{count}</p>
  <button on:click={()=>updateCount()}>Add One!</button>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  p {
    font-size: 2rem;
  }
  
  button {
    width: 100px;
    height: 100px;
  }
</style>
