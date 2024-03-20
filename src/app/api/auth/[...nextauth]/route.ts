// Set up authorisation for app using route handler

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import GithubProvider from "next-auth/providers/github";

// Define default headers
const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const headers = (accessToken: string) => {
  return {
    ...defaultHeaders(),
    Authorization: `Bearer ${accessToken}`,
  };
};

// Check if environment variables are defined, throw error if not
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    "GitHub client ID or client secret is not correctly defined in project environment."
  );
}

export default NextAuth({
  providers: [
    Providers.OAuth({
      id: "polar",
      name: "Polar",
      type: "oauth",
      version: "2.0",
      scope: "", // Define the scope according to Polar's API requirements
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://polarremote.com/v2/oauth2/token",
      requestTokenUrl: "https://polarremote.com/v2/oauth2/token",
      authorizationUrl:
        "https://flow.polar.com/oauth2/authorization?response_type=code",
      profileUrl: "https://www.polaraccesslink.com/v3/users",
      clientId: process.env.POLAR_CLIENT_ID,
      clientSecret: process.env.POLAR_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.userId,
          name: profile.firstName + " " + profile.lastName,
          email: null, // Assume Polar's API might not provide email
        };
      },
    }),
  ],
  // Additional NextAuth configuration as needed
});
