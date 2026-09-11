import React from 'react';
import { Doctor } from '../../types';
import { DoctorCard } from '../doctors/DoctorCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { motion } from 'motion/react';

interface FeaturedDoctorsSectionProps {
  doctors: Doctor[];
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
  onViewAllDoctors: () => void;
}

export const FeaturedDoctorsSection: React.FC<FeaturedDoctorsSectionProps> = ({
  doctors,
  onViewProfile,
  onBookAppointment,
  onViewAllDoctors,
}) => {
  // Show top 4 featured doctors
  const featured = doctors.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Top Rated Specialists
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Doctors Available Today
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
              Book same-day or upcoming consultations with accredited clinicians across primary care, cardiology, dermatology, and pediatrics.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={onViewAllDoctors}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All Doctors ({doctors.length})
          </Button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewProfile={onViewProfile}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
