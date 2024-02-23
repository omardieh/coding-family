import Navbar from "./Navbar";
import { guestLinks } from "/common/assets/navLinks";

export default function Header() {
  return (
    <header>
      <Navbar navLinks={guestLinks} />
    </header>
  );
}
