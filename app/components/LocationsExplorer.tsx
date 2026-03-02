
"use client";

import { useEffect, useMemo, useState } from "react";

export type LocationSpot = {
    id: string;
    name: string;
    building: string;
    address: string;
    lat: number;
    lng: number;
    hours: string;
    tags: string[];
    features: { ada: boolean; lighting: "Bright" | "Standard"; power: boolean; indoor: boolean };
    photo?: string;
};

type Props = { locations: LocationSpot[] };

type Filters = {
    query: string;
    adaOnly: boolean;
    nearResidence: boolean;
    nearDining: boolean;
    nearLibrary: boolean;
    indoorOnly: boolean;
};

function haversineMiles(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
    const R = 3958.8;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLon = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const h =
        sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    return 2 * R * Math.asin(Math.sqrt(h));
}

export default function LocationsExplorer({ locations }: Props) {
    const [sel, setSel] = useState<LocationSpot | null>(locations[0] ?? null);
    const [filters, setFilters] = useState<Filters>({
        query: "",
        adaOnly: false,
        nearResidence: false,
        nearDining: false,
        nearLibrary: false,
        indoorOnly: false,
    });

    const [myPos, setMyPos] = useState<{ lat: number; lng: number } | null>(null);
    const [geoErr, setGeoErr] = useState<string | null>(null);
    const [sortByNearest, setSortByNearest] = useState(false);

    function useMyLocation() {
        setGeoErr(null);
        if (!navigator.geolocation) {
            setGeoErr("Geolocation unavailable");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setMyPos({ lat: latitude, lng: longitude });
                setSortByNearest(true);
            },
            (err) => setGeoErr(err.message || "Could not get location"),
            { enableHighAccuracy: true, maximumAge: 20_000, timeout: 10_000 }
        );
    }

    const filtered = useMemo(() => {
        let out = locations.slice();

        if (filters.query.trim()) {
            const q = filters.query.toLowerCase();
            out = out.filter(
                (l) =>
                    l.name.toLowerCase().includes(q) ||
                    l.building.toLowerCase().includes(q) ||
                    l.address.toLowerCase().includes(q)
            );
        }
        if (filters.adaOnly) out = out.filter((l) => l.features.ada);
        if (filters.indoorOnly) out = out.filter((l) => l.features.indoor);
        if (filters.nearResidence) out = out.filter((l) => hasTag(l, "Residence"));
        if (filters.nearDining) out = out.filter((l) => hasTag(l, "Dining"));
        if (filters.nearLibrary) out = out.filter((l) => hasTag(l, "Library"));

        if (sortByNearest && myPos) {
            out.sort(
                (a, b) =>
                    haversineMiles(myPos, { lat: a.lat, lng: a.lng }) -
                    haversineMiles(myPos, { lat: b.lat, lng: b.lng })
            );
        } else {
            out.sort((a, b) => a.name.localeCompare(b.name));
        }

        return out;
    }, [locations, filters, sortByNearest, myPos]);

    useEffect(() => {
        if (filtered.length && !sel) setSel(filtered[0]);
    }, [filtered, sel]);

    return (
        <div className="account-grid">
            {/* LEFT: list + filters */}
            <div className="card" style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "grid", gap: 10 }}>
                    <div className="input-group">
                        <input
                            className="form-input ig-control"
                            placeholder="Search by building or address…"
                            value={filters.query}
                            onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <Toggle
                            label="ADA only"
                            on={filters.adaOnly}
                            set={(v) => setFilters((f) => ({ ...f, adaOnly: v }))}
                        />
                        <Toggle
                            label="Indoor only"
                            on={filters.indoorOnly}
                            set={(v) => setFilters((f) => ({ ...f, indoorOnly: v }))}
                        />
                        <Toggle
                            label="Residence"
                            on={filters.nearResidence}
                            set={(v) => setFilters((f) => ({ ...f, nearResidence: v }))}
                        />
                        <Toggle
                            label="Dining"
                            on={filters.nearDining}
                            set={(v) => setFilters((f) => ({ ...f, nearDining: v }))}
                        />
                        <Toggle
                            label="Library"
                            on={filters.nearLibrary}
                            set={(v) => setFilters((f) => ({ ...f, nearLibrary: v }))}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <button className="btn btn-outline" onClick={useMyLocation}>
                            Use my location
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setSortByNearest((v) => !v)}
                        >
                            {sortByNearest ? "Sort: Nearest" : "Sort: A–Z"}
                        </button>
                        {geoErr && <span className="error">{geoErr}</span>}
                    </div>
                </div>

                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                    {filtered.map((l) => (
                        <li key={l.id}>
                            <article
                                className="card"
                                style={{
                                    padding: 14,
                                    borderColor: sel?.id === l.id ? "var(--brand-green)" : "var(--line)",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSel(l)}
                            >
                                <div style={{ display: "grid", gap: 8 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                                        <div>
                                            <strong>{l.name}</strong>
                                            <div className="text-muted" style={{ fontSize: 14 }}>
                                                {l.building} • {l.address}
                                            </div>
                                        </div>
                                        {myPos && (
                                            <div className="text-muted" style={{ fontSize: 14, whiteSpace: "nowrap" }}>
                                                {haversineMiles(myPos, l).toFixed(2)} mi
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {l.features.ada && <Chip>ADA</Chip>}
                                        {l.features.indoor && <Chip>Indoor</Chip>}
                                        <Chip>{l.features.lighting === "Bright" ? "Brightly lit" : "Standard lighting"}</Chip>
                                        {l.features.power && <Chip>Power nearby</Chip>}
                                        {l.tags.map((t) => (
                                            <Chip key={t}>{t}</Chip>
                                        ))}
                                    </div>

                                    <div className="text-muted" style={{ fontSize: 14 }}>Hours: {l.hours}</div>

                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        <a
                                            className="btn btn-primary"
                                            href={gmapsDirections(l)}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Get Directions
                                        </a>
                                        <a
                                            className="btn btn-outline"
                                            href={appleMaps(l)}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Open in Apple Maps
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                    {!filtered.length && (
                        <li className="text-muted">No locations match your filters.</li>
                    )}
                </ul>
            </div>

            {/* RIGHT: map preview + photo */}
            <div className="stack-col">
                <div className="card account-section" style={{ display: "grid", gap: 12 }}>
                    <h3 style={{ margin: 0 }}>Map Preview</h3>
                    {sel ? (
                        <div style={{ display: "grid", gap: 12 }}>
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "16 / 9",
                                    border: "1px solid var(--line)",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    background: "#fff",
                                }}
                            >
                                <iframe
                                    title={sel.name}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps?q=${sel.lat},${sel.lng}&z=17&output=embed`}
                                />
                            </div>

                            {sel.photo && (
                                <img
                                    src={sel.photo}
                                    alt={sel.name}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 12,
                                        border: "1px solid var(--line)",
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-muted">Select a location to preview the map.</p>
                    )}
                </div>

                <div className="card account-section" style={{ display: "grid", gap: 10 }}>
                    <h3 style={{ margin: 0 }}>Why these spots?</h3>
                    <ul className="feature-list">
                        <li>Near high traffic student zones (residence, dining, libraries, transit)</li>
                        <li>Bright lighting and clear sightlines for safety</li>
                        <li>ADA accessible bays and reach heights</li>
                        <li>Simple directions—one tap to Maps</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function hasTag(l: LocationSpot, tagPrefix: string) {
    return l.tags.some((t) => t.toLowerCase().startsWith(tagPrefix.toLowerCase()));
}

function gmapsDirections(l: LocationSpot) {
    const dst = `${l.lat},${l.lng}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dst)}&destination_place_id=&travelmode=walking`;
}

function appleMaps(l: LocationSpot) {
    return `https://maps.apple.com/?daddr=${encodeURIComponent(`${l.lat},${l.lng}`)}&dirflg=w`;
}

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                fontSize: 12,
                padding: "6px 8px",
                border: "1px solid var(--line)",
                borderRadius: 999,
                background: "#fff",
                color: "var(--fg)",
                whiteSpace: "nowrap",
            }}
        >
      {children}
    </span>
    );
}

function Toggle({
                    label,
                    on,
                    set,
                }: {
    label: string;
    on: boolean;
    set: (v: boolean) => void;
}) {
    return (
        <button
            type="button"
            className={`btn ${on ? "btn-primary" : "btn-outline"}`}
            onClick={() => set(!on)}
            aria-pressed={on}
        >
            {label}
        </button>
    );
}
