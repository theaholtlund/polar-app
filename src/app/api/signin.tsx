// pages/auth/signin.tsx
import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <div>
      <button onClick={() => signIn("polar")}>Sign in with Polar</button>
    </div>
  );
};

export default SignIn;
