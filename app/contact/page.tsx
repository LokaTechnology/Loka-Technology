import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import IssueReportForm from "./IssueReportForm";

const LOKA_PHONE = "619-616-6828";
const LOKA_EMAIL = "aj3brac@gmail.com";

export default function ContactPage() {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-title">CONTACT US</h1>

        <div className="contact-grid">
          {/* Left: Main Contact Form */}
          <ContactForm />

          {/* Right: Support Info & Issue Report */}
          <div className="contact-sidebar">
            <ContactInfo />
            <IssueReportForm />

            {/* Footer help text */}
            <div className="contact-footer-help">
              <p className="contact-footer-help-title">We're here to help!</p>
              <p className="contact-footer-help-text">
                Prefer to call?{" "}
                <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`}>
                  {LOKA_PHONE}
                </a>
                <br />
                Or email us at{" "}
                <a href={`mailto:${LOKA_EMAIL}`}>
                  {LOKA_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}