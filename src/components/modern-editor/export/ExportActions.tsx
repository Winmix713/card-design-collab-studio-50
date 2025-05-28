
import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2 } from 'lucide-react';

interface ExportActionsProps {
  onCopy: () => void;
  onDownload: () => void;
  onShare: () => void;
  copied: boolean;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  onCopy,
  onDownload,
  onShare,
  copied
}) => (
  <div className="flex space-x-3 mt-6">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCopy}
      className="flex-1 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
    >
      <Copy className="w-5 h-5" />
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onDownload}
      className="flex-1 p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
    >
      <Download className="w-5 h-5" />
      <span>Download</span>
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onShare}
      className="flex-1 p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center justify-center space-x-2 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </motion.button>
  </div>
);
