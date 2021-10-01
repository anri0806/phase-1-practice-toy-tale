let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
  handleSubmit();
});

//DOM Render functions - Fetch Andy's Toys//
function renderToys(toyData) {
  let divCard = document.createElement("div");
  divCard.classList.add("card");

  divCard.innerHTML = `
    <h2>${toyData.name}</h2>
    <img src="${toyData.image}" class="toy-avatar" />
    <p >${toyData.likes} Likes </p>
    <button class="like-btn" id="${toyData.id}">Like</button>
  </div>
  `;
  document.querySelector("div#toy-collection").appendChild(divCard);

  //DOM Render - Increase a Toy's likes//
  divCard.querySelector('.like-btn').addEventListener('click',() => {
    toyData.likes += 1
    divCard.querySelector("p").innerText = `${toyData.likes} Likes`
    updateLikes(toyData)
  })
}

//!!Fetch Andy's Toys!!!//
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toyData) => toyData.forEach((toy) => renderToys(toy)));
}

//Event handlers - Add a New Toy//
function handleSubmit() {
  let form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("image url is:", e.target.image.value)
    let toyObject = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };
    //console.log("toyObject is:", toyObject);

    renderToys(toyObject);
    addNewToy(toyObject);
  });
}

//Add a New Toy//
function addNewToy(toyObject) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObject),
  });
}


  //Increase a Toy's likes//
  function updateLikes(toyData){
    fetch(`http://localhost:3000/toys/${toyData.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    })
    .then(response => response.json())
    .then(toy => console.log(toy))

  }