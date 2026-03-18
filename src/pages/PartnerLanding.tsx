import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, Users, Building, CalendarCheck, Handshake } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ROLES: Record<string, { title: string; subtitle: string; icon: typeof Shield; benefits: string[] }> = {
  'insurance-agent': {
    title: 'Insurance Agent',
    subtitle: 'Expand your portfolio with event insurance. Earn competitive commissions on every policy.',
    icon: Shield,
    benefits: ['Competitive commission rates', 'Dedicated agent portal', 'Marketing materials provided', 'Quick & easy quoting process', 'Ongoing training & support'],
  },
  'venue-partner': {
    title: 'Venue Partner',
    subtitle: 'Protect your venue and delight your clients. Offer seamless event insurance at booking.',
    icon: Building,
    benefits: ['Streamline insurance requirements', 'Custom co-branded portal', 'Reduce your liability exposure', 'Enhance client experience', 'Revenue sharing available'],
  },
  'event-planner': {
    title: 'Event Planner',
    subtitle: 'Add value to your planning services with instant event insurance for every client.',
    icon: CalendarCheck,
    benefits: ['One-click insurance for clients', 'Professional partner dashboard', 'Bulk event management', 'Priority support line', 'Earn referral commissions'],
  },
  'affiliate-partner': {
    title: 'Affiliate Partner',
    subtitle: 'Monetize your audience by referring event organizers to trusted insurance coverage.',
    icon: Handshake,
    benefits: ['Generous referral payouts', 'Real-time tracking dashboard', 'Custom referral links', 'Monthly performance reports', '30-day cookie window'],
  },
};

const PartnerLanding = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const config = ROLES[role || ''] || ROLES['affiliate-partner'];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex p-4 bg-secondary rounded-2xl mb-6">
              <Icon className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">{config.title} Program</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{config.subtitle}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl shadow-card border border-border p-8 sm:p-10 mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-6">Partner Benefits</h2>
            <div className="space-y-4">
              {config.benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/partners/${role}/signup`)}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-button hover:shadow-button-hover hover:bg-accent transition-all duration-300"
            >
              Become a {config.title}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
            {[
              { num: '500+', label: 'Active Partners' },
              { num: '$2M+', label: 'Partner Earnings' },
              { num: '50K+', label: 'Events Covered' },
            ].map((s) => (
              <div key={s.label} className="p-6 bg-card rounded-2xl shadow-card">
                <p className="text-3xl font-bold text-accent">{s.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerLanding;
