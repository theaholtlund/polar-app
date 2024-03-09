// Set up authorisation for app using route handler

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Check if environment variables are defined, throw error if not
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    "GitHub client ID or client secret is not correctly defined in project environment."
  );
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
