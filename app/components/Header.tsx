// Import types, components and other functionality
import Link from "next/link";
import SignInButton from "./SignInButton";

// Define header component for the app
const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-nav-ul">
          <li className="header-nav-li">
            <Link href="/">Home Page</Link>
          </li>
          <li className="header-nav-li">
            <Link href="/protected/server">
              Server Page (Under Development)
            </Link>
          </li>
          <li className="header-nav-li">
            <Link href="/protected/client">Client Page (Protected)</Link>
          </li>
          <li className="header-nav-li">
            <SignInButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Export component to make it available
export default Header;
