import { Link } from "react-router-dom";

type BrandLogoProps = {
  markOnly?: boolean;
  header?: boolean;
};

export function BrandLogo({ markOnly = false, header = false }: BrandLogoProps) {
  if (markOnly) {
    return (
      <span className="logo-mark" aria-label="NFCPlate">
        N
      </span>
    );
  }
  return (
    <span
      className="logo"
      style={header ? { color: "var(--ink)" } : undefined}
    >
      <span className="logo-mark">N</span>
      NFCPlate
    </span>
  );
}
