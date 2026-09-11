import React from 'react';
import {
  Stethoscope,
  HeartPulse,
  Sparkles,
  Smile,
  Baby,
  Activity,
  Bone,
  Brain,
  ArrowRight,
} from 'lucide-react';
import { SPECIALIZATIONS_DATA } from '../../data/mockData';
import { SpecializationType } from '../../types';
import { motion } from 'motion/react';

interface SpecializationSectionProps {
  onSelectSpecialization: (spec: SpecializationType) => void;
}

export const SpecializationSection: React.FC<SpecializationSectionProps> = ({
  onSelectSpecialization,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Smile':
        return <Smile className="w-6 h-6" />;
      case 'Baby':
        return <Baby className="w-6 h-6" />;
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'Bone':
        return <Bone className="w-6 h-6" />;
      case 'Brain':
        return <Brain className="w-6 h-6" />;
      default:
        return <Stethoscope className="w-6 h-6" />;
    }
  };

  return (
    <section id="specialties-section" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Explore Specialties
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2.5 tracking-tight">
              Popular Medical Specializations
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
              Connect directly with verified board-certified physicians tailored to your health needs.
            </p>
          </div>
          <button
            onClick={() => onSelectSpecialization('General Physician')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group cursor-pointer"
          >
            <span>View all specialties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {SPECIALIZATIONS_DATA.map((item, idx) => (
            <motion.div
              key={item.name}
              id={`specialty-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSpecialization(item.name as SpecializationType)}
              className="group p-5 sm:p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-200 mb-4 shadow-xs">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">{item.doctorCount} Doctors</span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Book →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
