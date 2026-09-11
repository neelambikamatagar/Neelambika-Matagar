import React from 'react';
import { Button } from '../common/Button';
import {
  HeartPulse,
  ShieldCheck,
  Search,
  CalendarCheck,
  Video,
  Users,
  Award,
  Sparkles,
  Lock,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onFindDoctors: () => void;
  onOpenEmergency: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onFindDoctors, onOpenEmergency }) => {
  return (
    <div id="about-section" className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <HeartPulse className="w-4 h-4 text-blue-600" />
            Empowering Modern Healthcare
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connecting Patients with Compassionate, Board-Certified Care
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            CareConnect transforms how individuals and families discover healthcare specialists, schedule consultations, and maintain active medical records.
          </p>
        </div>

        {/* 3 Core Pillars: What CareConnect Does & Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">What CareConnect Does</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              CareConnect is a unified digital health access ecosystem that bridges patients and verified physicians. Patients can filter through medical specializations, examine practitioner credentials and patient ratings, select in-person or telehealth visit formats, and schedule appointments with real-time calendar synchronization.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Core Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our mission is to eliminate healthcare barriers, unnecessary clinic wait times, and administrative friction. We believe finding a qualified specialist should be as simple and dependable as booking any modern everyday service — transparent, secure, and respectful of patient time.
            </p>
          </div>
        </div>

        {/* How It Works (3 Simple Steps) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Seamless Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              How CareConnect Works
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Three transparent steps from search to personalized clinical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg mx-auto sm:mx-0 shadow-md shadow-blue-500/20">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">1. Discover & Filter</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Filter by medical specialty, experience years, patient reviews, and clinic location to find the perfect specialist.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-lg mx-auto sm:mx-0 shadow-md shadow-sky-500/20">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">2. Select Date & Slot</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                View instant real-time doctor availability and choose an exact time slot that aligns with your busy schedule.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg mx-auto sm:mx-0 shadow-md shadow-emerald-500/20">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">3. Receive Care & Records</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Attend your clinic or telehealth session. Access instant digital prescriptions and follow-up guidance in your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Why Patients Can Use & Trust the Platform */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 space-y-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why Patients Trust CareConnect
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              We uphold the highest clinical vetting and privacy standards to protect patient wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="text-sm font-bold text-white">100% Vetted Credentials</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Medical boards, state licensing, and hospital privileges are verified prior to listing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Lock className="w-6 h-6 text-sky-400" />
              <h4 className="text-sm font-bold text-white">Private & Secure Health Data</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Patient notes, personal details, and clinical documentation adhere to modern privacy benchmarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <Clock className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Zero Wait Time Surprise</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive live automated reminders, prep notes, and directions directly on your smartphone.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Ready to find the ideal doctor for yourself or your family?
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={onFindDoctors}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Search Doctors Now
            </Button>
          </div>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold">Portfolio Demonstration Notice:</strong> CareConnect is an interactive UI/UX demonstration web application created to showcase modern, accessible healthcare design patterns. All clinician profiles, clinic locations, and appointment schedules shown are realistic sample data for prototype demonstration.
        </div>
      </div>
    </div>
  );
};
