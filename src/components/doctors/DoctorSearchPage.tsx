import React, { useState, useMemo, useEffect } from 'react';
import { Doctor, SpecializationType } from '../../types';
import { DoctorCard } from './DoctorCard';
import { EmptyState } from '../common/EmptyState';
import { Search, Filter, Stethoscope, Star, Clock, Award, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'motion/react';

interface DoctorSearchPageProps {
  doctors: Doctor[];
  initialSearchQuery?: string;
  initialSpecialty?: string;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorSearchPage: React.FC<DoctorSearchPageProps> = ({
  doctors,
  initialSearchQuery = '',
  initialSpecialty = '',
  onViewProfile,
  onBookAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialSpecialty !== undefined) {
      setSelectedSpecialty(initialSpecialty);
    }
  }, [initialSpecialty]);
  const [selectedExperience, setSelectedExperience] = useState<'all' | '5' | '10' | '15'>('all');
  const [selectedRating, setSelectedRating] = useState<'all' | '4.5' | '4.8'>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'today' | 'tomorrow'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee-low' | 'fee-high'>('rating');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Specialties options
  const specialtiesList: string[] = [
    'All Specializations',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Dentist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic Surgeon',
    'Psychiatrist',
  ];

  // Filtering logic
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.hospital.toLowerCase().includes(q) ||
          doc.about.toLowerCase().includes(q)
      );
    }

    // Specialization
    if (selectedSpecialty && selectedSpecialty !== 'All Specializations') {
      result = result.filter((doc) => doc.specialization === selectedSpecialty);
    }

    // Experience
    if (selectedExperience === '5') {
      result = result.filter((doc) => doc.experienceYears >= 5);
    } else if (selectedExperience === '10') {
      result = result.filter((doc) => doc.experienceYears >= 10);
    } else if (selectedExperience === '15') {
      result = result.filter((doc) => doc.experienceYears >= 15);
    }

    // Rating
    if (selectedRating === '4.5') {
      result = result.filter((doc) => doc.rating >= 4.5);
    } else if (selectedRating === '4.8') {
      result = result.filter((doc) => doc.rating >= 4.8);
    }

    // Availability
    if (selectedAvailability === 'today') {
      result = result.filter((doc) => doc.nextAvailable.toLowerCase().includes('today'));
    } else if (selectedAvailability === 'tomorrow') {
      result = result.filter(
        (doc) =>
          doc.nextAvailable.toLowerCase().includes('tomorrow') ||
          doc.nextAvailable.toLowerCase().includes('today')
      );
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sortBy === 'fee-low') {
      result.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sortBy === 'fee-high') {
      result.sort((a, b) => b.consultationFee - a.consultationFee);
    }

    return result;
  }, [
    doctors,
    searchQuery,
    selectedSpecialty,
    selectedExperience,
    selectedRating,
    selectedAvailability,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedExperience('all');
    setSelectedRating('all');
    setSelectedAvailability('all');
    setSortBy('rating');
  };

  const hasActiveFilters =
    searchQuery ||
    (selectedSpecialty && selectedSpecialty !== 'All Specializations') ||
    selectedExperience !== 'all' ||
    selectedRating !== 'all' ||
    selectedAvailability !== 'all';

  return (
    <div id="doctors-directory" className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Find Qualified Doctors
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Search over 1,200+ top medical specialists, compare reviews, and book instantly.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
              </span>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Search bar row */}
          <div className="mt-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="doctor-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, hospital, or symptoms..."
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
              <select
                id="doctor-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Filters on left, Doctor Cards on right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside
            className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Filter className="w-4 h-4 text-blue-600" />
                  Filter Doctors
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Specialization Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Specialization
                </label>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {specialtiesList.map((spec) => {
                    const isSelected =
                      selectedSpecialty === spec ||
                      (!selectedSpecialty && spec === 'All Specializations');
                    return (
                      <button
                        key={spec}
                        id={`filter-spec-${spec.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() =>
                          setSelectedSpecialty(spec === 'All Specializations' ? '' : spec)
                        }
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{spec}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Experience
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'Any' },
                    { id: '5', label: '5+ Years' },
                    { id: '10', label: '10+ Years' },
                    { id: '15', label: '15+ Years' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedExperience(item.id as any)}
                      className={`px-3 py-2 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                        selectedExperience === item.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Minimum Rating
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All Ratings' },
                    { id: '4.5', label: '4.5 & above' },
                    { id: '4.8', label: '4.8 & above (Top Tier)' },
                  ].map((rate) => (
                    <label
                      key={rate.id}
                      className="flex items-center gap-2.5 text-slate-700 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg"
                    >
                      <input
                        type="radio"
                        name="rating-filter"
                        checked={selectedRating === rate.id}
                        onChange={() => setSelectedRating(rate.id as any)}
                        className="text-blue-600 focus:ring-blue-500 rounded-full"
                      />
                      <span className="flex items-center gap-1">
                        {rate.id !== 'all' && (
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        )}
                        {rate.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Availability
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'Anytime' },
                    { id: 'today', label: 'Available Today' },
                    { id: 'tomorrow', label: 'Available within 24-48h' },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2.5 text-slate-700 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg"
                    >
                      <input
                        type="radio"
                        name="availability-filter"
                        checked={selectedAvailability === item.id}
                        onChange={() => setSelectedAvailability(item.id as any)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Doctor Cards Grid */}
          <main className="lg:col-span-3">
            {filteredDoctors.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onViewProfile={onViewProfile}
                      onBookAppointment={onBookAppointment}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState
                icon={<Stethoscope className="w-7 h-7 text-blue-600" />}
                title="No doctors found"
                description="We couldn't find any medical specialists matching your current filters. Try loosening your criteria or resetting your search."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
