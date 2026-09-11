import React, { useState } from 'react';
import { ActivePage, UserProfile } from '../../types';
import {
  HeartPulse,
  Menu,
  X,
  Bell,
  User,
  ShieldAlert,
  Calendar,
  Search,
  Home,
  FileText,
  LayoutDashboard,
  Info,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  unreadNotificationsCount: number;
  userProfile: UserProfile | null;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onOpenEmergency: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  unreadNotificationsCount,
  userProfile,
  onOpenAuthModal,
  onOpenEmergency,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-4 h-4" /> },
    { label: 'Find Doctors', page: 'doctors', icon: <Search className="w-4 h-4" /> },
    { label: 'Appointments', page: 'appointments', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Dashboard', page: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Prescriptions', page: 'prescriptions', icon: <FileText className="w-4 h-4" /> },
    { label: 'About', page: 'about', icon: <Info className="w-4 h-4" /> },
  ];

  const handleLinkClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar for Emergency announcement */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">Online Medical Consultations & Clinic Appointments Available</span>
          </div>
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Emergency Services</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Care<span className="text-blue-600">Connect</span>
              </span>
              <span className="text-[10px] tracking-wider block uppercase font-bold text-slate-400 -mt-1">
                Healthcare Portal
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleLinkClick(link.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification Bell */}
            <button
              id="nav-notifications-btn"
              onClick={() => handleLinkClick('notifications')}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Emergency CTA button */}
            <Button
              id="nav-emergency-btn"
              variant="outline"
              size="sm"
              onClick={onOpenEmergency}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              leftIcon={<ShieldAlert className="w-4 h-4 text-red-600" />}
            >
              Need Help?
            </Button>

            {/* Auth or Profile */}
            {userProfile ? (
              <div className="relative">
                <button
                  id="nav-user-menu-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-lg object-cover border border-blue-200"
                  />
                  <div className="text-left text-xs">
                    <p className="font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
                      {userProfile.name}
                    </p>
                    <p className="text-slate-500 text-[10px]">Patient</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    id="nav-profile-dropdown"
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-900 truncate">{userProfile.email}</p>
                    </div>
                    <button
                      onClick={() => handleLinkClick('profile')}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Health Profile
                    </button>
                    <button
                      onClick={() => handleLinkClick('appointments')}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-slate-400" />
                      My Appointments
                    </button>
                    <button
                      onClick={() => handleLinkClick('prescriptions')}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      Prescriptions
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  id="nav-login-btn"
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenAuthModal('login')}
                >
                  Login
                </Button>
                <Button
                  id="nav-signup-btn"
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenAuthModal('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('notifications')}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {userProfile && (
            <div className="p-3 bg-blue-50/60 rounded-xl flex items-center justify-between border border-blue-100">
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{userProfile.name}</p>
                  <p className="text-xs text-slate-500">{userProfile.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLinkClick('profile')}
                className="text-xs"
              >
                Profile
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
              leftIcon={<ShieldAlert className="w-4 h-4 text-red-600" />}
            >
              Need Urgent Help? (Emergency)
            </Button>

            {userProfile ? (
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-red-600 hover:bg-red-50"
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Sign Out
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('login');
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('signup');
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
