import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Contact Us</h1>
        <p className="text-muted-foreground">We'd love to hear from you. Reach out anytime.</p>
      </motion.div>
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Phone, label: 'Phone', value: '1-800-555-0199' },
          { icon: Mail, label: 'Email', value: 'support@onedayevent.com' },
          { icon: MapPin, label: 'Address', value: 'New York, NY 10001' },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label} whileHover={{ y: -4 }} className="p-6 bg-card rounded-2xl shadow-card text-center">
              <div className="inline-flex p-3 bg-secondary rounded-xl mb-4"><Icon className="w-6 h-6 text-accent" /></div>
              <h3 className="font-semibold text-foreground mb-1">{c.label}</h3>
              <p className="text-sm text-muted-foreground">{c.value}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Contact;
