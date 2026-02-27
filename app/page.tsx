
import Link from "next/link";
import Image from "next/image";

import Carousel from "./components/Carousel";
import WhyUs from "./components/Whyus";
import LockerInfo from "./components/Faq";
import PoweredSmartbox from "./components/PoweredSmartbox";

const slides = [
    { src: "/images/loka5.png", alt: "Locker wall — library atrium" },
    { src: "/images/loka3.png", alt: "Student tapping phone to open" },
    { src: "/images/loka2.png", alt: "ADA-height bay near entrance" },
    { src: "/images/loka4.png", alt: "All lockers display" },
];


export default function Home() {
    return (
        <div className="space-y-10" style={{ marginTop: 8 }}>
            {/* HERO SECTION */}
            <section className="container hero-grid py-12">
              {/* LEFT: Text */}
              <div className="space-y-5">
                <h3 className="text-4xl font-bold leading-snug max-w-2xl">
                  Loka Smart Lockers for Modern University Campuses
                </h3>

                <p className="text-muted max-w-2xl">
                  University campuses are facing growing demands for secure, always-available
                  storage and asset control. Loka delivers a modern smart locker system designed
                  specifically for higher education combining secure access, 24/7 availability,
                  and real-time monitoring through a centralized management platform. The result
                  is safer campuses, reduced administrative burden, and greater confidence for
                  students and staff.
                </p>


                <div className="flex gap-3 flex-wrap pt-2">
                                                                        <Link href="/pricing" className="btn btn-primary">
                    Request a Pilot
                  </Link>
                  <Link href="/contact" className="btn btn-outline">
                    Talk to Us
                  </Link>
                </div>

                {/* Smartbox credibility — quieter */}
                <div className="pt-4 max-w-md">
                  <PoweredSmartbox />
                </div>
              </div>

              {/* RIGHT: Image */}
              <div className="hero-image">
                <Image
                  src="/images/loka5.png"
                  alt="Smart locker campus installation"
                  width={1600}
                  height={1000}
                  priority
                  className="rounded-2xl object-cover"
                />
              </div>
            </section>


            {/* ABOUT + IMAGE */}
            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 16px" }}>
                <div className="grid-2">
                    <div>
                        <h2
                            style={{
                                fontFamily: "Georgia, 'Times New Roman', serif",
                                fontWeight: 700,
                                fontSize: 34,
                                lineHeight: 1.2,
                                letterSpacing: ".4px",
                                margin: "0 0 16px",
                            }}
                        >
                            ABOUT US
                        </h2>

                        <h3 style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 16 }}>
                            Mission
                        </h3>
                        <p style={{ color: "#555", margin: "0 0 12px" }}>
                            Make campus storage solutions safe, simple, and secure to enhance student campus experience.
                        </p>

                        <h3 style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 16 }}>
                            What We Do
                        </h3>
                        <p style={{ color: "#555", margin: "0 0 12px" }}>
                            We <strong>customize, install, and operate</strong> smart-lockers tailored to university life.
                            We offer convenience for students and faculty.
                        </p>

                        <h3 style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 16 }}>
                            Made By Students, For Students
                        </h3>
                        <p style={{ color: "#555", margin: "0 0 12px" }}>
                            Built by University Alumni (ASU) and shaped by real campus routines. Students unlock with{" "}
                            <strong>University ID cards</strong> or <strong>university login via QR code</strong>. The lockers are
                            protected by <strong>encrypted access, steel construction, CCTV</strong>, and{" "}
                            <strong>tamper alerts</strong> with privacy in mind. By reducing "where do I stash this?" stress,
                            students <strong>engage more safely and confidently</strong> in clubs, labs, classes, and campus events.
                        </p>

                        <h3 style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 16 }}>
                            Sustainability
                        </h3>
                        <p style={{ color: "#555", margin: 0 }}>
                            Our lockers use durable, recyclable metals with <strong>low-VOC, powder-coat finishes</strong> and{" "}
                            <strong>modular, repairable parts</strong>. <strong>Energy-efficient controllers</strong> and sleep modes
                            reduce power draw; consolidated hand-offs (bookstore/IT, after-hours pickup) help cut repeat delivery
                            trips. At end-of-life we support responsible recycling and parts recovery with clear documentation for
                            facilities teams.
                        </p>
                    </div>

                    <figure
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "4 / 3",
                            border: "1px solid #d6d6d6",
                            borderRadius: 12,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="/images/loka.png"
                            alt="Loka smart lockers on campus"
                            fill
                            priority
                            style={{ objectFit: "cover" }}
                        />
                    </figure>
                </div>
            </section>

            {/* TOUR / CAROUSEL */}
            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 16px" }}>
                <h2>
                    See Our Smart Lockers in Action on Campus
                </h2>
                <div style={{ marginTop: 12 }}>
                    <Carousel slides={slides} aspect="16 / 9" autoMs={5000} />
                </div>
            </section>

            {/* WHY US */}
            <section>
                <WhyUs />
            </section>

            {/* FAQ */}
            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "20px 16px" }}>
                <div>
                    <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    <p>
                        Please reach us at{" "}
                        <a href="mailto:aj3brac@gmail.com" className="underlinedText">
                            aj3brac@gmail.com
                        </a>{" "}
                        if you cannot find an answer to your question.
                    </p>
                </div>
            </section>

            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "20px 20px" }}>
                <div>
                    <h3>What is the minimum rental period for a unit?</h3>
                    <p>There is no minimum rental period. Users can store items for as long as needed, but usage under one hour is billed as one full hour.</p>
                </div>
            </section>

            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "10px 20px" }}>
                <LockerInfo />
            </section>

            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "20px 20px" }}>
                <div>
                    <h3>Do you offer any discounts for long-term rentals?</h3>
                    <p>Our ideal contract term is long-term (5+ years), but we’re open to other options based on campus needs.</p>
                </div>
            </section>

            <section style={{ maxWidth: 1140, margin: "0 auto", padding: "20px 20px" }}>
                <div>
                    <h3>Are there any limits or items I can store?</h3>
                    <p>
                        Max item weight <strong>40 lbs (18 kg)</strong> per locker. For safety and policy compliance, no food that
                        requires refrigeration, liquids that can spill, cash/IDs, hazardous/flammable materials, weapons, illegal
                        substances, or living things.
                    </p>
                </div>
            </section>
        </div>
    );
}