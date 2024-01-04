<script>
  // THIS COMPONENT IS UNFINISHED
  let nameText;

  const submitHandler = (e) => {
    console.log(nameText, e)
  }
</script>



<form class="root" on:submit={submitHandler}>
  <input bind:value={nameText} type="text">
</form>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
