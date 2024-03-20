import NextAuth, { NextAuthOptions } from "next-auth";

// Custom helper function to set HTTP headers for Polar API requests
const createAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

// Function to register or update the user in your app's system using Polar's data
async function updateUserProfile(accessToken: string, userId: string) {
  const payload = { "member-id": userId };

  await fetch("https://www.polaraccesslink.com/v3/users", {
    method: "POST",
    headers: createAuthHeaders(accessToken),
    body: JSON.stringify(payload),
  });
}

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    {
      id: "polar",
      name: "Polar",
      type: "oauth",
      version: "2.0",
      accessTokenUrl: "https://polarremote.com/v2/oauth2/token",
      authorization: {
        url: "https://flow.polar.com/oauth2/authorization?response_type=code",
        params: { scope: "accesslink.read_all" }, // Correctly specifying scope here
      },
      clientId: process.env.POLAR_CLIENT_ID,
      clientSecret: process.env.POLAR_CLIENT_SECRET,
      profile(profile: any) {
        return {
          id: profile["polar-user-id"],
          name: `${profile["first-name"]} ${profile["last-name"]}`,
          email: profile.email, // Assuming Polar provides an email, otherwise set to null
        };
      },
    },
  ],
  // Additional NextAuth configuration as needed
};

export default NextAuth(authOptions);
