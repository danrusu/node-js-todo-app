const http = require('k6/http');
const { check, sleep } = require('k6');
const { Trend } = require('k6/metrics');
const {
  htmlReport,
} = require('https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js');
const {
  textSummary,
} = require('https://jslib.k6.io/k6-summary/0.0.1/index.js');

const averageDuration = new Trend('averageTime');
const isDocker = __ENV.DOCKER === 'true';

const LOCALHOST = isDocker ? 'host.docker.internal' : 'localhost';
const REPORT = 'performance-test-report-todos.html';
const HTML_REPORT_PATH = isDocker ? REPORT : `logs/${REPORT}`;

const authorization = 'Basic dGVzdGVyOjEyMw==';

// Test configuration
export const options = {
  thresholds: {
    http_req_duration: ['p(99) < 3000'], // Assert that 99% of requests finish within 3000ms.
    averageTime: ['avg < 500'], // Custom threshold for the custom metric
  },
  // Ramp the number of virtual users up and down
  stages: [
    { duration: '5s', target: 10 }, // Ramp-up to 10 VUs
    { duration: '10s', target: 10 }, // Stay at 10 VUs for 10 seconds
    { duration: '5s', target: 0 }, // Ramp-down to 0 VUs
  ],
};

// Simulated user behavior
export default function () {
  const res = http.get(`http://${LOCALHOST}:1112/api/todo`, {
    headers: {
      authorization,
    },
  });

  // Validate response status
  check(res, { 'status was 200': r => r.status === 200 });

  // Add response duration to the trend
  averageDuration.add(res.timings.duration);
  sleep(1);
}

export function handleSummary(data) {
  return {
    [HTML_REPORT_PATH]: htmlReport(data),
    stdout: textSummary(data, { indent: '→', enableColors: true }),
  };
}
