module.exports = {
  url: '',
  size: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  shipping: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  },
  billing: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  },
  payment: {
    number: '',
    expiration: '', // Formatted with just four consecutive numbers. eg if your expiration is 10/17 just put 1017
    csc: '' // this is that code on the front or back of your card
  }
};
