type BrandLogoProps = {
  className?: string;
  markOnly?: boolean;
  priority?: boolean;
  header?: boolean;
};

export function BrandLogo({
  className = "",
  markOnly = false,
  priority = false,
  header = false,
}: BrandLogoProps) {
  return (
    <span
      className={`brand-logo${header ? " brand-logo--header" : ""}${markOnly ? " brand-logo--mark" : ""}${className ? ` ${className}` : ""}`}
    >
      <img className="brand-logo__mark" src="/images/brand/nfcplate-standing-plate-mark.png" alt="" aria-hidden="true" />
      {!markOnly && <span className="brand-logo__wordmark" aria-label="NFCPlate"><strong>NFC</strong><span>Plate</span></span>}
    </span>
  );
}
