// Import types and functionality from types and functionality
import NextAuth, { NextAuthOptions } from "next-auth";

// Generate HTTP headers with provided token for authenticated requests to Polar API
const createAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

// Update or register user profile in application using data from Polar
async function updateUserProfile(accessToken: string, userId: string) {
  const payload = { "member-id": userId };
  await fetch("https://www.polaraccesslink.com/v3/users", {
    method: "POST",
    headers: createAuthHeaders(accessToken),
    body: JSON.stringify(payload),
  });
}

// Configure NextAuth, defining options for authentication and authorisation
export const authOptions: NextAuthOptions = {
  // Enables debug mode in development for detailed logging
  debug: process.env.NODE_ENV === "development",
  // Configures OAuth providers, specifying Polar
  providers: [
    {
      id: "polar",
      name: "Polar",
      type: "oauth",
      // Authorisation endpoint configuration specific to Polar OAuth
      authorization: {
        url: "https://flow.polar.com/oauth2/authorization",
        params: {
          client_id: process.env.POLAR_CLIENT_ID,
          response_type: "code",
          scope: "accesslink.read_all",
          redirect_uri: `${process.env.BASE_URL}/api/auth/callback/polar`,
        },
      },
      version: "2.0",
      token: "https://polarremote.com/v2/oauth2/token",
      clientId: process.env.POLAR_CLIENT_ID ?? "",
      clientSecret: process.env.POLAR_CLIENT_SECRET ?? "",
      // Maps Polar user profile to NextAuth model
      profile: (profile: any) => {
        return {
          id: profile["polar-user-id"],
          name: `${profile["first-name"]} ${profile["last-name"]}`,
        };
      },
    },
  ],
  // Callbacks for handling specific events during the authentication flow
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile) {
        return true;
      }
      return false;
    },
  },
  // Custom pages for handling different parts of the authentication flow
  pages: {
    signIn: "/auth/signin",
  },
};

// Exports the NextAuth configuration to Next.js
export default NextAuth(authOptions);
