import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
const data = require('./test-data/booking-test-data.js');
const bookingData = data.bookings;

describe('Booking', () => {

  let booking1;
  let booking2;
  let booking3;
  let booking4;

  beforeEach(() => {
    booking1 = new Booking(bookingData[0]);
    booking2 = new Booking(bookingData[1]);
    booking3 = new Booking(bookingData[2]);
    booking4 = new Booking(bookingData[3]);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
    expect(booking2.id).to.equal('5fwrgu4i7k55hl6t5');
    expect(booking3.id).to.equal('5fwrgu4i7k55hl6t6');
    expect(booking4.id).to.equal('5fwrgu4i7k55hl6t7');
  });

  it('should have a user ID', () => {
    expect(booking1.userID).to.equal(1);
    expect(booking2.userID).to.equal(2);
    expect(booking3.userID).to.equal(3);
    expect(booking4.userID).to.equal(1);
  });

  it('should have a date', () => {
    expect(booking1.date).to.equal('2022/04/22');
    expect(booking2.date).to.equal('2022/01/24');
    expect(booking3.date).to.equal('2022/01/10');
    expect(booking4.date).to.equal('2023/02/16');
  });

  it('should have an associated room number', () => {
    expect(booking1.roomNumber).to.equal(1);
    expect(booking2.roomNumber).to.equal(2);
    expect(booking3.roomNumber).to.equal(3);
    expect(booking4.roomNumber).to.equal(4);
  });
  
});