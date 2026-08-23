import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nfc, ArrowRight, ExternalLink } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { supabase } from "../lib/supabase";

type Device = {
  id: string;
  code: string;
  label: string;
  destination_url: string;
  activated_at: string;
};

export function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | NFCPlate";
    async function load() {
      try {
        const { data, error } = await supabase
          .from("devices")
          .select("id, code, label, destination_url, activated_at")
          .order("activated_at", { ascending: false });
        if (error) throw error;
        setDevices(data || []);
      } catch {
        // table may not exist yet — show empty state
        setDevices([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <section style={{ padding: "50px 0 80px", minHeight: "60vh" }}>
        <div className="shell">
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.045em", margin: "0 0 30px" }}>
            Your devices
          </h1>
          {loading ? (
            <p style={{ color: "#8a96a8" }}>Loading...</p>
          ) : devices.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                background: "#f7faff",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  background: "#edf4ff",
                  color: "#2a5cd8",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Nfc size={28} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>No devices yet</h2>
              <p style={{ color: "#8a96a8", marginBottom: "24px" }}>
                Activate your NFCPlate product using the code on the packaging.
              </p>
              <Link to="/shop" className="premium-button primary">
                Shop products <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {devices.map((device) => (
                <div
                  key={device.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    background: "#fff",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 16 }}>{device.label || "NFCPlate device"}</strong>
                    <p style={{ fontSize: 12, color: "#8a96a8", margin: "4px 0 0" }}>
                      Code: {device.code} · Activated{" "}
                      {new Date(device.activated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={device.destination_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button secondary"
                    style={{ fontSize: 12 }}
                  >
                    Visit <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
