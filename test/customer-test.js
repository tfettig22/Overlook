import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
const data = require('./test-data/customer-test-data.js');
const customerData = data.customers;

describe('Customer', () => {

  let customer1;
  let customer2;
  let customer3;
  let customer4;

  beforeEach(() => {
    customer1 = new Customer(customerData[0]);
    customer2 = new Customer(customerData[1]);
    customer3 = new Customer(customerData[2]);
    customer4 = new Customer(customerData[3]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be a new instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have an ID', () => {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
    expect(customer3.id).to.equal(3)
    expect(customer4.id).to.equal(4)
  });

  it('should have a name', () => {
    expect(customer1.name).to.equal('Tom Fettig');
    expect(customer2.name).to.equal('Sara Bethke');
    expect(customer3.name).to.equal('Matt Dupuis');
    expect(customer4.name).to.equal('Kevin Sweeney');
  });

});