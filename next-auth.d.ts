// Import types, components and other functionality
import "next-auth";

// Extend built-in types to include accessToken in the session
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
