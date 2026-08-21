import { Nfc, ShieldCheck, Smartphone } from "lucide-react";
import { QrCode } from "../qr-icon";

export function TrustStrip() {
  return (
    <div className="detail-trust-strip">
      <span>
        <Nfc />
        <strong>NFC tap</strong>
        <small>Hold a compatible phone near it</small>
      </span>
      <span>
        <QrCode />
        <strong>QR scan</strong>
        <small>Use the phone camera</small>
      </span>
      <span>
        <Smartphone />
        <strong>Same destination</strong>
        <small>Two equal ways to connect</small>
      </span>
      <span>
        <ShieldCheck />
        <strong>No customer app</strong>
        <small>Nothing extra to download</small>
      </span>
    </div>
  );
}
