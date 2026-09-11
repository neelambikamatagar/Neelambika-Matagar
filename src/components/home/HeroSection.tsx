import React, { useState } from 'react';
import { Search, MapPin, Stethoscope, ShieldCheck, Star, Users, CalendarCheck2 } from 'lucide-react';
import { Button } from '../common/Button';
import { SpecializationType } from '../../types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onSearch: (query: string, specialization: string, location: string) => void;
  onSelectSpecialization: (spec: SpecializationType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectSpecialization,
}) => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [location, setLocation] = useState('New York, NY');

  const popularSpecialties: SpecializationType[] = [
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Dentist',
    'Pediatrician',
    'Neurologist',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchDoctor, selectedSpecialty, location);
  };

  return (
    <section id="home-section" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50">
      {/* Decorative animated background glow accents */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Over 1,200+ Verified Doctors & Specialists</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Healthcare made <span className="text-blue-600">simple</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Find the right doctor, book an appointment, and manage your healthcare in one place.
          </motion.p>

          {/* Search bar container */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 sm:mt-10 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 text-left"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Doctor / Keyword input */}
              <div className="md:col-span-4 relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="hero-search-doctor"
                  type="text"
                  placeholder="Doctor name, condition..."
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Specialization selector */}
              <div className="md:col-span-3 relative flex items-center">
                <Stethoscope className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <select
                  id="hero-select-specialization"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="">All Specializations</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                </select>
              </div>

              {/* Location input */}
              <div className="md:col-span-3 relative flex items-center">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="hero-location-input"
                  type="text"
                  placeholder="Location or Zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="md:col-span-2">
                <Button
                  id="hero-find-doctor-btn"
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-semibold shadow-md"
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  Find a Doctor
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Popular Specializations pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs"
          >
            <span className="text-slate-500 font-medium mr-1">Popular Specialties:</span>
            {popularSpecialties.map((spec) => (
              <motion.button
                key={spec}
                id={`hero-pill-${spec.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectSpecialization(spec)}
                className="px-3 py-1.5 bg-white hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium rounded-full border border-slate-200 hover:border-blue-300 shadow-2xs transition-colors cursor-pointer"
              >
                {spec}
              </motion.button>
            ))}
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200/80 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 justify-center text-left p-2 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">50,000+</p>
                <p className="text-xs text-slate-500">Patients Treated</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 justify-center text-left p-2 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">1,200+</p>
                <p className="text-xs text-slate-500">Verified Doctors</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 justify-center text-left p-2 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">Average Rating</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 justify-center text-left p-2 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <CalendarCheck2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">2 Mins</p>
                <p className="text-xs text-slate-500">Fast Online Booking</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
