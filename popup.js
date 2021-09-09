// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('button').addEventListener('click', onclick, false)
//   function onclick() {

//   }
// }, false)
const lists = document.querySelector('.list');

function sendData() {
  fetch("http://localhost:3000/api/v1/lists")
    .then(response => response.json())
    .then((data) => {
      data.forEach((list) => {
        lists.insertAdjacentHTML("beforeend", `<p data-id=${list.id}>${list.title}</p>`)
      });
    });
};

function hiddenInput(listId) {
  const cebola = document.getElementById('cebola');
  cebola.value = listId;
};

function agoraVaiGalera() {
  lists.addEventListener('click', (event) => {
    const id = (event.target).dataset.id;
    hiddenInput(id);
  });
};

agoraVaiGalera();
function handleForm() {
  const formUrl = document.getElementById('form-url');
  if (formUrl) {
    formUrl.addEventListener('submit', (event) => {
      event.preventDefault();
      const cebola = document.querySelector('#form-url #cebola');
      const userInput = document.getElementById('url').value;
      console.log(cebola.value);
      console.log(userInput);
      createProduct(userInput, cebola);
    })
  };
};

function createProduct(userInput, listId) {
  fetch(`http://localhost:3000/api/v1/lists/${listId.value}/products`, {
    method: "POST",
    headers: { "X-User-Email": "teste500@teste.com", "X-User-Token": "9Rjy43PM33GwQ7ksaT_K", "Content-Type": "application/json" },
    body: JSON.stringify({
      "product": { "url": userInput }
    })
  })
};

sendData();
handleForm();
