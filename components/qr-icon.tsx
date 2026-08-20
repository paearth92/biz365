type QRIconProps = { className?: string; size?: number };

export function QrCode({ className = "", size = 24 }: QRIconProps) {
  return <img aria-hidden="true" className={`nfcplate-qr-icon${className ? ` ${className}` : ""}`} src="/icons/nfcplate-official-qr.svg" width={size} height={size} alt="" />;
}
