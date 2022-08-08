// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// *** Imports *** //

import { getAllData } from './apiCalls';
import './css/styles.css';
// *** Images *** //
import './images/MHH.png';
import './images/single-room.png';
import './images/junior-suite.png';
import './images/suite.png';
import './images/residential-suite.png';
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
const mainBookingsHeader = document.querySelector('.bookings-header');
const successfulBookingMsg = document.querySelector('.successful-booking-container');

// *** Event Listeners *** //

window.addEventListener('load', assignAllData);
bookARoomBtn.addEventListener('click', goToBookPage);
myBookingsBtn.addEventListener('click', goToDashboard);
applyFiltersBtn.addEventListener('click', goToBookPage);
availableRooms.addEventListener('click', createNewBooking);

// *** Global Variables *** //

let allCustomers;
let allRooms;
let allBookings;
let hotel;
let selectedDate;
let selectedRoomType;
let bed = 'Bed';
let bidet = 'Bidet In Room';
let image;
let imageAlt;

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

function postData(newBooking) {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }
  })
  .then(booking => {
    hotel.addBooking(newBooking['date'], newBooking['roomNumber'])
    assignAllData();
    displaySuccessMsg();
    let timeout = setTimeout(goToDashboard, 3000);
  })
  .catch(err => {
    console.log(err)
  })
}

// *** Functions *** //

function createNewBooking(event) {
  event.preventDefault()
  if (event.target.classList.contains('button')) {
  postData(hotel.addBooking(dateSelector.value.split('-').join('/'), event.target.id))
  }
}

function displaySuccessMsg() {
  hide(dashboardContainer);
  hide(bookARoomContainer);
  hide(mainBookingsHeader)
  show(successfulBookingMsg);
}

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

function setRoomDetails(room) {
  if (room.numBeds > 1) {
    bed = 'Beds';
  }
  if (room.bidet === false) {
    bidet = 'No Bidet In Room';
  }
  if (room.roomType === 'single room') {
    image = "./images/single-room.png"
    imageAlt = 'single room image'
  }
  if (room.roomType === 'junior suite') {
    image = './images/junior-suite.png'
    imageAlt = 'junior suite image'
  }
  if (room.roomType === 'suite') {
    image = './images/suite.png'
    imageAlt = 'suite image'
  }
  if (room.roomType === 'residential suite') {
    image = './images/residential-suite.png'
    imageAlt = 'residential suite image'
  }
}

function setDashboardBookings(room) {
  return `<article class="future-booked-room" tabindex=0>
           <img class="future-booked-room-image" src="${image}" alt="${imageAlt}">
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

function setDashboardText() {
  upcomingBookingsHeader.innerText = `Upcoming Bookings: ${hotel.futureBookings.length}`;
  pastBookingsHeader.innerText = `Past Bookings: ${hotel.pastBookings.length}`;
  mainBookingsHeader.innerText = `${hotel.currentCustomer.name}'s Mile High Dashboard`;
  customerWelcomeMsg.innerText = `Thanks for staying with us ${hotel.currentCustomer.name.split(' ')[0]}!`
  customerTotalSpent.innerText = `Total spent on bookings: ${hotel.getTotalSpent()}`;
}

function displayAvailableRooms(date, roomType) {
  mainBookingsHeader.innerText = `Book your stay at the Mile High Hotel: Home of the Denver Broncos`;
  availableRoomsHeader.innerText = `Available Rooms: ${hotel.findAvailableRooms(date, roomType).length}`;
  availableRooms.innerHTML = '';
  if (hotel.findAvailableRooms(date, roomType).length === 0) {
    availableRooms.innerHTML = 
    `<p class="no-rooms-available-message">Sorry ${hotel.currentCustomer.name.split(' ')[0]}, we are all booked up for this date/room type.</br></br> Please update your filter options, we hope there is another room that meets your needs.
    </p>`
  } else {
    hotel.findAvailableRooms(date, roomType).forEach(room => {
      setRoomDetails(room);
      availableRooms.innerHTML +=
      `<article class="available-room" tabindex=0>
        <img class="available-room-image" src="${image}" alt="${imageAlt}">
        <p class="available-room-number">Room ${room.number}</p>
        <div class="type-beds-bidet">
          <p class="available-room-type">${changeToUpperCase(room.roomType)}</p>
          <p class="available-room-beds">${room.numBeds} ${changeToUpperCase(room.bedSize)} ${bed}</p>
          <p class="available-room-bidet">${bidet}</p>
        </div>
        <p class="available-room-cost">$${room.costPerNight} Per Night</p>
        <button class="create-new-booking button" id="${room.number}">Book This Room</button>
      </article>`;
    });
  }
}

function displayCustomerBookings() {
  setDashboardText();
  upcomingBookings.innerHTML = '';
  pastBookings.innerHTML = '';
  hotel.getRoomDetails().forEach(room => {
    setRoomDetails(room);
    if (parseInt(room.dateBooked.split('/').join('')) >= parseInt(new Date().toJSON().slice(0, 10).split('-').join(''))) {
      upcomingBookings.innerHTML += 
      setDashboardBookings(room);
    } else {
      pastBookings.innerHTML +=
      setDashboardBookings(room);
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
  hide(successfulBookingMsg);
  show(dashboardContainer);
  show(bookARoomBtn);
  show(mainBookingsHeader);
  displayCustomerBookings();
}

function changeToUpperCase(string) {
    let wordsInName = string.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    return capitalizedWords.join(' ');
}