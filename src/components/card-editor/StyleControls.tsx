
import React from 'react';
import { MessageSquare, Settings, Square, Palette, Cloud, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface StyleControlsProps {
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  showAdvanced: boolean;
}

export const StyleControls: React.FC<StyleControlsProps> = ({
  cardAttributes,
  updateAttribute,
  showAdvanced
}) => {
  const [activeTab, setActiveTab] = React.useState('ai');
  const [styleDescription, setStyleDescription] = React.useState('');
  const [isGeneratingStyle, setIsGeneratingStyle] = React.useState(false);

  const generateStyleFromDescription = React.useCallback(async () => {
    if (!styleDescription.trim()) return;
    
    setIsGeneratingStyle(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let aiStyle = {};
      const description = styleDescription.toLowerCase();
      
      // Glass/frosted effect
      if (description.includes('glass') || description.includes('frost') || description.includes('transparent')) {
        aiStyle = {
          backgroundColor: '#ffffff',
          backgroundOpacity: 10,
          glassmorphism: true,
          backdropBlur: 10,
          borderWidth: 1,
          borderColor: '#ffffff',
          borderOpacity: 20,
          borderRadius: 16,
          primaryShadow: {
            ...cardAttributes.primaryShadow,
            blur: 32,
            opacity: 10
          }
        };
      } 
      // Neon effect
      else if (description.includes('neon') || description.includes('glow')) {
        let neonColor = '#8b5cf6'; // default purple
        
        if (description.includes('blue')) neonColor = '#3b82f6';
        else if (description.includes('pink')) neonColor = '#ec4899';
        else if (description.includes('green')) neonColor = '#10b981';
        else if (description.includes('red')) neonColor = '#ef4444';
        
        aiStyle = {
          backgroundColor: '#0f172a',
          backgroundOpacity: 100,
          borderWidth: 2,
          borderColor: neonColor,
          borderOpacity: 100,
          borderRadius: 12,
          primaryShadow: {
            ...cardAttributes.primaryShadow,
            blur: 20,
            spread: 0,
            color: neonColor,
            opacity: 70
          },
          glassmorphism: false
        };
      }
      // Gradient effect
      else if (description.includes('gradient')) {
        let gradientColor = '#ec4899'; // default pink
        
        if (description.includes('blue') && description.includes('green')) {
          aiStyle.backgroundColor = '#3b82f6';
          gradientColor = '#10b981';
        } else if (description.includes('orange') && description.includes('red')) {
          aiStyle.backgroundColor = '#f97316';
          gradientColor = '#ef4444';
        }
        
        aiStyle = {
          ...aiStyle,
          backgroundColor: aiStyle.backgroundColor || '#8b5cf6',
          backgroundType: 'gradient',
          gradientColor,
          backgroundOpacity: 100,
          gradientOpacity: 100,
          borderRadius: 16,
          primaryShadow: {
            ...cardAttributes.primaryShadow,
            blur: 35,
            opacity: 20
          }
        };
      }
      // Minimal/clean effect
      else if (description.includes('minimal') || description.includes('clean') || description.includes('simple')) {
        const isDark = description.includes('dark');
        
        aiStyle = {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          backgroundOpacity: 100,
          borderWidth: 1,
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderOpacity: 100,
          borderRadius: 8,
          primaryShadow: {
            ...cardAttributes.primaryShadow,
            blur: 6,
            opacity: isDark ? 20 : 5
          }
        };
      }
      // Default - creative interpretation
      else {
        const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f97316', '#ef4444'];
        const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        
        aiStyle = {
          backgroundColor: randomColor1,
          backgroundType: 'gradient',
          gradientColor: randomColor2,
          backgroundOpacity: 100,
          gradientOpacity: 100,
          borderRadius: 16,
          primaryShadow: {
            ...cardAttributes.primaryShadow,
            blur: 40,
            opacity: 10
          }
        };
      }
      
      // Apply the generated style
      Object.keys(aiStyle).forEach(key => {
        updateAttribute(key, aiStyle[key]);
      });
      
      setStyleDescription('');
      
    } catch (error) {
      console.error('Error generating style:', error);
    } finally {
      setIsGeneratingStyle(false);
    }
  }, [styleDescription, cardAttributes, updateAttribute]);

  const hexToRgba = (hex: string, opacity: number) => {
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

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Style Controls</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-700">
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Basic</span>
          </TabsTrigger>
          <TabsTrigger value="border" className="flex items-center gap-2">
            <Square className="w-4 h-4" />
            <span className="hidden sm:inline">Border</span>
          </TabsTrigger>
          <TabsTrigger value="background" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Background</span>
          </TabsTrigger>
          <TabsTrigger value="shadows" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            <span className="hidden sm:inline">Shadow</span>
          </TabsTrigger>
          <TabsTrigger value="css" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">CSS</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-4 space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Describe Your Style</label>
            <Textarea
              value={styleDescription}
              onChange={(e) => setStyleDescription(e.target.value)}
              placeholder="e.g., 'a frosted glass card with purple glow' or 'minimal dark card with subtle shadow'"
              className="bg-gray-700 border-gray-600 text-gray-100 min-h-[100px]"
              disabled={isGeneratingStyle}
            />
          </div>
          
          <Button
            onClick={generateStyleFromDescription}
            disabled={isGeneratingStyle || !styleDescription.trim()}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
          >
            {isGeneratingStyle ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Style...
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                Generate Style
              </>
            )}
          </Button>
          
          <div className="bg-gray-700 rounded-lg p-4 text-sm text-gray-300">
            <p>Try these examples:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setStyleDescription('a frosted glass card with purple glow')}>
                a frosted glass card with purple glow
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setStyleDescription('neon blue card with glow effect')}>
                neon blue card with glow effect
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setStyleDescription('minimal dark card with subtle shadow')}>
                minimal dark card with subtle shadow
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setStyleDescription('gradient from blue to green')}>
                gradient from blue to green
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="mt-4 space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Border Radius</label>
            <input
              type="range"
              min="0"
              max="50"
              value={parseInt(cardAttributes.borderRadius)}
              onChange={(e) => updateAttribute('borderRadius', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="text-xs text-gray-400">{cardAttributes.borderRadius}px</div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Width</label>
            <input
              type="range"
              min="200"
              max="500"
              value={cardAttributes.width}
              onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="text-xs text-gray-400">{cardAttributes.width}px</div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Height</label>
            <input
              type="range"
              min="100"
              max="400"
              value={cardAttributes.height}
              onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="text-xs text-gray-400">{cardAttributes.height}px</div>
          </div>
        </TabsContent>

        <TabsContent value="css" className="mt-4 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-xs overflow-x-auto whitespace-pre-wrap">
              {generateCSS()}
            </pre>
          </div>
          <Button
            onClick={() => navigator.clipboard.writeText(generateCSS())}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
            variant="outline"
          >
            <Code className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
        </TabsContent>

        {/* Placeholder tabs for border, background, shadows */}
        <TabsContent value="border" className="mt-4">
          <div className="text-gray-400 text-center py-8">
            Border controls will be implemented here
          </div>
        </TabsContent>

        <TabsContent value="background" className="mt-4">
          <div className="text-gray-400 text-center py-8">
            Background controls will be implemented here
          </div>
        </TabsContent>

        <TabsContent value="shadows" className="mt-4">
          <div className="text-gray-400 text-center py-8">
            Shadow controls will be implemented here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
