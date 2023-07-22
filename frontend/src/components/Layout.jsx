import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>footer here</footer>
    </div>
  );
}
