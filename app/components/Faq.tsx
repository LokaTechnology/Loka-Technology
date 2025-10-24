// app/components/LockerInfo.tsx
// No "use client" needed

export default function LockerInfo() {
    return (
      <section className="relative group my-6 p-4 border rounded-lg bg-gray-100 w-full max-w-2xl">
        <div className="cursor-default">
          <h2 className="text-lg font-semibold">What fits in a locker?</h2>
          <p className="text-sm text-gray-600">(Hover to see details)</p>
        </div>
        <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded shadow-lg p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-10">
          <p className="mb-2">We offer three common sizes on campus:</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>
              <strong>Small</strong> — 12” × 15” × 18” (30 × 38 × 46 cm): laptop, <strong>backpack</strong>, lab kit.
            </li>
            <li>
              <strong>Medium</strong> — 15” × 18” × 24” (38 × 46 × 61 cm): <strong>large backpack</strong>, gym bag, books.
            </li>
            <li>
              <strong>Large</strong> — 18” × 22” × 34” (46 × 56 × 86 cm): <strong>duffel</strong>, carry-on, skateboard.
            </li>
          </ul>
        </div>
      </section>
    );
  }
  