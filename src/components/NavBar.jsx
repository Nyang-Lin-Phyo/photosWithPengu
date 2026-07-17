import penguIcon from "../assets/pengus/pengu.png";

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--color-border-muted)",
        flexShrink: 0,
      }}
    >
      <img
        src={penguIcon}
        alt="pengu"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-family-display)",
          fontWeight: "var(--font-weight-regular)",
          fontSize: "var(--font-size-base)",
          color: "var(--color-text)",
        }}
      >
        pengu photobooth
      </span>
    </nav>
  );
}
