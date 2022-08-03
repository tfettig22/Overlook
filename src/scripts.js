// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// *** Query Selectors *** //

const bookARoomBtn = document.querySelector('.go-to-book-page');
const myBookingsBtn = document.querySelector('.go-to-dashboard');
const dashboardContainer = document.querySelector('.dashboard-container');
const bookARoomContainer = document.querySelector('.book-a-room-container')

// *** Event Listeners *** //

bookARoomBtn.addEventListener('click', goToBookPage);
myBookingsBtn.addEventListener('click', goToDashboard);

// *** Global Variables *** //

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
