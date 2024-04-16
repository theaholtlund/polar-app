"use client";

// Import types, components and other functionality
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

// Define signin button for app
const SignInButton = () => {
  const { data: session } = useSession();

  const buttonClick = () => {
    if (session) {
      signOut({ redirect: true, callbackUrl: "/" });
    } else {
      signIn();
    }
  };

  return (
    <>
      <button className="sign-in-button" onClick={() => buttonClick()}>
        {session ? "Sign out" : "Sign in"}
      </button>
    </>
  );
};

// Export component to make it available
export default SignInButton;
