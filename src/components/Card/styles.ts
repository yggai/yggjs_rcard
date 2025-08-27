import { css } from '@emotion/react';
import { CardBaseProps } from '../../types/card';
import {
  defaultTheme,
  getCardSizeStyles,
  getCardVariantStyles,
  getShadowStyles,
  getBorderRadiusStyles,
} from '../../utils';

// Interface for styled props (with $ prefix)
interface StyledCardProps {
  $size?: CardBaseProps['size'];
  $variant?: CardBaseProps['variant'];
  $shadow?: CardBaseProps['shadow'];
  $borderRadius?: CardBaseProps['borderRadius'];
  $disabled?: CardBaseProps['disabled'];
  $clickable?: CardBaseProps['clickable'];
  $selected?: CardBaseProps['selected'];
  $loading?: CardBaseProps['loading'];
  $maxWidth?: CardBaseProps['maxWidth'];
  $minHeight?: CardBaseProps['minHeight'];
}

/**
 * 创建卡片的基础样式
 * @param props 卡片属性
 * @returns 样式对象
 */
export const createCardStyles = (props: StyledCardProps) => {
  const sizeStyles = getCardSizeStyles(props.$size || 'md', defaultTheme);
  const variantStyles = getCardVariantStyles(props.$variant || 'elevated', defaultTheme);

  return css`
    /* 基础布局 */
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    width: 100%;

    /* 基本样式应用 */
    padding: ${typeof sizeStyles['padding'] === 'string'
      ? sizeStyles['padding']
      : `${sizeStyles['padding']}px`};
    min-height: ${typeof sizeStyles['minHeight'] === 'string'
      ? sizeStyles['minHeight']
      : `${sizeStyles['minHeight']}px`};
    background-color: ${typeof variantStyles['backgroundColor'] === 'string'
      ? variantStyles['backgroundColor']
      : 'transparent'};
    border: ${typeof variantStyles['border'] === 'string' ? variantStyles['border'] : 'none'};

    /* 边框半径 */
    border-radius: ${getBorderRadiusStyles(props.$borderRadius || 'md', defaultTheme)};

    /* 阴影效果 */
    ${props.$variant === 'elevated' || props.$shadow
      ? css`
          box-shadow: ${getShadowStyles(props.$shadow || 'md', defaultTheme)};
        `
      : ''}

    /* 最大宽度和最小高度 */
    ${props.$maxWidth
      ? css`
          max-width: ${typeof props.$maxWidth === 'number'
            ? `${props.$maxWidth}px`
            : props.$maxWidth};
        `
      : ''}
    ${props.$minHeight
      ? css`
          min-height: ${typeof props.$minHeight === 'number'
            ? `${props.$minHeight}px`
            : props.$minHeight};
        `
      : ''}
    
    /* 过渡动画 */
    transition: all ${defaultTheme.animations.duration.normal} ${defaultTheme.animations.easing
      .easeInOut};

    /* 可点击状态 */
    ${props.$clickable && !props.$disabled
      ? css`
          cursor: pointer;
          user-select: none;

          &:hover {
            transform: translateY(-2px);
            box-shadow: ${getShadowStyles(props.$shadow === 'xl' ? 'xl' : 'lg', defaultTheme)};
          }

          &:active,
          &[data-pressed='true'] {
            transform: translateY(0);
            box-shadow: ${getShadowStyles(props.$shadow || 'md', defaultTheme)};
          }

          &:focus {
            outline: 2px solid ${defaultTheme.colors.primary};
            outline-offset: 2px;
          }

          &:focus:not(:focus-visible) {
            outline: none;
          }
        `
      : ''}

    /* 禁用状态 */
    ${props.$disabled
      ? css`
          opacity: 0.6;
          cursor: not-allowed;
          user-select: none;
          pointer-events: none;
        `
      : ''}
    
    /* 选中状态 */
    ${props.$selected
      ? css`
          border-color: ${defaultTheme.colors.primary};
          box-shadow: 0 0 0 2px ${defaultTheme.colors.primary}20;
        `
      : ''}
    
    /* 加载状态 */
    ${props.$loading
      ? css`
          .card-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: ${defaultTheme.spacing.xl}px;
            color: ${defaultTheme.colors.text.secondary};
            font-size: 0.875rem;

            &::before {
              content: '';
              width: 16px;
              height: 16px;
              margin-right: ${defaultTheme.spacing.sm}px;
              border: 2px solid ${defaultTheme.colors.border};
              border-top-color: ${defaultTheme.colors.primary};
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `
      : ''}
    
    /* 响应式设计 */
    @media (max-width: ${defaultTheme.breakpoints.sm}) {
      ${props.$size === 'lg'
        ? css`
            padding: ${defaultTheme.spacing.md}px;
            min-height: 160px;
          `
        : ''}
    }

    @media (max-width: ${defaultTheme.breakpoints.xs}) {
      ${props.$size !== 'sm'
        ? css`
            padding: ${defaultTheme.spacing.sm}px;
            min-height: 120px;
          `
        : ''}
      border-radius: ${defaultTheme.borderRadius.sm};
    }

    /* 高对比度模式支持 */
    @media (prefers-contrast: high) {
      border: 2px solid ${defaultTheme.colors.border};

      ${props.$selected
        ? css`
            border-color: ${defaultTheme.colors.primary};
            border-width: 3px;
          `
        : ''}
    }

    /* 减少动画模式支持 */
    @media (prefers-reduced-motion: reduce) {
      transition: none;

      ${props.$clickable && !props.$disabled
        ? css`
            &:hover {
              transform: none;
            }

            &:active,
            &[data-pressed='true'] {
              transform: none;
            }
          `
        : ''}
    }
  `;
};

/**
 * 卡片悬停状态样式
 */
export const cardHoverStyles = css`
  &[data-hovered='true'] {
    /* 悬停状态下的额外样式 */
  }
`;

/**
 * 卡片按下状态样式
 */
export const cardPressedStyles = css`
  &[data-pressed='true'] {
    /* 按下状态下的额外样式 */
  }
`;
