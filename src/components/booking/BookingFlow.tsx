import React, { useState, useMemo } from 'react';
import { Doctor, Appointment, UserProfile } from '../../types';
import { Button } from '../common/Button';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Stethoscope,
  MapPin,
  Sparkles,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFlowProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  userProfile: UserProfile | null;
  onBookingConfirmed: (appointment: Appointment) => void;
  onCancel: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor,
  userProfile,
  onBookingConfirmed,
  onCancel,
}) => {
  // Mode: 'all-in-one' (all on one page) or 'wizard' (step by step)
  const [bookingMode, setBookingMode] = useState<'all-in-one' | 'wizard'>('all-in-one');
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  // Default to pre-selected doctor, or first doctor
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(
    selectedDoctor || doctors[0] || null
  );

  // Step for wizard mode (1 to 5)
  const [step, setStep] = useState<number>(selectedDoctor ? 2 : 1);

  // Generate available dates for the next 10 days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const iso = d.toISOString().split('T')[0];
      dates.push({
        iso,
        dayName,
        monthName,
        dayNum,
        fullFormatted: `${dayName}, ${monthName} ${dayNum}, ${d.getFullYear()}`,
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.iso || '');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [visitType, setVisitType] = useState<'In-person' | 'Video Consultation'>('In-person');

  // Patient Info Form
  const [patientName, setPatientName] = useState(userProfile?.name || 'Alex Morgan');
  const [patientEmail, setPatientEmail] = useState(userProfile?.email || 'alex.morgan@example.com');
  const [patientPhone, setPatientPhone] = useState(userProfile?.phone || '+1 (555) 382-9912');
  const [reason, setReason] = useState('Routine health evaluation & consultation');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Standard time slots
  const morningSlots = ['09:00 AM', '10:00 AM', '11:30 AM'];
  const afternoonSlots = ['02:00 PM', '03:30 PM', '04:00 PM', '05:00 PM'];

  const validatePatientInfo = () => {
    const errors: { [key: string]: string } = {};
    if (!patientName.trim()) errors.patientName = 'Please enter patient full name';
    if (!patientEmail.trim() || !patientEmail.includes('@'))
      errors.patientEmail = 'Valid email address is required';
    if (!patientPhone.trim()) errors.patientPhone = 'Contact phone number is required';
    if (!reason.trim()) errors.reason = 'Please briefly state the reason for visit';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !currentDoctor) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3 && !selectedTime) return;
    if (step === 4) {
      if (!validatePatientInfo()) return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    if (!currentDoctor) {
      alert('Please select a doctor');
      return;
    }
    if (!validatePatientInfo()) {
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedDateObj = availableDates.find((d) => d.iso === selectedDate);
      const newAppointment: Appointment = {
        id: `CC-${Math.floor(10000 + Math.random() * 90000)}`,
        doctorId: currentDoctor.id,
        doctorName: currentDoctor.name,
        doctorSpecialization: currentDoctor.specialization,
        doctorImage: currentDoctor.image,
        hospital: currentDoctor.hospital,
        date: selectedDateObj ? selectedDateObj.fullFormatted : selectedDate,
        time: selectedTime,
        patientName,
        patientEmail,
        patientPhone,
        reason,
        visitType,
        status: 'Upcoming',
        fee: currentDoctor.consultationFee,
        currencySymbol: currentDoctor.currencySymbol || '$',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setIsSubmitting(false);
      onBookingConfirmed(newAppointment);
    }, 600);
  };

  const stepsList = [
    { num: 1, title: 'Doctor' },
    { num: 2, title: 'Date' },
    { num: 3, title: 'Time' },
    { num: 4, title: 'Patient' },
    { num: 5, title: 'Summary' },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top bar with Cancel and Mode Switcher */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            ← Cancel & Return
          </button>

          {/* View Toggle: All-in-One vs Wizard */}
          <div className="inline-flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setBookingMode('all-in-one')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                bookingMode === 'all-in-one'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All-in-One (One Page)</span>
            </button>
            <button
              onClick={() => setBookingMode('wizard')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                bookingMode === 'wizard'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Step-by-Step Wizard</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {bookingMode === 'all-in-one'
              ? 'Select your preferred date, time slot, and patient details all on this single page.'
              : `Step ${step} of 5 — follow the guided flow to schedule your visit.`}
          </p>
        </div>

        {/* ALL-IN-ONE VIEW (Everything on one single page) */}
        {bookingMode === 'all-in-one' && currentDoctor && (
          <div className="space-y-6">
            {/* Selected Doctor Banner Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{currentDoctor.name}</h3>
                    <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      {currentDoctor.specialization}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {currentDoctor.hospital}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">
                    Consultation Fee:{' '}
                    <span className="text-blue-600 font-bold">
                      {currentDoctor.currencySymbol || '$'}{currentDoctor.consultationFee}
                    </span>
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDoctorModalOpen(true)}
                className="text-xs self-start sm:self-center"
              >
                Change Doctor
              </Button>
            </div>

            {/* 2-Column Booking Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Date & Time & Format */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Visit Format */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    1. Consultation Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVisitType('In-person')}
                      className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                        visitType === 'In-person'
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-sm font-semibold">🏥 In-Person Visit</div>
                      <div className="text-xs text-slate-500 mt-0.5">At clinic facility</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitType('Video Consultation')}
                      className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                        visitType === 'Video Consultation'
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-sm font-semibold">💻 Video Call</div>
                      <div className="text-xs text-slate-500 mt-0.5">Secure telehealth link</div>
                    </button>
                  </div>
                </div>

                {/* 2. Select Date */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      2. Select Date (Next 10 Days)
                    </label>
                    <span className="text-xs font-semibold text-blue-600">
                      {availableDates.find((d) => d.iso === selectedDate)?.fullFormatted}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {availableDates.slice(0, 10).map((item) => {
                      const isSelected = selectedDate === item.iso;
                      return (
                        <button
                          key={item.iso}
                          id={`quick-date-${item.iso}`}
                          onClick={() => setSelectedDate(item.iso)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
                              : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-80">
                            {item.dayName}
                          </span>
                          <span className="block text-lg font-extrabold my-0.5">{item.dayNum}</span>
                          <span className="block text-[10px] opacity-80">{item.monthName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Select Time */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    3. Select Available Time
                  </label>

                  {/* Morning */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 mb-2 block flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Morning Slots
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {morningSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            id={`quick-time-${slot.replace(/[\s:]/g, '-')}`}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 px-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div>
                    <span className="text-xs font-semibold text-slate-500 mb-2 block flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      Afternoon Slots
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {afternoonSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            id={`quick-time-${slot.replace(/[\s:]/g, '-')}`}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 px-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Patient Details & Instant Confirm */}
              <div className="lg:col-span-5 space-y-6">
                {/* 4. Patient Information */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    4. Patient Information
                  </label>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="allinone-patient-name"
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full pl-10 pr-3 py-2 text-sm text-slate-900 rounded-xl border ${
                            formErrors.patientName ? 'border-red-400 bg-red-50/40' : 'border-slate-200'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50`}
                        />
                      </div>
                      {formErrors.patientName && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.patientName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="allinone-patient-phone"
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full pl-10 pr-3 py-2 text-sm text-slate-900 rounded-xl border ${
                            formErrors.patientPhone ? 'border-red-400 bg-red-50/40' : 'border-slate-200'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50`}
                        />
                      </div>
                      {formErrors.patientPhone && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.patientPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="allinone-patient-email"
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className={`w-full pl-10 pr-3 py-2 text-sm text-slate-900 rounded-xl border ${
                            formErrors.patientEmail ? 'border-red-400 bg-red-50/40' : 'border-slate-200'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50`}
                        />
                      </div>
                      {formErrors.patientEmail && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.patientEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Reason for Visit *
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <textarea
                          id="allinone-patient-reason"
                          rows={2}
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Briefly describe symptoms or reason..."
                          className={`w-full pl-10 pr-3 py-2 text-sm text-slate-900 rounded-xl border ${
                            formErrors.reason ? 'border-red-400 bg-red-50/40' : 'border-slate-200'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50`}
                        />
                      </div>
                      {formErrors.reason && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.reason}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 5. Summary & Instant Confirm */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    5. Cost & Confirmation
                  </h4>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Doctor Consultation Fee</span>
                      <span className="font-semibold text-slate-900">
                        {currentDoctor.currencySymbol || '$'}{currentDoctor.consultationFee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Booking Fee</span>
                      <span className="font-semibold text-emerald-600">
                        FREE ({currentDoctor.currencySymbol || '$'}0)
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between text-sm">
                      <span className="font-bold text-slate-900">Total Consultation:</span>
                      <span className="font-extrabold text-blue-600 text-lg">
                        {currentDoctor.currencySymbol || '$'}{currentDoctor.consultationFee}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Pay at clinic check-in or via insurance. No upfront payment required.</span>
                  </div>

                  <Button
                    id="allinone-confirm-booking-btn"
                    variant="primary"
                    size="lg"
                    onClick={handleConfirmBooking}
                    isLoading={isSubmitting}
                    className="w-full font-bold shadow-md shadow-blue-500/20"
                    leftIcon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Confirm & Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WIZARD VIEW (For users who prefer step-by-step) */}
        {bookingMode === 'wizard' && (
          <div>
            {/* Step Progress Indicator */}
            <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                {stepsList.map((s, idx) => {
                  const isCompleted = step > s.num;
                  const isCurrent = step === s.num;
                  return (
                    <React.Fragment key={s.num}>
                      <div
                        onClick={() => {
                          if (step > s.num) setStep(s.num);
                        }}
                        className={`flex items-center gap-2 cursor-pointer ${
                          step > s.num ? 'hover:opacity-80' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                        </div>
                        <span
                          className={`hidden sm:inline text-xs font-semibold ${
                            isCurrent
                              ? 'text-blue-600 font-bold'
                              : isCompleted
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      {idx < stepsList.length - 1 && (
                        <div className="flex-1 h-1 mx-2 sm:mx-4 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 rounded-full"
                            initial={false}
                            animate={{ width: step > s.num ? '100%' : '0%' }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Step Content Container */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {/* STEP 1: SELECT DOCTOR */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Step 1: Select a Doctor</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose a qualified specialist for your consultation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                      {doctors.map((doc) => {
                        const isSelected = currentDoctor?.id === doc.id;
                        return (
                          <div
                            key={doc.id}
                            onClick={() => {
                              setCurrentDoctor(doc);
                              onSelectDoctor(doc);
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                                  {doc.specialization}
                                </span>
                                <span className="text-xs font-bold text-slate-900">
                                  {doc.currencySymbol || '$'}{doc.consultationFee}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
                                {doc.name}
                              </h4>
                              <p className="text-xs text-slate-500 truncate">{doc.hospital}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SELECT DATE */}
                {step === 2 && currentDoctor && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Step 2: Select Date</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Consultation with{' '}
                          <strong className="text-slate-800">{currentDoctor.name}</strong> (
                          {currentDoctor.specialization})
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
                      >
                        Change doctor
                      </button>
                    </div>

                    {/* Consultation Format Choice */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Visit Format
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setVisitType('In-person')}
                          className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                            visitType === 'In-person'
                              ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-sm">🏥 In-Person Clinic Visit</div>
                          <div className="text-xs text-slate-500 mt-0.5">At {currentDoctor.hospital}</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setVisitType('Video Consultation')}
                          className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                            visitType === 'Video Consultation'
                              ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-sm">💻 Telehealth Video Call</div>
                          <div className="text-xs text-slate-500 mt-0.5">Secure HD video conference link</div>
                        </button>
                      </div>
                    </div>

                    {/* Available Days Calendar Grid */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                        Available Dates (Next 10 Days)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                        {availableDates.map((item) => {
                          const isSelected = selectedDate === item.iso;
                          return (
                            <button
                              key={item.iso}
                              id={`date-slot-${item.iso}`}
                              onClick={() => setSelectedDate(item.iso)}
                              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-80">
                                {item.dayName}
                              </span>
                              <span className="block text-xl font-extrabold my-0.5">{item.dayNum}</span>
                              <span className="block text-[11px] opacity-80">{item.monthName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SELECT TIME */}
                {step === 3 && currentDoctor && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Step 3: Select Available Time</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Selected Date:{' '}
                        <strong className="text-slate-800">
                          {availableDates.find((d) => d.iso === selectedDate)?.fullFormatted ||
                            selectedDate}
                        </strong>
                      </p>
                    </div>

                    {/* Morning Slots */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        Morning Slots
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {morningSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              id={`time-slot-${slot.replace(/[\s:]/g, '-')}`}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3 px-4 rounded-xl border text-center text-sm font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                                  : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon Slots */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Afternoon & Evening Slots
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {afternoonSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              id={`time-slot-${slot.replace(/[\s:]/g, '-')}`}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3 px-4 rounded-xl border text-center text-sm font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                                  : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PATIENT INFORMATION */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Step 4: Enter Patient Information
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Please verify patient contact details for appointment reminders.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <input
                            id="patient-name-input"
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-xl border ${
                              formErrors.patientName ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.patientName && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.patientName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <input
                            id="patient-phone-input"
                            type="tel"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-xl border ${
                              formErrors.patientPhone ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.patientPhone && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.patientPhone}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <input
                            id="patient-email-input"
                            type="email"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            placeholder="alex.morgan@example.com"
                            className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-xl border ${
                              formErrors.patientEmail ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.patientEmail && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.patientEmail}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Reason for Visit *
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                          <textarea
                            id="patient-reason-input"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please describe symptoms, follow-up needs, or concerns..."
                            className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-xl border ${
                              formErrors.reason ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.reason && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.reason}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: SUMMARY */}
                {step === 5 && currentDoctor && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Step 5: Appointment Summary</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Review all booking details before final confirmation.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200">
                        <img
                          src={currentDoctor.image}
                          alt={currentDoctor.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{currentDoctor.name}</h4>
                          <p className="text-blue-600 font-medium text-xs">
                            {currentDoctor.specialization}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5">{currentDoctor.hospital}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 font-medium block">Date & Time</span>
                          <p className="font-semibold text-slate-800 text-sm mt-0.5">
                            {availableDates.find((d) => d.iso === selectedDate)?.fullFormatted ||
                              selectedDate}{' '}
                            at {selectedTime}
                          </p>
                        </div>

                        <div>
                          <span className="text-slate-400 font-medium block">Format</span>
                          <p className="font-semibold text-slate-800 text-sm mt-0.5">{visitType}</p>
                        </div>

                        <div>
                          <span className="text-slate-400 font-medium block">Patient</span>
                          <p className="font-semibold text-slate-800 mt-0.5">{patientName}</p>
                          <p className="text-slate-500">{patientPhone}</p>
                        </div>

                        <div>
                          <span className="text-slate-400 font-medium block">Reason for Visit</span>
                          <p className="text-slate-800 mt-0.5 font-medium">{reason}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-600">Doctor Consultation Fee:</span>
                        <span className="text-lg font-extrabold text-slate-900">
                          {currentDoctor.currencySymbol || '$'}{currentDoctor.consultationFee}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wizard Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleBack}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Previous Step
                  </Button>
                ) : (
                  <Button variant="ghost" size="md" onClick={onCancel}>
                    Cancel
                  </Button>
                )}

                {step < 5 ? (
                  <Button
                    id="booking-next-step-btn"
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    disabled={step === 1 && !currentDoctor}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                    className="font-semibold"
                  >
                    Continue to Step {step + 1}
                  </Button>
                ) : (
                  <Button
                    id="booking-confirm-appointment-btn"
                    variant="primary"
                    size="lg"
                    onClick={handleConfirmBooking}
                    isLoading={isSubmitting}
                    className="font-bold px-8 shadow-md"
                    leftIcon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Confirm Appointment
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Change Doctor Modal */}
        {isDoctorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Select Specialist</h3>
                <button
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto py-4 flex-1">
                {doctors.map((doc) => {
                  const isCurrent = currentDoctor?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setCurrentDoctor(doc);
                        onSelectDoctor(doc);
                        setIsDoctorModalOpen(false);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                          {doc.specialization}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1 truncate">{doc.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{doc.hospital}</p>
                        <p className="text-[11px] font-bold text-slate-800 mt-0.5">
                          {doc.currencySymbol || '$'}{doc.consultationFee}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 text-right">
                <Button variant="outline" size="sm" onClick={() => setIsDoctorModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
