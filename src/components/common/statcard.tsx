import React from 'react';
import type  { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number;
  iconColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  iconColor
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      {/* Icon Circle */}
      <div className={`w-12 h-12 rounded-full ${iconColor} bg-opacity-10 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor.replace('bg-', 'text-')}`} />
      </div>

      {/* Value */}
      <div className="text-4xl font-bold text-gray-900 mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-600 mb-3">
        {label}
      </div>

      {/* Trend Indicator */}
      {trend !== undefined && (
        <div className="flex items-center text-xs">
          {trend > 0 ? (
            <>
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{trend}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">{trend}%</span>
            </>
          )}
          <span className="text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};