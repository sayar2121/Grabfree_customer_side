import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  expiryDate: string;
  compact?: boolean;
}

export default function CountdownTimer({ expiryDate, compact = false }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining(expiryDate)), 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!time.isValid) return null;

  if (time.expired) {
    return (
      <span className="badge badge-warning text-xs flex items-center gap-1">
        <Clock className="w-3 h-3" /> Expired
      </span>
    );
  }

  if (compact) {
    const label = time.days > 0 ? `${time.days}d left` : time.hours > 0 ? `${time.hours}h left` : `${time.minutes}m left`;
    return (
      <span className="badge badge-warning text-xs flex items-center gap-1">
        <Clock className="w-3 h-3" /> {label}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
      <div className="flex items-center gap-1 text-xs">
        {time.days > 0 && (
          <span className="theme-bg-subtle rounded px-1.5 py-0.5 text-yellow-500 font-mono font-bold">{time.days}d</span>
        )}
        <span className="theme-bg-subtle rounded px-1.5 py-0.5 text-yellow-500 font-mono font-bold">
          {String(time.hours).padStart(2, '0')}h
        </span>
        <span className="text-slate-500">:</span>
        <span className="theme-bg-subtle rounded px-1.5 py-0.5 text-yellow-500 font-mono font-bold">
          {String(time.minutes).padStart(2, '0')}m
        </span>
        <span className="text-slate-500">:</span>
        <span className="theme-bg-subtle rounded px-1.5 py-0.5 text-yellow-500 font-mono font-bold">
          {String(time.seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
}
