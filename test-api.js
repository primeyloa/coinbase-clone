// Test script for API endpoints
const API_BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'http://localhost:5000';

async function testEndpoint(endpoint, options = {}, isApi = true) {
  const base = isApi ? API_BASE_URL : BASE_URL;
  try {
    const response = await fetch(`${base}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    console.log(`${endpoint}: ${response.status}`, data);
    return { status: response.status, data };
  } catch (error) {
    console.error(`${endpoint}: Error`, error.message);
    return { status: 0, error: error.message };
  }
}

async function runTests() {
  console.log('Testing API endpoints...\n');

  // Test health check
  await testEndpoint('/', {}, false);

  // Test crypto endpoints
  await testEndpoint('/crypto');
  await testEndpoint('/crypto/gainers');
  await testEndpoint('/crypto/new');

  // Test auth endpoints (will fail without DB, but let's try)
  await testEndpoint('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    })
  });

  await testEndpoint('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    })
  });

  // Test protected endpoint (will fail without token)
  await testEndpoint('/auth/profile');

  console.log('\nTesting complete.');
}

runTests();