# Polar Data Analysis

This is a tool for analysing data collected through Polar activities.

## Getting Started

1. Duplicate .env.example to an .env.local file, and fill in the environment variables.

2. Generate a NextAuth.js secret by running the command:

```bash
openssl rand -base64 32
```

3. Install project dependencies specified in `package.json` file:

```bash
npm install
```

4. Then, run the application:

```bash
npm run dev
```

5. Open [localhost](http://localhost:3000) with your browser to interact with the application.

## More on Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial

## Additional Resources

Documentation and supporting material for setting up the app:

- [Polar AccessLink API v3](https://www.polar.com/accesslink-api/?python#polar-accesslink-api): Managing and setting up the Polar API
