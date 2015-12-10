import fetch from 'isomorphic-fetch';
import * as PinService from '../app/services/PinService';

const BASE_URI = 'https://localhost:5000/api';
const USER_ID = 293;
const TEST_TITLE = 'TEST_TITLE';
const TEST_DESCRIPTION = 'TEST_DESCRIPTION';
const TEST_LINK = 'http://example.com';
const TEST_EMAIL = 'test@example.com';

function random (low, high) {
  return Math.random() * (high - low) + low;
}

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function addRandomPin() {
  return PinService.createPin({
    userId: USER_ID,
    typeId: randomInt(0, 5),
    latitude: random(-90, 90),
    longitude: random(-180, 180),
    title: TEST_TITLE
  });
}

function addRandomPins(n) {
  let pins = []
  for (var i = 0; i < n; i++) {
    pins.push(addRandomPin());
  }
  return Promise.all(pins);
}

function addRandomVisits(n) {
  if (n < 0) {
    return;
  }
  else {
    
  }
}

/* addRandomPins().then(function() { */
/*   console.log('done') */
/* }); */
