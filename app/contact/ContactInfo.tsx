const LOKA_PHONE = "619-616-6828";
const LOKA_EMAIL = "aj3brac@gmail.com";
const AMLOCKER_PHONE = "800-000-0000";
const AMLOCKER_EMAIL = "support@americanlocker.example.com";
const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_URL || "/always-on";

export default function ContactInfo() {
  return (
    <div className="info-card">
      <h3 className="info-card-title">Immediate Help (24/7)</h3>

      {/* Urgent help callout */}
      <div className="urgent-callout">
        <div className="urgent-callout-title">
          🚨 Can't access a locker right now? 
        </div>
        <ul>
          <li>If you're at the locker bank: stay nearby so staff can find you</li>
          <li>
            Note the <strong>Locker Bank ID</strong> and{" "}
            <strong>Locker #</strong> (on the door or screen)
          </li>
          <li>Call us, then file the quick report below with the exact unit</li>
        </ul>
      </div>

      {/* Contact info blocks */}
      <div className="contact-info-grid">
        <div className="contact-info-block">
          <div className="contact-info-label">Loka Technology Support</div>
          <div className="contact-info-details">
            Phone:{" "}
            <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`}>
              {LOKA_PHONE}
            </a>
            <br />
            Email:{" "}
            <a href={`mailto:${LOKA_EMAIL}`}>
              {LOKA_EMAIL}
            </a>
          </div>
          <div className="contact-info-note">
            After-hours calls are routed to on-call support
          </div>
        </div>

        <div className="contact-info-block">
          <div className="contact-info-label">American Locker (OEM) Support</div>
          <div className="contact-info-details">
            Phone:{" "}
            <a href={`tel:${AMLOCKER_PHONE.replace(/[^0-9]/g, "")}`}>
              {AMLOCKER_PHONE}
            </a>
            <br />
            Email:{" "}
            <a href={`mailto:${AMLOCKER_EMAIL}`}>
              {AMLOCKER_EMAIL}
            </a>
          </div>
          <div className="contact-info-note">
            Vendor hotline for hardware/firmware escalations
          </div>
        </div>

        <div className="contact-info-block">
          <div className="contact-info-label">System Status</div>
          <a
            href={STATUS_URL}
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 8, width: "100%" }}
          >
            View status & past incidents
          </a>
        </div>
      </div>
    </div>
  );
}