import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  FileText,
  User,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Stethoscope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyAppointmentsPageProps {
  appointments: Appointment[];
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
  onCancelAppointment: (appointmentId: string, reason?: string) => void;
  onBookNew: () => void;
  onBackToHome?: () => void;
}

export const MyAppointmentsPage: React.FC<MyAppointmentsPageProps> = ({
  appointments,
  onReschedule,
  onCancelAppointment,
  onBookNew,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<AppointmentStatus>('Upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  // Reschedule state
  const [rescheduleDate, setRescheduleDate] = useState('2026-09-25');
  const [rescheduleTime, setRescheduleTime] = useState('11:30 AM');

  // Cancel reason state
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const filteredAppointments = appointments.filter((apt) => apt.status === activeTab);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Upcoming':
        return <Badge variant="blue" icon={<Clock className="w-3 h-3" />}>Upcoming</Badge>;
      case 'Completed':
        return <Badge variant="green" icon={<CheckCircle2 className="w-3 h-3" />}>Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="red" icon={<XCircle className="w-3 h-3" />}>Cancelled</Badge>;
    }
  };

  const handleOpenDetails = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsDetailsOpen(true);
  };

  const handleOpenReschedule = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsRescheduleOpen(true);
  };

  const handleOpenCancel = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsCancelConfirmOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (!selectedAppointment) return;
    onReschedule(selectedAppointment.id, rescheduleDate, rescheduleTime);
    setIsRescheduleOpen(false);
    setSelectedAppointment(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;
    onCancelAppointment(selectedAppointment.id, cancelReason);
    setIsCancelConfirmOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Return to Home / Doctors bar */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-4 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            ← Back to Home & Find Doctors
          </button>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Appointments
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your upcoming consultations, view visit notes, or reschedule appointments.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={onBookNew}
            className="font-semibold shadow-xs"
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Book New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8 pb-1">
          {(['Upcoming', 'Completed', 'Cancelled'] as AppointmentStatus[]).map((tab) => {
            const count = appointments.filter((a) => a.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Appointments List */}
        <AnimatePresence mode="wait">
          {filteredAppointments.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {filteredAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  id={`appointment-card-${apt.id}`}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <img
                        src={apt.doctorImage}
                        alt={apt.doctorName}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900">{apt.doctorName}</h3>
                          {getStatusBadge(apt.status)}
                        </div>
                        <p className="text-xs font-semibold text-blue-600">
                          {apt.doctorSpecialization}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {apt.hospital}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono text-slate-400 block">{apt.id}</span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {apt.currencySymbol || '$'}{apt.fee}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{apt.visitType}</span>
                    </div>
                  </div>

                  {/* Appointment Schedule & Actions */}
                  <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{apt.patientName}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        id={`apt-view-details-${apt.id}`}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDetails(apt)}
                        className="text-xs"
                      >
                        View Details
                      </Button>

                      {apt.status === 'Upcoming' && (
                        <>
                          <Button
                            id={`apt-reschedule-${apt.id}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenReschedule(apt)}
                            className="text-xs text-blue-600 hover:bg-blue-50"
                          >
                            Reschedule
                          </Button>
                          <Button
                            id={`apt-cancel-${apt.id}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenCancel(apt)}
                            className="text-xs text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${activeTab}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyState
                icon={<CalendarDays className="w-8 h-8 text-blue-600" />}
                title={`No ${activeTab.toLowerCase()} appointments`}
                description={
                  activeTab === 'Upcoming'
                    ? "You don't have any scheduled appointments right now. Find a specialist to book your next consultation."
                    : `You currently have no ${activeTab.toLowerCase()} appointments on record.`
                }
                actionLabel={activeTab === 'Upcoming' ? 'Find a Doctor' : undefined}
                onAction={activeTab === 'Upcoming' ? onBookNew : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Details Modal */}
        {selectedAppointment && (
          <Modal
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            title="Appointment Details"
            subtitle={`Booking Reference: ${selectedAppointment.id}`}
            maxWidth="lg"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src={selectedAppointment.doctorImage}
                  alt={selectedAppointment.doctorName}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-slate-900">{selectedAppointment.doctorName}</h3>
                  <p className="text-xs font-semibold text-blue-600">
                    {selectedAppointment.doctorSpecialization}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedAppointment.hospital}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-400 block font-medium">Status</span>
                  <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-400 block font-medium">Visit Format</span>
                  <span className="font-bold text-slate-800 block mt-1">
                    {selectedAppointment.visitType}
                  </span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-400 block font-medium">Scheduled Date</span>
                  <span className="font-bold text-slate-800 block mt-1">
                    {selectedAppointment.date}
                  </span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-400 block font-medium">Scheduled Time</span>
                  <span className="font-bold text-slate-800 block mt-1">
                    {selectedAppointment.time}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-slate-700">
                  Patient Information
                </h4>
                <p className="text-slate-600">
                  <strong>Name:</strong> {selectedAppointment.patientName}
                </p>
                <p className="text-slate-600">
                  <strong>Phone:</strong> {selectedAppointment.patientPhone}
                </p>
                <p className="text-slate-600">
                  <strong>Email:</strong> {selectedAppointment.patientEmail}
                </p>
                {selectedAppointment.reason && (
                  <p className="text-slate-600 pt-1">
                    <strong>Reason for Consultation:</strong> {selectedAppointment.reason}
                  </p>
                )}
                {selectedAppointment.notes && (
                  <p className="text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <strong>Doctor Notes:</strong> {selectedAppointment.notes}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Reschedule Modal */}
        {selectedAppointment && (
          <Modal
            isOpen={isRescheduleOpen}
            onClose={() => setIsRescheduleOpen(false)}
            title="Reschedule Appointment"
            subtitle={`Select a new slot with ${selectedAppointment.doctorName}`}
            maxWidth="md"
          >
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select New Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setRescheduleTime(slot)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        rescheduleTime === slot
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsRescheduleOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmReschedule}
                  className="font-semibold"
                >
                  Save New Time
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Cancel Confirmation Modal */}
        {selectedAppointment && (
          <Modal
            isOpen={isCancelConfirmOpen}
            onClose={() => setIsCancelConfirmOpen(false)}
            title="Cancel Appointment"
            maxWidth="sm"
          >
            <div className="space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto sm:mx-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Are you sure you want to cancel?
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your appointment with {selectedAppointment.doctorName} on{' '}
                  {selectedAppointment.date} at {selectedAppointment.time} will be removed.
                </p>
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cancellation Reason:
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="Schedule conflict">Schedule conflict</option>
                  <option value="Feeling better / No longer needed">
                    Feeling better / No longer needed
                  </option>
                  <option value="Found alternative doctor">Found alternative doctor</option>
                  <option value="Personal emergency">Personal emergency</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsCancelConfirmOpen(false)}>
                  Keep Appointment
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleConfirmCancel}
                  className="font-semibold"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
