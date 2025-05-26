
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Star, Download, Crown, Grid, List, Filter } from 'lucide-react';
import { templates, templateCategories, Template } from './data/templates';
import { CardAttributes } from './hooks/useCardAttributes';

interface TemplateGalleryProps {
  onClose: () => void;
  onApplyTemplate: (templateData: any) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onClose,
  onApplyTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredTemplates = useMemo(() => {
    const filtered = templates.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => template.tags.includes(tag));
      const matchesPremium = !showPremiumOnly || template.isPremium;

      return matchesSearch && matchesCategory && matchesTags && matchesPremium;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedTags, sortBy, showPremiumOnly]);

  const handleApplyTemplate = (template: Template) => {
    onApplyTemplate(template.data);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Template Gallery</h2>
              <p className="text-white/60">Choose from professionally designed templates</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {templateCategories.map(category => (
                <option key={category} value={category} className="bg-slate-800">
                  {category}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4 text-white" /> : <Grid className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApplyTemplate(template)}
                layout
              >
                {/* Template Preview */}
                <div className="relative mb-4">
                  <div
                    className="w-full h-32 rounded-lg border border-white/20 flex items-center justify-center text-white/60 overflow-hidden"
                    style={{
                      background: template.data.backgroundType === 'gradient' 
                        ? `linear-gradient(135deg, ${template.data.backgroundColor}, ${template.data.gradientColor})`
                        : template.data.backgroundColor,
                      backdropFilter: template.data.glassmorphism ? `blur(${template.data.backdropBlur}px)` : 'none',
                      borderRadius: `${template.data.borderRadius}px`,
                    }}
                  >
                    <div className="text-center p-4">
                      <div className="font-semibold text-sm">Preview</div>
                      <div className="text-xs opacity-60">Template Design</div>
                    </div>
                  </div>
                  {template.isPremium && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div>
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3 text-xs text-white/50">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {template.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {template.downloads.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-white/40">
                      by {template.author}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white/40 text-lg">No templates found</div>
              <p className="text-white/30 mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
