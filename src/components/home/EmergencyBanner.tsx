import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';

interface EmergencyBannerProps {
  onOpenEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergency }) => {
  return (
    <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 mx-auto md:mx-0">
            <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Need urgent help?</h3>
            <p className="text-red-100 text-sm mt-0.5 max-w-xl">
              For life-threatening emergencies, severe injuries, or acute breathing distress, reach medical responders instantly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            id="emergency-banner-action-btn"
            variant="outline"
            size="lg"
            onClick={onOpenEmergency}
            className="bg-white hover:bg-red-50 text-red-700 border-white font-bold shadow-md"
            leftIcon={<PhoneCall className="w-4 h-4 text-red-600" />}
          >
            Emergency Services
          </Button>
        </div>
      </div>
    </section>
  );
};
