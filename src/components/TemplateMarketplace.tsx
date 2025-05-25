
import React, { useState } from 'react';
import { Search, Grid, List, Plus, Heart, Download, GitFork, Filter } from 'lucide-react';

const TemplateMarketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for templates
  const templates = [
    {
      id: 1,
      name: 'Modern Gradient Card',
      creator: 'Design Pro',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      likes: 245,
      forks: 32,
      category: 'modern',
      tags: ['gradient', 'modern', 'purple'],
      preview: {
        backgroundColor: '#8b5cf6',
        backgroundType: 'gradient',
        gradientColor: '#6d28d9',
        borderRadius: 16,
        shadowBlur: 24
      }
    },
    {
      id: 2,
      name: 'Minimalist White',
      creator: 'Clean Design',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      likes: 189,
      forks: 28,
      category: 'minimalist',
      tags: ['minimal', 'white', 'clean'],
      preview: {
        backgroundColor: '#ffffff',
        backgroundType: 'solid',
        borderRadius: 8,
        shadowBlur: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb'
      }
    },
    {
      id: 3,
      name: 'Dark Mode Card',
      creator: 'Night Owl',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      likes: 312,
      forks: 45,
      category: 'dark',
      tags: ['dark', 'modern', 'sleek'],
      preview: {
        backgroundColor: '#1f2937',
        backgroundType: 'solid',
        borderRadius: 12,
        shadowBlur: 20
      }
    },
    {
      id: 4,
      name: 'Ocean Breeze',
      creator: 'Color Master',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      likes: 156,
      forks: 19,
      category: 'colorful',
      tags: ['blue', 'gradient', 'ocean'],
      preview: {
        backgroundColor: '#0ea5e9',
        backgroundType: 'gradient',
        gradientColor: '#0284c7',
        borderRadius: 20,
        shadowBlur: 16
      }
    },
    {
      id: 5,
      name: 'Sunset Glow',
      creator: 'Warm Colors',
      creatorAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
      likes: 298,
      forks: 52,
      category: 'colorful',
      tags: ['orange', 'gradient', 'warm'],
      preview: {
        backgroundColor: '#f97316',
        backgroundType: 'gradient',
        gradientColor: '#ea580c',
        borderRadius: 24,
        shadowBlur: 28
      }
    },
    {
      id: 6,
      name: 'Glass Effect',
      creator: 'Modern UI',
      creatorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face',
      likes: 427,
      forks: 78,
      category: 'glass',
      tags: ['glass', 'modern', 'transparent'],
      preview: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backgroundType: 'solid',
        borderRadius: 16,
        shadowBlur: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'dark', name: 'Dark Mode' },
    { id: 'colorful', name: 'Colorful' },
    { id: 'glass', name: 'Glass Effect' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Template Marketplace
            </h1>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-violet-100 text-violet-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredTemplates.length} templates found
              </p>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Filter className="mx-auto w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-500">Try adjusting your search or category filters.</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredTemplates.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateCard = ({ template, viewMode }) => {
  const [liked, setLiked] = useState(false);

  const getCardStyle = () => {
    const preview = template.preview;
    return {
      width: viewMode === 'grid' ? '100%' : '120px',
      height: viewMode === 'grid' ? '160px' : '80px',
      background: preview.backgroundType === 'gradient' 
        ? `linear-gradient(135deg, ${preview.backgroundColor}, ${preview.gradientColor})`
        : preview.backgroundColor,
      borderRadius: `${preview.borderRadius}px`,
      border: preview.borderWidth ? `${preview.borderWidth}px solid ${preview.borderColor}` : 'none',
      boxShadow: `0 ${preview.shadowBlur/2}px ${preview.shadowBlur}px rgba(0, 0, 0, 0.1)`
    };
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4">
          <div style={getCardStyle()} className="shrink-0"></div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <div className="flex items-center mt-1 mb-2">
              <img 
                src={template.creatorAvatar} 
                alt={template.creator}
                className="w-5 h-5 rounded-full mr-2"
              />
              <span className="text-sm text-gray-600">{template.creator}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {template.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
              {template.likes}
            </div>
            <div className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" />
              {template.forks}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-colors ${
                liked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-4">
        <div style={getCardStyle()} className="mb-4"></div>
        
        <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
        
        <div className="flex items-center mb-3">
          <img 
            src={template.creatorAvatar} 
            alt={template.creator}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{template.creator}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
              {template.likes}
            </div>
            <div className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" />
              {template.forks}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-colors ${
                liked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateMarketplace;
