import Customer from "./Customer";
import Room from "./Room";
import Booking from "./Booking";

class Hotel {
  constructor(rooms, bookings) {
    this.currentCustomer = null;
    this.rooms = rooms.map(room => new Room(room));
    this.bookings = bookings.map(booking => new Booking(booking));
    this.pastBookings = [];
    this.futureBookings = [];
  }

  assignCustomer(customer) {
    this.currentCustomer = new Customer(customer);
  }

  findCustomerBookings() {
    return this.bookings.filter(booking => booking.userID === this.currentCustomer.id);
  }

  getRoomDetails() {
    let customerRoomDetails = this.findCustomerBookings().map(booking => {
      let currentRoom = this.rooms.find(room => room.number === booking.roomNumber);
      return {
              number: currentRoom.number,
              roomType: currentRoom.roomType,
              bidet: currentRoom.bidet,
              bedSize: currentRoom.bedSize,
              numBeds: currentRoom.numBeds,
              costPerNight: currentRoom.costPerNight,
              dateBooked: booking.date,
              bookingID: booking.id
             }
    });
    return customerRoomDetails;
  }

  getTotalSpent() {
    if (this.getRoomDetails() === []) {
      return `$0`;
    } else {
      let totalSpent = this.getRoomDetails().reduce((sum, room) => {
        return sum += room.costPerNight;
      }, 0);
    return `$${totalSpent.toFixed(2)}`;
    }
  }

  sortBookingsByDateDescending(bookings) {
    return bookings.sort((a, b) => {
      return parseInt(b.dateBooked.split('/').join('')) - parseInt(a.dateBooked.split('/').join(''));
    });
  }

  sortBookingsByDateAscending(bookings) {
    return bookings.sort((a, b) => {
      return parseInt(a.dateBooked.split('/').join('')) - parseInt(b.dateBooked.split('/').join(''));
    });
  }

  determinePastOrFutureBookings() {
    let currentDate = parseInt(new Date().toJSON().slice(0, 10).split('-').join(''));
    this.getRoomDetails().forEach(room => {
      if (parseInt(room.dateBooked.split('/').join('')) >= currentDate) {
        this.futureBookings.push(room);
      } else {
        this.pastBookings.push(room);
      }
    });
  }

  findAvailableRooms(date, roomType) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let availableRoomsByDate = this.rooms.filter(room => !bookedRooms.includes(room.number));
    if (roomType === undefined || roomType === 'any') {
      return availableRoomsByDate;
    } else {
      let availableRoomsByType = availableRoomsByDate.filter(room => room.roomType === roomType);
      return availableRoomsByType;
    }
  }

  addBooking(date, roomNumber) {
    let newBooking = {
                      "userID": this.currentCustomer.id,
                      "date": date,
                      "roomNumber": parseInt(roomNumber)
    }
    return newBooking;
  }


}

export default Hotel;