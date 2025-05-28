
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Copy, Code, FileText, Settings, Image, Share2, Printer } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';
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

  const exportFormats = [
    { id: 'png', label: 'PNG', icon: Image, description: 'High quality with transparency' },
    { id: 'jpg', label: 'JPG', icon: Image, description: 'Smaller file size' },
    { id: 'svg', label: 'SVG', icon: Code, description: 'Vector format, scalable' },
    { id: 'css', label: 'CSS', icon: Code, description: 'CSS code for web' },
    { id: 'json', label: 'JSON', icon: Settings, description: 'Save design data' },
    { id: 'pdf', label: 'PDF', icon: FileText, description: 'Print ready format' }
  ];

  const socialPresets = [
    { id: 'instagram-post', label: 'Instagram Post', size: '1080x1080' },
    { id: 'instagram-story', label: 'Instagram Story', size: '1080x1920' },
    { id: 'facebook-post', label: 'Facebook Post', size: '1200x630' },
    { id: 'twitter-card', label: 'Twitter Card', size: '1200x675' },
    { id: 'linkedin-post', label: 'LinkedIn Post', size: '1200x627' },
    { id: 'business-card', label: 'Business Card', size: '350x200' }
  ];

  const generateCSS = () => {
    // Similar to existing generateCSS but with enhanced features
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
}

.modern-card:hover {
  transform: ${transform} translateY(-5px);
  box-shadow: ${cardAttributes.primaryShadow.x}px ${cardAttributes.primaryShadow.y + 10}px ${cardAttributes.primaryShadow.blur + 10}px ${cardAttributes.primaryShadow.spread}px ${hexToRgba(cardAttributes.primaryShadow.color, cardAttributes.primaryShadow.opacity + 10)};
}

.card-title {
  font-family: '${cardAttributes.titleFont || 'Inter'}', sans-serif;
  font-size: ${cardAttributes.titleSize || 18}px;
  font-weight: ${cardAttributes.titleWeight || '600'};
  text-align: ${cardAttributes.titleAlign || 'left'};
}

.card-description {
  font-family: '${cardAttributes.descriptionFont || 'Inter'}', sans-serif;
  font-size: ${cardAttributes.descriptionSize || 14}px;
  font-weight: ${cardAttributes.descriptionWeight || '400'};
  text-align: ${cardAttributes.descriptionAlign || 'left'};
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
    const format = exportFormats.find(f => f.id === exportFormat);
    if (format) {
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
          // For image formats, we'd need canvas rendering
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
    }
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
          {/* Export Format Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <motion.button
                    key={format.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setExportFormat(format.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      exportFormat === format.id
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
          </div>

          {/* Social Media Presets */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Social Media Presets</h3>
            <div className="space-y-2">
              {socialPresets.map((preset) => (
                <motion.button
                  key={preset.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-left hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{preset.label}</span>
                    <span className="text-white/60 text-sm">{preset.size}</span>
                  </div>
                </motion.button>
              ))}
            </div>

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
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex-1 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
