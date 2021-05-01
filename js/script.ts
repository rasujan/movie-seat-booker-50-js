export {};

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
let movieSelect = <HTMLSelectElement>document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);

//Get data from the local storage and populate the UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = +selectedMovieIndex;
    ticketPrice = parseInt(movieSelect.value);
  }
};

populateUI();

//Save selected movie index and price
const setMovieData = (movieIndex: number, moviePrice: string) => {
  localStorage.setItem("selectedMovieIndex", movieIndex.toString());
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

/**
 * Updata count and total
 *
 */
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount.toString();
  total.innerText = (selectedSeatsCount * ticketPrice).toString();
};

// Movie select event
movieSelect.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLSelectElement;

  ticketPrice = parseInt(target.value);
  setMovieData(target.selectedIndex, target.value);
  updateSelectedCount();
});

// Seat Click Event
container.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  if (
    target.classList.contains("seat") &&
    !target.classList.contains("occupied")
  ) {
    target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// initial count and total set
updateSelectedCount();
