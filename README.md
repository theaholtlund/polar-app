# Polar Data Analysis

The program allows for efficient and comprehensive analysis of data collected through various Polar activities. It offers users with platform to analyse their activity, training and health data.

## Getting Started

To set up the Polar Data Analysis tool on your local environment, follow these steps:

1. Duplicate .env.example to an .env.local file, and fill in the environment variables.

2. Generate a NextAuth.js secret by running the command:

```bash
openssl rand -base64 32
```

3. It is possible to add downloaded Polar data to be used for charts. In order to use such data files, create a folder called `user-data`, and add your files to the directory.

4. Install project dependencies specified in `package.json` file:

```bash
npm install
```

5. Then, run the application:

```bash
npm run dev
```

6. Open [localhost](http://localhost:3000) with your browser to interact with the application.

## Client vs. Server Protected Page

- **Client-Protected Page**: Handles authentication on the client side. The page may load content and scripts, that then verify if the user is authenticated. Commonly used when dynamic client-side behavior is needed.

- **Server-Protected Page**: Authentication is handled server-side before the page content is delivered to the browser. Commonly used for sensitive content, ensuring no part of the page is accessible without proper credentials.

## More on Next.js

For those interested in diving deeper into the Next.js framework, the following resources are availabile:

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial

## Additional Resources

Documentation and supporting material for setting up the app:

- [Polar AccessLink API v3](https://www.polar.com/accesslink-api/?python#polar-accesslink-api): Managing and setting up the Polar API
