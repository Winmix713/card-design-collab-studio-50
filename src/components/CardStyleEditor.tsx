
import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Save, Undo, Redo, Trash2, RotateCcw, Download, Copy, Check, Wand2, Grid, Search, X, Tag, Box, Calendar, Trophy, ThumbsUp, Send, Users, Flag, MessageSquare, Lock, Unlock, UserPlus, Settings, GitFork, Heart, Eye, EyeOff, Link, Unlink } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState('background');
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
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-700">
                <nav className="flex">
                  {[
                    { id: 'background', label: 'Background', icon: Grid },
                    { id: 'border', label: 'Border', icon: Box },
                    { id: 'shadow', label: 'Shadow', icon: Calendar },
                    { id: 'size', label: 'Size', icon: Trophy }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-violet-500 text-violet-400 bg-violet-500/10'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'background' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Background Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateAttribute('backgroundType', 'solid')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            cardAttributes.backgroundType === 'solid'
                              ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                              : 'border-gray-600 hover:border-gray-500 text-gray-300'
                          }`}
                        >
                          Solid
                        </button>
                        <button
                          onClick={() => updateAttribute('backgroundType', 'gradient')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            cardAttributes.backgroundType === 'gradient'
                              ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                              : 'border-gray-600 hover:border-gray-500 text-gray-300'
                          }`}
                        >
                          Gradient
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Primary Color</label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={cardAttributes.backgroundColor}
                            onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                          />
                          <input
                            type="text"
                            value={cardAttributes.backgroundColor}
                            onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={cardAttributes.backgroundOpacity}
                            onChange={(e) => updateAttribute('backgroundOpacity', parseInt(e.target.value))}
                            className="w-full accent-violet-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span className="font-medium text-violet-400">{cardAttributes.backgroundOpacity}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {cardAttributes.backgroundType === 'gradient' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Secondary Color</label>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={cardAttributes.gradientColor}
                                onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                                className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                              />
                              <input
                                type="text"
                                value={cardAttributes.gradientColor}
                                onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={cardAttributes.gradientOpacity}
                                onChange={(e) => updateAttribute('gradientOpacity', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span className="font-medium text-violet-400">{cardAttributes.gradientOpacity}%</span>
                                <span>100%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Gradient Direction</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={cardAttributes.gradientDirection}
                            onChange={(e) => updateAttribute('gradientDirection', parseInt(e.target.value))}
                            className="w-full accent-violet-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0°</span>
                            <span className="font-medium text-violet-400">{cardAttributes.gradientDirection}°</span>
                            <span>360°</span>
                          </div>
                        </div>
                      </>
                    )}

                    {showAdvanced && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-medium text-gray-300">Glassmorphism</label>
                          <button
                            onClick={() => updateAttribute('glassmorphism', !cardAttributes.glassmorphism)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              cardAttributes.glassmorphism ? 'bg-violet-600' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                cardAttributes.glassmorphism ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        {cardAttributes.glassmorphism && (
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Backdrop Blur</label>
                            <input
                              type="range"
                              min="0"
                              max="30"
                              value={cardAttributes.backdropBlur}
                              onChange={(e) => updateAttribute('backdropBlur', parseInt(e.target.value))}
                              className="w-full accent-violet-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0px</span>
                              <span className="font-medium text-violet-400">{cardAttributes.backdropBlur}px</span>
                              <span>30px</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'border' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-300">Border Radius</label>
                        <button
                          onClick={toggleBorderRadiusLink}
                          className={`p-1 rounded ${
                            cardAttributes.borderRadiusLinked 
                              ? 'text-violet-400 bg-violet-500/20' 
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          {cardAttributes.borderRadiusLinked ? <Link className="w-4 h-4" /> : <Unlink className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {cardAttributes.borderRadiusLinked ? (
                        <div>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={cardAttributes.borderRadius}
                            onChange={(e) => updateBorderRadius('borderRadius', parseInt(e.target.value))}
                            className="w-full accent-violet-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0px</span>
                            <span className="font-medium text-violet-400">{cardAttributes.borderRadius}px</span>
                            <span>50px</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { key: 'borderRadiusTopLeft', label: 'Top Left' },
                            { key: 'borderRadiusTopRight', label: 'Top Right' },
                            { key: 'borderRadiusBottomLeft', label: 'Bottom Left' },
                            { key: 'borderRadiusBottomRight', label: 'Bottom Right' }
                          ].map(corner => (
                            <div key={corner.key}>
                              <label className="block text-xs text-gray-400 mb-1">{corner.label}</label>
                              <input
                                type="range"
                                min="0"
                                max="50"
                                value={cardAttributes[corner.key]}
                                onChange={(e) => updateBorderRadius(corner.key, parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="text-xs text-violet-400 text-center mt-1">
                                {cardAttributes[corner.key]}px
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Border Width</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={cardAttributes.borderWidth}
                        onChange={(e) => updateAttribute('borderWidth', parseInt(e.target.value))}
                        className="w-full accent-violet-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span className="font-medium text-violet-400">{cardAttributes.borderWidth}px</span>
                        <span>10px</span>
                      </div>
                    </div>

                    {cardAttributes.borderWidth > 0 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Border Style</label>
                          <select
                            value={cardAttributes.borderStyle}
                            onChange={(e) => updateAttribute('borderStyle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                          >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Border Color</label>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={cardAttributes.borderColor}
                                onChange={(e) => updateAttribute('borderColor', e.target.value)}
                                className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                              />
                              <input
                                type="text"
                                value={cardAttributes.borderColor}
                                onChange={(e) => updateAttribute('borderColor', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={cardAttributes.borderOpacity}
                                onChange={(e) => updateAttribute('borderOpacity', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span className="font-medium text-violet-400">{cardAttributes.borderOpacity}%</span>
                                <span>100%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'shadow' && (
                  <div className="space-y-6">
                    {/* Primary Shadow */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium text-gray-300">Primary Shadow</label>
                        <button
                          onClick={() => updateShadow('primaryShadow', 'enabled', !cardAttributes.primaryShadow.enabled)}
                          className={`p-1 rounded ${
                            cardAttributes.primaryShadow.enabled 
                              ? 'text-violet-400 bg-violet-500/20' 
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          {cardAttributes.primaryShadow.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {cardAttributes.primaryShadow.enabled && (
                        <div className="space-y-4 pl-4 border-l-2 border-violet-500/30">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">X Offset</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.primaryShadow.x}
                                onChange={(e) => updateShadow('primaryShadow', 'x', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.x}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Y Offset</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.primaryShadow.y}
                                onChange={(e) => updateShadow('primaryShadow', 'y', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.y}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Blur</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={cardAttributes.primaryShadow.blur}
                                onChange={(e) => updateShadow('primaryShadow', 'blur', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.blur}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Spread</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.primaryShadow.spread}
                                onChange={(e) => updateShadow('primaryShadow', 'spread', parseInt(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                              <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.spread}px</div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Shadow Color</label>
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={cardAttributes.primaryShadow.color}
                                onChange={(e) => updateShadow('primaryShadow', 'color', e.target.value)}
                                className="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-gray-700"
                              />
                              <input
                                type="text"
                                value={cardAttributes.primaryShadow.color}
                                onChange={(e) => updateShadow('primaryShadow', 'color', e.target.value)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-600 rounded focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={cardAttributes.primaryShadow.opacity}
                              onChange={(e) => updateShadow('primaryShadow', 'opacity', parseInt(e.target.value))}
                              className="w-full accent-violet-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0%</span>
                              <span className="font-medium text-violet-400">{cardAttributes.primaryShadow.opacity}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Secondary Shadow */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium text-gray-300">Secondary Shadow</label>
                        <button
                          onClick={() => updateShadow('secondaryShadow', 'enabled', !cardAttributes.secondaryShadow.enabled)}
                          className={`p-1 rounded ${
                            cardAttributes.secondaryShadow.enabled 
                              ? 'text-violet-400 bg-violet-500/20' 
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          {cardAttributes.secondaryShadow.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {cardAttributes.secondaryShadow.enabled && (
                        <div className="space-y-4 pl-4 border-l-2 border-purple-500/30">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">X Offset</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.secondaryShadow.x}
                                onChange={(e) => updateShadow('secondaryShadow', 'x', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                              />
                              <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.x}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Y Offset</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.secondaryShadow.y}
                                onChange={(e) => updateShadow('secondaryShadow', 'y', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                              />
                              <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.y}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Blur</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={cardAttributes.secondaryShadow.blur}
                                onChange={(e) => updateShadow('secondaryShadow', 'blur', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                              />
                              <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.blur}px</div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Spread</label>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                value={cardAttributes.secondaryShadow.spread}
                                onChange={(e) => updateShadow('secondaryShadow', 'spread', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                              />
                              <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.spread}px</div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Shadow Color</label>
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={cardAttributes.secondaryShadow.color}
                                onChange={(e) => updateShadow('secondaryShadow', 'color', e.target.value)}
                                className="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-gray-700"
                              />
                              <input
                                type="text"
                                value={cardAttributes.secondaryShadow.color}
                                onChange={(e) => updateShadow('secondaryShadow', 'color', e.target.value)}
                                className="flex-1 px-2 py-1 text-xs border border-gray-600 rounded focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={cardAttributes.secondaryShadow.opacity}
                              onChange={(e) => updateShadow('secondaryShadow', 'opacity', parseInt(e.target.value))}
                              className="w-full accent-purple-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0%</span>
                              <span className="font-medium text-purple-400">{cardAttributes.secondaryShadow.opacity}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'size' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Width</label>
                      <input
                        type="range"
                        min="200"
                        max="500"
                        value={cardAttributes.width}
                        onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
                        className="w-full accent-violet-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>200px</span>
                        <span className="font-medium text-violet-400">{cardAttributes.width}px</span>
                        <span>500px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Height</label>
                      <input
                        type="range"
                        min="150"
                        max="400"
                        value={cardAttributes.height}
                        onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
                        className="w-full accent-violet-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>150px</span>
                        <span className="font-medium text-violet-400">{cardAttributes.height}px</span>
                        <span>400px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Padding</label>
                      <input
                        type="range"
                        min="8"
                        max="48"
                        value={cardAttributes.padding}
                        onChange={(e) => updateAttribute('padding', parseInt(e.target.value))}
                        className="w-full accent-violet-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>8px</span>
                        <span className="font-medium text-violet-400">{cardAttributes.padding}px</span>
                        <span>48px</span>
                      </div>
                    </div>

                    {showAdvanced && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Text Color</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={cardAttributes.textColor}
                              onChange={(e) => updateAttribute('textColor', e.target.value)}
                              className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                            />
                            <input
                              type="text"
                              value={cardAttributes.textColor}
                              onChange={(e) => updateAttribute('textColor', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Global Opacity</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={cardAttributes.globalOpacity}
                            onChange={(e) => updateAttribute('globalOpacity', parseInt(e.target.value))}
                            className="w-full accent-violet-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span className="font-medium text-violet-400">{cardAttributes.globalOpacity}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Presets */}
            <div className="mt-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Presets</h3>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-3 text-left border border-gray-600 rounded-lg hover:border-violet-400 hover:bg-violet-500/10 transition-colors"
                  >
                    <div className="font-medium text-gray-100">{preset.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {preset.attributes.backgroundType === 'gradient' ? 'Gradient' : 'Solid'} • {preset.attributes.borderRadius}px radius
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
