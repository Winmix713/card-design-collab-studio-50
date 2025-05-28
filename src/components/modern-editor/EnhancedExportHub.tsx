
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';
import { ExportFormatSelector } from './export/ExportFormatSelector';
import { SocialMediaPresets } from './export/SocialMediaPresets';
import { ExportActions } from './export/ExportActions';
import { hexToRgba } from './utils/styleUtils';

interface EnhancedExportHubProps {
  cardAttributes: CardAttributes;
  onClose: () => void;
}

export const EnhancedExportHub: React.FC<EnhancedExportHubProps> = ({
  cardAttributes,
  onClose
}) => {
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState(90);
  const [exportSize, setExportSize] = useState('1x');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const primaryBgColor = hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity);
    const gradientColor = hexToRgba(cardAttributes.gradientColor, cardAttributes.gradientOpacity);
    
    let background;
    if (cardAttributes.backgroundType === 'gradient') {
      background = `linear-gradient(${cardAttributes.gradientDirection}deg, ${primaryBgColor}, ${gradientColor})`;
    } else {
      background = primaryBgColor;
    }

    const transform = `rotate(${cardAttributes.rotation || 0}deg) scaleX(${cardAttributes.scaleX || 1}) scaleY(${cardAttributes.scaleY || 1})`;
    const filter = `blur(${cardAttributes.blur || 0}px) brightness(${cardAttributes.brightness || 100}%) contrast(${cardAttributes.contrast || 100}%) saturate(${cardAttributes.saturation || 100}%)`;

    return `.modern-card {
  width: ${cardAttributes.width}px;
  height: ${cardAttributes.height}px;
  background: ${background};
  border-radius: ${cardAttributes.borderRadius}px;
  padding: ${cardAttributes.padding}px;
  opacity: ${cardAttributes.globalOpacity / 100};
  transform: ${transform};
  filter: ${filter};
  font-family: '${cardAttributes.titleFont || 'Inter'}', sans-serif;
  color: ${cardAttributes.textColor};
  transition: all 0.3s ease;
}`;
  };

  const handleCopy = async () => {
    if (exportFormat === 'css') {
      await navigator.clipboard.writeText(generateCSS());
    } else if (exportFormat === 'json') {
      await navigator.clipboard.writeText(JSON.stringify(cardAttributes, null, 2));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let content = '';
    let filename = `modern-card-${Date.now()}`;
    
    switch (exportFormat) {
      case 'css':
        content = generateCSS();
        filename += '.css';
        break;
      case 'json':
        content = JSON.stringify(cardAttributes, null, 2);
        filename += '.json';
        break;
      default:
        console.log('Image export not yet implemented');
        return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Enhanced Export Hub</h2>
            <p className="text-white/60">Export your design in multiple formats</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExportFormatSelector
            selectedFormat={exportFormat}
            onFormatChange={setExportFormat}
          />

          <SocialMediaPresets
            onPresetSelect={(preset) => console.log('Selected preset:', preset)}
          />
        </div>

        {/* Quality and Size Settings */}
        {(exportFormat === 'png' || exportFormat === 'jpg') && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Quality: {exportQuality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={exportQuality}
                onChange={(e) => setExportQuality(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Export Size</label>
              <select
                value={exportSize}
                onChange={(e) => setExportSize(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="0.5x">0.5x (Half Size)</option>
                <option value="1x">1x (Original)</option>
                <option value="2x">2x (Double)</option>
                <option value="3x">3x (Triple)</option>
              </select>
            </div>
          </div>
        )}

        {/* Preview */}
        {exportFormat === 'css' && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-white/80 mb-2">CSS Preview</h4>
            <div className="bg-gray-900/50 rounded-xl p-4 max-h-40 overflow-y-auto border border-white/10">
              <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                {generateCSS().substring(0, 300)}...
              </pre>
            </div>
          </div>
        )}

        <ExportActions
          onCopy={handleCopy}
          onDownload={handleDownload}
          onShare={() => console.log('Share functionality')}
          copied={copied}
        />
      </motion.div>
    </motion.div>
  );
};
