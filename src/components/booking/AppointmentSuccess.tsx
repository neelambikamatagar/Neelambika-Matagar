import React from 'react';
import { Appointment } from '../../types';
import { CheckCircle2, Calendar, Clock, MapPin, User, FileText, Download, ArrowRight, Home } from 'lucide-react';
import { Button } from '../common/Button';
import { motion } from 'motion/react';

interface AppointmentSuccessProps {
  appointment: Appointment;
  onViewAppointments: () => void;
  onBackToHome: () => void;
}

export const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({
  appointment,
  onViewAppointments,
  onBackToHome,
}) => {
  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-10"
        >
          {/* Animated Success Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 240, delay: 0.15 }}
            className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Booking Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Appointment booked successfully!
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto">
              A confirmation email & SMS has been dispatched with your clinical check-in instructions.
            </p>

            {/* Appointment ID Ticket Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <span>Appointment ID:</span>
              <strong className="text-blue-600 font-bold tracking-wider">{appointment.id}</strong>
            </div>
          </motion.div>

          {/* Detailed Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-left space-y-4"
          >
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <img
                src={appointment.doctorImage}
                alt={appointment.doctorName}
                className="w-16 h-16 rounded-xl object-cover border border-white shadow-xs"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{appointment.doctorName}</h3>
                <p className="text-xs font-semibold text-blue-600">{appointment.doctorSpecialization}</p>
                <p className="text-xs text-slate-500 mt-0.5">{appointment.hospital}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Date & Time</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{appointment.date} at {appointment.time}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Patient Name</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>{appointment.patientName}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Consultation Type</span>
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                  {appointment.visitType}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Consultation Fee</span>
                <span className="font-bold text-slate-900">
                  {appointment.currencySymbol || '$'}{appointment.fee} (Pay at clinic)
                </span>
              </div>
            </div>

            {appointment.reason && (
              <div className="pt-3 border-t border-slate-200 text-xs">
                <span className="text-slate-400 font-medium block mb-1">Reason for Visit:</span>
                <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                  {appointment.reason}
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              id="success-view-appointment-btn"
              variant="primary"
              size="lg"
              onClick={onViewAppointments}
              className="w-full sm:w-auto font-semibold px-6"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Appointment
            </Button>

            <Button
              id="success-home-btn"
              variant="outline"
              size="lg"
              onClick={onBackToHome}
              className="w-full sm:w-auto"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Back to Home
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handlePrintSlip}
              className="w-full sm:w-auto text-slate-600"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Slip
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
