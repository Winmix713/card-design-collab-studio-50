
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Copy, Code, FileText, Settings } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';
import { hexToRgba } from './utils/styleUtils';

interface ExportHubProps {
  cardAttributes: CardAttributes;
  onClose: () => void;
}

export const ExportHub: React.FC<ExportHubProps> = ({
  cardAttributes,
  onClose
}) => {
  const [exportFormat, setExportFormat] = useState('css');
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

    const borderRadiusValue = cardAttributes.borderRadiusLinked 
      ? `${cardAttributes.borderRadius}px`
      : `${cardAttributes.borderRadiusTopLeft}px ${cardAttributes.borderRadiusTopRight}px ${cardAttributes.borderRadiusBottomRight}px ${cardAttributes.borderRadiusBottomLeft}px`;

    const primaryShadowColor = hexToRgba(cardAttributes.primaryShadow.color, cardAttributes.primaryShadow.opacity);
    const secondaryShadowColor = hexToRgba(cardAttributes.secondaryShadow.color, cardAttributes.secondaryShadow.opacity);
    
    let boxShadow = '';
    if (cardAttributes.primaryShadow.enabled) {
      boxShadow += `${cardAttributes.primaryShadow.x}px ${cardAttributes.primaryShadow.y}px ${cardAttributes.primaryShadow.blur}px ${cardAttributes.primaryShadow.spread}px ${primaryShadowColor}`;
    }
    if (cardAttributes.secondaryShadow.enabled) {
      if (boxShadow) boxShadow += ', ';
      boxShadow += `${cardAttributes.secondaryShadow.x}px ${cardAttributes.secondaryShadow.y}px ${cardAttributes.secondaryShadow.blur}px ${cardAttributes.secondaryShadow.spread}px ${secondaryShadowColor}`;
    }

    const borderColor = hexToRgba(cardAttributes.borderColor, cardAttributes.borderOpacity);
    
    return `.card {
  width: ${cardAttributes.width}px;
  height: ${cardAttributes.height}px;
  background: ${background};
  border-radius: ${borderRadiusValue};
  border: ${cardAttributes.borderWidth}px ${cardAttributes.borderStyle} ${borderColor};
  box-shadow: ${boxShadow || 'none'};
  padding: ${cardAttributes.padding}px;
  opacity: ${cardAttributes.globalOpacity / 100};
  color: ${cardAttributes.textColor};${cardAttributes.glassmorphism ? `
  backdrop-filter: blur(${cardAttributes.backdropBlur}px);
  -webkit-backdrop-filter: blur(${cardAttributes.backdropBlur}px);` : ''}
}`;
  };

  const generateJSON = () => {
    return JSON.stringify(cardAttributes, null, 2);
  };

  const generateReact = () => {
    return `import React from 'react';

const Card = ({ children }) => {
  const style = {
    width: '${cardAttributes.width}px',
    height: '${cardAttributes.height}px',
    background: '${cardAttributes.backgroundType === 'gradient' 
      ? `linear-gradient(${cardAttributes.gradientDirection}deg, ${hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity)}, ${hexToRgba(cardAttributes.gradientColor, cardAttributes.gradientOpacity)})`
      : hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity)}',
    borderRadius: '${cardAttributes.borderRadius}px',
    padding: '${cardAttributes.padding}px',
    color: '${cardAttributes.textColor}'
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default Card;`;
  };

  const exportFormats = [
    { id: 'css', label: 'CSS', icon: Code, generator: generateCSS },
    { id: 'json', label: 'JSON', icon: Settings, generator: generateJSON },
    { id: 'react', label: 'React', icon: FileText, generator: generateReact }
  ];

  const handleCopy = async () => {
    const format = exportFormats.find(f => f.id === exportFormat);
    if (format) {
      await navigator.clipboard.writeText(format.generator());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const format = exportFormats.find(f => f.id === exportFormat);
    if (format) {
      const content = format.generator();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `card-style.${exportFormat}`;
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
        className="bg-gradient-to-br from-green-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Export Hub</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-3">
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
                      ? 'bg-white/20 border-green-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{format.label}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Code Preview */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-3">
            Preview
          </label>
          <div className="bg-gray-900/50 rounded-xl p-4 max-h-64 overflow-y-auto border border-white/10">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {exportFormats.find(f => f.id === exportFormat)?.generator()}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex-1 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
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
        </div>
      </motion.div>
    </motion.div>
  );
};
