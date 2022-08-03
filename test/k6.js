import http from 'k6/http';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1000,
      maxVUs: 1000,
    },
  },
};

export default () => {
  http.get(`http://localhost:3000/qa/questions/?product_id=${Math.floor(Math.random() * 1000000)}`);
};
