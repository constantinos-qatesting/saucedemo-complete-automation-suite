import { test, expect } from '@playwright/test';

test.describe('Users API Tests', () => {
  test('should return user data successfully', async ({ request }) => {
    // Test Type: Positive API Test
    //
    // Scenario:
    // - Send GET request for an existing user
    //
    // Expected Result:
    // - Status code is 200
    // - Correct user data is returned

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.username).toBe('Bret');
    expect(body.name).toBe('Leanne Graham');
  });

  test('should create a new user successfully', async ({ request }) => {
    // Test Type: Positive API Test
    //
    // Scenario:
    // - Send POST request with valid user data
    //
    // Expected Result:
    // - Status code is 201
    // - Created user data is returned
    // - Generated id is returned

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/users',
      {
        data: {
          name: 'Constantinos',
          username: 'DinosQA',
          email: 'dinos@test.com',
        },
      }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe('Constantinos');
    expect(body.username).toBe('DinosQA');
    expect(body.email).toBe('dinos@test.com');

    // JSONPlaceholder returns a generated id
    expect(body.id).toBeDefined();
  });

  test('should update a user successfully', async ({ request }) => {
    // Test Type: Positive API Test
    //
    // Scenario:
    // - Send PUT request to update an existing user
    //
    // Expected Result:
    // - Status code is 200
    // - Updated user data is returned

    const response = await request.put(
      'https://jsonplaceholder.typicode.com/users/1',
      {
        data: {
          name: 'Constantinos Updated',
          username: 'DinosQA',
          email: 'updated@test.com',
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe('Constantinos Updated');
    expect(body.username).toBe('DinosQA');
    expect(body.email).toBe('updated@test.com');
  });

  test('should delete a user successfully', async ({ request }) => {
    // Test Type: Positive API Test
    //
    // Scenario:
    // - Send DELETE request for an existing user
    //
    // Expected Result:
    // - Status code is 200

    const response = await request.delete(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);
  });

  test('should return 404 for non-existing user', async ({ request }) => {
    // Test Type: Negative API Test
    //
    // Scenario:
    // - Send GET request for a user that does not exist
    //
    // Expected Result:
    // - Status code is 404

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999'
    );

    expect(response.status()).toBe(404);
  });

  test('should return empty body for non-existing user', async ({ request }) => {
    // Test Type: Negative API Test
    //
    // Scenario:
    // - Send GET request for a user that does not exist
    //
    // Expected Result:
    // - Status code is 404
    // - Response body is empty
    //
    // Note:
    // A real production API could return a clearer error message,
    // for example: { "error": "User not found" }.
    // JSONPlaceholder returns an empty object instead.

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999'
    );

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body).toEqual({});
  });

  test('should document invalid user creation behavior', async ({ request }) => {
    // Test Type: Exploratory / Documentation API Test
    //
    // Scenario:
    // - Send POST request with an empty request body
    //
    // Expected Result in a real API:
    // - Status code should normally be 400 Bad Request
    //
    // Actual Result in JSONPlaceholder:
    // - Status code is 201 Created
    //
    // Note:
    // JSONPlaceholder is a fake API for testing and learning.
    // It does not strictly validate required fields.

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/users',
      {
        data: {},
      }
    );

    expect(response.status()).toBe(201);
  });
});