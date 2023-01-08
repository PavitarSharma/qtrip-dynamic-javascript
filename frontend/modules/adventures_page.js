import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let query = window.location.search;
  const cityData = new URLSearchParams(search);
  const city = cityData.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );

    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  let row = document.getElementById("data");
  adventures.forEach(adventure => {
    let col = document.createElement("div");
    col.className = "col-lg-3 col-sm-6 col-12 mb-4";
    col.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="card adventure-card shadow rounded">
          <img src=${adventure.image} alt=${adventure.name} class="card-img-top img-fluid">
          <p class="catogery-banner">${adventure.category}</p>
          <div class="card-body">
            <div class="d-flex justify-content-between px-2">
              <h5 class="card-title fs-6">${adventure.name}</h5>
              <p class="card-text text-dark"> <span class="currency">${adventure.currency}</span> ${adventure.costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between px-2">
              <h5 class="card-title fs-6">Duration</h5>
              <p class="card-text text-dark">${adventure.duration} Hours</p>
            </div>
          </div>
        </div>
     </a>
    `;
    row.append(col)
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(key => key.duration > low && key.duration <= high)
  return filteredList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(key => categoryList.includes(key.category))
  return filteredList
  
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // let { duration, category } = filters
  let isDuration = filters["duration"] && filters["duration"].length > 0
  let isCategory = filters["category"] && filters["category"].length > 0

  let filteredList = []
  console.log(filters["duration"], filters["category"]);
  
  if (isDuration && isCategory) {
    let [ low, high ] = filters["duration"].split('-')
    filteredList = filterByDuration(list, low, high)
    filteredList = filterByCategory(filteredList, filters["category"])
    
  } else if (isDuration) {
     let [ low, high ] = filters["duration"].split('-')
    filteredList = filterByDuration(list, low, high)
  }else if (isCategory) {
    filteredList = filterByCategory(list, filters["category"])
  } else {
    filteredList = list
  }

  return filteredList
  //return true
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let getItem = JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return getItem
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById('duration-select').value = filters["duration"]
  const categoryFlter = filters["category"]
  categoryFlter.forEach(key => {
    let divElem = document.createElement('div')
    divElem.className = 'category-filter'
    divElem.innerHTML = `
      <div>${key}</div>
    `
    document.getElementById('category-list').append(divElem)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
