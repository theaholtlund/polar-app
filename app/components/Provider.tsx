"use client";

// Import types, components and other functionality
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Define type for component props
type Props = {
  children: ReactNode;
};

// Provides the session data for sub components
const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// Export component to make it available
export default Provider;
