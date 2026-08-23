import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Nfc, Check, Loader as Loader2, ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { supabase } from "../lib/supabase";

export function ActivatePage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [label, setLabel] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");

  useEffect(() => {
    document.title = "Activate your NFCPlate | NFCPlate";
  }, []);

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    if (!code) return;
    setStatus("loading");
    setError("");
    try {
      const { error: err } = await supabase
        .from("devices")
        .upsert({
          code,
          label: label || "My NFCPlate",
          destination_url: destinationUrl,
          activated_at: new Date().toISOString(),
        });
      if (err) throw err;
      setStatus("success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setStatus("error");
      setError("Could not activate your device. Please try again.");
    }
  }

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <section style={{ padding: "50px 0 80px", minHeight: "70vh" }}>
        <div className="shell" style={{ maxWidth: 560 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#536177", marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 28px 80px rgba(25,55,96,0.14)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #0a1731, #265ece)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <Nfc size={28} />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.05em", textAlign: "center", margin: "0 0 8px" }}>
              Activate your NFCPlate
            </h1>
            <p style={{ textAlign: "center", color: "#6b788b", fontSize: 14, marginBottom: 28 }}>
              Enter the destination URL for code <strong>{code}</strong>
            </p>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Check size={28} />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Activated!</h2>
                <p style={{ color: "#536177", fontSize: 14 }}>Redirecting to your dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleActivate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-group">
                  <label htmlFor="label">Device label (optional)</label>
                  <input
                    id="label"
                    placeholder="e.g. Front counter stand"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="url">Destination URL</label>
                  <input
                    id="url"
                    type="url"
                    required
                    placeholder="https://google.com/maps/your-business"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                  />
                </div>
                {status === "error" && (
                  <p style={{ color: "#e74c3c", fontSize: 13 }}>{error}</p>
                )}
                <button
                  type="submit"
                  className="checkout-place-btn"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="spin" /> Activating...
                    </>
                  ) : (
                    "Activate device"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
