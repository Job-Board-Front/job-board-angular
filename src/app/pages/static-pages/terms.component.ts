import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-page">
      <div class="legal-header">
        <h1 class="legal-title">Terms of Service</h1>
        <p class="legal-date">Last updated: January 2025</p>
      </div>

      <div class="legal-content">
        <section class="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using JobBoard ("the Service"), you accept and agree to be 
            bound by the terms and provision of this agreement. If you do not agree to 
            these terms, please do not use our services.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Use of Service</h2>
          <p>
            JobBoard provides a platform for job seekers to find employment opportunities 
            and for employers to post job listings and find candidates.
          </p>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Use the service only for lawful purposes</li>
            <li>Not impersonate any person or entity</li>
            <li>Not interfere with or disrupt the service</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. User Accounts</h2>
          <p>
            To access certain features, you must create an account. You are responsible 
            for maintaining the confidentiality of your account information and for all 
            activities that occur under your account.
          </p>
          <p>
            We reserve the right to suspend or terminate accounts that violate these 
            terms or engage in fraudulent, abusive, or illegal activity.
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Job Postings and Applications</h2>
          <p><strong>For Employers:</strong></p>
          <ul>
            <li>Job postings must be accurate and not misleading</li>
            <li>You must have the authority to hire for posted positions</li>
            <li>You agree to comply with all applicable employment laws</li>
            <li>You will not discriminate based on protected characteristics</li>
          </ul>
          <p><strong>For Job Seekers:</strong></p>
          <ul>
            <li>You grant us permission to share your profile with employers</li>
            <li>Information in your resume and applications must be truthful</li>
            <li>You are responsible for your communications with employers</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>5. Content Ownership and License</h2>
          <p>
            You retain ownership of content you submit to the Service. By posting content, 
            you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, 
            and display your content for the purpose of operating and improving our services.
          </p>
          <p>
            We reserve the right to remove any content that violates these terms or is 
            otherwise objectionable.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Post false, misleading, or fraudulent information</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Scrape or collect data from the service without permission</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Distribute spam, malware, or other harmful content</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>7. Payment and Fees</h2>
          <p>
            Some services may require payment. All fees are non-refundable unless 
            otherwise specified. We reserve the right to change our pricing at any time.
          </p>
          <p>
            You are responsible for all charges incurred under your account, including 
            applicable taxes.
          </p>
        </section>

        <section class="legal-section">
          <h2>8. Disclaimers</h2>
          <p>
            The Service is provided "as is" without warranties of any kind. We do not 
            guarantee the accuracy, completeness, or reliability of any content or 
            information on our platform.
          </p>
          <p>
            We are not responsible for the conduct of users, the quality of job postings, 
            or the outcome of any employment relationships formed through our service.
          </p>
        </section>

        <section class="legal-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, JobBoard shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages resulting 
            from your use of the service.
          </p>
        </section>

        <section class="legal-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless JobBoard from any claims, damages, 
            losses, or expenses arising from your use of the service or violation of 
            these terms.
          </p>
        </section>

        <section class="legal-section">
          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your account at any time, with or without cause, 
            with or without notice. Upon termination, your right to use the service will 
            immediately cease.
          </p>
        </section>

        <section class="legal-section">
          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users 
            of any material changes by posting the updated terms on our website. Your 
            continued use of the service after changes constitutes acceptance of the new 
            terms.
          </p>
        </section>

        <section class="legal-section">
          <h2>13. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws 
            of the jurisdiction in which JobBoard operates, without regard to its conflict 
            of law provisions.
          </p>
        </section>

        <section class="legal-section">
          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p class="contact-info">
            Email: legal@jobboard.com<br>
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

    .legal-section p strong {
      color: #0f172a;
      transition: color 0.3s ease;
    }

    :host-context(.dark) .legal-section p strong {
      color: #f1f5f9;
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
export class TermsComponent {}