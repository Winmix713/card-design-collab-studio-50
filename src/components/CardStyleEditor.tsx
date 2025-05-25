
import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Save, Undo, Redo, Trash2, RotateCcw, Download, Copy, Check, Wand2, Grid, Search, X, Tag, Cube, Calendar, Trophy, ThumbsUp, Send, Users, Flag, MessageSquare, Lock, Unlock, UserPlus, Settings, GitFork, Heart } from 'lucide-react';

const CardStyleEditor = () => {
  const [cardAttributes, setCardAttributes] = useState({
    backgroundColor: '#6366f1',
    backgroundType: 'solid',
    gradientColor: '#8b5cf6',
    borderRadius: 12,
    borderWidth: 0,
    borderColor: '#e5e7eb',
    shadowBlur: 20,
    shadowColor: '#00000040',
    shadowX: 0,
    shadowY: 10,
    width: 300,
    height: 200,
    padding: 24,
    tags: []
  });

  const [activeTab, setActiveTab] = useState('background');
  const [presets, setPresets] = useState([
    { name: 'Modern Blue', attributes: { backgroundColor: '#3b82f6', backgroundType: 'solid', borderRadius: 16, shadowBlur: 24 } },
    { name: 'Gradient Purple', attributes: { backgroundColor: '#8b5cf6', backgroundType: 'gradient', gradientColor: '#6d28d9', borderRadius: 20, shadowBlur: 32 } },
    { name: 'Minimalist', attributes: { backgroundColor: '#ffffff', backgroundType: 'solid', borderRadius: 8, shadowBlur: 12, borderWidth: 1 } },
    { name: 'Dark Mode', attributes: { backgroundColor: '#1f2937', backgroundType: 'solid', borderRadius: 12, shadowBlur: 20 } }
  ]);

  const updateAttribute = (key, value) => {
    setCardAttributes(prev => ({
      ...prev,
      [key]: value
    }));
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
      backgroundType: 'solid',
      gradientColor: '#8b5cf6',
      borderRadius: 12,
      borderWidth: 0,
      borderColor: '#e5e7eb',
      shadowBlur: 20,
      shadowColor: '#00000040',
      shadowX: 0,
      shadowY: 10,
      width: 300,
      height: 200,
      padding: 24,
      tags: []
    });
  };

  const generateCSS = () => {
    const background = cardAttributes.backgroundType === 'gradient' 
      ? `linear-gradient(135deg, ${cardAttributes.backgroundColor}, ${cardAttributes.gradientColor})`
      : cardAttributes.backgroundColor;
    
    return `
.card {
  width: ${cardAttributes.width}px;
  height: ${cardAttributes.height}px;
  background: ${background};
  border-radius: ${cardAttributes.borderRadius}px;
  border: ${cardAttributes.borderWidth}px solid ${cardAttributes.borderColor};
  box-shadow: ${cardAttributes.shadowX}px ${cardAttributes.shadowY}px ${cardAttributes.shadowBlur}px ${cardAttributes.shadowColor};
  padding: ${cardAttributes.padding}px;
}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Card Style Editor
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={resetCard}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'background', label: 'Background', icon: Grid },
                    { id: 'border', label: 'Border', icon: Cube },
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
                            ? 'border-violet-500 text-violet-600 bg-violet-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
                      <label className="block text-sm font-medium text-gray-700 mb-3">Background Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateAttribute('backgroundType', 'solid')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            cardAttributes.backgroundType === 'solid'
                              ? 'border-violet-500 bg-violet-50 text-violet-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          Solid
                        </button>
                        <button
                          onClick={() => updateAttribute('backgroundType', 'gradient')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            cardAttributes.backgroundType === 'gradient'
                              ? 'border-violet-500 bg-violet-50 text-violet-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          Gradient
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={cardAttributes.backgroundColor}
                          onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={cardAttributes.backgroundColor}
                          onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                        />
                      </div>
                    </div>

                    {cardAttributes.backgroundType === 'gradient' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Secondary Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={cardAttributes.gradientColor}
                            onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={cardAttributes.gradientColor}
                            onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'border' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Border Radius</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cardAttributes.borderRadius}
                        onChange={(e) => updateAttribute('borderRadius', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span className="font-medium">{cardAttributes.borderRadius}px</span>
                        <span>50px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Border Width</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={cardAttributes.borderWidth}
                        onChange={(e) => updateAttribute('borderWidth', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span className="font-medium">{cardAttributes.borderWidth}px</span>
                        <span>10px</span>
                      </div>
                    </div>

                    {cardAttributes.borderWidth > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Border Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={cardAttributes.borderColor}
                            onChange={(e) => updateAttribute('borderColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={cardAttributes.borderColor}
                            onChange={(e) => updateAttribute('borderColor', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'shadow' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Shadow Blur</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cardAttributes.shadowBlur}
                        onChange={(e) => updateAttribute('shadowBlur', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span className="font-medium">{cardAttributes.shadowBlur}px</span>
                        <span>50px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Shadow X Offset</label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={cardAttributes.shadowX}
                        onChange={(e) => updateAttribute('shadowX', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-20px</span>
                        <span className="font-medium">{cardAttributes.shadowX}px</span>
                        <span>20px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Shadow Y Offset</label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={cardAttributes.shadowY}
                        onChange={(e) => updateAttribute('shadowY', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-20px</span>
                        <span className="font-medium">{cardAttributes.shadowY}px</span>
                        <span>20px</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'size' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Width</label>
                      <input
                        type="range"
                        min="200"
                        max="500"
                        value={cardAttributes.width}
                        onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>200px</span>
                        <span className="font-medium">{cardAttributes.width}px</span>
                        <span>500px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Height</label>
                      <input
                        type="range"
                        min="150"
                        max="400"
                        value={cardAttributes.height}
                        onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>150px</span>
                        <span className="font-medium">{cardAttributes.height}px</span>
                        <span>400px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Padding</label>
                      <input
                        type="range"
                        min="8"
                        max="48"
                        value={cardAttributes.padding}
                        onChange={(e) => updateAttribute('padding', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>8px</span>
                        <span className="font-medium">{cardAttributes.padding}px</span>
                        <span>48px</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Presets */}
            <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {preset.attributes.backgroundType === 'gradient' ? 'Gradient' : 'Solid'} • {preset.attributes.borderRadius}px radius
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy className="w-4 h-4" />
                    <span>Copy CSS</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    width: `${cardAttributes.width}px`,
                    height: `${cardAttributes.height}px`,
                    background: cardAttributes.backgroundType === 'gradient' 
                      ? `linear-gradient(135deg, ${cardAttributes.backgroundColor}, ${cardAttributes.gradientColor})`
                      : cardAttributes.backgroundColor,
                    borderRadius: `${cardAttributes.borderRadius}px`,
                    border: `${cardAttributes.borderWidth}px solid ${cardAttributes.borderColor}`,
                    boxShadow: `${cardAttributes.shadowX}px ${cardAttributes.shadowY}px ${cardAttributes.shadowBlur}px ${cardAttributes.shadowColor}`,
                    padding: `${cardAttributes.padding}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="text-center">
                    <div className="text-white font-semibold text-lg mb-2">Sample Card</div>
                    <div className="text-white/80 text-sm">This is your custom card design</div>
                  </div>
                </div>
              </div>

              {/* CSS Output */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated CSS</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
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
