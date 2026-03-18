import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cake, Diamond, Briefcase, ArrowRight, Search } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const eventTypes = [
  { id: 'Wedding', label: 'Wedding', icon: Diamond },
  { id: 'Birthday', label: 'Birthday', icon: Cake },
  { id: 'Vendor', label: 'Vendor at Event', icon: Briefcase },
];

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [step] = useState(1);
  const [selectedType, setSelectedType] = useState('Birthday');
  const [customType, setCustomType] = useState('');

  const isNextDisabled = !selectedType && customType.length < 3;

  useEffect(() => {
    if (!isOpen) {
      setSelectedType('Birthday');
      setCustomType('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-2xl overflow-hidden bg-background rounded-[32px] shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-muted">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-accent"
                style={{ boxShadow: '0 0 8px rgba(37,99,235,0.4)' }}
              />
            </div>

            <div className="px-8 pt-12 pb-10 sm:px-12">
              {/* Header */}
              <header className="mb-10 text-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-3 py-1 mb-4 text-[11px] font-bold tracking-widest uppercase text-accent bg-secondary rounded-full"
                >
                  Step {step} of 4
                </motion.span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight text-balance leading-snug">
                  Hi, let's get your quote! <br />
                  <span className="text-muted-foreground">What type of event do you need covered?</span>
                </h2>
              </header>

              {/* Event Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {eventTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedType(type.id);
                        setCustomType('');
                      }}
                      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-card shadow-card-active scale-[1.02]'
                          : 'bg-card/60 hover:bg-card shadow-card hover:shadow-card-hover'
                      }`}
                    >
                      <div
                        className={`mb-4 p-3 rounded-xl transition-colors duration-200 ${
                          isSelected
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-accent'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`font-medium text-sm ${
                          isSelected ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {type.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="relative mb-10">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Type your event in here"
                  value={customType}
                  onChange={(e) => {
                    setCustomType(e.target.value);
                    setSelectedType('');
                  }}
                  className="w-full pl-11 pr-4 py-4 bg-card border-none rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground"
                />
                <p className="mt-3 text-xs text-center text-muted-foreground italic">
                  Please type in your event if you do not see it in the dropdown
                </p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={!isNextDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isNextDisabled ? { scale: 0.98 } : {}}
                  disabled={isNextDisabled}
                  className={`group relative flex items-center justify-center gap-2 w-full max-w-xs py-4 px-8 rounded-full font-semibold transition-all duration-300 ${
                    isNextDisabled
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground shadow-button hover:shadow-button-hover hover:bg-accent active:scale-[0.98]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      !isNextDisabled && 'group-hover:translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Background shapes */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
