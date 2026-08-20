"use client";

import Link from "next/link";
import { Activity, Ban, Boxes, CalendarDays, Check, ChevronRight, CircleHelp, Download, ExternalLink, KeyRound, Layers3, LayoutDashboard, Link2, Link2Off, LoaderCircle, LogOut, PackagePlus, Plus, Radio, RotateCcw, Search, Settings2, ShieldCheck, Sparkles, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BrandLogo } from "../../../components/brand-logo";
import { QrCode } from "../../../components/qr-icon";

type Batch = {
  id: string;
  name: string;
  productType: string;
  quantity: number;
  baseUrl: string;
  activeCount: number;
  createdAt: string;
};
type Card = {
  id: string;
  publicCode: string;
  productType: string;
  status: "unused" | "active" | "disabled";
  ownerEmail: string | null;
  destinationType: string | null;
  destinationUrl: string | null;
  scanCount: number;
  batchId: string;
  batchName: string;
  createdAt: string;
};
type ProgramScope = "single" | "selected" | "batch";
type ProgramState = {
  scope: ProgramScope;
  publicCode?: string;
  batchId?: string;
} | null;

const destinationOptions = [
  ["google", "Google"],
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["whatsapp", "WhatsApp"],
  ["tiktok", "TikTok"],
  ["website", "Website"],
  ["other", "Custom URL"],
];

export function AdminDevicesClient({ adminEmail }: { adminEmail: string }) {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [programming, setProgramming] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("all");
  const [batch, setBatch] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("created-desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [programState, setProgramState] = useState<ProgramState>(null);
  const [showBatchForm, setShowBatchForm] = useState(false);

  const loadBatches = useCallback(async () => {
    const response = await fetch("/api/admin/batches", { cache: "no-store" });
    const data = (await response.json()) as {
      batches?: Batch[];
      error?: string;
    };
    if (!response.ok) throw new Error(data.error);
    setBatches(data.batches || []);
  }, []);

  const loadCards = useCallback(async () => {
    const query = new URLSearchParams();
    if (status !== "all") query.set("status", status);
    if (batch !== "all") query.set("batch", batch);
    if (search.trim()) query.set("search", search.trim());
    const [sortBy, direction] = sort.split("-");
    query.set("sort", sortBy);
    query.set("direction", direction);
    const response = await fetch(`/api/admin/devices?${query}`, {
      cache: "no-store",
    });
    const data = (await response.json()) as {
      devices?: Card[];
      error?: string;
    };
    if (!response.ok) throw new Error(data.error);
    setCards(data.devices || []);
  }, [status, batch, search, sort]);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        Promise.all([loadBatches(), loadCards()])
          .catch((value) => setError(value.message))
          .finally(() => setLoading(false)),
      search ? 250 : 0,
    );
    return () => clearTimeout(timer);
  }, [loadBatches, loadCards, search]);

  async function createBatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError("");
    setSuccess("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/batches", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          productType: form.get("productType"),
          quantity: Number(form.get("quantity")),
          baseUrl: form.get("baseUrl"),
        }),
      });
      const data = (await response.json()) as { batch?: Batch; error?: string };
      if (!response.ok || !data.batch) throw new Error(data.error || "Could not create batch");
      setSuccess(`${data.batch.quantity.toLocaleString()} permanent links created.`);
      setShowBatchForm(false);
      await Promise.all([loadBatches(), loadCards()]);
    } catch (value) {
      setError(value instanceof Error ? value.message : "Could not create batch");
    } finally {
      setCreating(false);
    }
  }

  async function manage(code: string, action: "disable" | "enable" | "unlink") {
    if (action === "unlink" && !confirm(`Unlink ${code} from its owner and remove its destination?`)) return;
    setError("");
    const response = await fetch("/api/admin/devices", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ publicCode: code, action }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) setError(data.error || "Update failed");
    else await Promise.all([loadCards(), loadBatches()]);
  }

  async function programLinks(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!programState) return;
    setProgramming(true);
    setError("");
    setSuccess("");
    const form = new FormData(event.currentTarget);
    const payload = {
      action: "program",
      scope: programState.scope,
      publicCode: programState.publicCode,
      publicCodes: [...selected],
      batchId: form.get("batchId") || programState.batchId,
      destinationType: form.get("destinationType"),
      destinationUrl: form.get("destinationUrl"),
      overwrite: form.get("overwrite") === "on",
    };
    try {
      const response = await fetch("/api/admin/devices", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        updatedCount?: number;
        error?: string;
      };
      if (!response.ok) throw new Error(data.error || "Programming failed");
      setSuccess(`${data.updatedCount || 0} code${data.updatedCount === 1 ? "" : "s"} programmed to the new link.`);
      setProgramState(null);
      setSelected(new Set());
      await Promise.all([loadCards(), loadBatches()]);
    } catch (value) {
      setError(value instanceof Error ? value.message : "Programming failed");
    } finally {
      setProgramming(false);
    }
  }

  function toggleSelected(code: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }
  const allVisibleSelected = cards.length > 0 && cards.every((card) => selected.has(card.publicCode));
  function toggleAllVisible() {
    setSelected((current) => {
      const next = new Set(current);
      if (allVisibleSelected) cards.forEach((card) => next.delete(card.publicCode));
      else cards.forEach((card) => next.add(card.publicCode));
      return next;
    });
  }

  const total = batches.reduce((sum, item) => sum + Number(item.quantity), 0);
  const active = batches.reduce((sum, item) => sum + Number(item.activeCount), 0);
  const ready = Math.max(0, total - active);
  const activationRate = total ? Math.round((active / total) * 100) : 0;
  const totalScans = cards.reduce((sum, item) => sum + Number(item.scanCount), 0);
  const programTitle = useMemo(() => {
    if (!programState) return "";
    if (programState.scope === "single") return `Program ${programState.publicCode}`;
    if (programState.scope === "selected") return `Program ${selected.size} selected code${selected.size === 1 ? "" : "s"}`;
    return "Program an entire batch";
  }, [programState, selected.size]);

  return (
    <main className="admin-portal">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">
          <BrandLogo />
          <div>
            <small>Control center</small>
          </div>
        </Link>
        <nav aria-label="Admin navigation">
          <span>Workspace</span>
          <a className="active" href="#overview">
            <LayoutDashboard />
            Overview
            <i />
          </a>
          <a href="#inventory">
            <QrCode />
            QR & NFC inventory
          </a>
          <a href="#batches">
            <Boxes />
            Production batches
          </a>
          <span>Shortcuts</span>
          <Link href="/dashboard">
            <ExternalLink />
            Customer dashboard
          </Link>
          <Link href="/">
            <Radio />
            View storefront
          </Link>
        </nav>
        <div className="admin-sidebar-card">
          <Sparkles />
          <strong>Everything is live</strong>
          <p>Permanent links are resolving normally.</p>
          <span>
            <i /> Systems operational
          </span>
        </div>
        <div className="admin-profile">
          <span>{adminEmail.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>Administrator</strong>
            <small>{adminEmail}</small>
          </div>
          <LogOut />
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-mobile-bar">
          <Link className="admin-brand" href="/">
            <BrandLogo />
            <strong>Admin</strong>
          </Link>
          <span>Secure workspace</span>
        </header>
        <div className="admin-canvas">
          <section className="admin-welcome" id="overview">
            <div>
              <span className="admin-eyebrow">
                <i /> LIVE OPERATIONS
              </span>
              <h1>
                Your product network,
                <br />
                <em>beautifully under control.</em>
              </h1>
              <p>Generate, activate, and manage every physical NFCPlate product from one secure workspace.</p>
            </div>
            <div className="admin-welcome-actions">
              <button className="admin-primary-action" onClick={() => setShowBatchForm(true)}>
                <Plus /> New production batch
              </button>
              <button
                className="admin-secondary-action"
                onClick={() =>
                  setProgramState({
                    scope: "batch",
                    batchId: batch !== "all" ? batch : undefined,
                  })
                }
              >
                <Link2 /> Program links
              </button>
            </div>
            <div className="admin-signal-art" aria-hidden="true">
              <span />
              <span />
              <span />
              <Radio />
            </div>
          </section>

          {(error || success) && (
            <div className={`admin-toast ${error ? "error" : "success"}`}>
              {error ? <CircleHelp /> : <Check />}
              <span>
                <strong>{error ? "Something needs attention" : "Update complete"}</strong>
                {error || success}
              </span>
              <button
                onClick={() => {
                  setError("");
                  setSuccess("");
                }}
                aria-label="Dismiss message"
              >
                <X />
              </button>
            </div>
          )}

          <section className="admin-metrics" aria-label="Inventory overview">
            <article className="metric-primary">
              <div>
                <span>Permanent links</span>
                <strong>{total.toLocaleString()}</strong>
                <small>
                  Across {batches.length} production batch
                  {batches.length === 1 ? "" : "es"}
                </small>
              </div>
              <span className="metric-icon">
                <Layers3 />
              </span>
            </article>
            <article>
              <div>
                <span>Live products</span>
                <strong>{active.toLocaleString()}</strong>
                <small>
                  <i className="trend-dot" /> {activationRate}% activation rate
                </small>
              </div>
              <span className="metric-icon green">
                <ShieldCheck />
              </span>
            </article>
            <article>
              <div>
                <span>Ready to activate</span>
                <strong>{ready.toLocaleString()}</strong>
                <small>Factory-programmed inventory</small>
              </div>
              <span className="metric-icon violet">
                <QrCode />
              </span>
            </article>
            <article>
              <div>
                <span>Recorded scans</span>
                <strong>{totalScans.toLocaleString()}</strong>
                <small>In current filtered view</small>
              </div>
              <span className="metric-icon amber">
                <Activity />
              </span>
            </article>
          </section>

          <section className="admin-section" id="batches">
            <div className="admin-section-title">
              <div>
                <span>Production</span>
                <h2>Recent batches</h2>
                <p>Generate secure products and hand factory-ready files directly to production.</p>
              </div>
              <button onClick={() => setShowBatchForm(true)}>
                <PackagePlus /> Create batch
              </button>
            </div>
            <div className="admin-batch-layout">
              <article className="batch-feature-card">
                <div className="batch-feature-top">
                  <span>
                    <KeyRound />
                  </span>
                  <small>SECURE CODE ENGINE</small>
                </div>
                <h3>
                  Ready for your next
                  <br />
                  factory order.
                </h3>
                <p>Create up to 5,000 collision-checked QR and NFC links in seconds.</p>
                <button onClick={() => setShowBatchForm(true)}>
                  Generate a batch <ChevronRight />
                </button>
                <div className="batch-code-preview">
                  <span>7KQ</span>
                  <i /> <span>9MR</span>
                </div>
              </article>
              <section className="admin-panel batch-list-modern">
                <header>
                  <div>
                    <strong>Production history</strong>
                    <small>Latest factory batches</small>
                  </div>
                  <CalendarDays />
                </header>
                {loading ? (
                  <div className="admin-empty">
                    <LoaderCircle className="spin" />
                    <span>Loading batches…</span>
                  </div>
                ) : !batches.length ? (
                  <div className="admin-empty">
                    <Boxes />
                    <strong>No batches yet</strong>
                    <span>Your first production run will appear here.</span>
                  </div>
                ) : (
                  <div className="batch-modern-table">
                    {batches.slice(0, 6).map((item) => {
                      const progress = item.quantity ? Math.round((Number(item.activeCount) / Number(item.quantity)) * 100) : 0;
                      return (
                        <article key={item.id}>
                          <span className="batch-type-icon">
                            <QrCode />
                          </span>
                          <div className="batch-identity">
                            <strong>{item.name}</strong>
                            <span>
                              {item.productType} ·{" "}
                              {new Date(item.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="batch-progress">
                            <span>
                              <i style={{ width: `${progress}%` }} />
                            </span>
                            <small>
                              {Number(item.activeCount).toLocaleString()} / {Number(item.quantity).toLocaleString()} active
                            </small>
                          </div>
                          <a href={`/api/admin/batches/${item.id}/export`} title="Download factory CSV">
                            <Download />
                            <span>CSV</span>
                          </a>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </section>

          <section className="admin-panel inventory-panel" id="inventory">
            <div className="inventory-heading">
              <div>
                <span>Device inventory</span>
                <h2>Manage codes</h2>
                <p>{loading ? "Loading secure inventory…" : `${cards.length.toLocaleString()} matching product${cards.length === 1 ? "" : "s"}`}</p>
              </div>
              <div className="inventory-actions">
                <button
                  onClick={() =>
                    setProgramState({
                      scope: "batch",
                      batchId: batch !== "all" ? batch : undefined,
                    })
                  }
                >
                  <Link2 /> Program batch
                </button>
                {selected.size > 0 && (
                  <button className="selected-action" onClick={() => setProgramState({ scope: "selected" })}>
                    <Check /> Program selected <b>{selected.size}</b>
                  </button>
                )}
              </div>
            </div>

            <div className="inventory-toolbar">
              <label className="inventory-search">
                <Search />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a code or customer email…" />
                <kbd>⌘ K</kbd>
              </label>
              <div className="inventory-selects">
                <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
                  <option value="all">All statuses</option>
                  <option value="unused">Ready to activate</option>
                  <option value="active">Live products</option>
                  <option value="disabled">Disabled</option>
                </select>
                <select value={batch} onChange={(e) => setBatch(e.target.value)} aria-label="Filter batch">
                  <option value="all">All batches</option>
                  {batches.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort codes">
                  <option value="created-desc">Newest first</option>
                  <option value="created-asc">Oldest first</option>
                  <option value="batch-asc">Batch A–Z</option>
                  <option value="batch-desc">Batch Z–A</option>
                </select>
                <button className="filter-icon" aria-label="Current filters">
                  <Settings2 />
                </button>
              </div>
            </div>

            {programState && (
              <form className="program-drawer" onSubmit={programLinks}>
                <header>
                  <span>
                    <Link2 />
                  </span>
                  <div>
                    <strong>{programTitle}</strong>
                    <small>Point physical products to one destination.</small>
                  </div>
                  <button type="button" onClick={() => setProgramState(null)} aria-label="Close programming form">
                    <X />
                  </button>
                </header>
                {programState.scope === "batch" && (
                  <label>
                    Production batch
                    <select name="batchId" defaultValue={programState.batchId || ""} required>
                      <option value="" disabled>
                        Choose a batch
                      </option>
                      {batches.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name} ({item.quantity})
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="program-grid">
                  <label>
                    Destination type
                    <select name="destinationType">
                      {destinationOptions.map(([value, label]) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Destination URL
                    <input name="destinationUrl" type="url" placeholder="https://..." required />
                  </label>
                </div>
                <label className="program-overwrite">
                  <input name="overwrite" type="checkbox" />
                  <span>
                    <strong>Overwrite programmed links</strong>
                    <small>Keep this off to protect links already assigned to customers.</small>
                  </span>
                </label>
                <button className="admin-primary-action" disabled={programming}>
                  {programming ? <LoaderCircle className="spin" /> : <Radio />}
                  {programming ? "Programming links…" : "Confirm programming"}
                </button>
              </form>
            )}

            <div className="inventory-table">
              <table>
                <thead>
                  <tr>
                    <th className="check-cell">
                      <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} aria-label="Select all visible codes" />
                    </th>
                    <th>Product code</th>
                    <th>Production batch</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Owner & destination</th>
                    <th>Scans</th>
                    <th>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.id} className={selected.has(card.publicCode) ? "selected-row" : ""}>
                      <td className="check-cell">
                        <input type="checkbox" checked={selected.has(card.publicCode)} onChange={() => toggleSelected(card.publicCode)} aria-label={`Select ${card.publicCode}`} />
                      </td>
                      <td data-label="Code">
                        <div className="code-cell">
                          <span>
                            <QrCode />
                          </span>
                          <div>
                            <strong>{card.publicCode}</strong>
                            <small>{card.productType}</small>
                          </div>
                        </div>
                      </td>
                      <td data-label="Batch">
                        <strong className="table-main">{card.batchName}</strong>
                      </td>
                      <td data-label="Created">
                        <span className="table-muted">{new Date(card.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                      </td>
                      <td data-label="Status">
                        <span className={`status-chip ${card.status}`}>
                          <i />
                          {card.status === "unused" ? "ready" : card.status}
                        </span>
                      </td>
                      <td data-label="Destination">
                        {card.destinationUrl ? (
                          <div className="destination-cell">
                            {card.ownerEmail && <strong>{card.ownerEmail}</strong>}
                            <a href={card.destinationUrl} target="_blank" rel="noreferrer">
                              {card.destinationUrl}
                              <ExternalLink />
                            </a>
                          </div>
                        ) : (
                          <span className="waiting-cell">Not programmed</span>
                        )}
                      </td>
                      <td data-label="Scans">
                        <strong className="scan-count">{Number(card.scanCount).toLocaleString()}</strong>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            onClick={() =>
                              setProgramState({
                                scope: "single",
                                publicCode: card.publicCode,
                              })
                            }
                            title="Program destination"
                            aria-label={`Program ${card.publicCode}`}
                          >
                            <Link2 />
                          </button>
                          {card.status === "disabled" ? (
                            <button onClick={() => manage(card.publicCode, "enable")} title="Enable product" aria-label={`Enable ${card.publicCode}`}>
                              <RotateCcw />
                            </button>
                          ) : (
                            <button onClick={() => manage(card.publicCode, "disable")} title="Disable product" aria-label={`Disable ${card.publicCode}`}>
                              <Ban />
                            </button>
                          )}
                          {(card.ownerEmail || card.destinationUrl) && (
                            <button onClick={() => manage(card.publicCode, "unlink")} title="Unlink owner and clear destination" aria-label={`Unlink ${card.publicCode}`}>
                              <Link2Off />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!cards.length && !loading && (
                <div className="admin-empty inventory-empty">
                  <Search />
                  <strong>No products match</strong>
                  <span>Try changing your search or filters.</span>
                </div>
              )}
            </div>
          </section>
          <footer className="admin-footer">
            <span>
              <ShieldCheck /> Secured admin workspace
            </span>
            <p>NFCPlate Product Network · {new Date().getFullYear()}</p>
          </footer>
        </div>
      </section>

      {showBatchForm && (
        <div className="admin-modal-backdrop" onMouseDown={() => !creating && setShowBatchForm(false)}>
          <form className="admin-modal" onSubmit={createBatch} onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <span>
                <PackagePlus />
              </span>
              <div>
                <small>NEW PRODUCTION RUN</small>
                <h2>Create a secure batch</h2>
                <p>Generate permanent product links for your factory order.</p>
              </div>
              <button type="button" onClick={() => setShowBatchForm(false)} aria-label="Close batch form">
                <X />
              </button>
            </header>
            <label>
              Batch name
              <input name="name" required placeholder="500 counter stands — August order" />
            </label>
            <div className="modal-field-grid">
              <label>
                Product type
                <select name="productType">
                  <option value="stand">Stand</option>
                  <option value="card">Card</option>
                  <option value="sticker">Sticker</option>
                  <option value="plate">Plate</option>
                  <option value="bundle">Bundle</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Quantity
                <input name="quantity" type="number" min="1" max="5000" defaultValue="500" required />
              </label>
            </div>
            <label>
              Permanent domain
              <input name="baseUrl" type="url" defaultValue="https://nfcplate.com" required />
              <small>This is permanently encoded into every QR and NFC product.</small>
            </label>
            <div className="modal-security">
              <KeyRound />
              <span>
                <strong>Collision-protected generation</strong>
                <small>Every readable XXX-XXX code is random, unique, and checked before creation.</small>
              </span>
            </div>
            <footer>
              <button type="button" className="modal-cancel" onClick={() => setShowBatchForm(false)}>
                Cancel
              </button>
              <button className="admin-primary-action" disabled={creating}>
                {creating ? <LoaderCircle className="spin" /> : <Plus />}
                {creating ? "Creating secure links…" : "Create production batch"}
              </button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}
