import React from 'react';
import { ActivePage } from '../../types';
import { HeartPulse, Mail, Phone, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Care<span className="text-blue-400">Connect</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              "Healthcare made simple." Find the right doctor, book in-person or telehealth appointments, and manage all your family's healthcare in one secure place.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Verified Specialists
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-sky-400" />
                Patient-First Design
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About CareConnect
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prescriptions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Prescriptions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Specializations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  General Physician
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cardiologist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dermatologist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dentist & Oral Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pediatrician
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Urgent Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Support & Contact
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:support@careconnect-demo.org" className="hover:text-white transition-colors">
                  support@careconnect.health
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+18005550199" className="hover:text-white transition-colors">
                  +1 (800) 555-0199 (Mon-Fri 8am-8pm)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Downtown Medical Center, Suite 100</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEmergency}
                className="w-full text-left px-3 py-2 bg-red-950/70 border border-red-800/80 rounded-xl text-xs text-red-300 hover:bg-red-900/60 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="font-semibold">Need Urgent Help?</span>
                <span className="text-[11px] underline group-hover:text-white flex items-center gap-0.5">
                  Emergency Line <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Required Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CareConnect Health Technologies Inc. All rights reserved.</p>

          <div className="p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl max-w-xl text-center md:text-left text-[11px] text-slate-300">
            <strong className="text-amber-400">Important Disclaimer:</strong> This website is a UI/UX demonstration project and is not a real medical service. In case of a real life-threatening emergency, please call 911 or visit your nearest emergency room.
          </div>
        </div>
      </div>
    </footer>
  );
};
