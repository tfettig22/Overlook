import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';

const data1 = require('./test-data/customer-test-data.js');
const customerData = data1.customers;
const data2 = require('./test-data/room-test-data.js');
const roomData = data2.rooms;
const data3 = require('./test-data/booking-test-data.js');
const bookingData = data3.bookings;

describe('Hotel', () => {

  let hotel;

  beforeEach(() => {
    hotel = new Hotel(roomData, bookingData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be a new instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should begin with no current customer assigned', () => {
    expect(hotel.currentCustomer).to.equal(null);
  });

  it('should hold a list of all rooms', () => {
    expect(hotel.rooms).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      }
    ]);
  });

  it('should make each room an instance of Room', () => {
    expect(hotel.rooms[0]).to.be.an.instanceOf(Room);
    expect(hotel.rooms[1]).to.be.an.instanceOf(Room);
    expect(hotel.rooms[2]).to.be.an.instanceOf(Room);
    expect(hotel.rooms[3]).to.be.an.instanceOf(Room);
  });

  it('should hold all bookings', () => {
    expect(hotel.bookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 1,
        date: "2022/04/22",
        roomNumber: 1
        },
        {
        id: "5fwrgu4i7k55hl6t5",
        userID: 2,
        date: "2022/01/24",
        roomNumber: 2
        },
        {
        id: "5fwrgu4i7k55hl6t6",
        userID: 3,
        date: "2022/01/24",
        roomNumber: 3
        },
        {
        id: "5fwrgu4i7k55hl6t7",
        userID: 1,
        date: "2023/02/16",
        roomNumber: 4
        },
    ]);
  });

  it('should make each booking an instance of Booking', () => {
    expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
    expect(hotel.bookings[1]).to.be.an.instanceOf(Booking);
    expect(hotel.bookings[2]).to.be.an.instanceOf(Booking);
    expect(hotel.bookings[3]).to.be.an.instanceOf(Booking);
  });

  it('should hold a list of past bookings that starts empty', () => {
    expect(hotel.pastBookings).to.deep.equal([]);
  });

  it('should hold a list of future bookings that starts empty', () => {
    expect(hotel.futureBookings).to.deep.equal([]);
  });

  it('should have a method to assign a current customer', () => {
    hotel.assignCustomer(customerData[0]);
    expect(hotel.currentCustomer).to.deep.equal({
      id: 1,
      name: 'Tom Fettig'
    });

    hotel.assignCustomer(customerData[1]);
    expect(hotel.currentCustomer).to.deep.equal({
      id: 2,
      name: 'Sara Bethke'
    });
  });

  it('should make the assigned customer an instance of Customer', () => {
    hotel.assignCustomer(customerData[0]);
    expect(hotel.currentCustomer).to.be.an.instanceOf(Customer);
  });

  it('should have a method to find all of the current customer\'s bookings', () => {
    hotel.assignCustomer(customerData[0]);
    expect(hotel.findCustomerBookings()).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2022/04/22",
      roomNumber: 1
      },
      {
      id: "5fwrgu4i7k55hl6t7",
      userID: 1,
      date: "2023/02/16",
      roomNumber: 4
      }
    ]);

    hotel.assignCustomer(customerData[1]);
    expect(hotel.findCustomerBookings()).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6t5",
      userID: 2,
      date: "2022/01/24",
      roomNumber: 2
      }
    ]);
  });
  
  it('should return an empty array if the customer has not made any bookings', () => {
    hotel.assignCustomer(customerData[3]);
    expect(hotel.findCustomerBookings()).to.deep.equal([]);
  });

  it('should have a method to get all the details for a room that the customer has booked', () => {
    hotel.assignCustomer(customerData[0]);
    expect(hotel.getRoomDetails()).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        dateBooked: '2022/04/22',
        bookingID: '5fwrgu4i7k55hl6sz'
       },
       {
        number: 4,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02,
        dateBooked: '2023/02/16',
        bookingID: '5fwrgu4i7k55hl6t7'
       }
    ]);

    hotel.assignCustomer(customerData[1]);
    expect(hotel.getRoomDetails()).to.deep.equal([
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38,
        dateBooked: '2022/01/24',
        bookingID: '5fwrgu4i7k55hl6t5'
       }
    ]);
  });

  it('should have a method to calculate the total amount the customer has spent on bookings', () => {
    hotel.assignCustomer(customerData[0]);
    expect(hotel.getTotalSpent()).to.equal('$755.42');

    hotel.assignCustomer(customerData[1]);
    expect(hotel.getTotalSpent()).to.equal('$477.38');
  });

  it('should return zero dollars if the customer does not have any bookings', () => {
    hotel.assignCustomer(customerData[3]);
    expect(hotel.getTotalSpent()).to.equal('$0.00');
  });

  it('should have a method to sort the customer\'s bookings by descending date', () => {
    hotel.assignCustomer(customerData[0]);
    let customerBookings = hotel.getRoomDetails();
    expect(hotel.sortBookingsByDateDescending(customerBookings)).to.deep.equal([
      {
      number: 4,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.02,
      dateBooked: '2023/02/16',
      bookingID: '5fwrgu4i7k55hl6t7'
      },
      {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
      dateBooked: '2022/04/22',
      bookingID: '5fwrgu4i7k55hl6sz'
      }
    ]);
  });

  it('should have a method to sort the customer\'s bookings by ascending date', () => {
    hotel.assignCustomer(customerData[0]);
    let customerBookings = hotel.getRoomDetails();
    expect(hotel.sortBookingsByDateAscending(customerBookings)).to.deep.equal([
      {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
      dateBooked: '2022/04/22',
      bookingID: '5fwrgu4i7k55hl6sz'
      },
      {
      number: 4,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.02,
      dateBooked: '2023/02/16',
      bookingID: '5fwrgu4i7k55hl6t7'
      }
    ]);
  });

  it('should have a method to determine if a booking is upcoming or in the past, and add the booking to the correspoding array', () => {
    hotel.assignCustomer(customerData[0])
    hotel.determinePastOrFutureBookings();
    expect(hotel.pastBookings).to.deep.equal([
      {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
      dateBooked: '2022/04/22',
      bookingID: '5fwrgu4i7k55hl6sz'
      }
    ]);

    expect(hotel.futureBookings).to.deep.equal([
      {
      number: 4,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.02,
      dateBooked: '2023/02/16',
      bookingID: '5fwrgu4i7k55hl6t7'
      }
    ]);
  });

  it('should have a method to find available rooms on a certain date', () => {
    expect(hotel.findAvailableRooms('2022/12/25')).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      }
    ]);

    expect(hotel.findAvailableRooms('2022/01/24')).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 4,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      }
    ]);
  });

  it('should also be able to filter by a specific room type as well a date', () => {
    expect(hotel.findAvailableRooms('2022/12/25', 'residential suite')).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      }
    ]);

    expect(hotel.findAvailableRooms('2022/12/25', 'suite')).to.deep.equal([
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      }
    ]);
    
    expect(hotel.findAvailableRooms('2022/01/24', 'residential suite')).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      }
    ]);
  });

  it('should return an empty array if no rooms are available for the specified date and/or room type', () => {
    expect(hotel.findAvailableRooms('2022/01/24', 'suite')).to.deep.equal([]);
    expect(hotel.findAvailableRooms('2023/02/16', 'junior suite')).to.deep.equal([]);
  });
  
});