
import React from 'react';
import { motion } from 'framer-motion';

interface SocialPreset {
  id: string;
  label: string;
  size: string;
}

interface SocialMediaPresetsProps {
  onPresetSelect: (preset: SocialPreset) => void;
}

export const SocialMediaPresets: React.FC<SocialMediaPresetsProps> = ({ onPresetSelect }) => {
  const presets: SocialPreset[] = [
    { id: 'instagram-post', label: 'Instagram Post', size: '1080x1080' },
    { id: 'instagram-story', label: 'Instagram Story', size: '1080x1920' },
    { id: 'facebook-post', label: 'Facebook Post', size: '1200x630' },
    { id: 'twitter-card', label: 'Twitter Card', size: '1200x675' },
    { id: 'linkedin-post', label: 'LinkedIn Post', size: '1200x627' },
    { id: 'business-card', label: 'Business Card', size: '350x200' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Social Media Presets</h3>
      <div className="space-y-2">
        {presets.map((preset) => (
          <motion.button
            key={preset.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPresetSelect(preset)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-left hover:bg-white/10 transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{preset.label}</span>
              <span className="text-white/60 text-sm">{preset.size}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
