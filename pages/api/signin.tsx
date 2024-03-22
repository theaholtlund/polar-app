// Import types and functionality from types and functionality
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();

  if (session && session.user) {
    // Check if session and session.user are not undefined
    return (
      <>
        <p>Signed in as {session.user.email}</p>{" "}
        {/* Now safe to access session.user.email */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <p>Not signed in</p>
        <button onClick={() => signIn("polar")}>Sign in with Polar</button>
      </>
    );
  }
}
