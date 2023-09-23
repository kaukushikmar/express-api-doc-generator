# Express API Documentation Generator

Generate interactive API documentation for your Express.js applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation Format](#api-documentation-format)
- [Generating Documentation](#generating-documentation)
- [Example Usage](#example-usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this package using npm:

```bash
npm install express-api-doc-generator
```

## API Documentation Format

Your API documentation should follow a specific format using JSDoc comments:

```
@route: Specifies the HTTP method and route path.
@description: Provides a description of the API endpoint.
@param: Describes parameters required by the route.
@returns: Explains what the route returns.
@throws: Specifies any errors or exceptions that might occur.
```

### Demo express endpoints

```javascript
/**
 * @route GET /api/users
 * @description Get a list of users.
 * @returns {Array<User>} List of user objects.
 * @throws {Error} If there's an error while fetching users.
 */
app.get("/api/users", (req, res) => {
  //
});

/**
 * @route POST /api/users
 * @description Create a new user.
 * @param {User} user - The user object to create.
 * @returns {User} The created user.
 * @throws {Error} If there's an error while creating the user.
 */
app.post("/api/users", (req, res) => {
  //
});
```

## Generating Documentation

To generate documentation, use the express-api-doc-generator package. It will extract JSDoc comments from your Express application and create a PDF document with the API documentation.

### Example Usage

Here's a minimal example of how to use this package:

```javascript
const generateDocumentation = require("express-api-doc-generator");
const outputPath = "api-documentation.pdf";

generateDocumentation("./app.js", outputPath)
  .then(() => {
    console.log("API documentation generated successfully.");
  })
  .catch((error) => {
    console.error("Error generating documentation:", error);
  });
```

### Contributing

Contributions are welcome! If you'd like to improve this package or report issues, please open an issue or submit a pull request on [GitHub](https://github.com/kaukushikmar/express-api-doc-generator).
