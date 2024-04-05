// Import types, components and other functionality
import Link from "next/link";
import SignInButton from "./SignInButton";

// Define header component for app
const Header = () => {
  return (
    <header className="flex h-24 flex-col justify-center bg-stone-100">
      <nav className="container">
        <ul className="flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500">
          <li className="text-sm">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/server">Protected (server)</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/client">Protected (client)</Link>
          </li>
          <li>
            <SignInButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Export component to make it available
export default Header;
