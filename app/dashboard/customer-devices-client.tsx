"use client";

import Link from "next/link";
import { Activity, ArrowUpRight, Ban, Check, ChevronRight, CircleHelp, ExternalLink, Gauge, Layers3, LayoutDashboard, LoaderCircle, LogOut, Nfc, Pencil, Plus, Radio, RotateCcw, Save, Settings2, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { BrandLogo } from "../../components/brand-logo";
import { QrCode } from "../../components/qr-icon";

type Card = {
  publicCode: string;
  label: string | null;
  productType: string;
  destinationType: string | null;
  destinationUrl: string | null;
  status: string;
  scanCount: number;
};

const destinationNames: Record<string, string> = {
  google: "Google reviews",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  tiktok: "TikTok",
  website: "Website",
  other: "Custom link",
};

export function CustomerDevicesClient({ email, signOutPath }: { email: string; signOutPath: string }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await fetch("/api/devices", { cache: "no-store" });
    const data = (await response.json()) as {
      devices?: Card[];
      error?: string;
    };
    if (!response.ok) throw new Error(data.error);
    setCards(data.devices || []);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialCards() {
      try {
        const response = await fetch("/api/devices", { cache: "no-store" });
        const data = (await response.json()) as {
          devices?: Card[];
          error?: string;
        };
        if (!response.ok) throw new Error(data.error);
        if (!cancelled) setCards(data.devices || []);
      } catch (value) {
        if (!cancelled) setError(value instanceof Error ? value.message : "Could not load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadInitialCards();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save(event: FormEvent<HTMLFormElement>, publicCode: string) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/devices", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        publicCode,
        label: form.get("label"),
        destinationType: form.get("destinationType"),
        destinationUrl: form.get("destinationUrl"),
      }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error || "Update failed");
      return;
    }
    setEditing(null);
    await load();
  }

  async function toggle(card: Card) {
    setError("");
    const response = await fetch("/api/devices", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        publicCode: card.publicCode,
        action: card.status === "disabled" ? "enable" : "disable",
      }),
    });
    if (!response.ok) {
      setError("We couldn’t update this product. Please try again.");
      return;
    }
    await load();
  }

  const activeCount = cards.filter((card) => card.status === "active").length;
  const totalScans = cards.reduce((sum, card) => sum + Number(card.scanCount || 0), 0);
  const accountName = email.split("@")[0].replace(/[._-]+/g, " ");

  return (
    <main className="customer-hub">
      <aside className="customer-sidebar">
        <Link className="customer-brand" href="/">
          <BrandLogo />
          <div>
            <small>Smart products</small>
          </div>
        </Link>

        <nav aria-label="Customer dashboard">
          <span>Workspace</span>
          <a className="active" href="#overview">
            <LayoutDashboard /> Overview
          </a>
          <a href="#products">
            <Nfc /> My products
            <b>{cards.length}</b>
          </a>
          <a href="#performance">
            <Activity /> Performance
          </a>
          <span>Account</span>
          <Link href="/shop">
            <Plus /> Add a product
          </Link>
          <a href="mailto:support@nfcplate.com">
            <CircleHelp /> Help & support
          </a>
        </nav>

        <div className="customer-sidebar-card">
          <span>
            <Zap />
          </span>
          <strong>Always ready</strong>
          <p>Your QR and NFC products keep working when you change a link.</p>
        </div>

        <div className="customer-account">
          <span>{email.charAt(0).toUpperCase()}</span>
          <div>
            <strong>{accountName}</strong>
            <small>{email}</small>
          </div>
          <Link aria-label="Sign out" href={signOutPath}>
            <LogOut />
          </Link>
        </div>
      </aside>

      <header className="customer-mobile-bar">
        <Link className="customer-brand" href="/">
          <BrandLogo />
        </Link>
        <Link href={signOutPath}>
          <LogOut /> <span>Sign out</span>
        </Link>
      </header>

      <div className="customer-canvas">
        <section className="customer-hero" id="overview">
          <div className="customer-hero-copy">
            <span className="customer-eyebrow">
              <Sparkles /> My NFCPlate workspace
            </span>
            <h1>
              Your smart products,
              <br />
              <em>all in one place.</em>
            </h1>
            <p>Manage every smart product, follow customer engagement, and send people exactly where you want.</p>
            <div className="customer-hero-actions">
              <a href="#products">
                Manage products <ChevronRight />
              </a>
              <Link href="/shop">
                Add another product <Plus />
              </Link>
            </div>
          </div>
          <div className="customer-signal-art" aria-hidden="true">
            <span />
            <span />
            <span />
            <div>
              <Nfc />
              <i>LIVE</i>
            </div>
          </div>
          <div className="customer-hero-status">
            <i />{" "}
            <span>
              {activeCount} of {cards.length} products live
            </span>
          </div>
        </section>

        {error && (
          <p className="customer-alert" role="alert">
            <Ban />
            {error}
          </p>
        )}

        {loading ? (
          <div className="customer-loading">
            <LoaderCircle className="spin" />
            <strong>Preparing your workspace…</strong>
          </div>
        ) : !cards.length ? (
          <section className="customer-empty-state">
            <div>
              <Nfc />
              <QrCode />
            </div>
            <span>YOUR FIRST PRODUCT</span>
            <h2>Nothing connected yet</h2>
            <p>Tap or scan a new NFCPlate product to activate it. Once connected, you can manage its destination from here anytime.</p>
            <Link href="/shop">
              Explore smart products <ArrowUpRight />
            </Link>
          </section>
        ) : (
          <>
            <section className="customer-kpis" id="performance" aria-label="Account overview">
              <article>
                <span className="customer-kpi-icon blue">
                  <Layers3 />
                </span>
                <div>
                  <small>Total products</small>
                  <strong>{cards.length}</strong>
                  <p>Connected to your account</p>
                </div>
                <i>
                  <ArrowUpRight />
                </i>
              </article>
              <article>
                <span className="customer-kpi-icon green">
                  <Radio />
                </span>
                <div>
                  <small>Live products</small>
                  <strong>{activeCount}</strong>
                  <p>Ready for customers</p>
                </div>
                <i>
                  <Check />
                </i>
              </article>
              <article>
                <span className="customer-kpi-icon violet">
                  <Gauge />
                </span>
                <div>
                  <small>Total engagement</small>
                  <strong>{totalScans.toLocaleString()}</strong>
                  <p>Scans and NFC taps</p>
                </div>
                <i>
                  <Activity />
                </i>
              </article>
            </section>

            <section className="customer-products-section" id="products">
              <header className="customer-section-heading">
                <div>
                  <span>SMART PRODUCT LIBRARY</span>
                  <h2>Your connected products</h2>
                  <p>Review status, check engagement, or reprogram a destination.</p>
                </div>
                <Link href="/shop">
                  <Plus /> Add product
                </Link>
              </header>

              <div className="customer-device-grid">
                {cards.map((card, index) => {
                  const disabled = card.status === "disabled";
                  const destination = destinationNames[card.destinationType || ""] || "Custom destination";
                  return (
                    <article className={`customer-product-card ${disabled ? "is-disabled" : ""}`} key={card.publicCode}>
                      <div className="customer-product-visual">
                        <span className="customer-product-number">0{index + 1}</span>
                        <div className="customer-product-orbit">
                          <span />
                          <span />
                          <Nfc />
                        </div>
                        <em className={card.status}>
                          <i />
                          {card.status}
                        </em>
                        <small>{card.productType}</small>
                      </div>

                      <div className="customer-product-content">
                        <header>
                          <div>
                            <span>{card.productType}</span>
                            <h3>{card.label || "My NFCPlate product"}</h3>
                            <code>{card.publicCode}</code>
                          </div>
                          <button aria-label={`Edit ${card.label || card.publicCode}`} onClick={() => setEditing(card.publicCode)} disabled={disabled}>
                            <Settings2 />
                          </button>
                        </header>

                        {editing === card.publicCode ? (
                          <form className="customer-edit-panel" onSubmit={(event) => save(event, card.publicCode)}>
                            <div className="customer-edit-title">
                              <div>
                                <Pencil />
                                <span>
                                  <strong>Reprogram product</strong>
                                  <small>Your printed QR and NFC stay the same.</small>
                                </span>
                              </div>
                              <button type="button" aria-label="Close editor" onClick={() => setEditing(null)}>
                                <X />
                              </button>
                            </div>
                            <label>
                              Product name
                              <input name="label" defaultValue={card.label || ""} placeholder="Front counter stand" required />
                            </label>
                            <div className="customer-edit-grid">
                              <label>
                                Destination
                                <select name="destinationType" defaultValue={card.destinationType || "other"}>
                                  <option value="google">Google reviews</option>
                                  <option value="facebook">Facebook</option>
                                  <option value="instagram">Instagram</option>
                                  <option value="linkedin">LinkedIn</option>
                                  <option value="whatsapp">WhatsApp</option>
                                  <option value="tiktok">TikTok</option>
                                  <option value="website">Website</option>
                                  <option value="other">Custom link</option>
                                </select>
                              </label>
                              <label>
                                Destination link
                                <input name="destinationUrl" type="url" defaultValue={card.destinationUrl || ""} placeholder="https://…" required />
                              </label>
                            </div>
                            <div className="customer-edit-actions">
                              <button className="customer-save">
                                <Save /> Save destination
                              </button>
                              <button type="button" onClick={() => setEditing(null)}>
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="customer-route-card">
                              <span>
                                <ExternalLink />
                              </span>
                              <div>
                                <small>Current destination</small>
                                <strong>{destination}</strong>
                                <a href={card.destinationUrl || "#"} target="_blank" rel="noreferrer">
                                  {card.destinationUrl || "No destination programmed"}
                                </a>
                              </div>
                              {card.destinationUrl && (
                                <a aria-label="Open destination" href={card.destinationUrl} target="_blank" rel="noreferrer">
                                  <ArrowUpRight />
                                </a>
                              )}
                            </div>
                            <footer>
                              <div className="customer-scan-stat">
                                <span>
                                  <Activity />
                                </span>
                                <div>
                                  <strong>{Number(card.scanCount || 0).toLocaleString()}</strong>
                                  <small>total scans</small>
                                </div>
                              </div>
                              <div className="customer-product-actions">
                                <button className="primary" onClick={() => setEditing(card.publicCode)} disabled={disabled}>
                                  <Pencil /> Change link
                                </button>
                                <button aria-label={disabled ? "Enable product" : "Disable product"} title={disabled ? "Enable product" : "Disable product"} onClick={() => toggle(card)}>
                                  {disabled ? <RotateCcw /> : <Ban />}
                                </button>
                              </div>
                            </footer>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <footer className="customer-page-footer">
          <span>
            <ShieldCheck /> Your account and product links are protected.
          </span>
          <p>NFCPlate Customer Workspace</p>
        </footer>
      </div>
    </main>
  );
}
