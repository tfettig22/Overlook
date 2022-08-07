// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// *** Imports *** //

import { getAllData } from './apiCalls';
import './css/styles.css';
// *** Images *** //
import './images/turing-logo.png';
import './images/overlook.png';
// *** Classes *** //
import Customer from './classes/Customer';
import Room from './classes/Room';
import Booking from './classes/Booking';
import Hotel from './classes/Hotel';

// *** Query Selectors *** //

const bookARoomBtn = document.querySelector('.go-to-book-page');
const myBookingsBtn = document.querySelector('.go-to-dashboard');
const dashboardContainer = document.querySelector('.dashboard-container');
const bookARoomContainer = document.querySelector('.book-a-room-container');
const dateSelector = document.querySelector('.date-selector');
const roomTypeSelector = document.querySelector('.room-type-selector');
const availableRoomsHeader = document.querySelector('.available-rooms-header');
const availableRooms = document.querySelector('.available-rooms');
const upcomingBookingsHeader = document.querySelector('.upcoming-bookings-header');
const upcomingBookings = document.querySelector('.upcoming-bookings');
const pastBookingsHeader = document.querySelector('.past-bookings-header');
const pastBookings = document.querySelector('.past-bookings');
const customerWelcomeMsg = document.querySelector('.customer-welcome-message');
const customerTotalSpent = document.querySelector('.total-spent');
const applyFiltersBtn = document.querySelector('.filter-rooms');

// *** Event Listeners *** //

window.addEventListener('load', assignAllData);
bookARoomBtn.addEventListener('click', goToBookPage);
myBookingsBtn.addEventListener('click', goToDashboard);
applyFiltersBtn.addEventListener('click', goToBookPage);

// *** Global Variables *** //

let allCustomers;
let allRooms;
let allBookings;
let hotel;
let selectedDate;
let selectedRoomType;

// *** GET/POST *** //
function assignAllData() {
  getAllData('customers', 'rooms', 'bookings').then(responses => {
    allCustomers = responses[0].customers.map(customer => new Customer(customer));
    allRooms = responses[1].rooms.map(room => new Room(room));
    allBookings = responses[2].bookings.map(booking => new Booking(booking));
    initializeHotel();
    setCurrentDate();
    displayCustomerBookings();
  });
}

// *** Functions *** //

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function setCurrentDate() {
  let currentDate = new Date().toJSON().slice(0, 10);
  dateSelector.value = currentDate;
  dateSelector.min = currentDate;
}

function initializeHotel() {
  hotel = new Hotel(allRooms, allBookings);
  hotel.assignCustomer(allCustomers[9]);
  hotel.determinePastOrFutureBookings();
}

function displayAvailableRooms(date, roomType) {
  availableRoomsHeader.innerText = `Available Rooms: ${hotel.findAvailableRooms(date, roomType).length}`;
  availableRooms.innerHTML = '';
  hotel.findAvailableRooms(date, roomType).forEach(room => {
    let bed = 'bed';
    let bidet = 'Bidet in room';
    if (room.numBeds > 1) {
      bed = 'beds';
    }
    if (room.bidet === false) {
      bidet = 'No bidet in room';
    }
    availableRooms.innerHTML +=
    `<article class="available-room">
      <img class="available-room-image" src="" alt="">
      <p class="available-room-number">Room ${room.number}</p>
      <p class="available-room-type">${room.roomType}</p>
      <p class="available-room-beds">${room.numBeds} ${room.bedSize} ${bed}</p>
      <p class="available-room-bidet">${bidet}</p>
      <p class="available-room-cost">$${room.costPerNight} per night</p>
      <button class="create-new-booking">Book This Room</button>
    </article>`;
  });
}

function displayCustomerBookings() {
  upcomingBookingsHeader.innerText = `Upcoming Bookings: ${hotel.futureBookings.length}`;
  pastBookingsHeader.innerText = `Past Bookings: ${hotel.pastBookings.length}`;
  customerWelcomeMsg.innerText = `Welcome ${hotel.currentCustomer.name}`;
  customerTotalSpent.innerText = `Total spent on bookings: ${hotel.getTotalSpent()}`;
  upcomingBookings.innerHTML = '';
  pastBookings.innerHTML = '';
  hotel.getRoomDetails().forEach(room => {
    let bed = 'Bed';
    let bidet = 'Bidet In Room';
    if (room.numBeds > 1) {
      bed = 'Beds';
    }
    if (room.bidet === false) {
      bidet = 'No Bidet In Room';
    }
    if (parseInt(room.dateBooked.split('/').join('')) >= parseInt(new Date().toJSON().slice(0, 10).split('-').join(''))) {
      upcomingBookings.innerHTML += 
      `<article class="future-booked-room">
        <img class="booked-room-image" src="" alt="">
        <div class="date-and-room-number">
          <p class="booked-date-booked">${room.dateBooked}</p>
          <p class="booked-room-number">Room ${room.number}</p>
        </div>
        <div class="type-beds-bidet">
          <p class="booked-room-type">${changeToUpperCase(room.roomType)}</p>
          <p class="booked-room-beds">${room.numBeds} ${changeToUpperCase(room.bedSize)} ${bed}</p>
          <p class="booked-room-bidet">${bidet}</p>
        </div>
        <p class="booked-room-cost">$${room.costPerNight} Per Night</p>
      </article>`;
    } else {
      pastBookings.innerHTML +=
      `<article class="future-booked-room">
        <img class="booked-room-image" src="" alt="">
        <div class="date-and-room-number">
          <p class="booked-date-booked">${room.dateBooked}</p>
          <p class="booked-room-number">Room ${room.number}</p>
        </div>
        <div class="type-beds-bidet">
          <p class="booked-room-type">${changeToUpperCase(room.roomType)}</p>
          <p class="booked-room-beds">${room.numBeds} ${changeToUpperCase(room.bedSize)} ${bed}</p>
          <p class="booked-room-bidet">${bidet}</p>
        </div>
        <p class="booked-room-cost">$${room.costPerNight} Per Night</p>
      </article>`;
    }
  });
}

function filterAvailableRooms() {
  selectedDate = dateSelector.value.split('-').join('/');
  selectedRoomType = roomTypeSelector.value;
}

function goToBookPage() {
  hide(dashboardContainer);
  hide(bookARoomBtn);
  show(bookARoomContainer);
  show(myBookingsBtn);
  filterAvailableRooms();
  displayAvailableRooms(selectedDate, selectedRoomType);
}

function goToDashboard() {
  hide(bookARoomContainer);
  hide(myBookingsBtn);
  show(dashboardContainer);
  show(bookARoomBtn);
  displayCustomerBookings();
}

function changeToUpperCase(string) {
    let wordsInName = string.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    return capitalizedWords.join(' ');
}

console.log(changeToUpperCase('residential suite'))
