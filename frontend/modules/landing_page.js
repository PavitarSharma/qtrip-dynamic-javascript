import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  
}

//Implementation of fetch call
async function fetchCities() {
  let url = config.backendEndpoint+"/cities" //"http://13.233.191.50:8082/cities"
  
  try {
    const response = await fetch(url);

    const data = await response.json();
    
    let serachResult = search(data)
    //console.log("Get Search Result:", serachResult);
    return serachResult == undefined ? data : serachResult
    
  }catch(error) {
    return null
  }


}

const searchBar = document.getElementById('searchBar');


function search(data) {
  searchBar.addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase().trim();
    const filteredCharacters = data.filter((character) => {
        return (
            character.city.toLowerCase().includes(searchString)
        );
        
    });

    let datas = document.getElementById("data");
    datas.innerHTML = ""
    
    filteredCharacters.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
    
    
    
    return filteredCharacters
 });
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let data = document.getElementById("data");
  

  let ele = document.createElement("div")
  ele.className = "col-lg-3 col-sm-6 col-12 mb-4"
  ele.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img id="cityImage" src=${image} alt=${city} class="img-fluid">
        <div class="tile-text text-center">
          <h5 id="city">${city}</h5>
          <p class="text-white" id="discription">${description}</p>
        </div>
      </div>
    </a>
  `
  

  return data.append(ele)
  
}

export { init, fetchCities, addCityToDOM };
