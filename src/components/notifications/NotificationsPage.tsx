import React, { useState } from 'react';
import { NotificationItem, ActivePage } from '../../types';
import { Button } from '../common/Button';
import {
  Bell,
  CheckCircle2,
  Clock,
  RotateCcw,
  FileText,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

interface NotificationsPageProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (item: NotificationItem) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'confirmation':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'rescheduled':
        return <RotateCcw className="w-5 h-5 text-blue-600" />;
      case 'prescription':
        return <FileText className="w-5 h-5 text-sky-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBgClass = (type: NotificationItem['type']) => {
    switch (type) {
      case 'reminder':
        return 'bg-amber-50 border-amber-100';
      case 'confirmation':
        return 'bg-emerald-50 border-emerald-100';
      case 'rescheduled':
        return 'bg-blue-50 border-blue-100';
      case 'prescription':
        return 'bg-sky-50 border-sky-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Notifications & Updates
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Stay informed about upcoming visits, prescription refills, and medical records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
              leftIcon={<CheckCheck className="w-4 h-4" />}
            >
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Updates ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onNotificationClick(item)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                item.read
                  ? 'bg-white border-slate-200 hover:border-slate-300'
                  : 'bg-blue-50/40 border-blue-200 shadow-2xs hover:border-blue-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getBgClass(
                  item.type
                )}`}
              >
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                  <span className="text-[11px] text-slate-400 shrink-0 whitespace-nowrap">
                    {item.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
              </div>

              {!item.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
