import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-page">
      <div class="legal-header">
        <h1 class="legal-title">Privacy Policy</h1>
        <p class="legal-date">Last updated: January 2025</p>
      </div>

      <div class="legal-content">
        <section class="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, 
            apply for jobs, or use our services. This may include your name, email address, 
            phone number, resume, work history, and other professional information.
          </p>
          <p>
            We also automatically collect certain information about your device and how you 
            interact with our services, including IP address, browser type, pages visited, 
            and timestamps.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process job applications and connect you with employers</li>
            <li>Send you updates, newsletters, and promotional materials</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues and fraudulent activity</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Information Sharing</h2>
          <p>
            We may share your information with employers when you apply for jobs, with 
            service providers who help us operate our platform, and when required by law 
            or to protect our rights.
          </p>
          <p>
            We do not sell your personal information to third parties. Your resume and 
            profile information are only shared with employers when you explicitly apply 
            for their job postings.
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from 
            loss, theft, misuse, unauthorized access, disclosure, alteration, and 
            destruction. However, no internet transmission is ever fully secure or 
            error-free.
          </p>
        </section>

        <section class="legal-section">
          <h2>5. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of receiving promotional communications</li>
            <li>Request a copy of your data</li>
            <li>Restrict or object to certain processing of your data</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@jobboard.com
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about 
            your browsing activities. You can control cookies through your browser settings, 
            but disabling cookies may limit your ability to use certain features of our 
            services.
          </p>
        </section>

        <section class="legal-section">
          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 16 years of age. We do not 
            knowingly collect personal information from children under 16.
          </p>
        </section>

        <section class="legal-section">
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of 
            any changes by posting the new policy on this page and updating the "Last 
            updated" date.
          </p>
        </section>

        <section class="legal-section">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p class="contact-info">
            Email: privacy@jobboard.com<br>
            Address: 123 Job Street, Career City, CC 12345
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .legal-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .legal-page {
        padding: 1.5rem 1rem;
      }
    }

    .legal-header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e2e8f0;
      transition: border-color 0.3s ease;
    }

    :host-context(.dark) .legal-header {
      border-bottom-color: #334155;
    }

    .legal-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-title {
      color: #f1f5f9;
    }

    @media (max-width: 768px) {
      .legal-title {
        font-size: 2rem;
      }
    }

    .legal-date {
      color: #64748b;
      font-size: 0.9375rem;
      margin: 0;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-date {
      color: #94a3b8;
    }

    .legal-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .legal-section {
      padding-bottom: 2rem;
      border-bottom: 1px solid #e2e8f0;
      transition: border-color 0.3s ease;
    }

    :host-context(.dark) .legal-section {
      border-bottom-color: #334155;
    }

    .legal-section:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .legal-section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 1rem 0;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-section h2 {
      color: #f1f5f9;
    }

    .legal-section p {
      color: #475569;
      font-size: 1rem;
      line-height: 1.7;
      margin: 0 0 1rem 0;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-section p {
      color: #cbd5e1;
    }

    .legal-section p:last-child {
      margin-bottom: 0;
    }

    .legal-section ul {
      color: #475569;
      font-size: 1rem;
      line-height: 1.7;
      margin: 0 0 1rem 0;
      padding-left: 1.5rem;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-section ul {
      color: #cbd5e1;
    }

    .legal-section li {
      margin-bottom: 0.5rem;
    }

    .legal-section li:last-child {
      margin-bottom: 0;
    }

    .contact-info {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 8px;
      border-left: 3px solid #2563eb;
      transition: all 0.3s ease;
    }

    :host-context(.dark) .contact-info {
      background: #1e293b;
      border-left-color: #60a5fa;
    }
  `]
})
export class PrivacyComponent {}