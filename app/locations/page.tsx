
import type { Metadata } from "next";
import LocationsExplorer, { LocationSpot } from "app/components/LocationsExplorer";

export const metadata: Metadata = {
    title: "Convenient Locations | Loka Technology",
    description:
        "Placed where students already are — near residence halls, libraries, and transit. Brightly lit, ADA accessible bays.",
};

const LOCATIONS: LocationSpot[] = [
    {
        id: "memorial-union-north",
        name: "Memorial Union — North Atrium",
        building: "Student Union",
        address: "301 E Orange St, Tempe, AZ",
        lat: 33.421986,
        lng: -111.93843,
        hours: "6:00am – 12:00am",
        tags: ["Dining", "Transit", "Library Nearby"],
        features: { ada: true, lighting: "Bright", power: true, indoor: true },
        photo: "/images/locations/mu-north.jpg",
    },
    {
        id: "hayden-library-east",
        name: "Hayden Library — East Entrance",
        building: "Hayden Library",
        address: "300 Orange Mall, Tempe, AZ",
        lat: 33.419953,
        lng: -111.93659,
        hours: "24/7 access (ASU ID)",
        tags: ["Library", "Study Areas"],
        features: { ada: true, lighting: "Bright", power: false, indoor: false },
        photo: "/images/locations/hayden-east.jpeg",
    },
    {
        id: "vista-del-sol",
        name: "Vista Del Sol — Leasing Office",
        building: "Residence Halls",
        address: "701 E Apache Blvd, Tempe, AZ",
        lat: 33.41624,
        lng: -111.92964,
        hours: "7:00am – 11:00pm",
        tags: ["Residence", "Dining Nearby"],
        features: { ada: true, lighting: "Bright", power: false, indoor: false },
        photo: "/images/locations/vds.jpeg",
    },
];

export default function LocationsPage() {
    return (
        <section className="section">
            <div className="container">
                <header className="card" style={{ display: "grid", gap: 8 }}>
                    <h1 style={{ margin: 0 }}>Convenient Locations</h1>
                    <p className="text-muted" style={{ margin: 0 }}>
                        Placed where students already are—near residence halls, dining, libraries, and transit.
                        Brightly lit, ADA-accessible bays.
                    </p>
                </header>

                <div style={{ height: 16 }} />

                <LocationsExplorer locations={LOCATIONS} />
            </div>

            {/* Basic JSON-LD for each Place to help SEO */}
            {LOCATIONS.map((loc) => (
                <script
                    key={loc.id}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Place",
                            name: loc.name,
                            address: loc.address,
                            geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
                        }),
                    }}
                />
            ))}
        </section>
    );
}
