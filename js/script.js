"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row .seat:not(.occupied");
var count = document.getElementById("count");
var total = document.getElementById("total");
var movieSelect = document.getElementById("movie");
var ticketPrice = parseInt(movieSelect.value);
//Get data from the local storage and populate the UI
var populateUI = function () {
    var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    var selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = +selectedMovieIndex;
        ticketPrice = parseInt(movieSelect.value);
    }
};
populateUI();
//Save selected movie index and price
var setMovieData = function (movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex.toString());
    localStorage.setItem("selectedMoviePrice", moviePrice);
};
/**
 * Updata count and total
 *
 */
var updateSelectedCount = function () {
    var selectedSeats = document.querySelectorAll(".row .seat.selected");
    var seatsIndex = __spreadArrays(selectedSeats).map(function (seat) {
        return __spreadArrays(seats).indexOf(seat);
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    var selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount.toString();
    total.innerText = (selectedSeatsCount * ticketPrice).toString();
};
// Movie select event
movieSelect.addEventListener("change", function (e) {
    var target = e.target;
    ticketPrice = parseInt(target.value);
    setMovieData(target.selectedIndex, target.value);
    updateSelectedCount();
});
// Seat Click Event
container.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("seat") &&
        !target.classList.contains("occupied")) {
        target.classList.toggle("selected");
        updateSelectedCount();
    }
});
// initial count and total set
updateSelectedCount();
