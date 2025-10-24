export default function PaymentServices() {
  return (
    <div className="space-y-8">
      <h1>Pricing</h1>
      <p className="text-white/80">
        Simple pricing. Fast checkout. Secure storage. Book a locker, pay your way, and get a one-time access code in seconds—no keys, no hassle.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3>Student Pricing</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li><strong>Small</strong>: $X/hr · $Y daily cap</li>
            <li><strong>Medium</strong>: $X/hr · $Y daily cap</li>
            <li><strong>Large</strong>: $X/hr · $Y daily cap</li>
            <li>Semester plans available</li>
          </ul>
        </div>
        <div className="card">
          <h3>How Billing Works</h3>
          <ol className="list-decimal list-inside text-white/80 mt-2 space-y-1">
            <li>Pick size & time window</li>
            <li>Pay and receive a one-time code</li>
            <li>Extend before expiry from your receipt</li>
            <li>Close door—session ends & receipt sent</li>
          </ol>
        </div>
        <div className="card">
          <h3>Partners & Admins</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Revenue share / Subscription / Purchase + Support</li>
            <li>Net-30 invoicing, tax-exempt support</li>
            <li>Monthly usage & revenue reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
