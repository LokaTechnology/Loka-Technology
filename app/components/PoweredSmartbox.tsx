import Link from "next/link";

export default function PoweredBySmartbox() {
  return (
    <section className="section">
      <div className="container card">
        <h2 className="mt-3">Powered by Smartbox Technology</h2>

        <p className="subtle max-w-2xl">
          Loka lockers are built on Smartbox’s enterprise-grade platform
          trusted globally for secure, high-volume locker deployments
          in education, logistics, and public infrastructure.
        </p>

        <ul className="feature-list mt-4">
          <li>Cloud-based locker management</li>
          <li>Touchscreen & mobile access</li>
          <li>API-ready for campus system integrations</li>
          <li>Proven hardware with anti-tamper sensors</li>
        </ul>
        <div style={{ marginTop: 16 }}>
                  <Link
                    href="https://www.smartboxlockers.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-muted"
                  >
                    Learn more about Smartbox Technology →
                  </Link>
                </div>
      </div>
    </section>
  );
}
