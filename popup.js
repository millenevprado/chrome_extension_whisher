const lists = document.querySelector('.list');

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const urlInput = tabs[0].url;
    const formUrl = document.getElementById('form-url');
    if (formUrl) {
      formUrl.addEventListener('submit', (event) => {
        event.preventDefault();
        const hiddenId = document.querySelector('#form-url #hiddenId');
        // const userInput = window.location.href;
        // const userInput = document.getElementById('url').value;
        const userInput = urlInput;
        // console.log(hiddenId.value);
        // console.log(userInput);
        createProduct(userInput, hiddenId);
      })
    };
  });

const sendData = () => {
  fetch("https://whisher.com.br/api/v1/lists")
    .then(response => response.json())
    .then((data) => {
      data.forEach((list) => {
        lists.insertAdjacentHTML("beforeend", `<li class="list-inline-item list-item-btn" data-id=${list.id}>${list.title}</li>`)
      });
    });
};

const hiddenInput = (listId) => {
  const hiddenId = document.getElementById('hiddenId');
  hiddenId.value = listId;
}

const getHiddenId = () => {
  lists.addEventListener('click', (event) => {
    const listId = (event.target).dataset.id;
    hiddenInput(listId);
  });
};

getHiddenId();

const setNotes = () => {
  const note = document.getElementById('notes');
  console.log(note.innerText);
  note.innerText = "The product has been added to your whish list";
};

const createProduct = (userInput, listId) => {
  fetch(`https://whisher.com.br/api/v1/lists/${listId.value}/products`, {
    method: "POST",
    headers: { "X-User-Email": "giovanna@whisher.com", "X-User-Token": "y6Tocgh2CusnwbeFbUxz", "Content-Type": "application/json" },
    body: JSON.stringify({
      "product": { "url": userInput }
    })
  })
  setNotes();
};

sendData();
