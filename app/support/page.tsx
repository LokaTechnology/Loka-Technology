
import Link from "next/link";

export const metadata = {
    title: "Support | Loka Technology",
    description: "Get help with Loka lockers, account access, maintenance, and supplier information.",
};

export default function SupportPage() {
    return (
        <main>
            {/* Hero */}
            <section className="section">
                <div className="container">
                    <span className="kicker">Support Center</span>
                    <h1>We’re here to help</h1>
                    <p className="text-muted" style={{ maxWidth: 760 }}>
                        Find answers fast, contact our team, or review details about our manufacturing partner.
                        If you’re on campus and need immediate assistance for a locker, call the number below.
                    </p>

                    {/* Quick actions */}
                    <div className="tile-row" style={{ marginTop: 14 }}>
                        <Link href="/book" className="tile" aria-label="Book a locker">
                            <span className="tile-icon">🔒</span>
                            <span className="tile-title">Book a Locker</span>
                        </Link>
                        <Link href="/account" className="tile" aria-label="Manage your account">
                            <span className="tile-icon">👤</span>
                            <span className="tile-title">Manage Account</span>
                        </Link>
                        <Link href="/support#faqs" className="tile" aria-label="View FAQs">
                            <span className="tile-icon">❓</span>
                            <span className="tile-title">FAQs</span>
                        </Link>
                        <a href="#contact" className="tile" aria-label="Contact support">
                            <span className="tile-icon">💬</span>
                            <span className="tile-title">Contact Support</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Search bar */}
            <section className="section" style={{ paddingTop: 10 }}>
                <div className="container">
                    <div className="card">
                        <label htmlFor="support-search" className="label">Search support</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔎</span>
                            <input
                                id="support-search"
                                className="form-input input-with-icon-control"
                                placeholder="Type a question: access code not working, plan changes, locker issue…"
                                aria-label="Search support articles"
                            />
                        </div>
                        <p className="hint" style={{ marginTop: 8 }}>
                            Tip: Try “plan change” or “locker won’t open”.
                        </p>
                    </div>
                </div>
            </section>

            {/* Two-column body */}
            <section className="section">
                <div className="container support-grid">
                    {/* Left rail */}
                    <div className="grid-2">
                        {/* Supplier spotlight */}
                        <div className="card">
                            <span className="kicker">Supplier Spotlight</span>
                            <h2>American Lockers (Manufacturing Partner)</h2>
                            <p className="subtle" style={{ marginBottom: 10 }}>
                                Loka Technology works with American Lockers as our preferred locker manufacturing partner.
                                Together, we focus on durability, safety, and a great experience for students and staff.
                            </p>
                            <ul className="feature-list">
                                <li>Commercial-grade steel construction and modular layouts</li>
                                <li>Multiple door sizes to support small, medium, and large storage</li>
                                <li>Clean installation profile for campus environments</li>
                                <li>Compatible with our smart controller and software</li>
                            </ul>

                            <hr style={{ margin: "14px 0" }} />

                            <div className="note-callout" role="note" aria-label="Supplier note">
                                <span>ℹ️</span>
                                <div>
                                    <strong>Transparency:</strong> Loka supplies the software, access control, and support.
                                    American Lockers provides locker hardware. For on-site warranty/parts, contact Loka first—
                                    we’ll coordinate everything end-to-end.
                                </div>
                            </div>
                        </div>

                        {/* Troubleshooting */}
                        <div className="card">
                            <span className="kicker">Troubleshooting</span>
                            <h2>Common fixes</h2>
                            <div style={{ display: "grid", gap: 10 }}>
                                <div className="summary-row">
                                    <div><strong>Door won’t open</strong><div className="subtle">Check your code, Bluetooth, or tap again after 3 seconds</div></div>
                                    <Link href="#contact" className="cta-muted">Get help</Link>
                                </div>
                                <div className="summary-row">
                                    <div><strong>Wrong plan or size</strong><div className="subtle">Swap plans based on availability and campus policy</div></div>
                                    <Link href="/account" className="cta-muted">Manage</Link>
                                </div>
                                <div className="summary-row">
                                    <div><strong>Checkout issue</strong><div className="subtle">Retry booking and contact support if the issue continues</div></div>
                                    <Link href="#contact" className="cta-muted">Contact</Link>
                                </div>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div id="faqs" className="card">
                            <span className="kicker">FAQ</span>
                            <h2>Frequently asked</h2>
                            <div className="accordion">
                                <details className="faq-item">
                                    <summary className="faq-q">How do I get into my locker?</summary>
                                    <div className="faq-a open">
                                        <p>Use the code in your booking confirmation or sign in and tap <em>Open Locker</em>. If it fails, wait 3 seconds and try again.</p>
                                    </div>
                                </details>
                                <details className="faq-item">
                                    <summary className="faq-q">Can I switch sizes later?</summary>
                                    <div className="faq-a open">
                                        <p>Yes—subject to availability. Visit <Link href="/account" className="underlinedText">Account → Reservations</Link> to request a size change.</p>
                                    </div>
                                </details>
                                <details className="faq-item">
                                    <summary className="faq-q">What’s covered under hardware support?</summary>
                                    <div className="faq-a open">
                                        <p>Manufacturer defects and normal wear items are supported. Start with Loka Support and we’ll coordinate hardware service with our supplier.</p>
                                    </div>
                                </details>
                                <details className="faq-item">
                                    <summary className="faq-q">How do policy exceptions work?</summary>
                                    <div className="faq-a open">
                                        <p>Exceptions are handled according to campus policy. Contact support with your booking ID and issue details.</p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Right rail */}
                    <aside>
                        {/* Contact card */}
                        <div id="contact" className="card" style={{ marginBottom: 16 }}>
                            <span className="kicker">Contact</span>
                            <h3>Talk to a human</h3>
                            <div className="contact-block" style={{ marginTop: 8 }}>
                                <span>📞</span>
                                <div>
                                    <div className="phone">Campus Support: 619-616-6828</div>
                                    <div className="subtle">Mon–Fri 8am–6pm (AZ)</div>
                                </div>
                            </div>
                            <div className="contact-block">
                                <span>✉️</span>
                                <div>
                                    <a className="underlinedText" href="mailto:support@lokatechnology.com">support@lokatechnology.com</a>
                                    <div className="subtle">We reply within one business day</div>
                                </div>
                            </div>
                            <div className="contact-block">
                                <span>🛠️</span>
                                <div>
                                    <span>Field Service &amp; Repairs</span>
                                    <div className="subtle">We’ll schedule on-site work and coordinate parts with our supplier</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                                <a href="/status" className="btn btn-outline">System status</a>
                                <a href="tel:619-616-6828" className="btn btn-primary">Call now</a>
                            </div>
                        </div>

                        {/* Policies */}
                        <div className="card">
                            <span className="kicker">Policies</span>
                            <ul className="feature-list" style={{ marginTop: 6 }}>
                                <li><a href="/legal/terms" className="underlinedText">Terms of Service</a></li>
                                <li><a href="/legal/privacy" className="underlinedText">Privacy Policy</a></li>
                                <li><a href="/legal/hardware-support" className="underlinedText">Hardware &amp; Support Policy</a></li>
                                <li><a href="/legal/campus-policy" className="underlinedText">Campus Use Policy</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            {/* CTA band */}
            <section className="section" style={{ paddingTop: 8 }}>
                <div className="container">
                    <div className="card" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <div>
                            <h3 style={{ margin: 0 }}>Need urgent help on site?</h3>
                            <p className="subtle" style={{ margin: 0 }}>Call the campus line and we’ll dispatch assistance.</p>
                        </div>
                        <a className="btn btn-green" href="tel:XXXXXXXXXX">Call Campus Support</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
