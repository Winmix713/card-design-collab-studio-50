
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon: Icon,
  onClick,
  isActive = false,
  disabled = false,
  className = '',
  children
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
      disabled
        ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
        : isActive
        ? 'bg-white/20 border-2 border-purple-400 shadow-lg shadow-purple-500/25 text-white'
        : 'bg-white/10 border border-white/20 hover:bg-white/15 text-white'
    } ${className}`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </motion.button>
);
