'use client';

import { useState } from "react";
import { CustomizedButton2 } from "../CustomizedButton";
import { X } from "lucide-react";

interface PrivacyPolicyProps {
  onClose: () => void;
  onProceed?: () => void;
}

export default function PrivacyPolicy({ onClose, onProceed }: PrivacyPolicyProps) {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleProceed = () => {
    if (isChecked) {
      onProceed?.();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA] p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 pb-0">
          <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Close privacy policy"
          >
            <X size={24} />
          </button>
        </div>
        
           {/* Meta info */}
        <div className="px-6 pt-2 pb-4 text-sm text-gray-600">
          <p>Credbevy Lenders - Privacy Policy</p>
          <p>Effective Date: 11/05/2023</p>
          <p>Last Updated: 01/02/2024</p>
        </div>
        
        {/* Introduction */}
        <div className="px-6 pb-4 text-sm">
          <p className="mb-2">Welcome to the Credbevy Lenders Distribution. At Credbevy, your privacy and data security are paramount. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you access and use our Lenders Dashboard, particularly during initial onboarding and account creation.</p>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 text-sm border-t border-b border-gray-200">
          <Section num={1} title="Who We Are">
            <p>Credbevy is an AI-powered loan marketplace platform that connects verified borrowers with eligible lenders. Our Lenders Dashboard is a secure portal enabling lenders to manage borrower applications, access financial intelligence, and configure their lending preferences.</p>
          </Section>
          
          <Section num={2} title="Scope of The Policy">
            <p>The Privacy Policy applies exclusively to data collected from lenders (and their authorized representatives) upon first-time access to the Lenders Dashboard. It supplements the general Credbevy Privacy Policy available at <a href="https://www.credbevy.com/privacy" className="text-blue-600 hover:underline">www.credbevy.com/privacy</a>.</p>
          </Section>
          
          <Section num={3} title="Information We Collect">
            <div className="space-y-2">
              <p>A. Information You Provide Voluntarily</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Parties Information: Legal name, registration/incorporation number, tax ID, licensing information, business type, address, and contact details.</li>
                <li>Authorised User Information: Full name, title/role, work email, phone number, login credentials.</li>
                <li>Due Diligence/KYC Documentation: Regulatory licenses, AML policies, financial reports, ownership documents.</li>
              </ul>
              
              <p>B. Automatically Collected Data</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Login and Usage Data: Timestamps, IP address, session duration, user interactions (clicks, navigation paths).</li>
                <li>Device Information: Browser type, operating system, device ID.</li>
                <li>Activity Logs: Access logs, application review history, decision timestamps.</li>
              </ul>
              
              <p>C. Third-Party Sources</p>
              <p>We may receive verification or enrichment data from:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Credit Bureaus</li>
                <li>Regulatory agencies</li>
                <li>KYC/AML service providers</li>
              </ul>
            </div>
          </Section>
          
          <Section num={4} title="Legal Basis for Processing">
            <p>We process your information based on the following legal grounds:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contractual necessity: To create and manage your lender account and provide platform functionality.</li>
              <li>Legal compliance: To fulfil regulatory requirements (e.g., KYC, AML).</li>
              <li>Legitimate interest: To improve our services, prevent fraud, and ensure platform integrity.</li>
              <li>Consent: For specific features or marketing communications (where applicable).</li>
            </ul>
          </Section>
          
          <Section num={5} title="How We Use Your Information">
            <p>Your data is used to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verify your identity and regulatory standing during onboarding.</li>
              <li>Enable secure login and role-based access.</li>
              <li>Match borrower applications under your lending criteria.</li>
              <li>Present financial statements, analytics, and portfolio insights.</li>
              <li>Facilitate communication between lenders and Credbevy or borrowers (where applicable).</li>
              <li>Monitor usage and ensure compliance with Credbevy's Terms of Service.</li>
            </ul>
          </Section>
          
          <Section num={6} title="Data Security and Disclosure">
            <p>We do not sell or rent your data. We may share your data only under the following conditions:</p>
            
            <p>A. With Your Consent</p>
            <p>For example, when you need to access borrower profiles or analytics dashboards powered by third-party integrations.</p>
            
            <p>B. With Authorised Service Providers</p>
            <p>We work with trusted partners to provide services such as:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>KYC/AML verification</li>
              <li>Cloud hosting and data infrastructure</li>
              <li>Fraud detection and audit services</li>
            </ul>
            <p>These parties are bound by strict data protection agreements.</p>
            
            <p>C. With Regulatory Authorities</p>
            <p>Where legally required, we may disclose your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Financial regulators</li>
              <li>Tax authorities</li>
              <li>Law enforcement</li>
            </ul>
          </Section>
          
          <Section num={7} title="Data Retention">
            <p>We retain your data only as long as necessary to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fulfill the purposes for which it was collected.</li>
              <li>Comply with regulatory retention mandates (e.g., 5-7 years for financial records).</li>
              <li>Enforce contractual agreements and resolve disputes.</li>
            </ul>
            <p>Data may be anonymized for research and analytics after retention periods expire.</p>
          </Section>
          
          <Section num={8} title="Data Security">
            <p>We implement industry-standard technical and organisational measures, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Encryption: All data is encrypted both in transit (TLS 1.2+) and at rest (AES-256).</li>
              <li>Multi-Factor Authentication (MFA): Required for all dashboard access.</li>
              <li>Audit Logs: Continuous monitoring of system access and usage patterns.</li>
              <li>Access Controls: Role-based permissions and internal access limitations.</li>
            </ul>
          </Section>
          
          <Section num={9} title="Your Rights and Choices">
            <p>Depending on your location and applicable laws (e.g., GDPR, NDPR), you may have rights including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access – View the data we hold about you.</li>
              <li>Rectification – Correct inaccurate or incomplete information.</li>
              <li>Erasure – Request deletion of your data (subject to legal exceptions).</li>
              <li>Restriction – Limit how we process your data.</li>
              <li>Portability – Receive a copy of your data in machine-readable format.</li>
              <li>Objection – Object to processing based on legitimate interests or direct marketing.</li>
            </ul>
            <p>To exercise your rights, email <a href="mailto:Support@credbevy.com" className="text-blue-600 hover:underline">Support@credbevy.com</a> with subject: Data Request - Lenders Dashboard.</p>
          </Section>
          
          <Section num={10} title="International Data Transfers">
            <p>If you access Credbevy from outside the country where our servers are located, your data may be transferred across borders. We implement safeguards such as Standard Contractual Clauses (SCCs) or equivalent under applicable data protection laws.</p>
          </Section>
          
          <Section num={11} title="Changes to This Privacy Policy">
            <p>We may update this policy from time to time. Material changes will be communicated via the dashboard or email at least 7 days before taking effect. Continued use of the dashboard constitutes acceptance of the revised policy.</p>
          </Section>
          
          <Section num={12} title="Contact Us">
            <p>If you have any questions or concerns about this Privacy Policy or your data:</p>
            <p>Credbevy Inc.</p>
            <p>📧 Email: <a href="mailto:Support@credbevy.com" className="text-blue-600 hover:underline">Support@credbevy.com</a></p>
            <p>🌐 Website: <a href="https://www.credbavy.com" className="text-blue-600 hover:underline">www.credbevy.com</a></p>
          </Section>
        </div>
        
        {/* Footer with actions */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="agreement" 
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="agreement" className="ml-2 text-sm font-medium text-gray-700">
              Yes I agree and Understand
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <CustomizedButton2 
              text={'Cancel'}
              className=" border border-[#333333] text-sm  text-gray-700 hover:bg-gray-50 "
              onClick={onClose}
            />
            <button 
              className={` text-sm  text-white  w-[134px] h-[36px] rounded-[4px] text-center text-[12px] font-bold ${isChecked ? 'bg-[#156064] hover:bg-teal-800' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isChecked}
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  num: number;
  title: string;
  children: React.ReactNode;
}

function Section({ num, title, children }: SectionProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-gray-800 mb-2">{num}. {title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}