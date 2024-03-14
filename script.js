// 1. init code
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 2,
  iterations: 3,
  duration: '5s',
};

const my_data = JSON.parse(open('./my-data.json'));

// 2. setup code
export function setup() {
  console.log('SETUP', my_data);
  sleep(5);
  return my_data;
}

function access_an_url() {
  http.get('https://test.k6.io');
}

function check_response_fields() {
  // Make a request that returns some JSON data
  const res = http.get('https://httpbin.test.k6.io/json');

  // Extract data from that JSON data by first parsing it
  // using a call to "json()" and then accessing properties by
  // navigating the JSON data as a JS object with dot notation.
  const slide1 = res.json().slideshow.slides[0];
  check(slide1, {
    'slide 1 has correct title': (s) => s.title === 'Wake up to WonderWidgets!',
    'slide 1 has correct type': (s) => s.type === 'all',
  });
}

// 3. VU code
export default function (data) {
  console.log('VU', __VU, data);
  sleep(5);
  access_an_url();
  check_response_fields();
}

// 4. teardown code
export function teardown(data) {
  console.log('TEARDOWN', data);
  sleep(5);
}
