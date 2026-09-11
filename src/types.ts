export type SpecializationType =
  | 'General Physician'
  | 'Cardiologist'
  | 'Dermatologist'
  | 'Dentist'
  | 'Pediatrician'
  | 'Neurologist'
  | 'Orthopedic Surgeon'
  | 'Psychiatrist'
  | 'Gynecologist'
  | 'Ophthalmologist';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: SpecializationType;
  image: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  hospital: string;
  location: string;
  consultationFee: number;
  currencySymbol?: string;
  nextAvailable: string; // e.g. "Today, 03:30 PM"
  about: string;
  education: string[];
  languages: string[];
  availableDays: string[];
  availableTimeSlots: string[];
  verified: boolean;
  phone?: string;
  email?: string;
}

export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorImage: string;
  hospital: string;
  date: string; // YYYY-MM-DD or readable
  time: string; // e.g. "10:00 AM"
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  visitType: 'In-person' | 'Video Consultation';
  status: AppointmentStatus;
  fee: number;
  currencySymbol?: string;
  createdAt: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialization: string;
  hospital: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes: string;
  refillsRemaining: number;
}

export interface NotificationItem {
  id: string;
  type: 'reminder' | 'confirmation' | 'rescheduled' | 'prescription' | 'system';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  appointmentId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  bloodGroup: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  insuranceProvider: string;
  avatar: string;
}

export type ActivePage =
  | 'home'
  | 'doctors'
  | 'doctor-profile'
  | 'booking'
  | 'booking-success'
  | 'appointments'
  | 'dashboard'
  | 'prescriptions'
  | 'notifications'
  | 'profile'
  | 'about';
