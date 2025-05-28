
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ControlCardProps {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
}

export const ControlCard: React.FC<ControlCardProps> = ({ children, title, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-all duration-300"
  >
    <div className="flex items-center space-x-2 mb-4">
      {Icon && <Icon className="w-4 h-4 text-purple-400" />}
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
    </div>
    {children}
  </motion.div>
);
