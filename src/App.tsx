import React, { useState, useEffect } from 'react';
import {
  ActivePage,
  Doctor,
  Appointment,
  Prescription,
  NotificationItem,
  UserProfile,
  SpecializationType,
} from './types';
import {
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER_PROFILE,
} from './data/mockData';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EmergencyModal } from './components/common/EmergencyModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { motion, AnimatePresence } from 'motion/react';

// Home Components
import { HeroSection } from './components/home/HeroSection';
import { SpecializationSection } from './components/home/SpecializationSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { FeaturedDoctorsSection } from './components/home/FeaturedDoctorsSection';
import { EmergencyBanner } from './components/home/EmergencyBanner';

// Doctor & Booking Components
import { DoctorSearchPage } from './components/doctors/DoctorSearchPage';
import { DoctorProfileModal } from './components/doctors/DoctorProfileModal';
import { BookingFlow } from './components/booking/BookingFlow';
import { AppointmentSuccess } from './components/booking/AppointmentSuccess';

// Other Feature Pages
import { MyAppointmentsPage } from './components/appointments/MyAppointmentsPage';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { PrescriptionsPage } from './components/prescriptions/PrescriptionsPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { AboutPage } from './components/about/AboutPage';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Data States with LocalStorage Persistence
  const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('careconnect_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    try {
      const saved = localStorage.getItem('careconnect_prescriptions');
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('careconnect_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('careconnect_profile');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Flow State
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [viewingProfileDoctor, setViewingProfileDoctor] = useState<Doctor | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Search query carried over from hero
  const [searchDoctorQuery, setSearchDoctorQuery] = useState('');
  const [searchDoctorSpecialty, setSearchDoctorSpecialty] = useState('');

  // Modals & UI States
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('careconnect_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      if (userProfile) {
        localStorage.setItem('careconnect_profile', JSON.stringify(userProfile));
      }
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('careconnect_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Toast Helper
  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper with in-page smooth scrolling
  const navigateTo = (page: ActivePage) => {
    if (page === 'home') {
      if (activePage !== 'home') {
        setActivePage('home');
      }
      setTimeout(() => {
        const el = document.getElementById('home-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else if (page === 'doctors') {
      if (activePage !== 'home') {
        setActivePage('home');
      }
      setTimeout(() => {
        const el = document.getElementById('doctors-directory');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (page === 'about') {
      if (activePage !== 'home') {
        setActivePage('home');
      }
      setTimeout(() => {
        const el = document.getElementById('about-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Doctor Action Handlers
  const handleViewDoctorProfile = (doctor: Doctor) => {
    setViewingProfileDoctor(doctor);
  };

  const handleStartBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hero Search Handlers
  const handleHeroSearch = (query: string, specialization: string, location: string) => {
    setSearchDoctorQuery(query);
    setSearchDoctorSpecialty(specialization);
    if (activePage !== 'home') {
      setActivePage('home');
    }
    setTimeout(() => {
      const el = document.getElementById('doctors-directory');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleSelectSpecialization = (specialty: SpecializationType) => {
    setSearchDoctorQuery('');
    setSearchDoctorSpecialty(specialty);
    if (activePage !== 'home') {
      setActivePage('home');
    }
    setTimeout(() => {
      const el = document.getElementById('doctors-directory');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  // Booking Finished Handler
  const handleBookingConfirmed = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setConfirmedAppointment(newAppointment);

    // Add confirmation notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'confirmation',
      title: 'Appointment Booked Successfully',
      message: `Confirmed visit with ${newAppointment.doctorName} for ${newAppointment.date} at ${newAppointment.time}.`,
      timeAgo: 'Just now',
      read: false,
      appointmentId: newAppointment.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('success', 'Appointment Confirmed!', `Booking Reference: ${newAppointment.id}`);
    navigateTo('booking-success');
  };

  // Appointment Actions
  const handleRescheduleAppointment = (
    appointmentId: string,
    newDate: string,
    newTime: string
  ) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            date: newDate,
            time: newTime,
          };
        }
        return apt;
      })
    );

    const apt = appointments.find((a) => a.id === appointmentId);
    showToast('success', 'Appointment Rescheduled', `New slot: ${newDate} at ${newTime}`);

    // Add rescheduled notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'rescheduled',
      title: 'Appointment Rescheduled',
      message: `Your visit with ${apt?.doctorName || 'your doctor'} has been rescheduled to ${newDate} at ${newTime}.`,
      timeAgo: 'Just now',
      read: false,
      appointmentId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCancelAppointment = (appointmentId: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            status: 'Cancelled',
            notes: reason ? `Cancelled: ${reason}` : 'Cancelled by patient',
          };
        }
        return apt;
      })
    );
    showToast('info', 'Appointment Cancelled', 'Your appointment has been cancelled.');
  };

  // Prescription Download
  const handleDownloadPrescription = (rx: Prescription) => {
    showToast(
      'success',
      'Prescription Ready',
      `Downloading digital copy for Rx ${rx.id} (${rx.diagnosis})`
    );
    window.print();
  };

  // Notification Actions
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('info', 'Notifications', 'All notifications marked as read.');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (item.appointmentId) {
      navigateTo('appointments');
    } else if (item.type === 'prescription') {
      navigateTo('prescriptions');
    }
  };

  // User Profile
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    showToast('success', 'Profile Saved', 'Your patient profile has been updated.');
  };

  const handleLogout = () => {
    setUserProfile(null);
    showToast('info', 'Signed Out', 'You have been signed out of CareConnect.');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setUserProfile(user);
    showToast('success', 'Welcome Back!', `Signed in as ${user.name}`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        unreadNotificationsCount={unreadCount}
        userProfile={userProfile}
        onOpenAuthModal={(mode) => setAuthModalConfig({ isOpen: true, mode })}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="w-full"
          >
            {activePage === 'home' && (
              <>
                <HeroSection
                  onSearch={handleHeroSearch}
                  onSelectSpecialization={handleSelectSpecialization}
                />
                <SpecializationSection onSelectSpecialization={handleSelectSpecialization} />
                <DoctorSearchPage
                  doctors={doctors}
                  initialSearchQuery={searchDoctorQuery}
                  initialSpecialty={searchDoctorSpecialty}
                  onViewProfile={handleViewDoctorProfile}
                  onBookAppointment={handleStartBooking}
                />
                <WhyChooseUsSection />
                <AboutPage
                  onFindDoctors={() => navigateTo('doctors')}
                  onOpenEmergency={() => setIsEmergencyModalOpen(true)}
                />
                <EmergencyBanner onOpenEmergency={() => setIsEmergencyModalOpen(true)} />
              </>
            )}

            {activePage === 'doctors' && (
              <DoctorSearchPage
                doctors={doctors}
                initialSearchQuery={searchDoctorQuery}
                initialSpecialty={searchDoctorSpecialty}
                onViewProfile={handleViewDoctorProfile}
                onBookAppointment={handleStartBooking}
              />
            )}

            {activePage === 'booking' && (
              <BookingFlow
                doctors={doctors}
                selectedDoctor={selectedDoctor}
                onSelectDoctor={(doc) => setSelectedDoctor(doc)}
                userProfile={userProfile}
                onBookingConfirmed={handleBookingConfirmed}
                onCancel={() => navigateTo('doctors')}
              />
            )}

            {activePage === 'booking-success' && confirmedAppointment && (
              <AppointmentSuccess
                appointment={confirmedAppointment}
                onViewAppointments={() => navigateTo('appointments')}
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {activePage === 'appointments' && (
              <MyAppointmentsPage
                appointments={appointments}
                onReschedule={handleRescheduleAppointment}
                onCancelAppointment={handleCancelAppointment}
                onBookNew={() => {
                  setSearchDoctorQuery('');
                  setSearchDoctorSpecialty('');
                  navigateTo('doctors');
                }}
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {activePage === 'dashboard' && (
              <PatientDashboard
                userProfile={userProfile || INITIAL_USER_PROFILE}
                appointments={appointments}
                prescriptions={prescriptions}
                doctors={doctors}
                onNavigate={navigateTo}
                onViewDoctor={handleViewDoctorProfile}
                onBookDoctor={handleStartBooking}
              />
            )}

            {activePage === 'prescriptions' && (
              <PrescriptionsPage
                prescriptions={prescriptions}
                onDownloadPrescription={handleDownloadPrescription}
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {activePage === 'notifications' && (
              <NotificationsPage
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                onNotificationClick={handleNotificationClick}
              />
            )}

            {activePage === 'profile' && (
              <UserProfilePage
                userProfile={userProfile || INITIAL_USER_PROFILE}
                onSaveProfile={handleSaveProfile}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                onFindDoctors={() => navigateTo('doctors')}
                onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} onOpenEmergency={() => setIsEmergencyModalOpen(true)} />

      {/* Modals */}
      <DoctorProfileModal
        doctor={viewingProfileDoctor}
        isOpen={Boolean(viewingProfileDoctor)}
        onClose={() => setViewingProfileDoctor(null)}
        onBookAppointment={handleStartBooking}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalConfig.isOpen}
        initialMode={authModalConfig.mode}
        onClose={() => setAuthModalConfig({ isOpen: false, mode: 'login' })}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
