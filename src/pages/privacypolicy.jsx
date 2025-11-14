export default function privacypolicy() {
  return (
    <div
      className="privacy-policy"
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        color: "white",          // ✔ All text white
        lineHeight: "1.7",
      }}
    >
      <h1 style={{ color: "white" }}>Privacy Policy</h1>

      <p>Last updated: {new Date().getFullYear()}</p>

      <h2 style={{ color: "white" }}>1. Introduction</h2>
      <p>
        At <strong>PixPlaySG</strong>, we are committed to protecting your personal information and
        handling it responsibly. This Privacy Policy explains how we collect, use, and safeguard your
        information when you visit <strong>pixplaysg.com</strong> or interact with our services.
      </p>

      <p>
        For any enquiries, contact us at <strong>hello@pixplaysg.com</strong> or{" "}
        <strong>+65 9360 2418</strong>.
      </p>

      <h2 style={{ color: "white" }}>2. Scope of This Policy</h2>
      <p>
        This Privacy Policy applies to all visitors, customers, and users who interact with our
        website or services.
      </p>

      <h2 style={{ color: "white" }}>3. Information We Collect</h2>
      <ul>
        <li>Full Name</li>
        <li>Email Address and Phone Number</li>
        <li>Business Information</li>
        <li>Billing and Payment Details</li>
        <li>Real-time location (if permitted)</li>
        <li>Information shared when contacting us</li>
      </ul>

      <h2 style={{ color: "white" }}>4. How We Use Your Information</h2>
      <ul>
        <li>To deliver our services</li>
        <li>To respond to enquiries</li>
        <li>To customise user experience</li>
        <li>To process billing and payments</li>
        <li>To send updates or marketing (with consent)</li>
        <li>To maintain security and prevent fraud</li>
      </ul>

      <h2 style={{ color: "white" }}>5. Data Storage & Protection</h2>
      <p>Your data is stored securely using industry-standard protection measures.</p>
      <ul>
        <li>Encrypted connections</li>
        <li>Access control</li>
        <li>Secure hosting providers</li>
      </ul>

      <p>Third-party providers are bound by strict data protection agreements.</p>

      <h2 style={{ color: "white" }}>6. Sharing of Personal Information</h2>
      <p>We do <strong>not</strong> sell or rent your information.</p>
      <p>We only share data with:</p>
      <ul>
        <li>Service providers (e.g., invoicing, payment processing)</li>
        <li>Authorities, when legally required</li>
      </ul>

      <h2 style={{ color: "white" }}>7. Your Rights</h2>
      <ul>
        <li>Access your personal data</li>
        <li>Request corrections</li>
        <li>Request deletion (“Right to be Forgotten”)</li>
        <li>Withdraw consent at any time</li>
        <li>Object to processing</li>
        <li>Request data portability</li>
      </ul>

      <p>
        To exercise any rights, contact: <strong>hello@pixplaysg.com</strong>
      </p>

      <h2 style={{ color: "white" }}>8. Cookies & Tracking</h2>
      <p>We use cookies to improve website performance and user experience.</p>
      <ul>
        <li>Essential Cookies</li>
        <li>Analytics Cookies</li>
        <li>Functional Cookies</li>
        <li>Advertising Cookies (with consent)</li>
      </ul>
      <p>A cookie consent banner will appear on your first visit.</p>

      <h2 style={{ color: "white" }}>9. Updates</h2>
      <p>This policy may be updated occasionally. Any changes will be posted here.</p>

      <h2 style={{ color: "white" }}>10. Contact Us</h2>
      <p>
        Email: <strong>hello@pixplaysg.com</strong>
        <br />
        Phone: <strong>+65 9360 2418</strong>
      </p>
    </div>
  );
}
