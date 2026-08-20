import Link from "next/link";
import { eq } from "drizzle-orm";
import { AlertTriangle, Ban, CheckCircle2, Nfc } from "lucide-react";
import { getDb } from "../../../db";
import { devices } from "../../../db/schema";
import { chatGPTSignInPath, getChatGPTUser } from "../../chatgpt-auth";
import { ActivationForm } from "./activation-form";
import { BrandLogo } from "../../../components/brand-logo";
import { QrCode } from "../../../components/qr-icon";
export const dynamic = "force-dynamic";
export default async function ActivationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const publicCode = code.trim().toUpperCase();
  const [device] = await getDb()
    .select({
      publicCode: devices.publicCode,
      productType: devices.productType,
      status: devices.status,
    })
    .from(devices)
    .where(eq(devices.publicCode, publicCode))
    .limit(1);
  const user = await getChatGPTUser();
  const returnTo = `/activate/${encodeURIComponent(publicCode)}`;
  return (
    <main className="activation-page">
      <header className="activation-header">
        <Link className="portal-logo" href="/">
          <BrandLogo priority />
        </Link>
        <div>
          <Nfc /> Tap <i /> <QrCode /> Scan
        </div>
      </header>
      <section className="activation-card">
        {!device ? (
          <>
            <div className="activation-icon danger">
              <AlertTriangle />
            </div>
            <span>PRODUCT NOT FOUND</span>
            <h1>We couldn’t recognize this product.</h1>
            <p>Check the printed link or contact NFCPlate support.</p>
            <code>{publicCode}</code>
          </>
        ) : device.status === "disabled" ? (
          <>
            <div className="activation-icon danger">
              <Ban />
            </div>
            <span>PRODUCT DISABLED</span>
            <h1>This product is currently unavailable.</h1>
            <p>Contact NFCPlate support if you believe this is a mistake.</p>
          </>
        ) : device.status === "active" ? (
          <>
            <div className="activation-icon success">
              <CheckCircle2 />
            </div>
            <span>ALREADY ACTIVE</span>
            <h1>This product is already programmed.</h1>
            <p>Its owner can change the destination from the NFCPlate dashboard.</p>
            <Link className="portal-primary" href="/dashboard">
              Open my dashboard
            </Link>
          </>
        ) : (
          <>
            <div className="activation-product">
              <Nfc />
              <span>{device.productType}</span>
              <QrCode />
            </div>
            <span>NEW NFCPLATE PRODUCT</span>
            <h1>Activate your tap + scan product</h1>
            <p>Connect this permanent code to Google, social media, WhatsApp, a website, or any URL.</p>
            {user ? (
              <ActivationForm publicCode={publicCode} />
            ) : (
              <div className="activation-signin">
                <p>Sign in so this product belongs to your account and only you can reprogram it.</p>
                <Link className="portal-primary" href={chatGPTSignInPath(returnTo)}>
                  Sign in to continue
                </Link>
              </div>
            )}
            <div className="activation-steps">
              <span>
                <strong>1</strong>Sign in
              </span>
              <i />
              <span>
                <strong>2</strong>Pick link
              </span>
              <i />
              <span>
                <strong>3</strong>Done
              </span>
            </div>
          </>
        )}
      </section>
      <p className="activation-foot">The scanned URL carries the product code automatically—nothing needs to be retyped.</p>
    </main>
  );
}
