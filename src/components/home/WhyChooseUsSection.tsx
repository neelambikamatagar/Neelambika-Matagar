import React from 'react';
import { Calendar, ShieldCheck, Lock, BellRing, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Easy appointment booking',
      description: 'Book verified doctors in seconds with real-time slot availability, instant confirmation, and effortless rescheduling.',
      badge: 'Frictionless'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Verified doctors',
      description: 'Every medical professional undergoes rigorous license and credential verification, guaranteeing trustworthy clinical care.',
      badge: 'Certified'
    },
    {
      icon: <Lock className="w-6 h-6 text-sky-600" />,
      title: 'Secure patient information',
      description: 'Your medical records, prescriptions, and personal health details are protected with bank-grade encryption and privacy controls.',
      badge: 'Encrypted'
    },
    {
      icon: <BellRing className="w-6 h-6 text-amber-600" />,
      title: 'Appointment reminders',
      description: 'Never miss an appointment with automated SMS, email, and in-app notifications ahead of every consultation.',
      badge: 'Timely'
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Care That Puts You First
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why choose CareConnect?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            We designed CareConnect from the ground up to eliminate waiting rooms, confusing phone calls, and healthcare administrative stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-blue-600">
                  {feature.badge} Guarantee
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
