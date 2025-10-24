// app/page.tsx — Loka Tech Home Page (Next.js App Router + Tailwind)
// Drop this file into your Next.js project at /app/page.tsx
// Replace SOCIAL_URL_* values with your real links.

import Link from "next/link";
import Image from "next/image";
import lockerImg from "public/images /loka5.png";
import lockerimg1 from "public/images /loka3.png";
import lockerImg2 from "public/images /loka.png";
import lokaImg from "public/images /loka2.png"
import loka from "public/images /loka4.png";
import Carousel from "./components/Carousel";
import WhyUs from "./components/Whyus";
import LockerInfo from "./components/Faq";

const slides = [
  { src: lockerImg, alt: "Locker wall — library atrium" },
  { src: lockerimg1, alt: "Student tapping phone to open" },
  { src: lokaImg, alt: "ADA-height bay near entrance" },
  {src: loka, alt: "all lockers display"},

];

export default function Home() {

  return (
    <div className="space-y-10" style={{marginTop:"8px"}}>
      <section style={{
    display: "grid",
    gridTemplateColumns: "1.05fr .95fr",
    gap: 24,
    alignItems: "start",
    marginTop: 8
  }}>
  <div className="card" style={{ padding: 0, overflow: "hidden" }}>
    <Image
      src={loka}
      alt="Smart locker"
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  </div>

  <div style={{ alignSelf: "start", padding: "4px 4px 0" }}>
    <h1 style={{ margin: "0 0 60px" }}>
      SMART CAMPUS LOCKERS. SAFETY &amp; CONVENIENCE
    </h1>

    <h3 className="text-muted" style={{ maxWidth: 700, margin: "0 0 10px" }}>
      We design, install, and manage secure smart lockers so students and faculty save time.
    </h3>

    <div style={{ display: "flex", flexWrap: "wrap", gap: 30, margin: "0 0 20px" }}>
      <Link href="/book" className="btn btn-primary">Book a Locker Today</Link>
      <Link href="/partner" className="btn btn-outline">Partner With Us</Link>
    </div>
  </div>
</section>
<section style={{maxWidth: "1140px", margin: "0 auto", padding: "40px 16px"}}>
  <div style={{display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24, alignItems: "start"}}>
    <div>
      <h2 style={{fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: 34, lineHeight: 1.2, letterSpacing: ".4px", margin: "0 0 16px"}}>
        ABOUT US
      </h2>

      <h3 style={{margin: "14px 0 4px", fontWeight: 700, fontSize: 16}}>Mission</h3>
      <p style={{color: "#555", margin: "0 0 12px"}}>
        Make campus storage solutions safe, simple, and secure to enhance student campus experience.
      </p>

      <h3 style={{margin: "14px 0 4px", fontWeight: 700, fontSize: 16}}>What We Do</h3>
      <p style={{color: "#555", margin: "0 0 12px"}}>
        We <strong>customize, install, and operate</strong> smart-lockers tailored to university life. We offer convenience for students and faculty.
      </p>

      <h3 style={{margin: "14px 0 4px", fontWeight: 700, fontSize: 16}}>Made By Students, For Students</h3>
      <p style={{color: "#555", margin: "0 0 12px"}}>
        Built at by University Alumni (ASU) and shaped by real campus routines. Students unlock with <strong>University ID cards</strong> or
        <strong> university login via QR code</strong>. The lockers are protected by <strong>encrypted access, steel construction, CCTV,</strong> and
        <strong> tamper alerts</strong> with privacy in mind. By reducing “where do I stash this?” stress, students
        <strong> engage more safely and confidently</strong> in clubs, labs, classes, and campus events.
      </p>

      <h3 style={{margin: "14px 0 4px", fontWeight: 700, fontSize: 16}}>Sustainability</h3>
      <p style={{color: "#555", margin: 0}}>
        Our lockers use durable, recyclable metals with <strong>low-VOC, powder-coat finishes</strong> and <strong>modular, repairable parts</strong>.
        <strong> Energy-efficient controllers</strong> and sleep modes reduce power draw; (bookstore/IT hand-offs, after-hours pickup) helps cut repeat delivery trips. At end-of-life, 
        we support responsible recycling and parts recovery with clear documentation for facilities teams.
        Why this stands out: many vendors highlight “steel = durable.” We go further with repairability, energy use, and end-of-life—the pieces students and facilities actually ask about. 
        (Industry discussions increasingly connect smart lockers with lower delivery emissions and recyclable construction.)
      </p>
    </div>
   {/* RIGHT: Image fills the column */}
<figure style={{position: "relative",
    width: "100%",
    aspectRatio: "4 / 3",
    border: "1px solid #d6d6d6",
    borderRadius: 12,
    overflow: "hidden",
  }}>
  <Image
    src={lockerImg2}          
    alt="Loka smart lockers on campus"
    fill                    
    priority
    style={{ objectFit: "cover" }}  
  />
</figure>

</div>
</section>
      <section style={{maxWidth: "1140px", margin: "0 auto", padding: "40px 16px"}} >
        <h2>Take a Virtual Tour of Loka Technology Smart Storage Lockers's 
          Top-Notch Self Storage Facility</h2>
          <div style={{ marginTop: 12 }}>
          <Carousel slides={slides} aspect="16 / 9" autoMs={5000} />
      </div>
      </section>
      <section>
        <WhyUs />
      </section>
      <section style={{maxWidth: "1140px", margin: "0 auto", padding: "20px 16px"}}>
        <div>
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          <p >Please reach us at <a href= "mailto:aj3brac@gmail.com" className="underlinedText"> aj3brac@gmail.com </a>if you cannot find an answer to your question. </p>
        </div>
      </section>
      <section style={{maxWidth: "1140px", margin:"10 auto", padding:"20px 20px"}}>
        <div>
          <h3>What is the minimum rental period for a unit?</h3>
          <p>The minimum rental is 1 hour, and we charge by the hour. Time is billed in 1-hour increments.</p>
        </div>
      </section>
      <section style={{maxWidth: "1140px", margin:"10 auto", padding:"10px 20px"}}>
       <LockerInfo/>
      </section>
      <section style={{maxWidth: "1140px", margin:"10 auto", padding:"20px 20px"}}>
        <div>
          <h3>Do you offer any discounts for long-term rentals?</h3>
          <p>Yes, we offer discounts for customers who rent for six months or longer. Please contact our office for more details.</p>
        </div>
      </section>
      <section style={{maxWidth: "1140px", margin:"10 auto", padding:"20px 20px"}}>
        <div>
          <h3>Are there any limits or Items I can Store?</h3>
          <p>Max item weight <strong>40 lbs (18 kg)</strong> per locker. For safety and policy compliance, no food that requires refrigeration, liquids that can spill, cash/IDs, hazardous/flammable materials (including batteries leaking/acid), weapons, illegal substances, or living things. If you’re unsure, check the in-app list before reserving.</p>
        </div>
      </section>
    </div>
  );
}
