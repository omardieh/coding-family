export default function Footer({ title }) {
  return (
    <>
      <small>
        {title} - Copyright © {new Date().getFullYear()}
      </small>
    </>
  );
}
