import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, Phone, Mail, MapPin, Star, Users, Clock, Award, ChevronRight, Heart, Zap, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
const features = [
  { icon: Clock, title: 'Instant Coverage', desc: 'Get your certificate of insurance in minutes, not days.' },
  { icon: Shield, title: 'Comprehensive Protection', desc: 'Coverage for liability, property damage, and more.' },
  { icon: Users, title: 'Any Event Size', desc: 'From intimate gatherings to large-scale festivals.' },
  { icon: Award, title: 'A-Rated Carriers', desc: 'Backed by top-rated insurance carriers nationwide.' },
];

const eventTypes = [
  'Weddings', 'Birthday Parties', 'Corporate Events', 'Festivals',
  'Sporting Events', 'Concerts', 'Fundraisers', 'Holiday Parties',
];

const testimonials = [
  { name: 'Sarah M.', event: 'Wedding', text: 'Got my insurance certificate in under 5 minutes. The venue accepted it immediately!', rating: 5 },
  { name: 'James R.', event: 'Corporate Event', text: 'Affordable and easy. This saved us so much time compared to traditional insurance.', rating: 5 },
  { name: 'Maria L.', event: 'Birthday Party', text: 'Peace of mind for my daughter\'s sweet 16. Highly recommend!', rating: 5 },
];

const steps = [
  { num: '01', title: 'Tell Us About Your Event', desc: 'Answer a few quick questions about your event type, date, and location.' },
  { num: '02', title: 'Get Your Quote', desc: 'Receive an instant quote tailored to your specific event needs.' },
  { num: '03', title: 'Purchase & Download', desc: 'Pay securely and download your certificate of insurance immediately.' },
];

const dynamicWords = ['Event', 'Wedding', 'Party', 'Concert', 'Festival', 'Corporate', 'Birthday'];

const Index = () => {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-accent bg-secondary rounded-full">
                #1 Event Insurance Provider
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.08] mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicWords[wordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block text-accent"
                  >
                    {dynamicWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>{' '}
                Insurance <br />
                <span className="text-accent">Made Simple.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Protect your special day with affordable, instant event insurance. Get your certificate of insurance in minutes — coverage starts at just $75.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/get-quote')}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-semibold shadow-button hover:shadow-button-hover hover:bg-accent transition-all duration-300"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                <a href="tel:1-800-555-0199" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground rounded-full text-base font-semibold hover:bg-secondary transition-all duration-300">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                {['Instant coverage', 'No hidden fees', 'A-rated carriers'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-card rounded-3xl shadow-card p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <FileCheck className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Certificate Generated</p>
                      <p className="text-xs text-muted-foreground">Wedding — June 15, 2026</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <Shield className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">$1M Liability Coverage</p>
                      <p className="text-xs text-muted-foreground">General aggregate: $2M</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <Zap className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Instant Download Ready</p>
                      <p className="text-xs text-muted-foreground">PDF certificate available</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent ml-auto" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Trusted By Bar */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <span className="text-sm font-medium">Trusted by 50,000+ events</span>
          <span className="text-xs">•</span>
          <span className="flex items-center gap-1 text-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-1 font-medium">4.9/5 rating</span>
          </span>
          <span className="text-xs">•</span>
          <span className="text-sm font-medium">A-Rated Insurance Carriers</span>
        </div>
      </section>

      {/* Events We Cover */}
      <section id="coverage" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Events We Cover</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">From weddings to corporate retreats, we provide coverage for virtually any event type.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {eventTypes.map((type) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-3 p-5 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                onClick={() => navigate('/get-quote')}
              >
                <Heart className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground text-sm">{type}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Get covered in three simple steps. It takes less than 5 minutes.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <motion.div key={step.num} whileHover={{ y: -4 }} className="relative p-8 bg-card rounded-2xl shadow-card">
                <span className="text-5xl font-bold text-accent/15">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Industry-leading event insurance with the best coverage and service.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} whileHover={{ y: -4 }} className="p-6 bg-card rounded-2xl shadow-card text-center">
                  <div className="inline-flex p-3 bg-secondary rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} whileHover={{ y: -4 }} className="p-6 bg-card rounded-2xl shadow-card">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Protect Your Event?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Get your free quote in minutes. Coverage starts at just $75.</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/get-quote')}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-button hover:shadow-button-hover hover:bg-accent transition-all duration-300"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
          <div className="grid sm:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-accent" />
                <span className="font-bold text-foreground">OneDayEvent</span>
              </div>
              <p className="text-sm text-muted-foreground">Affordable event insurance for any occasion. Get covered in minutes.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Coverage</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Weddings</li><li>Corporate Events</li><li>Birthday Parties</li><li>Festivals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li><li>FAQ</li><li>Privacy Policy</li><li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1-800-555-0199</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@onedayevent.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New York, NY</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © 2026 OneDayEvent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
