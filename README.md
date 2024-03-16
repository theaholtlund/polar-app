# Polar Data Analysis

This is a tool for analysing data collected through Polar activities.

## Getting Started

Duplicate .env.example to an .env.local file, and fill in the environment variables. Generate a NextAuth.js secret by running the command:

```bash
openssl rand -base64 32
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [localhost](http://localhost:3000) with your browser to interact with the application.

## More on Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial

## Additional Resources

Documentation and supporting material for setting up the app:

- [Polar AccessLink API v3](https://www.polar.com/accesslink-api/?python#polar-accesslink-api): Managing and setting up the Polar API
