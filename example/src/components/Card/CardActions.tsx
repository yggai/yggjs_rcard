import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { CardActionsProps } from '../../types';
import { defaultTheme } from '../../utils';

/**
 * 卡片操作区域样式组件
 */
const StyledCardActions = styled.div<{ align: string; divider: boolean }>`
  display: flex;
  align-items: center;
  padding: ${defaultTheme.spacing.sm}px ${defaultTheme.spacing.md}px;
  gap: ${defaultTheme.spacing.sm}px;

  /* 对齐方式 */
  ${(props) => {
    switch (props.align) {
      case 'left':
        return 'justify-content: flex-start;';
      case 'center':
        return 'justify-content: center;';
      case 'right':
        return 'justify-content: flex-end;';
      case 'space-between':
        return 'justify-content: space-between;';
      default:
        return 'justify-content: flex-start;';
    }
  }}

  /* 分隔线 */
  ${(props) =>
    props.divider
      ? `
    border-top: 1px solid ${defaultTheme.colors.border};
  `
      : ''}
  
  /* 按钮样式重置 */
  button {
    margin: 0;
  }

  /* 为子元素添加合理的间距 */
  > * + * {
    margin-left: ${defaultTheme.spacing.sm}px;
  }

  /* space-between 模式下移除子元素间距 */
  ${(props) =>
    props.align === 'space-between'
      ? `
    > * + * {
      margin-left: 0;
    }
  `
      : ''}
`;

/**
 * 卡片操作区域组件
 *
 * @description 提供卡片底部的操作按钮区域
 * @param props - 卡片操作区域属性
 * @returns JSX.Element
 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ children, align = 'left', divider = false, className, ...rest }, ref) => {
    return (
      <StyledCardActions
        ref={ref}
        className={`card-actions ${className || ''}`}
        align={align}
        divider={divider}
        {...rest}
      >
        {children}
      </StyledCardActions>
    );
  }
);

CardActions.displayName = 'CardActions';
