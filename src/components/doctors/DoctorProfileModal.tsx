import React from 'react';
import { Doctor } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Award,
  GraduationCap,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
} from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  if (!doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            {doctor.verified && (
              <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                {doctor.specialization}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {doctor.rating} ({doctor.reviewCount} patient reviews)
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                {doctor.experienceYears} Years Experience
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {doctor.name}
            </h2>
            <p className="text-sm text-slate-500 font-medium">{doctor.title}</p>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs text-slate-600">
              <span className="flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                {doctor.hospital}
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 font-semibold text-slate-900">
                Consultation: ${doctor.consultationFee}
              </span>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
            About Doctor
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {doctor.about}
          </p>
        </div>

        {/* Grid of Qualifications, Languages & Hospital */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Education */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Education & Certifications
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages & Location */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                Languages Spoken
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {doctor.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Clinic Location
              </h4>
              <p className="text-xs text-slate-600">{doctor.location}</p>
            </div>
          </div>
        </div>

        {/* Schedule & Availability */}
        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Available Days
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {doctor.availableDays.map((day, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white text-blue-800 text-xs font-semibold rounded-lg border border-blue-200 shadow-2xs"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Available Time Slots
            </h4>
            <div className="flex flex-wrap gap-2">
              {doctor.availableTimeSlots.map((slot, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white text-slate-700 text-xs font-medium rounded-lg border border-slate-200"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-500 block">Total consultation fee</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {doctor.currencySymbol || '$'}{doctor.consultationFee}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" size="md" onClick={onClose} className="w-1/2 sm:w-auto">
              Close
            </Button>
            <Button
              id="profile-modal-book-btn"
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onBookAppointment(doctor);
              }}
              className="w-1/2 sm:w-auto font-semibold px-6"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
