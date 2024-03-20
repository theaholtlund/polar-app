// Set up authorisation for app using route handler

import NextAuth, { Providers } from "next-auth";

export default NextAuth({
  providers: [
    Providers.OAuth({
      id: "polar",
      name: "Polar",
      type: "oauth",
      version: "2.0",
      scope: "accesslink.read_all",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://polarremote.com/v2/oauth2/token",
      requestTokenUrl: "https://polarremote.com/v2/oauth2/token",
      authorizationUrl:
        "https://flow.polar.com/oauth2/authorization?response_type=code&scope=accesslink.read_all",
      profileUrl: "https://www.polaraccesslink.com/v3/users",
      clientId: process.env.POLAR_CLIENT_ID,
      clientSecret: process.env.POLAR_CLIENT_SECRET,
      // TODO:Define a more specific type for the profile object
      profile: (profile: any) => {
        return {
          id: profile.userId,
          name: profile.firstName + " " + profile.lastName,
          email: null,
        };
      },
    }),
  ],

  // Additional NextAuth configuration as needed
});
