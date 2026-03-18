import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
  'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const ROLE_MAP: Record<string, { title: string; fields: { name: string; label: string; type: string; options?: string[] }[] }> = {
  'insurance-agent': {
    title: 'Insurance Agent',
    fields: [
      { name: 'agencyName', label: 'Agency Name', type: 'text' },
      { name: 'agencyStreet', label: 'Agency Street', type: 'text' },
      { name: 'agencyCity', label: 'Agency City', type: 'text' },
      { name: 'agencyState', label: 'State', type: 'select', options: US_STATES },
      { name: 'agencyZip', label: 'Zip Code', type: 'text' },
      { name: 'licenseNumber', label: 'License Number', type: 'text' },
    ],
  },
  'venue-partner': {
    title: 'Venue Partner',
    fields: [
      { name: 'venueName', label: 'Venue Name', type: 'text' },
      { name: 'venueStreet', label: 'Venue Street', type: 'text' },
      { name: 'venueCity', label: 'Venue City', type: 'text' },
      { name: 'venueState', label: 'State', type: 'select', options: US_STATES },
      { name: 'venueZip', label: 'Zip Code', type: 'text' },
      { name: 'maxCapacity', label: 'Max Capacity', type: 'number' },
    ],
  },
  'event-planner': {
    title: 'Event Planner',
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text' },
      { name: 'companyStreet', label: 'Company Street', type: 'text' },
      { name: 'companyCity', label: 'Company City', type: 'text' },
      { name: 'companyState', label: 'State', type: 'select', options: US_STATES },
      { name: 'companyZip', label: 'Zip Code', type: 'text' },
      { name: 'yearsExperience', label: 'Years of Experience', type: 'number' },
    ],
  },
  'affiliate-partner': {
    title: 'Affiliate Partner',
    fields: [
      { name: 'businessName', label: 'Business / Organization Name', type: 'text' },
      { name: 'businessStreet', label: 'Street Address', type: 'text' },
      { name: 'businessCity', label: 'City', type: 'text' },
      { name: 'businessState', label: 'State', type: 'select', options: US_STATES },
      { name: 'businessZip', label: 'Zip Code', type: 'text' },
      { name: 'referralSource', label: 'How did you hear about us?', type: 'text' },
    ],
  },
};

const TERMS_TEXT = `Terms and Conditions\n\nLast updated: March 2026\n\n1. ACCEPTANCE OF TERMS\nBy accessing and using OneDayEvent's partner program, you accept and agree to be bound by the terms and conditions of this agreement.\n\n2. PARTNER OBLIGATIONS\nAs a partner, you agree to: (a) Provide accurate and complete information during registration. (b) Maintain the confidentiality of your account credentials. (c) Comply with all applicable laws and regulations. (d) Not misrepresent your relationship with OneDayEvent.\n\n3. COMMISSION AND PAYMENTS\nCommission rates and payment terms will be outlined in your individual partner agreement. Payments are processed monthly for the previous month's qualified referrals.\n\n4. INTELLECTUAL PROPERTY\nOneDayEvent retains all rights to its trademarks, logos, and marketing materials. Partners are granted a limited license to use approved materials solely for the purpose of promoting OneDayEvent services.\n\n5. TERMINATION\nEither party may terminate this agreement at any time with 30 days written notice. OneDayEvent reserves the right to immediately terminate any partner account for violations of these terms.\n\n6. LIMITATION OF LIABILITY\nOneDayEvent shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to this agreement.\n\n7. GOVERNING LAW\nThis agreement shall be governed by and construed in accordance with the laws of the State of New York.\n\n8. PRIVACY\nAll personal information collected during registration will be handled in accordance with our Privacy Policy.\n\n9. MODIFICATIONS\nOneDayEvent reserves the right to modify these terms at any time. Partners will be notified of material changes via email.\n\n10. ENTIRE AGREEMENT\nThis agreement constitutes the entire agreement between the parties regarding the subject matter herein.`;

const PartnerSignup = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const roleConfig = ROLE_MAP[role || ''] || ROLE_MAP['affiliate-partner'];
  const roleTitle = roleConfig.title;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

  const update = (key: string, val: string) => setFormData((p) => ({ ...p, [key]: val }));

  const canProceed = () => {
    if (step === 1) return (formData.firstName?.trim() && formData.lastName?.trim() && formData.email?.trim() && formData.phone?.trim());
    if (step === 2) return roleConfig.fields.every((f) => f.name === 'referralSource' || formData[f.name]?.trim());
    if (step === 3) return formData.password?.trim() && formData.password === formData.confirmPassword && agreed;
    return false;
  };

  const handleSubmit = () => {
    alert('Signup complete! Backend integration will be added later.');
    navigate('/login');
  };

  const inputClass = 'w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all';
  const selectClass = inputClass + ' appearance-none';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-secondary rounded-xl mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{roleTitle} Sign Up</h1>
          <p className="text-sm text-muted-foreground mt-1">Join our partner program in 3 easy steps</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s <= step ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all ${s < step ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <motion.div
          className="bg-card rounded-2xl shadow-card border border-border p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                      <input value={formData.firstName || ''} onChange={(e) => update('firstName', e.target.value)} placeholder="John" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                      <input value={formData.lastName || ''} onChange={(e) => update('lastName', e.target.value)} placeholder="Doe" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                    <input type="email" value={formData.email || ''} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                    <input type="tel" value={formData.phone || ''} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Website (optional)</label>
                    <input value={formData.website || ''} onChange={(e) => update('website', e.target.value)} placeholder="https://yoursite.com" className={inputClass} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-foreground">{roleTitle} Information</h2>
                  {roleConfig.fields.map((f) => (
                    <div key={f.name}>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {f.label} {f.name !== 'referralSource' && '*'}
                      </label>
                      {f.type === 'select' ? (
                        <select value={formData[f.name] || ''} onChange={(e) => update(f.name, e.target.value)} className={selectClass}>
                          <option value="">Select {f.label}</option>
                          {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input
                          type={f.type}
                          value={formData[f.name] || ''}
                          onChange={(e) => update(f.name, e.target.value)}
                          placeholder={f.label}
                          className={inputClass}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-foreground">Create Your Account</h2>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Password *</label>
                    <input type="password" value={formData.password || ''} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password *</label>
                    <input type="password" value={formData.confirmPassword || ''} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="••••••••" className={inputClass} />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Terms & Conditions *</label>
                    <div className="h-40 overflow-y-auto bg-background border border-border rounded-xl p-4 text-xs text-muted-foreground whitespace-pre-wrap mb-3">
                      {TERMS_TEXT}
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-accent" />
                      <span className="text-sm text-foreground">I agree to the Terms & Conditions</span>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            <motion.button
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              disabled={!canProceed()}
              className={`flex items-center gap-1.5 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${canProceed() ? 'bg-primary text-primary-foreground shadow-button hover:bg-accent' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
            >
              {step < 3 ? 'Continue' : 'Sign Up'}
              {step < 3 && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-accent font-semibold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default PartnerSignup;
