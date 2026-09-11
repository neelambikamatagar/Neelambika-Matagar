import React from 'react';
import { UserProfile, Appointment, Prescription, Doctor, ActivePage } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Calendar,
  Clock,
  FileText,
  BellRing,
  HeartPulse,
  ArrowRight,
  Plus,
  ShieldCheck,
  Video,
  MapPin,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

interface PatientDashboardProps {
  userProfile: UserProfile;
  appointments: Appointment[];
  prescriptions: Prescription[];
  doctors: Doctor[];
  onNavigate: (page: ActivePage) => void;
  onViewDoctor: (doc: Doctor) => void;
  onBookDoctor: (doc: Doctor) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  userProfile,
  appointments,
  prescriptions,
  doctors,
  onNavigate,
  onViewDoctor,
  onBookDoctor,
}) => {
  const upcomingAppointments = appointments.filter((a) => a.status === 'Upcoming');
  const nextAppointment = upcomingAppointments[0];

  // Recommended doctors
  const recommendedDoctors = doctors.slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Good morning, {userProfile.name.split(' ')[0]}
                </h1>
                <span className="hidden sm:inline text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Health Pass
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Here is your health summary, upcoming consultations, and medical records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              id="dashboard-book-btn"
              variant="primary"
              size="md"
              onClick={() => onNavigate('doctors')}
              leftIcon={<Plus className="w-4 h-4" />}
              className="font-semibold shadow-xs"
            >
              Book New Doctor
            </Button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Upcoming appointment */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Upcoming Visit
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {upcomingAppointments.length}
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              {nextAppointment ? nextAppointment.date : 'No upcoming visits'}
            </p>
          </div>

          {/* Card 2: Total appointments */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Visits
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{appointments.length}</div>
            <p className="text-xs text-slate-500 mt-1">Consultations on record</p>
          </div>

          {/* Card 3: Prescriptions */}
          <div
            onClick={() => onNavigate('prescriptions')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Prescriptions
              </span>
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{prescriptions.length}</div>
            <p className="text-xs text-slate-500 mt-1">Active medication plans</p>
          </div>

          {/* Card 4: Health reminders */}
          <div
            onClick={() => onNavigate('notifications')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Reminders
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <BellRing className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">2</div>
            <p className="text-xs text-slate-500 mt-1">Checkups due this month</p>
          </div>
        </div>

        {/* Next Appointment Spotlight (if any) */}
        {nextAppointment && (
          <div className="mb-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next Scheduled Consultation</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {nextAppointment.doctorName}
                </h3>
                <p className="text-blue-100 text-sm font-medium">
                  {nextAppointment.doctorSpecialization} • {nextAppointment.hospital}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-white/90 pt-1">
                  <span className="flex items-center gap-1.5 font-semibold bg-black/15 px-3 py-1.5 rounded-xl">
                    <Calendar className="w-4 h-4" />
                    {nextAppointment.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold bg-black/15 px-3 py-1.5 rounded-xl">
                    <Clock className="w-4 h-4" />
                    {nextAppointment.time}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold bg-black/15 px-3 py-1.5 rounded-xl">
                    {nextAppointment.visitType === 'Video Consultation' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    {nextAppointment.visitType}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('appointments')}
                  className="bg-white text-blue-700 hover:bg-blue-50 border-white font-bold"
                >
                  Manage Appointment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Two-column layout: Recent Appointments & Recommended Doctors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Recent Appointments</h3>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all ({appointments.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.slice(0, 4).map((apt) => (
                <div key={apt.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={apt.doctorImage}
                      alt={apt.doctorName}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {apt.doctorName}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{apt.doctorSpecialization}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {apt.date} • {apt.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Badge
                      variant={
                        apt.status === 'Upcoming'
                          ? 'blue'
                          : apt.status === 'Completed'
                          ? 'green'
                          : 'red'
                      }
                      size="sm"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Doctors */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Recommended Specialists</h3>
              <button
                onClick={() => onNavigate('doctors')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Browse all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {recommendedDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                      <span className="text-[11px] text-blue-600 font-medium truncate block">
                        {doc.specialization}
                      </span>
                      <p className="text-[10px] text-slate-500 truncate">★ {doc.rating} • ${doc.consultationFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDoctor(doc)}
                      className="text-[11px] px-2 py-1 min-h-[28px]"
                    >
                      Profile
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onBookDoctor(doc)}
                      className="text-[11px] px-2 py-1 min-h-[28px]"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Health Actions Banner */}
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => onNavigate('prescriptions')}
                  className="p-2 bg-white rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 text-left border border-slate-200"
                >
                  📄 View Prescriptions
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className="p-2 bg-white rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 text-left border border-slate-200"
                >
                  ⚙️ Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
