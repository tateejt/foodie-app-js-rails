const BASE_URL = "http://localhost:3000"

window.addEventListener('load', () => {
  getFood()
  attachClickToFoodieLinks()
})

function getFood(){
  clearForm()
  let main = document.querySelector('#main ul')
  main.innerHTML = ""
  fetch(BASE_URL+'/foodies')
  .then(resp => resp.json())
  .then(foodies => {
    foodies.forEach(food => {
      let newFood = new Fd(food)
      main.innerHTML += newFood.renderTd()
    })

    attachClickToFoodieLinks()

  })
}


function clearForm(){
  let foodieFormDiv = document.getElementById('food-form')
  foodieFormDiv.innerHTML = ''

}

function attachClickToFoodieLinks(){
  let foodie = document.querySelectorAll("li a")
  foodie.forEach(food => {
    food.addEventListener('click', displayFood)
  })

}

function displayCreateForm(){
  let foodieFormDiv = document.getElementById('food-form')
  let html = `
    <form onsubmit="createFood();return false;">
    <label>Description:</label>
    <input type="text" id="description"></br>
    <label>Eaten:</label>
    <input type="checkbox" id="completed"></br>
    <input type="submit" value="Create Food Spot"></br>
  `
  foodieFormDiv.innerHTML = html
}

function createFood(){
  const food = {
    description: document.getElementById('description').value,
    completed: document.getElementById('completed').checked
  }
  fetch(BASE_URL+'/foodies',{
    method: "POST",
    body: JSON.stringify(food),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(food => {
    document.querySelector('#main ul').innerHTML += `
    <li><a href="#" data-id="${food.id}">${food.description}</a>
     - ${food.completed ? "Eaten" : "Have not Had"}
     <button data-id=${food.id} onclick="removeFood(${food.id})"; return false>Delete</button>
     <button data-id=${food.id} onclick="editFood(${food.id})"; return false>Edit</button>
     </li>
    `
    attachClickToFoodieLinks()
    clearForm()
  })
}

function displayFood(e){
  e.preventDefault()
  clearForm()
  let id = this.dataset.id
  let main = document.querySelector('#main ul')
  main.innerHTML = ""
  fetch(BASE_URL + `/foodies/${id}`)
  .then(resp => resp.json())
  .then(food => {
    main.innerHTML += `
    <h3>${food.description}</h3> <hr>
    <p>${food.completed ? "Eaten" : "Have not Had"}</p>
    `
  })
}

function removeFood(id){
  clearForm()
  fetch(BASE_URL + `/foodies/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(event.target.parentElement.remove())
}

function editFood(id){
  clearForm()
  fetch(BASE_URL + `/foodies/${id}`)
  .then(resp => resp.json())
  .then(food => {
    let foodieFormDiv = document.getElementById('food-form')
    let html = `
      <form onsubmit="updateFood(${id});return false;">
      <label>Description:</label>
      <input type="text" id="description" value="${food.description}"></br>
      <label>Eaten:</label>
      <input type="checkbox" id="completed" ${food.completed ? "checked" : ""}></br>
      <input type="submit" value="Edit Food Spot"></br>
    `
    foodieFormDiv.innerHTML = html
  })
}

function updateFood(id){
  const food = {
    description: document.getElementById('description').value,
    completed: document.getElementById('completed').checked
  }
  fetch(BASE_URL + `/foodies/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(food)
  })
  .then(resp => resp.json())
  .then((food)=> {
    document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.innerHTML = `
    <a href="#" data-id="${food.id}">${food.description}</a>
     - ${food.completed ? "Eaten" : "Have not Had"}
     <button data-id=${food.id} onclick="removeFood(${food.id})"; return false>Delete</button>
     <button data-id=${food.id} onclick="editFood(${food.id})"; return false>Edit</button>
     `
     attachClickToFoodieLinks()
     clearForm()
  })

}


class Fd {
  constructor(food){
    this.id = food.id
    this.description = food.description
    this.completed = food.completed
  }

  renderTd(){
    return `
      <li><a href="#" data-id="${this.id}">${this.description}</a>
       - ${this.completed ? "Eaten" : "Have not had"}
       <button data-id=${this.id} onclick="removeFood(${this.id})"; return false>Delete</button>
       <button data-id=${this.id} onclick="editFood(${this.id})"; return false>Edit</button>
       </li>
       `
  }
}
