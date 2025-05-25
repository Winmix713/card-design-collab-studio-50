import React, { useState } from 'react';
import { ChevronDown, Plus, Save, Undo, Redo, Trash2, RotateCcw, Download, Copy, Check, Wand2, Settings } from 'lucide-react';
import { ControlsPanel } from './card-editor/ControlsPanel';

const CardStyleEditor = () => {
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
    globalOpacity: 100,
    tags: []
  });

  const [activeTab, setActiveTab] = useState('size');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [cssMinified, setCssMinified] = useState(false);
  
  const [presets, setPresets] = useState([
    { name: 'Modern Blue', attributes: { backgroundColor: '#3b82f6', backgroundType: 'solid', borderRadius: 16, primaryShadow: { ...cardAttributes.primaryShadow, blur: 24 } } },
    { name: 'Gradient Purple', attributes: { backgroundColor: '#8b5cf6', backgroundType: 'gradient', gradientColor: '#6d28d9', borderRadius: 20, primaryShadow: { ...cardAttributes.primaryShadow, blur: 32 } } },
    { name: 'Glassmorphism', attributes: { backgroundColor: '#ffffff', backgroundOpacity: 20, glassmorphism: true, backdropBlur: 15, borderRadius: 16, borderWidth: 1, borderOpacity: 30 } },
    { name: 'Dark Mode', attributes: { backgroundColor: '#1f2937', backgroundType: 'solid', borderRadius: 12, primaryShadow: { ...cardAttributes.primaryShadow, blur: 20 } } }
  ]);

  const updateAttribute = (key, value) => {
    setCardAttributes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateShadow = (shadowType, key, value) => {
    setCardAttributes(prev => ({
      ...prev,
      [shadowType]: {
        ...prev[shadowType],
        [key]: value
      }
    }));
  };

  const toggleBorderRadiusLink = () => {
    const newLinked = !cardAttributes.borderRadiusLinked;
    if (newLinked) {
      const mainRadius = cardAttributes.borderRadius;
      setCardAttributes(prev => ({
        ...prev,
        borderRadiusLinked: true,
        borderRadiusTopLeft: mainRadius,
        borderRadiusTopRight: mainRadius,
        borderRadiusBottomLeft: mainRadius,
        borderRadiusBottomRight: mainRadius
      }));
    } else {
      setCardAttributes(prev => ({
        ...prev,
        borderRadiusLinked: false
      }));
    }
  };

  const updateBorderRadius = (corner, value) => {
    if (cardAttributes.borderRadiusLinked) {
      setCardAttributes(prev => ({
        ...prev,
        borderRadius: value,
        borderRadiusTopLeft: value,
        borderRadiusTopRight: value,
        borderRadiusBottomLeft: value,
        borderRadiusBottomRight: value
      }));
    } else {
      setCardAttributes(prev => ({
        ...prev,
        [corner]: value
      }));
    }
  };

  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

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
    
    const css = `
.card {
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

    return cssMinified ? css.replace(/\s+/g, ' ').trim() : css;
  };

  const applyPreset = (preset) => {
    setCardAttributes(prev => ({
      ...prev,
      ...preset.attributes
    }));
  };

  const resetCard = () => {
    setCardAttributes({
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
      globalOpacity: 100,
      tags: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Card Style Editor
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showAdvanced 
                    ? 'bg-violet-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Advanced</span>
              </button>
              <button
                onClick={resetCard}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <ControlsPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
            updateShadow={updateShadow}
            updateBorderRadius={updateBorderRadius}
            toggleBorderRadiusLink={toggleBorderRadiusLink}
            showAdvanced={showAdvanced}
            presets={presets}
            applyPreset={applyPreset}
          />

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => navigator.clipboard.writeText(generateCSS())}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy CSS</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg p-8">
                <div
                  className="transition-all duration-300 ease-in-out flex items-center justify-center"
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
                    <div className="font-semibold text-lg mb-2">Sample Card</div>
                    <div className="text-sm opacity-80">This is your custom card design</div>
                  </div>
                </div>
              </div>

              {/* Enhanced CSS Output */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-100">Generated CSS</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCssMinified(!cssMinified)}
                      className={`px-3 py-1 text-xs rounded ${
                        cssMinified 
                          ? 'bg-violet-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {cssMinified ? 'Expand' : 'Minify'}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-600">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {generateCSS()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStyleEditor;
