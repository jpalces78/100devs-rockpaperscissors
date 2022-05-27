document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const choice = document.querySelector("#choice");
  const value = choice.options[choice.selectedIndex].value;
  const res = await fetch(`/api?choice=${value}`);
  const data = await res.json();

  console.log(value, data);
  document.querySelector('h2').innerHTML = data.winner;
}

