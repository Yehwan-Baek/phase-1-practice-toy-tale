let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form")

  //GET method
  fetch("http://localhost:3000/toys")
  .then( (res) => res.json() )
  .then( (toys) => {toys.forEach((toy) => renderingToys(toy));
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //add new toy
  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addNewToy();

    addToyForm.reset();
  })
});

  
//code contains some elements for rendering
function renderingToys(toy) {
  let h2 =document.createElement("h2");
  h2.innerHTML = toy.name;

  let img = document.createElement("img");
  img.setAttribute("class","toy-avatar")
  img.src = toy.image

  let p = document.createElement("p");
  p.innerHTML = `${toy.likes} Likes`

  let btn = document.createElement("button");
  btn.setAttribute("id",toy.id)
  btn.innerHTML = "Like"

  let div = document.createElement("div");
  div.setAttribute("class","card");
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);
  document.querySelector("#toy-collection").appendChild(div);
}

//code fetch the link for PATCH new toy
function addNewToy() {
  const newToy = {
    "name" : document.getElementById("new-name").value,
    "image" : document.getElementById("new-image").value,
    "likes" : 0
  };

  fetch("http://localhost:3000/toys", {
    method : "POST",
    headers : {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then( (res) => res.json())
  .then( toy => renderingToys(toy))
}