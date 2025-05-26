
export const generateRandomCard = () => {
  const titles = [
    "Creative Card", "Modern Design", "Elegant Style", "Dynamic Card", 
    "Innovative UI", "Stylish Component", "Beautiful Layout", "Premium Design"
  ];
  
  const descriptions = [
    "Beautiful and responsive design",
    "Crafted with precision and care", 
    "Designed for maximum impact",
    "Built for the future of web",
    "Elegant solution for modern apps",
    "Perfect blend of form and function"
  ];

  const colors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", 
    "#10b981", "#3b82f6", "#ef4444", "#8b5cf6",
    "#06b6d4", "#84cc16", "#f97316", "#6366f1"
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return {
    backgroundColor: getRandomColor(),
    backgroundType: Math.random() > 0.5 ? 'gradient' : 'solid',
    gradientColor: getRandomColor(),
    borderRadius: Math.floor(Math.random() * 30) + 8,
    width: Math.floor(Math.random() * 200) + 250,
    height: Math.floor(Math.random() * 150) + 150,
    primaryShadow: {
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 30) + 5,
      blur: Math.floor(Math.random() * 40) + 10,
      spread: Math.floor(Math.random() * 10),
      color: getRandomColor(),
      opacity: Math.floor(Math.random() * 50) + 10,
      enabled: true,
    },
    glassmorphism: Math.random() > 0.7,
    backdropBlur: Math.floor(Math.random() * 20) + 5,
  };
};

export const exportCard = (cardAttributes: any, cardStyle: any) => {
  const exportData = {
    card: cardAttributes,
    style: cardStyle,
    timestamp: new Date().toISOString(),
    version: "2.0.0",
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `card-editor-pro-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
