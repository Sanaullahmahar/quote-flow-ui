import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, ArrowLeft, Cake, Diamond, Briefcase, PartyPopper, Music, Tent, Calendar, Search, CheckCircle, Beer, BeerOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
  'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const eventTypes = [
  { id: 'Wedding', label: 'Wedding', icon: Diamond },
  { id: 'Birthday', label: 'Birthday', icon: Cake },
  { id: 'Vendor', label: 'Vendor at Event', icon: Briefcase },
  { id: 'Corporate', label: 'Corporate Event', icon: PartyPopper },
  { id: 'Concert', label: 'Concert / Festival', icon: Music },
  { id: 'Other', label: 'Other Event', icon: Tent },
];

const TOTAL_STEPS = 9;

const GetQuote = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [selectedType, setSelectedType] = useState('');
  const [customType, setCustomType] = useState('');

  // Step 2
  const [eventTimingType, setEventTimingType] = useState<'quick' | 'custom' | 'other' | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Step 3
  const [eventState, setEventState] = useState('');
  const [isPrivateResidence, setIsPrivateResidence] = useState<boolean | null>(null);

  // Step 4
  const [alcoholType, setAlcoholType] = useState<'sold' | 'served' | 'byob' | 'none' | ''>('');
  const [profitFromAlcohol, setProfitFromAlcohol] = useState<boolean | null>(null);
  const [ticketedEvent, setTicketedEvent] = useState<boolean | null>(null);

  // Step 5
  const [guestCount, setGuestCount] = useState('');

  // Step 6
  const [hasActivities, setHasActivities] = useState<boolean | null>(null);
  const [customActivities, setCustomActivities] = useState('');

  // Step 7
  const [venueAnswer, setVenueAnswer] = useState<boolean | null>(null);
  const [additionalInsuredAmount, setAdditionalInsuredAmount] = useState('');

  // Step 8
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  // Additional states for insured information
  const [insuredName, setInsuredName] = useState('');
  const [insuredAddress, setInsuredAddress] = useState('');
  const [insuredCity, setInsuredCity] = useState('');
  const [insuredState, setInsuredState] = useState('');
  const [insuredZip, setInsuredZip] = useState('');
 const canProceed = () => {
  switch (step) {
    case 1:
      return selectedType !== '' || customType.trim().length >= 3;
    case 2:
      if (eventTimingType === 'quick') return true;
      if (eventTimingType === 'custom') {
        return startDate !== '' && endDate !== '' && new Date(startDate) <= new Date(endDate);
      }
      return false;
    case 3:
      return eventState !== '' && isPrivateResidence !== null;
    case 4:
      if (!alcoholType) return false;
      if (alcoholType === 'sold') return profitFromAlcohol !== null;
      if (alcoholType === 'served') return ticketedEvent !== null;
      return true;
    case 5:
      return guestCount !== '' && Number(guestCount) > 0;
    case 6:
      if (hasActivities === null) return false;
      if (hasActivities) return customActivities.trim().length >= 3;
      return true;
    case 7:
      if (venueAnswer === null) return false;
      if (venueAnswer) return additionalInsuredAmount !== '' && Number(additionalInsuredAmount) >= 0;
      return true;
    case 8:
      return eventDescription.trim().length >= 5;
    case 9:
      return selectedPlan !== '';
    default:
      return false;
  }
};

  const nextStep = () => { if (canProceed() && step < TOTAL_STEPS) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Shield className="w-7 h-7 text-accent" />
          <span className="text-lg font-bold text-foreground tracking-tight">OneDayEvent</span>
        </button>
        <span className="text-sm text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
      </nav>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-muted">
        <motion.div
          animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-accent"
          style={{ boxShadow: '0 0 8px hsla(221, 83%, 53%, 0.4)' }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8 sm:py-16">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <StepHeader
                    step={1}
                    title="Hi, let's get your quote!"
                    subtitle="What type of event do you need covered?"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {eventTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
  setSelectedType(type.id);
  setCustomType('');
  setTimeout(() => setStep(2), 250);
}}
                          className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-card shadow-card-active scale-[1.02]'
                              : 'bg-card/60 hover:bg-card shadow-card hover:shadow-card-hover'
                          }`}
                        >
                          <div className={`mb-3 p-3 rounded-xl transition-colors ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-secondary text-accent'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`font-medium text-sm ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>{type.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Type your event in here"
                      value={customType}
                      onChange={(e) => { setCustomType(e.target.value); setSelectedType(''); }}
                      className="w-full pl-11 pr-4 py-4 bg-card border-none rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="mt-2 text-xs text-center text-muted-foreground italic">Please type in your event if you do not see it above</p>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <StepHeader step={2} title="When is your event?" subtitle="Select the date of your event" />
                  <div className="max-w-sm mx-auto">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-12 pr-4 py-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground"
                      />
                    </div>
                    {eventTimingType === 'custom' && (
                      <div className="relative mt-4">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split('T')[0]}
                          className="w-full pl-12 pr-4 py-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">End date (for multi-day events)</p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      {[
                        { label: 'Tomorrow', type: 'quick' as const },
                        { label: 'This Weekend', type: 'quick' as const },
                        { label: 'Next Week', type: 'quick' as const },
                        { label: 'Other', type: 'custom' as const },
                      ].map(({ label, type }) => (
                        <button
                          key={label}
                          onClick={() => {
                            const today = new Date();
                            if (label === 'Tomorrow') {
                              const tomorrow = new Date(today);
                              tomorrow.setDate(today.getDate() + 1);
                              setStartDate(tomorrow.toISOString().split('T')[0]);
                              setEndDate(tomorrow.toISOString().split('T')[0]);
                            } else if (label === 'This Weekend') {
                              const saturday = new Date(today);
                              const day = today.getDay();
                              const daysToSaturday = (6 - day + 7) % 7 || 7;
                              saturday.setDate(today.getDate() + daysToSaturday);
                              const sunday = new Date(saturday);
                              sunday.setDate(saturday.getDate() + 1);
                              setStartDate(saturday.toISOString().split('T')[0]);
                              setEndDate(sunday.toISOString().split('T')[0]);
                            } else if (label === 'Next Week') {
                              const monday = new Date(today);
                              const day = today.getDay();
                              const daysToMonday = (1 - day + 7) % 7 || 7;
                              monday.setDate(today.getDate() + daysToMonday + 7);
                              const nextSunday = new Date(monday);
                              nextSunday.setDate(monday.getDate() + 6);
                              setStartDate(monday.toISOString().split('T')[0]);
                              setEndDate(nextSunday.toISOString().split('T')[0]);
                            } else if (label === 'Other') {
                              setStartDate('');
                              setEndDate('');
                            }
                            setEventTimingType(type);
                          }}
                          className="flex-1 py-2.5 px-3 bg-card rounded-xl shadow-card hover:shadow-card-hover text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <StepHeader step={3} title="Where is your event?" subtitle="What state is the event in?" />
                  <div className="space-y-6 max-w-sm mx-auto">
                    <select
                      value={eventState}
                      onChange={(e) => setEventState(e.target.value)}
                      className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground appearance-none"
                    >
                      <option value="">Select State</option>
                      {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Is the event held at a private residence?</p>
                      <div className="flex gap-3">
                        {[true, false].map((val) => (
                          <button
                            key={String(val)}
                            onClick={() => {
                              setIsPrivateResidence(val);
                            }}
                            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                              isPrivateResidence === val
                                ? 'bg-card shadow-card-active text-foreground'
                                : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                            }`}
                          >
                            {val ? 'Yes' : 'No'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div>
                  <StepHeader step={4} title="Event Details" subtitle="Tell us about alcohol and guests" />
                  <div className="space-y-6 max-w-sm mx-auto">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">How will alcohol be handled at the event?</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'sold', label: 'Sold' },
                          { val: 'served', label: 'Served' },
                          { val: 'byob', label: 'BYOB' },
                          { val: 'none', label: 'No Alcohol' },
                        ].map(({ val, label }) => (
                          <button
                            key={val}
                            onClick={() => {
                              setAlcoholType(val as any);
                              setProfitFromAlcohol(null);
                              setTicketedEvent(null);
                              if (val === 'byob' || val === 'none') {
                                setTimeout(() => setStep(5), 250);
                              }
                            }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all ${
                              alcoholType === val
                                ? 'bg-card shadow-card-active text-foreground'
                                : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      {alcoholType === 'sold' && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-foreground mb-3">Did you make profit from alcohol sales?</p>
                          <div className="flex gap-3">
                            {[true, false].map((val) => (
                              <button
                                key={String(val)}
                                onClick={() => {
                                  setProfitFromAlcohol(val);
                                }}
                                className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                                  profitFromAlcohol === val
                                    ? 'bg-card shadow-card-active text-foreground'
                                    : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                                }`}
                              >
                                {val ? 'Yes' : 'No'}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {alcoholType === 'served' && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-foreground mb-3">Is the event ticketed?</p>
                          <div className="flex gap-3">
                            {[true, false].map((val) => (
                              <button
                                key={String(val)}
                                onClick={() => {
                                  setTicketedEvent(val);
                                }}
                                className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                                  ticketedEvent === val
                                    ? 'bg-card shadow-card-active text-foreground'
                                    : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                                }`}
                              >
                                {val ? 'Yes' : 'No'}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {(alcoholType === 'byob' || alcoholType === 'none') && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                          <p className="text-sm text-yellow-800">Warning: Ensure compliance with local alcohol laws and regulations.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div>
                  <StepHeader step={5} title="Guest Count" subtitle="How many people will be attending?" />
                  <div className="max-w-sm mx-auto">
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 150"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6 */}
              {step === 6 && (
                <div>
                  <StepHeader step={6} title="Event Activities" subtitle="Will your event include any special activities?" />
                  <div className="max-w-sm mx-auto">
                    <p className="text-sm text-muted-foreground mb-4">Examples include: Stunts, Pyrotechnics, Aircrafts, Animals, Camping/Overnight Stays, Car Races, Precision Driving, Mechanical Devices, Rap/Hip-Hop, Rock/Metal, Rides, Water Activities, Bounce Houses or Inflatables</p>
                    <div className="flex gap-3 mb-4">
                      {[true, false].map((val) => (
                        <button
                          key={String(val)}
                          onClick={() => {
                            setHasActivities(val);
                            if (!val) setTimeout(() => setStep(7), 250);
                          }}
                          className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                            hasActivities === val
                              ? 'bg-card shadow-card-active text-foreground'
                              : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                          }`}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                    {hasActivities && (
                      <textarea
                        value={customActivities}
                        onChange={(e) => setCustomActivities(e.target.value)}
                        rows={4}
                        placeholder="Describe the activities..."
                        className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground resize-none"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7 */}
              {step === 7 && (
                <div>
                  <StepHeader step={7} title="Venue Requirements" subtitle="Does your venue require additional insurance coverage?" />
                  <div className="max-w-sm mx-auto">
                    <div className="flex gap-3 mb-4">
                      {[true, false].map((val) => (
                        <button
                          key={String(val)}
                          onClick={() => {
                            setVenueAnswer(val);                          setAdditionalInsuredAmount('');                          if (!val) {
                            setTimeout(() => setStep(8), 250);
                          }
                          }}
                          className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                            venueAnswer === val
                              ? 'bg-card shadow-card-active text-foreground'
                              : 'bg-card/60 shadow-card text-muted-foreground hover:shadow-card-hover'
                          }`}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                    {venueAnswer && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Additional insured amount</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="e.g. 1000000"
                          value={additionalInsuredAmount}
                          onChange={(e) => setAdditionalInsuredAmount(e.target.value)}
                          className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* STEP 8 */}
              {step === 8 && (
                <div>
                  <StepHeader step={8} title="Final Details" subtitle="Provide event details" />
                  <div className="space-y-6 max-w-lg mx-auto">
                    <input
                      type="text"
                      placeholder="Event Name (optional)"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground"
                    />
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      rows={4}
                      placeholder="Describe your event..."
                      className="w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 9 */}
              {step === 9 && (
                <div>
                  <StepHeader step={9} title="Select Insurance Plan" subtitle="Choose the coverage that fits your event" />
                  <div className="space-y-6 max-w-lg mx-auto">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Select an insurance plan</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'basic', name: 'Basic Coverage', price: '$500', desc: 'Essential event insurance' },
                          { id: 'standard', name: 'Standard Coverage', price: '$1000', desc: 'Comprehensive protection' },
                          { id: 'premium', name: 'Premium Coverage', price: '$2000', desc: 'Full coverage including liability' },
                          { id: 'enterprise', name: 'Enterprise Coverage', price: '$5000', desc: 'Complete event protection' },
                        ].map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`p-4 rounded-xl text-left transition-all ${
                              selectedPlan === plan.id
                                ? 'bg-card shadow-card-active border-2 border-accent'
                                : 'bg-card/60 shadow-card border-2 border-transparent hover:shadow-card-hover'
                            }`}
                          >
                            <div className="font-semibold text-foreground">{plan.name}</div>
                            <div className="text-accent font-bold">{plan.price}</div>
                            <div className="text-sm text-muted-foreground mt-1">{plan.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 max-w-lg mx-auto">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            <motion.button
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              disabled={!canProceed()}
              onClick={() => {
                if (step === TOTAL_STEPS) {
                  alert('Quote submitted! We will get back to you shortly.');
                  navigate('/');
                } else {
                  nextStep();
                }
              }}
              className={`group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                !canProceed()
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground shadow-button hover:shadow-button-hover hover:bg-accent'
              }`}
            >
              <span>{step === TOTAL_STEPS ? 'Submit Quote' : 'Continue'}</span>
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${canProceed() && 'group-hover:translate-x-1'}`} />
            </motion.button>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background */}
      <div className="fixed -bottom-32 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

const StepHeader = ({ step, title, subtitle }: { step: number; title: string; subtitle: string }) => (
  <header className="mb-8 text-center">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block px-3 py-1 mb-4 text-[11px] font-bold tracking-widest uppercase text-accent bg-secondary rounded-full"
    >
      Step {step} of {TOTAL_STEPS}
    </motion.span>
    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight leading-snug">
      {title} <br />
      <span className="text-muted-foreground">{subtitle}</span>
    </h2>
  </header>
);

export default GetQuote;
