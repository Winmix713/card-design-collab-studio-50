
export const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

export const generateCardStyle = (cardAttributes: any) => {
  const borderRadiusValue = cardAttributes.borderRadiusLinked 
    ? `${cardAttributes.borderRadius}px`
    : `${cardAttributes.borderRadiusTopLeft}px ${cardAttributes.borderRadiusTopRight}px ${cardAttributes.borderRadiusBottomRight}px ${cardAttributes.borderRadiusBottomLeft}px`;

  let boxShadow = '';
  if (cardAttributes.primaryShadow.enabled) {
    boxShadow += `${cardAttributes.primaryShadow.x}px ${cardAttributes.primaryShadow.y}px ${cardAttributes.primaryShadow.blur}px ${cardAttributes.primaryShadow.spread}px ${hexToRgba(cardAttributes.primaryShadow.color, cardAttributes.primaryShadow.opacity)}`;
  }
  if (cardAttributes.secondaryShadow.enabled) {
    if (boxShadow) boxShadow += ', ';
    boxShadow += `${cardAttributes.secondaryShadow.x}px ${cardAttributes.secondaryShadow.y}px ${cardAttributes.secondaryShadow.blur}px ${cardAttributes.secondaryShadow.spread}px ${hexToRgba(cardAttributes.secondaryShadow.color, cardAttributes.secondaryShadow.opacity)}`;
  }

  return {
    width: `${cardAttributes.width}px`,
    height: `${cardAttributes.height}px`,
    background: cardAttributes.backgroundType === 'gradient' 
      ? `linear-gradient(${cardAttributes.gradientDirection}deg, ${hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity)}, ${hexToRgba(cardAttributes.gradientColor, cardAttributes.gradientOpacity)})`
      : hexToRgba(cardAttributes.backgroundColor, cardAttributes.backgroundOpacity),
    borderRadius: borderRadiusValue,
    border: `${cardAttributes.borderWidth}px ${cardAttributes.borderStyle} ${hexToRgba(cardAttributes.borderColor, cardAttributes.borderOpacity)}`,
    boxShadow: boxShadow || 'none',
    padding: `${cardAttributes.padding}px`,
    backdropFilter: cardAttributes.glassmorphism ? `blur(${cardAttributes.backdropBlur}px)` : 'none',
    opacity: cardAttributes.globalOpacity / 100,
    color: cardAttributes.textColor
  };
};
