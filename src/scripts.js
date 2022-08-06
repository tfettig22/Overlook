// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// *** Imports *** //

import { getAllData } from './apiCalls';
import './css/styles.css';
// *** Images *** //
import './images/turing-logo.png'
import './images/overlook.png'
// *** Classes *** //
import Customer from './classes/Customer'
import Room from './classes/Room'
import Booking from './classes/Booking'
import Hotel from './classes/Hotel'


// *** Query Selectors *** //

const bookARoomBtn = document.querySelector('.go-to-book-page');
const myBookingsBtn = document.querySelector('.go-to-dashboard');
const dashboardContainer = document.querySelector('.dashboard-container');
const bookARoomContainer = document.querySelector('.book-a-room-container')

// *** Event Listeners *** //

window.addEventListener('load', retrieveAllData);
bookARoomBtn.addEventListener('click', goToBookPage);
myBookingsBtn.addEventListener('click', goToDashboard);

// *** Global Variables *** //

let customersData;
let allCustomers = [];
let roomsData;
let allRooms = [];
let bookingsData;
let allBookings = [];

// *** GET/POST *** //
function retrieveAllData() {
  getAllData('customers', 'rooms', 'bookings').then(responses => {
    customersData = responses[0]
    roomsData = responses[1]
    bookingsData = responses[2]
    customersData.customers.forEach(customer => allCustomers.push(new Customer(customer)))
    allRooms = roomsData.rooms.map(room => new Room(room))
    allBookings = bookingsData.bookings.map(booking => new Booking(booking))
  })
}

// *** Functions *** //

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function goToBookPage() {
  hide(dashboardContainer);
  hide(bookARoomBtn);
  show(bookARoomContainer);
  show(myBookingsBtn);
}

function goToDashboard() {
  hide(bookARoomContainer);
  hide(myBookingsBtn);
  show(dashboardContainer);
  show(bookARoomBtn);
}
