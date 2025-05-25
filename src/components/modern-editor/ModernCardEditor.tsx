
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingControlPanel } from './FloatingControlPanel';
import { VisualGradientBuilder } from './VisualGradientBuilder';
import { Shadow3DController } from './Shadow3DController';
import { SmartPresetGallery } from './SmartPresetGallery';
import { LiveStyleMixer } from './LiveStyleMixer';
import { ExportHub } from './ExportHub';
import { Settings, Palette, Layers, Box, Download, Wand2 } from 'lucide-react';

const ModernCardEditor = () => {
  const [cardAttributes, setCardAttributes] = useState({
    backgroundColor: '#6366f1',
    backgroundOpacity: 100,
    backgroundType: 'solid',
    gradientColor: '#8b5cf6',
    gradientOpacity: 100,
    gradientDirection: 135,
    glassmorphism: false,
    backdropBlur: 10,
    borderRadius: 12,
    borderRadiusLinked: true,
    borderRadiusTopLeft: 12,
    borderRadiusTopRight: 12,
    borderRadiusBottomLeft: 12,
    borderRadiusBottomRight: 12,
    borderWidth: 0,
    borderColor: '#e5e7eb',
    borderOpacity: 100,
    borderStyle: 'solid',
    primaryShadow: {
      x: 0,
      y: 10,
      blur: 20,
      spread: 0,
      color: '#000000',
      opacity: 25,
      enabled: true
    },
    secondaryShadow: {
      x: 0,
      y: 4,
      blur: 6,
      spread: -1,
      color: '#000000',
      opacity: 10,
      enabled: false
    },
    width: 300,
    height: 200,
    padding: 24,
    textColor: '#ffffff',
    globalOpacity: 100
  });

  const [activePanel, setActivePanel] = useState('style');
  const [showMixer, setShowMixer] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const updateAttribute = useCallback((key: string, value: any) => {
    setCardAttributes(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateShadow = useCallback((shadowType: string, key: string, value: any) => {
    setCardAttributes(prev => ({
      ...prev,
      [shadowType]: {
        ...prev[shadowType as keyof typeof prev] as any,
        [key]: value
      }
    }));
  }, []);

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const floatingPanels = [
    { id: 'style', icon: Palette, label: 'Style', position: { top: '10%', left: '2%' } },
    { id: 'gradient', icon: Layers, label: 'Gradient', position: { top: '30%', left: '2%' } },
    { id: 'shadow', icon: Box, label: '3D Shadow', position: { top: '50%', left: '2%' } },
    { id: 'presets', icon: Settings, label: 'Presets', position: { top: '70%', left: '2%' } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Floating Control Panels */}
      {floatingPanels.map((panel) => (
        <motion.div
          key={panel.id}
          className="fixed z-20"
          style={panel.position}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => setActivePanel(activePanel === panel.id ? '' : panel.id)}
            className={`p-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
              activePanel === panel.id
                ? 'bg-white/20 border-2 border-purple-400 shadow-lg shadow-purple-500/25'
                : 'bg-white/10 border border-white/20 hover:bg-white/15'
            }`}
          >
            <panel.icon className="w-6 h-6 text-white" />
          </button>
          <div className="text-xs text-white/70 text-center mt-2">{panel.label}</div>
        </motion.div>
      ))}

      {/* Action Buttons */}
      <div className="fixed top-6 right-6 z-20 flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMixer(!showMixer)}
          className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg"
        >
          <Wand2 className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowExport(!showExport)}
          className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
        >
          <Download className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Main Preview Area */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <motion.div
          className="relative"
          animate={{ 
            rotateY: activePanel === 'shadow' ? 15 : 0,
            rotateX: activePanel === 'shadow' ? 5 : 0
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="transition-all duration-500 ease-out flex items-center justify-center relative"
            whileHover={{ scale: 1.02 }}
            style={{
              width: `${cardAttributes.width}px`,
              height: `${cardAttributes.height}px`,
              background: cardAttributes.backgroundType === 'gradient' 
                ? `linear-gradient(${cardAttributes.gradientDirection}deg, ${hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity)}, ${hexToRgba(cardAttributes.gradientColor, cardAttributes.gradientOpacity)})`
                : hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity),
              borderRadius: cardAttributes.borderRadiusLinked 
                ? `${cardAttributes.borderRadius}px`
                : `${cardAttributes.borderRadiusTopLeft}px ${cardAttributes.borderRadiusTopRight}px ${cardAttributes.borderRadiusBottomRight}px ${cardAttributes.borderRadiusBottomLeft}px`,
              border: `${cardAttributes.borderWidth}px ${cardAttributes.borderStyle} ${hexToRgba(cardAttributes.borderColor, cardAttributes.borderOpacity)}`,
              boxShadow: (() => {
                let shadows = [];
                if (cardAttributes.primaryShadow.enabled) {
                  shadows.push(`${cardAttributes.primaryShadow.x}px ${cardAttributes.primaryShadow.y}px ${cardAttributes.primaryShadow.blur}px ${cardAttributes.primaryShadow.spread}px ${hexToRgba(cardAttributes.primaryShadow.color, cardAttributes.primaryShadow.opacity)}`);
                }
                if (cardAttributes.secondaryShadow.enabled) {
                  shadows.push(`${cardAttributes.secondaryShadow.x}px ${cardAttributes.secondaryShadow.y}px ${cardAttributes.secondaryShadow.blur}px ${cardAttributes.secondaryShadow.spread}px ${hexToRgba(cardAttributes.secondaryShadow.color, cardAttributes.secondaryShadow.opacity)}`);
                }
                return shadows.length > 0 ? shadows.join(', ') : 'none';
              })(),
              padding: `${cardAttributes.padding}px`,
              backdropFilter: cardAttributes.glassmorphism ? `blur(${cardAttributes.backdropBlur}px)` : 'none',
              opacity: cardAttributes.globalOpacity / 100,
              color: cardAttributes.textColor
            }}
          >
            <div className="text-center">
              <motion.div 
                className="font-semibold text-lg mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Modern Card
              </motion.div>
              <motion.div 
                className="text-sm opacity-80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Live preview with real-time updates
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic Control Panels */}
      <AnimatePresence>
        {activePanel && (
          <FloatingControlPanel
            activePanel={activePanel}
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
            updateShadow={updateShadow}
            onClose={() => setActivePanel('')}
          />
        )}
      </AnimatePresence>

      {/* Style Mixer */}
      <AnimatePresence>
        {showMixer && (
          <LiveStyleMixer
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
            onClose={() => setShowMixer(false)}
          />
        )}
      </AnimatePresence>

      {/* Export Hub */}
      <AnimatePresence>
        {showExport && (
          <ExportHub
            cardAttributes={cardAttributes}
            onClose={() => setShowExport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCardEditor;
