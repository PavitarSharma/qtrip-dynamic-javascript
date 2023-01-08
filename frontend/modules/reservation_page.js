import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await response.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let reservationTableParent = document.getElementById("reservation-table-parent");
  let noReservationBanner = document.getElementById("no-reservation-banner");

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length <= 0) {
    reservationTableParent.style.display = "none";
    noReservationBanner.style.display = "block";
  } else {
    reservationTableParent.style.display = "block";
    noReservationBanner.style.display = "none";

    reservations.forEach((reservation) => {
      let localTime = new Date(reservation.time);
      let localDate = new Date(reservation.date);
      let row = document.createElement("tr");
      row.setAttribute("id", `${reservation.id}`);
      row.innerHTML = `<a href = "../detail/?adventure=${
        reservation.adventure
      }"<td>${reservation.id}</a></td>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${localDate.toLocaleDateString("en-IN")}</td>
    <td>${reservation.price}</td>
    <td>${localTime.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}</td>
    <td><a href = "../detail/?adventure=${reservation.adventure}">
    <button class="reservation-visit-button">Visit Adventure</button></a></td>`;
      document.getElementById("reservation-table").append(row);
    });

    
    
  }

  

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  
}

export { fetchReservations, addReservationToTable };
