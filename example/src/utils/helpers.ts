import {
  CardSize,
  CardVariant,
  ShadowLevel,
  BorderRadius,
  ThemeConfig,
} from '../types';
import { defaultTheme } from './theme';

/**
 * 获取卡片大小对应的样式
 */
export const getCardSizeStyles = (
  size: CardSize,
  theme: ThemeConfig = defaultTheme
): Record<string, unknown> => {
  const sizeMap: Record<CardSize, Record<string, unknown>> = {
    sm: {
      padding: `${theme.spacing.sm}px`,
      minHeight: '120px',
    },
    md: {
      padding: `${theme.spacing.md}px`,
      minHeight: '160px',
    },
    lg: {
      padding: `${theme.spacing.lg}px`,
      minHeight: '200px',
    },
  };

  return sizeMap[size] || sizeMap.md;
};

/**
 * 获取卡片变体对应的样式
 */
export const getCardVariantStyles = (
  variant: CardVariant,
  theme: ThemeConfig = defaultTheme
): Record<string, unknown> => {
  const variantMap: Record<CardVariant, Record<string, unknown>> = {
    filled: {
      backgroundColor: theme.colors.surface,
      border: 'none',
    },
    outlined: {
      backgroundColor: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
    },
    elevated: {
      backgroundColor: theme.colors.background,
      border: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      border: 'none',
    },
  };

  return variantMap[variant] || variantMap.filled;
};

/**
 * 获取阴影级别对应的样式
 */
export const getShadowStyles = (
  shadow: ShadowLevel,
  theme: ThemeConfig = defaultTheme
): string => {
  return theme.shadows[shadow] || theme.shadows.md;
};

/**
 * 获取边框半径对应的样式
 */
export const getBorderRadiusStyles = (
  borderRadius: BorderRadius,
  theme: ThemeConfig = defaultTheme
): string => {
  return theme.borderRadius[borderRadius] || theme.borderRadius.md;
};

/**
 * 生成响应式媒体查询
 */
export const generateMediaQuery = (
  breakpoint: keyof ThemeConfig['breakpoints'],
  theme: ThemeConfig = defaultTheme
): string => {
  return `@media (min-width: ${theme.breakpoints[breakpoint]})`;
};

/**
 * 合并类名的工具函数
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 将像素值转换为rem单位
 */
export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

/**
 * 检查是否为有效的颜色值
 */
export const isValidColor = (color: string): boolean => {
  const style = new Option().style;
  style.color = color;
  return style.color !== '';
};

/**
 * 获取对比文本颜色（基于背景色明度）
 */
export const getContrastTextColor = (
  backgroundColor: string,
  theme: ThemeConfig = defaultTheme
): string => {
  // 简化实现，实际应用中可以使用更复杂的算法
  const isLight =
    backgroundColor.includes('#fff') || backgroundColor.includes('white');
  return isLight ? theme.colors.text.primary : '#ffffff';
};
