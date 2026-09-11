import { Doctor, Appointment, Prescription, NotificationItem, UserProfile } from '../types';

export const SPECIALIZATIONS_DATA = [
  {
    name: 'General Physician',
    iconName: 'Stethoscope',
    description: 'Cold, flu, fever, routine checkups & preventative health',
    doctorCount: 14,
  },
  {
    name: 'Cardiologist',
    iconName: 'HeartPulse',
    description: 'Heart conditions, hypertension, chest pain & cholesterol',
    doctorCount: 9,
  },
  {
    name: 'Dermatologist',
    iconName: 'Sparkles',
    description: 'Skin care, acne, rashes, hair health & cosmetic dermatology',
    doctorCount: 9,
  },
  {
    name: 'Dentist',
    iconName: 'Smile',
    description: 'Oral hygiene, cleanings, root canals & smile makeovers',
    doctorCount: 11,
  },
  {
    name: 'Pediatrician',
    iconName: 'Baby',
    description: 'Infant care, child wellness, vaccinations & growth monitoring',
    doctorCount: 7,
  },
  {
    name: 'Neurologist',
    iconName: 'Activity',
    description: 'Headaches, migraines, nerve health & neurological care',
    doctorCount: 6,
  },
  {
    name: 'Orthopedic Surgeon',
    iconName: 'Bone',
    description: 'Bone fractures, joint pain, sports injuries & spine health',
    doctorCount: 8,
  },
  {
    name: 'Psychiatrist',
    iconName: 'Brain',
    description: 'Mental health, anxiety, depression & cognitive therapy',
    doctorCount: 5,
  },
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    title: 'MD, FACP',
    specialization: 'General Physician',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 12,
    hospital: 'Metro Health Medical Center',
    location: 'Downtown Medical Plaza, Suite 400',
    consultationFee: 75,
    nextAvailable: 'Today, 02:00 PM',
    about: 'Dr. Sarah Jenkins is a board-certified internist with over 12 years of experience providing comprehensive adult medical care. She believes in preventative medicine and empathetic, patient-centered communication.',
    education: [
      'Doctor of Medicine (MD) - Johns Hopkins University School of Medicine',
      'Residency in Internal Medicine - Massachusetts General Hospital',
      'Fellow of the American College of Physicians (FACP)'
    ],
    languages: ['English', 'Spanish'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
    verified: true,
    phone: '+1 (555) 234-8901',
    email: 'dr.jenkins@metrohealth.org'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    title: 'MD, FACC',
    specialization: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    reviewCount: 189,
    experienceYears: 16,
    hospital: 'Saint Luke Heart Institute',
    location: 'Cardiology Pavilion, 3rd Floor',
    consultationFee: 140,
    nextAvailable: 'Tomorrow, 10:00 AM',
    about: 'Dr. Marcus Vance is a renowned cardiovascular specialist focusing on preventative cardiology, coronary artery disease, and lipid management with advanced echocardiography expertise.',
    education: [
      'MD - Harvard Medical School',
      'Cardiology Fellowship - Cleveland Clinic',
      'Board Certified in Cardiovascular Disease'
    ],
    languages: ['English'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    verified: true,
    phone: '+1 (555) 876-1234',
    email: 'm.vance@stlukesheart.org'
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    title: 'MD, FAAD',
    specialization: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1594824813683-e02ff3e41416?auto=format&fit=crop&q=80&w=800',
    rating: 4.88,
    reviewCount: 210,
    experienceYears: 9,
    hospital: 'Aura Skin & Aesthetic Clinic',
    location: 'Westside Wellness Center, 2nd Floor',
    consultationFee: 95,
    nextAvailable: 'Today, 04:00 PM',
    about: 'Dr. Elena Rostova provides evidence-based clinical and aesthetic dermatology services. Her expertise covers eczema, acne treatment, skin cancer screening, and gentle restorative therapies.',
    education: [
      'MD - Stanford University School of Medicine',
      'Dermatology Residency - NYU Langone Health',
      'American Academy of Dermatology Member'
    ],
    languages: ['English', 'Russian', 'French'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTimeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    verified: true,
    phone: '+1 (555) 345-6789',
    email: 'contact@auraskinclinic.com'
  },
  {
    id: 'doc-4',
    name: 'Dr. David Kim',
    title: 'DDS, FAGD',
    specialization: 'Dentist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    rating: 4.92,
    reviewCount: 165,
    experienceYears: 11,
    hospital: 'PureSmile Dental Studio',
    location: 'Grand Avenue Health Suites, #102',
    consultationFee: 65,
    nextAvailable: 'Tomorrow, 09:00 AM',
    about: 'Dr. David Kim specializes in painless family dentistry, preventative oral care, and cosmetic alignment. He utilizes cutting-edge digital 3D imaging for stress-free treatments.',
    education: [
      'Doctor of Dental Surgery (DDS) - Columbia University',
      'Fellowship - Academy of General Dentistry (FAGD)',
      'Invisalign Certified Provider'
    ],
    languages: ['English', 'Korean'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    verified: true,
    phone: '+1 (555) 432-8765',
    email: 'drkim@puresmiledental.com'
  },
  {
    id: 'doc-5',
    name: 'Dr. Aisha Patel',
    title: 'MD, FAAP',
    specialization: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=800',
    rating: 4.96,
    reviewCount: 304,
    experienceYears: 14,
    hospital: 'Children First Pediatrics',
    location: 'Pinecrest Medical Wing, Suite 210',
    consultationFee: 80,
    nextAvailable: 'Today, 11:30 AM',
    about: 'Dr. Aisha Patel is passionate about newborn health, childhood nutrition, and developmental milestones. Her warm, calm approach makes visits comforting for both kids and parents.',
    education: [
      'MD - University of Pennsylvania Perelman School of Medicine',
      'Pediatric Residency - Children\'s Hospital of Philadelphia (CHOP)',
      'Board Certified in General Pediatrics'
    ],
    languages: ['English', 'Hindi', 'Gujarati'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    verified: true,
    phone: '+1 (555) 901-2345',
    email: 'drpatel@childrenfirst.org'
  },
  {
    id: 'doc-6',
    name: 'Dr. Jonathan Reynolds',
    title: 'MD, PhD',
    specialization: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
    rating: 4.87,
    reviewCount: 118,
    experienceYears: 18,
    hospital: 'Cerebral Health & Neuro Institute',
    location: 'North Tower, University Hospital',
    consultationFee: 160,
    nextAvailable: 'In 2 days, 02:00 PM',
    about: 'Dr. Reynolds is an expert neurologist specializing in complex headache disorders, epilepsy management, and peripheral neuropathy diagnosis through advanced electrodiagnostic studies.',
    education: [
      'MD & PhD in Neurobiology - Yale School of Medicine',
      'Neurology Residency - UCLA Medical Center',
      'Clinical Neurophysiology Fellowship - Mayo Clinic'
    ],
    languages: ['English'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
    availableTimeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
    verified: true,
    phone: '+1 (555) 789-0123',
    email: 'jreynolds@neurocare.org'
  },
  {
    id: 'doc-7',
    name: 'Dr. Carlos Mendoza',
    title: 'MD, FAAOS',
    specialization: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    rating: 4.91,
    reviewCount: 172,
    experienceYears: 15,
    hospital: 'Apex Sports Medicine & Joint Center',
    location: 'Sportsplex Pavilion, Suite 100',
    consultationFee: 130,
    nextAvailable: 'Tomorrow, 02:00 PM',
    about: 'Dr. Carlos Mendoza specializes in joint preservation, minimally invasive arthroscopic surgery, and sports trauma rehabilitation, treating athletes and active individuals of all ages.',
    education: [
      'MD - Baylor College of Medicine',
      'Orthopedic Surgery Residency - Northwestern Memorial',
      'Sports Medicine Fellowship - Steadman Clinic'
    ],
    languages: ['English', 'Spanish'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    verified: true,
    phone: '+1 (555) 678-9012',
    email: 'cmendoza@apexortho.com'
  },
  {
    id: 'doc-8',
    name: 'Dr. Maya Lin',
    title: 'MD, FAPA',
    specialization: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800', // alternative doctor portrait
    rating: 4.94,
    reviewCount: 145,
    experienceYears: 10,
    hospital: 'MindWell Behavioral Health',
    location: 'Oakridge Professional Center, 4th Floor',
    consultationFee: 120,
    nextAvailable: 'Tomorrow, 04:00 PM',
    about: 'Dr. Maya Lin offers integrative psychiatric evaluation and medication management paired with cognitive behavioral approaches for anxiety, mood disorders, and life transitions.',
    education: [
      'MD - University of California, San Francisco (UCSF)',
      'Psychiatry Residency - Stanford Health Care',
      'Fellow of the American Psychiatric Association'
    ],
    languages: ['English', 'Mandarin'],
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['10:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
    verified: true,
    phone: '+1 (555) 567-8901',
    email: 'dr.lin@mindwellcare.com'
  },
  {
    id: 'doc-9',
    name: 'Dr. Ananya Rao',
    title: 'MD, DM (Cardiology), FACC',
    specialization: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 168,
    experienceYears: 10,
    hospital: 'CareConnect Hospital',
    location: 'CareConnect Medical Center, Heart & Vascular Wing, 3rd Floor',
    consultationFee: 500,
    currencySymbol: '₹',
    nextAvailable: 'Today, 02:30 PM',
    about: 'Dr. Ananya Rao is an expert cardiologist with 10 years of clinical experience at CareConnect Hospital. She specializes in preventative cardiology, diagnostic electrocardiography, hypertension management, heart rhythm disorders, and comprehensive cardiac rehabilitation.',
    education: [
      'MBBS & MD (General Medicine) - Premier Medical College',
      'DM in Cardiology - Renowned Institute of Medical Sciences',
      'Fellow of the American College of Cardiology (FACC)'
    ],
    languages: ['English', 'Hindi', 'Kannada'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    verified: true,
    phone: '+91 98765 43210',
    email: 'dr.ananyarao@careconnecthospital.org'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 382-9912',
  dob: '1992-06-15',
  gender: 'Female',
  bloodGroup: 'O Positive (O+)',
  address: '742 Evergreen Terrace, Apt 3B, Springfield, IL 62704',
  emergencyContactName: 'Taylor Morgan (Spouse)',
  emergencyContactPhone: '+1 (555) 382-9913',
  insuranceProvider: 'BlueCross BlueShield Premier #BC-849201',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CC-78401',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'General Physician',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    hospital: 'Metro Health Medical Center',
    date: '2026-09-15',
    time: '10:00 AM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 382-9912',
    reason: 'Annual preventive physical and blood pressure checkup',
    visitType: 'In-person',
    status: 'Upcoming',
    fee: 75,
    createdAt: '2026-09-08',
    notes: 'Please arrive 15 minutes early with fasting for lab tests.'
  },
  {
    id: 'CC-63912',
    doctorId: 'doc-3',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'Dermatologist',
    doctorImage: 'https://images.unsplash.com/photo-1594824813683-e02ff3e41416?auto=format&fit=crop&q=80&w=800',
    hospital: 'Aura Skin & Aesthetic Clinic',
    date: '2026-09-22',
    time: '02:00 PM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 382-9912',
    reason: 'Follow-up consultation on mild eczema on forearm',
    visitType: 'In-person',
    status: 'Upcoming',
    fee: 95,
    createdAt: '2026-09-05'
  },
  {
    id: 'CC-51204',
    doctorId: 'doc-4',
    doctorName: 'Dr. David Kim',
    doctorSpecialization: 'Dentist',
    doctorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    hospital: 'PureSmile Dental Studio',
    date: '2026-08-18',
    time: '09:00 AM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 382-9912',
    reason: 'Routine teeth cleaning and fluoridation',
    visitType: 'In-person',
    status: 'Completed',
    fee: 65,
    createdAt: '2026-08-01',
    notes: 'Teeth in good health. Recommend next routine cleaning in 6 months.'
  },
  {
    id: 'CC-49182',
    doctorId: 'doc-2',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialization: 'Cardiologist',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    hospital: 'Saint Luke Heart Institute',
    date: '2026-07-10',
    time: '02:00 PM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 382-9912',
    reason: 'Cardio endurance evaluation and resting ECG',
    visitType: 'In-person',
    status: 'Completed',
    fee: 140,
    createdAt: '2026-06-25'
  },
  {
    id: 'CC-38190',
    doctorId: 'doc-7',
    doctorName: 'Dr. Carlos Mendoza',
    doctorSpecialization: 'Orthopedic Surgeon',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    hospital: 'Apex Sports Medicine',
    date: '2026-06-04',
    time: '11:00 AM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 382-9912',
    reason: 'Mild runner knee consultation',
    visitType: 'In-person',
    status: 'Cancelled',
    fee: 130,
    createdAt: '2026-05-28',
    notes: 'Cancelled due to patient schedule conflict.'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-9021',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'General Physician',
    hospital: 'Metro Health Medical Center',
    date: '2026-08-20',
    diagnosis: 'Seasonal Allergies & Mild Bronchial Irritation',
    medicines: [
      {
        name: 'Cetirizine Hydrochloride',
        dosage: '10 mg',
        frequency: 'Once daily at bedtime',
        duration: '14 days',
        instructions: 'Take with a glass of water. May cause mild drowsiness.'
      },
      {
        name: 'Fluticasone Propionate Nasal Spray',
        dosage: '50 mcg/spray',
        frequency: '2 sprays in each nostril daily',
        duration: '30 days',
        instructions: 'Shake gently before each use.'
      }
    ],
    notes: 'Hydrate well, avoid high pollen exposure during morning hours.',
    refillsRemaining: 2
  },
  {
    id: 'RX-8419',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'Dermatologist',
    hospital: 'Aura Skin & Aesthetic Clinic',
    date: '2026-07-15',
    diagnosis: 'Contact Dermatitis / Mild Eczema Flare-up',
    medicines: [
      {
        name: 'Hydrocortisone Butyrate Cream 0.1%',
        dosage: 'Thin layer',
        frequency: 'Twice daily',
        duration: '7 days',
        instructions: 'Apply gently to affected forearm area only.'
      },
      {
        name: 'Ceramide Barrier Moisturizing Lotion',
        dosage: 'Liberal application',
        frequency: '3 times daily',
        duration: 'Ongoing',
        instructions: 'Apply immediately after bathing to lock in moisture.'
      }
    ],
    notes: 'Avoid scented soaps and harsh detergents.',
    refillsRemaining: 1
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'reminder',
    title: 'Upcoming Appointment Reminder',
    message: 'Your routine checkup with Dr. Sarah Jenkins is scheduled for Sep 15 at 10:00 AM.',
    timeAgo: '2 hours ago',
    read: false,
    appointmentId: 'CC-78401'
  },
  {
    id: 'notif-2',
    type: 'confirmation',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Elena Rostova for Sep 22 at 02:00 PM is confirmed.',
    timeAgo: '1 day ago',
    read: false,
    appointmentId: 'CC-63912'
  },
  {
    id: 'notif-3',
    type: 'prescription',
    title: 'Digital Prescription Available',
    message: 'Dr. Sarah Jenkins has issued a revised prescription for Seasonal Allergies.',
    timeAgo: '3 days ago',
    read: true
  },
  {
    id: 'notif-4',
    type: 'rescheduled',
    title: 'Follow-up Alert',
    message: 'Time for your biannual dental cleaning! Dr. David Kim has available slots this week.',
    timeAgo: '1 week ago',
    read: true
  }
];
