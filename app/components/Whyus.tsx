
import Image from "next/image";
import Link from "next/link";

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

const items = [
  {
    title: "24/7 Access",
    body:
      "Our lockers work on your schedule—before class, after practice, or 2 AM study runs. Tap your Sun Card or scan a code for instant, contactless access.",
    image: "/images/loka4.png",
    alt: "Phone opening a smart locker at night",
    href: "/book",
  },
  {
    title: "Climate-Controlled Units",
    body:
      "Keep laptops, lab kits, meds, and packages safe from Arizona heat. Monitored lockers maintain a stable temperature.",
    image: "/images/loka2.png",
    alt: "Green climate-controlled locker bank with display",
    href: "/solutions/climate",
  },
  {
    title: "Flexible Rental Options",
    body:
      "Pay only for what you need: hourly, daily, or monthly. Reserve online or at the kiosk, extend with a tap, cancel anytime—no hidden fees.",
    image: "/images/loka4.png",
    alt: "Student reserving a locker at a kiosk",
    href: "/pricing",
  },
  {
    title: "Student‑Friendly Prices",
    body:
      "Affordable storage without compromise. Transparent pricing and bundle discounts for student orgs and teams.",
    image: "/images/loka4.png",
    alt: "Best price ribbon over green background",
    href: "/pricing",
  },
  {
    title: "Real People, Real Help",
    body:
      "Campus-based support 7 days a week: in‑app chat, quick phone response, and on‑site techs during peak move‑in/out.",
    image: "/images/loka4.png",
    alt: "Tech assisting a student at a locker bank",
    href: "/contact",
  },
  {
    title: "Convenient Locations",
    body:
      "Placed where students already are—near residence halls, dining, libraries, and transit. Brightly lit, ADA‑accessible bays.",
    image: "/images/loka4.png",
    alt: "Map pins showing on-campus locker spots",
    href: "/locations",
  },
];

export default function WhyUs() {
  return (
    <section
      className="relative w-full py-16"
      style={{
        // thin top accent bar using brand green
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
