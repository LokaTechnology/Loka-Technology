"use client";
import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";

type SlideSrc = string | StaticImageData;
type Slide = { src: SlideSrc; alt?: string; caption?: string };

export default function Carousel({ slides, autoMs = 4500, aspect = "16 / 9", rounded = 12 }:{
  slides: Slide[]; autoMs?: number; aspect?: string; rounded?: number;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  const stop = () => { if (timer.current) clearInterval(timer.current); timer.current = null; };
  const play = () => { stop(); timer.current = window.setInterval(() => setI(n => (n + 1) % slides.length), autoMs); };
  useEffect(() => { play(); return stop; }, [autoMs, slides.length]);

  const toUrl = (src: SlideSrc) => (typeof src === "string" ? src : src.src);

  return (
    <figure
      aria-roledescription="carousel"
      style={{ position: "relative", width: "100%", aspectRatio: aspect, overflow: "hidden",
               borderRadius: rounded, border: "1px solid #e6e6e6", background: "#f7f7f7" }}
      onMouseEnter={stop} onMouseLeave={play}
    >
      <div style={{ height:"100%", display:"flex", transition:"transform .5s ease", transform:`translateX(${-i*100}%)` }}>
        {slides.map((s, idx) => (
          <div key={idx} style={{ minWidth:"100%", height:"100%", position:"relative" }}>
            <img
              src={toUrl(s.src)}
              alt={s.alt || ""}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
              loading={idx === 0 ? "eager" : "lazy"}
              onError={(e) => {
                console.warn("Image failed:", toUrl(s.src));
                e.currentTarget.style.objectFit = "contain";
                e.currentTarget.src =
                  "data:image/svg+xml;charset=utf-8," +
                  encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
                    <rect width='100%' height='100%' fill='#f0f0f0'/>
                    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                      font-family='system-ui' font-size='24' fill='#999'>
                      Image not found
                    </text></svg>`);
              }}
            />
            {s.caption && (
              <figcaption style={{ position:"absolute", left:12, bottom:12, padding:"8px 10px",
                                   background:"rgba(0,0,0,.55)", color:"#fff", borderRadius:8, fontSize:14 }}>
                {s.caption}
              </figcaption>
            )}
          </div>
        ))}
      </div>

      <button aria-label="Previous" onClick={() => setI(n => (n - 1 + slides.length) % slides.length)}
        style={btn("left")}>‹</button>
      <button aria-label="Next" onClick={() => setI(n => (n + 1) % slides.length)}
        style={btn("right")}>›</button>

      <div style={dotsWrap}>
        {slides.map((_, n) => (
          <button key={n} onClick={() => setI(n)}
            style={{ width:9, height:9, borderRadius:999, border:"1px solid #111",
                     background: n===i ? "#111" : "transparent", opacity: n===i ? 1 : .45 }}
            aria-label={`Go to slide ${n+1}`} />
        ))}
      </div>
    </figure>
  );
}
const baseBtn: React.CSSProperties = { position:"absolute", top:"50%", transform:"translateY(-50%)", width:36, height:36,
  borderRadius:999, border:"1px solid #d9d9d9", background:"rgba(255,255,255,.9)", display:"grid", placeItems:"center",
  fontSize:22, lineHeight:1, cursor:"pointer" };
const btn = (side:"left"|"right"): React.CSSProperties => ({ ...baseBtn, [side]: 10 });
const dotsWrap: React.CSSProperties = { position:"absolute", left:0, right:0, bottom:8, display:"flex", gap:8, justifyContent:"center" };
