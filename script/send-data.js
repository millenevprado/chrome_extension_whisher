// function fetchData() {
//   const title = document.querySelector('list').innerText;

//   return {
//     title: title
//   }
// }

function sendData() {
  const url = 'http://localhost:3000/api/v1/lists';
  fetch(url, {
    headers: { "X-User-Email": "teste500@teste.com", "X-User-Token": "9Rjy43PM33GwQ7ksaT_K", "Content-Type": "application/json" }
  })
  .then((response) => {response.json()})
  .then((data) => {
    console.log('rerou')
  })
};

sendData();
