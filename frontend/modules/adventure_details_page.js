import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventure = params.get("adventure");

  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const response = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  let adventureSubtitle = document.getElementById("adventure-subtitle");
  let photoGallery = document.getElementById("photo-gallery");
  let adventureContent = document.getElementById("adventure-content");
  const { name, subtitle, images, content } = adventure;

  adventureName.innerHTML = name;
  adventureSubtitle.innerHTML = subtitle;

  images.forEach((image) => {
    let div = document.createElement("div");
    div.innerHTML = `<img src=${image} alt=${name} class='activity-card-image img-fluid'>`;
    photoGallery.append(div);
  });

  adventureContent.innerHTML = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");

  photoGallery.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
  let carouselInner = document.querySelector(".carousel-inner");

  images.forEach((image, index) => {
    let carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    carouselItem.innerHTML = `<img src=${image} class='activity-card-image'>`;
    carouselInner.append(carouselItem);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationPanelAvaiable = document.getElementById(
    "reservation-panel-available"
  );
  let reservationPanelSoldOut = document.getElementById(
    "reservation-panel-sold-out"
  );
  let reservationPersonCost = document.getElementById(
    "reservation-person-cost"
  );

  if (adventure.available) {
    reservationPanelAvaiable.style.display = "block";
    reservationPanelSoldOut.style.display = "none";
    reservationPersonCost.innerHTML = adventure.costPerHead;
  } else {
    reservationPanelAvaiable.style.display = "none";
    reservationPanelSoldOut.style.display = "block";
    reservationPersonCost.innerHTML = "";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");

  const postData = async (event) => {
    event.preventDefault();
    let name = form.elements.name.value;
    let date = form.elements.date.value;
    let person = form.elements.person.value;
    

    let data = {};
    data.name = name
    data.date = date
    data.person = person
    data.adventure = adventure.id

    try {
      let post = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await post.json();
      if (response.success === true) {
        alert("Success!");
        location.reload();
      } else {
        alert("Failed!");
      }

    } catch (error) {
      alert('Error' + error.message)
    }
  };

  form.addEventListener("submit", postData);
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved === true) {
    reservedBanner.style.display = 'block'
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
