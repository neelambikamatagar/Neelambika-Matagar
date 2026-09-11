import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, PhoneCall, ShieldAlert, HeartPulse, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">Immediate Medical Emergency</h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          If you or someone around you is experiencing chest pain, severe bleeding, difficulty breathing, or loss of consciousness, <strong className="text-red-600 font-semibold">call emergency services immediately</strong>.
        </p>

        {/* Demo Disclaimer Banner */}
        <div className="my-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-3 text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong>CareConnect Demonstration Disclaimer:</strong> CareConnect is a portfolio demonstration web application and does NOT provide active emergency triage, real-time dispatches, or emergency care.
          </div>
        </div>

        {/* Emergency Hotlines */}
        <div className="space-y-2.5 text-left mb-6">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                911
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">National Emergency Services (US / Canada)</p>
                <p className="text-xs text-slate-500">Ambulance, Fire, Police</p>
              </div>
            </div>
            <a
              href="tel:911"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call 911
            </a>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                112
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">European Emergency Hotline (EU / International)</p>
                <p className="text-xs text-slate-500">Universal Emergency Response</p>
              </div>
            </div>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call 112
            </a>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Suicide & Crisis Lifeline</p>
                <p className="text-xs text-slate-500">Free, confidential 24/7 mental health crisis care</p>
              </div>
            </div>
            <a
              href="tel:988"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call 988
            </a>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <Button variant="outline" size="md" onClick={onClose} className="w-full">
            Understood & Return
          </Button>
        </div>
      </div>
    </Modal>
  );
};
