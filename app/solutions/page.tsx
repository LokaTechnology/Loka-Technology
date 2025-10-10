import Link from "next/link";

export default function Solutions() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <h1>Solutions</h1>
        <Link href="/partner" className="underline">Looking to collaborate? Partner With Us →</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3>Why Universities Care</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Safer campuses, fewer theft reports</li>
            <li>Usage analytics & uptime reports</li>
            <li>Turn-key install & support</li>
          </ul>
        </div>
        <div className="card">
          <h3>Why Students Care</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Convenient, secure storage</li>
            <li>Fast access with code or ID</li>
            <li>Affordable daily & semester plans</li>
          </ul>
        </div>
        <div className="card">
          <h3>Data / Proof</h3>
          <p className="text-white/80 mt-2">87% don’t feel safe leaving belongings unattended. Mock charts here → swap for pilot data.</p>
        </div>
      </div>
    </div>
  );
}
