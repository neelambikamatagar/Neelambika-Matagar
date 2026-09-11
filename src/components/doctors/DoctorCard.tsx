import React from 'react';
import { Doctor } from '../../types';
import { Star, MapPin, Calendar, Clock, Award, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { motion } from 'motion/react';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookAppointment,
}) => {
  return (
    <motion.div
      id={`doctor-card-${doctor.id}`}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-shadow duration-200 overflow-hidden flex flex-col justify-between"
    >
      <div className="p-5 sm:p-6">
        {/* Doctor Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-100 shadow-xs"
              loading="lazy"
            />
            {doctor.verified && (
              <span
                className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow-xs"
                title="Verified Specialist"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {doctor.specialization}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {doctor.rating} ({doctor.reviewCount})
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
              {doctor.name}
            </h3>
            <p className="text-xs text-slate-500">{doctor.title}</p>

            <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                {doctor.experienceYears}+ years exp
              </span>
            </div>
          </div>
        </div>

        {/* Clinic and Next Available */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.hospital}</span>
          </div>

          <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-emerald-800">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-xs">Available: {doctor.nextAvailable}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
              Instant
            </span>
          </div>
        </div>
      </div>

      {/* Fee & Action Buttons */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Consultation Fee:</span>
          <span className="text-base font-bold text-slate-900">
            {doctor.currencySymbol || '$'}{doctor.consultationFee}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            id={`view-profile-btn-${doctor.id}`}
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(doctor)}
            className="w-full text-xs"
          >
            View Profile
          </Button>

          <Button
            id={`book-apt-btn-${doctor.id}`}
            variant="primary"
            size="sm"
            onClick={() => onBookAppointment(doctor)}
            className="w-full text-xs font-semibold"
            leftIcon={<Calendar className="w-3.5 h-3.5" />}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
