import { useState, useRef, useEffect } from 'react';
import { Shield, ChevronDown, Phone, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: 'Events',
    items: [
      { label: 'Wedding', href: '/get-quote' },
      { label: 'Birthday Party', href: '/get-quote' },
      { label: 'Corporate Event', href: '/get-quote' },
      { label: 'Concert', href: '/get-quote' },
      { label: 'Festival', href: '/get-quote' },
      { label: 'Fundraiser', href: '/get-quote' },
      { label: 'Sporting Event', href: '/get-quote' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { label: 'Insurance Agent', href: '/partners/insurance-agent' },
      { label: 'Venue Partner', href: '/partners/venue-partner' },
      { label: 'Event Planner', href: '/partners/event-planner' },
      { label: 'Affiliate Partner', href: '/partners/affiliate-partner' },
    ],
  },
];

const DropdownMenu = ({ dropdown, isOpen, onToggle }: { dropdown: NavDropdown; isOpen: boolean; onToggle: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle();
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onToggle]);

  const navigate = useNavigate();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {dropdown.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-52 bg-card rounded-xl shadow-card border border-border py-2 z-50"
          >
            {dropdown.items.map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.href); onToggle(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Shield className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold text-foreground tracking-tight">OneDayEvent</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navDropdowns.map((dd) => (
            <DropdownMenu
              key={dd.label}
              dropdown={dd}
              isOpen={openDropdown === dd.label}
              onToggle={() => setOpenDropdown(openDropdown === dd.label ? null : dd.label)}
            />
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-button hover:shadow-button-hover hover:bg-accent transition-all duration-300"
          >
            Login
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="px-6 py-4 space-y-4">
              {navDropdowns.map((dd) => (
                <div key={dd.label}>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{dd.label}</p>
                  {dd.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { navigate(item.href); setMobileOpen(false); }}
                      className="block w-full text-left py-2 text-sm text-foreground hover:text-accent transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => { navigate('/contact'); setMobileOpen(false); }} className="flex-1 py-2.5 border border-border rounded-full text-sm font-medium">Contact</button>
                <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold">Login</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
