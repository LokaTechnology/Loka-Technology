
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import Loka1 from "../../public/images/loka.png";
import Loka2 from "../../public/images/loka2.png";
import Loka3 from "../../public/images/loka3.png";
import Loka4 from "../../public/images/loka4.png";
import Location from "../../public/images/locationasu.jpg";
import Loka6 from "../../public/images/customerservice.jpg";
/**
 * WHY US Section for Next.js (App or Pages Router)
 * - TailwindCSS required
 * - Uses your brand palette (green, slate gray, yellow)
 * - Drop-in responsive card grid (desktop: 3 columns, mobile: 1)
 *
 * Usage:
 *   <WhyUs />
 */


const BRAND = {
  green: "#1E7D4B", // doors
  slate: "#2F4F4F", // frame/trim
  yellow: "#FFC606", // accents
};

const items: Array<{
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
  href: Route;
}> = [
  {
    title: "24/7 Access",
    body:
      "Students get secure, always-available access, backed by 24/7 operational monitoring and rapid support response across campus locations.",
    image: Loka1,
    alt: "Phone opening a smart locker at night",
    href: "/access",
  },
  {
    title: "Climate-Controlled Units",
    body:
      "Climate-controlled lockers are supported by preventive maintenance, health checks, and diagnostics to maintain reliable performance over time.",
    image: Loka2,
    alt: "Green climate-controlled locker bank with display",
    href: "/climate-controlled",
  },
  {
    title: "Flexible Rental Options",
    body:
      "Flexible deployment and access policies are configured to campus needs, including authentication options and operational workflows.",
    image: Loka3,
    alt: "Student reserving a locker at a kiosk",
    href: "/pricing",
  },
  {
    title: "Campus‑Friendly Service",
    body:
      "Real-time analytics and reporting provide visibility into usage patterns, helping institutions optimize placement and guide expansion planning.",
    image: Loka4,
    alt: "Campus locker service highlight",
    href: "/pricing",
  },
  {
    title: "Real People, Real Help",
    body:
      "Dedicated support teams coordinate issue response, field service, and operational continuity for students, staff, and administrators.",
    image: Loka6,
    alt: "Tech assisting a student at a locker bank",
    href: "/contact",
  },
  {
    title: "Convenient Locations",
    body:
      "Data-informed location planning helps deploy lockers where demand is highest, with ADA-accessible bays integrated into campus infrastructure.",
    image: Location,
    alt: "Map pins showing on-campus locker spots",
    href: "/locations",
  },
];

export default function WhyUs() {
  return (
    <section
      className="relative w-full py-16"
      style={{
        backgroundImage: `linear-gradient(to right, ${BRAND.green} 0 100%)`,
        backgroundSize: "100% 4px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
      }}
      aria-labelledby="whyus-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="whyus-heading"
          className="mb-10 text-center text-3xl font-semibold tracking-wide"
          style={{ color: BRAND.slate }}
        >
          WHY US
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
              style={{ borderColor: BRAND.slate + "26" }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 border"
                  style={{ borderColor: BRAND.slate + "40" }}
                />
              </div>

              <div className="flex h-full flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold" style={{ color: BRAND.slate }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={card.href}
                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-white transition"
                    style={{ backgroundColor: BRAND.green }}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
