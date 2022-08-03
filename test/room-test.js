import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
const data = require('./test-data/room-test-data.js');
const roomData = data.rooms;

describe('Room', () => {

  let room1;
  let room2;
  let room3;
  let room4;

  beforeEach(() => {
    room1 = new Room(roomData[0]);
    room2 = new Room(roomData[1]);
    room3 = new Room(roomData[2]);
    room4 = new Room(roomData[3]);
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be a new instance of Room', () => {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room1.number).to.equal(1);
    expect(room2.number).to.equal(2);
    expect(room3.number).to.equal(3);
    expect(room4.number).to.equal(4);
  });

  it('should have a room type', () => {
    expect(room1.roomType).to.equal('residential suite');
    expect(room2.roomType).to.equal('suite');
    expect(room3.roomType).to.equal('single room');
    expect(room4.roomType).to.equal('junior suite');
  });

  it('should show whether it has a bidet or not', () => {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
    expect(room3.bidet).to.equal(false);
    expect(room4.bidet).to.equal(true);
  });

  it('should show the size of the bed in the room', () => {
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');
    expect(room3.bedSize).to.equal('king');
    expect(room4.bedSize).to.equal('queen');
  });

  it('should show how many beds are in the room', () => {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
    expect(room3.numBeds).to.equal(1);
    expect(room4.numBeds).to.equal(1);
  });

  it('should show the cost per night to stay in the room', () => {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
    expect(room3.costPerNight).to.equal(491.14);
    expect(room4.costPerNight).to.equal(397.02);
  });

});