
import React from 'react';
import { motion } from 'framer-motion';
import { Image, Code, Settings, FileText } from 'lucide-react';

interface ExportFormat {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ExportFormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

export const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({
  selectedFormat,
  onFormatChange
}) => {
  const formats: ExportFormat[] = [
    { id: 'png', label: 'PNG', icon: Image, description: 'High quality with transparency' },
    { id: 'jpg', label: 'JPG', icon: Image, description: 'Smaller file size' },
    { id: 'svg', label: 'SVG', icon: Code, description: 'Vector format, scalable' },
    { id: 'css', label: 'CSS', icon: Code, description: 'CSS code for web' },
    { id: 'json', label: 'JSON', icon: Settings, description: 'Save design data' },
    { id: 'pdf', label: 'PDF', icon: FileText, description: 'Print ready format' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
      <div className="grid grid-cols-2 gap-3">
        {formats.map((format) => {
          const Icon = format.icon;
          return (
            <motion.button
              key={format.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFormatChange(format.id)}
              className={`p-4 rounded-xl border transition-all ${
                selectedFormat === format.id
                  ? 'bg-purple-500/20 border-purple-400 text-white'
                  : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">{format.label}</div>
              <div className="text-xs text-white/60 mt-1">{format.description}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
