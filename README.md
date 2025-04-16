# Blackjack Frontend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Issues](https://img.shields.io/github/issues/<username>/<repository>)
![Stars](https://img.shields.io/github/stars/<username>/<repository>)
![Forks](https://img.shields.io/github/forks/<username>/<repository>)

This is the frontend for a Blackjack game. It includes features like user authentication, password recovery, and a user-friendly game interface.

## Table of Contents

- [Features](#features)
- [Forgot Password Functionality](#forgot-password-functionality)
  - [Key Features](#key-features)
  - [API Endpoint](#api-endpoint)
- [How to Run](#how-to-run)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Log in and manage accounts.
- **Password Recovery**: Reset passwords via email.
- **Game Interface**: Play Blackjack with an intuitive UI.

## Forgot Password Functionality

The `forgotPasswordHandler.js` file handles password recovery by sending a reset link to the user's email.

### Key Features

1. **User Verification**: Checks if the email exists in the database.
2. **Token Generation**: Creates a unique token and stores it with an expiration time.
3. **Email Sending**: Sends a reset link using `nodemailer`.
4. **Error Handling**: Provides clear error messages for failures.

### API Endpoint

**POST /forgot-password**

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Responses
- **Success**: 
  ```json
  {
    "message": "Password reset link sent to your email."
  }
  ```
- **Error**:
  ```json
  {
    "message": "User not found"
  }
  ```

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Future Improvements

- Use environment variables for sensitive data.
- Add rate limiting to prevent abuse of the password recovery feature.
- Improve email service security.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit and push your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.