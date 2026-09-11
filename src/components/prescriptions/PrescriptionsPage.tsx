import React, { useState } from 'react';
import { Prescription } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  FileText,
  Download,
  Calendar,
  Pill,
  Clock,
  Printer,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface PrescriptionsPageProps {
  prescriptions: Prescription[];
  onDownloadPrescription: (prescription: Prescription) => void;
  onBackToHome?: () => void;
}

export const PrescriptionsPage: React.FC<PrescriptionsPageProps> = ({
  prescriptions,
  onDownloadPrescription,
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = prescriptions.filter(
    (p) =>
      p.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.medicines.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-4 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            ← Back to Home & Find Doctors
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Prescriptions
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Access digital medical prescriptions, dosage schedules, and clinical instructions.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search medicine or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* List of Prescriptions */}
        <div className="space-y-6">
          {filtered.map((rx) => (
            <div
              key={rx.id}
              id={`prescription-card-${rx.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      {rx.id}
                    </span>
                    <Badge variant="green" size="sm">
                      Verified Rx
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{rx.diagnosis}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Prescribed by <strong className="text-slate-800">{rx.doctorName}</strong> ({rx.doctorSpecialization}) • {rx.hospital}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {rx.date}
                  </span>
                  <Button
                    id={`download-rx-${rx.id}`}
                    variant="primary"
                    size="sm"
                    onClick={() => onDownloadPrescription(rx)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    className="text-xs font-semibold"
                  >
                    Download Prescription
                  </Button>
                </div>
              </div>

              {/* Medicines List */}
              <div className="p-5 sm:p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-600" />
                  Prescribed Medication Schedule ({rx.medicines.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rx.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-sm font-bold text-slate-900">{med.name}</h5>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {med.dosage}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-xs text-slate-600">
                        <p>
                          <strong className="text-slate-700">Frequency:</strong> {med.frequency}
                        </p>
                        <p>
                          <strong className="text-slate-700">Duration:</strong> {med.duration}
                        </p>
                        <p className="text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          "{med.instructions}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes & Refills */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-800">Doctor's Advice:</strong> {rx.notes}
                  </p>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    Refills Remaining: {rx.refillsRemaining}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
