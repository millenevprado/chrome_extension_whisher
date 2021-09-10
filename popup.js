const lists = document.querySelector('.list');


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const cebola = tabs[0].url;
    const formUrl = document.getElementById('form-url');
    if (formUrl) {
      formUrl.addEventListener('submit', (event) => {
        event.preventDefault();
        const hiddenId = document.querySelector('#form-url #hiddenId');
        // const userInput = window.location.href;
        // const userInput = document.getElementById('url').value;
        const userInput = cebola;
        // console.log(hiddenId.value);
        // console.log(userInput);
        createProduct(userInput, hiddenId);
      })
    };
  });

function sendData() {
  fetch("http://localhost:3000/api/v1/lists")
    .then(response => response.json())
    .then((data) => {
      data.forEach((list) => {
        lists.insertAdjacentHTML("beforeend", `<li class="list-inline-item list-item-btn" data-id=${list.id}>${list.title}</li>`)
      });
    });
};

function hiddenInput(listId) {
  const hiddenId = document.getElementById('hiddenId');
  hiddenId.value = listId;
};

function getHiddenId() {
  lists.addEventListener('click', (event) => {
    const listId = (event.target).dataset.id;
    hiddenInput(listId);
  });
};

getHiddenId();
// function handleForm() {
//   const formUrl = document.getElementById('form-url');
//   if (formUrl) {
//     formUrl.addEventListener('submit', (event) => {
//       event.preventDefault();
//       const hiddenId = document.querySelector('#form-url #hiddenId');
//       // const userInput = window.location.href;
//       const userInput = document.getElementById('url').value;
//       console.log(hiddenId.value);
//       console.log(userInput);
//       createProduct(userInput, hiddenId);
//     })
//   };
// };

function setNotes() {
  const note = document.getElementById('notes');
  console.log(note.innerText);
  note.innerText = "The product has been added to your whish list";
};

function createProduct(userInput, listId) {
  fetch(`http://localhost:3000/api/v1/lists/${listId.value}/products`, {
    method: "POST",
    headers: { "X-User-Email": "teste500@teste.com", "X-User-Token": "9Rjy43PM33GwQ7ksaT_K", "Content-Type": "application/json" },
    body: JSON.stringify({
      "product": { "url": userInput }
    })
  })
  setNotes();
};

sendData();
// handleForm();
