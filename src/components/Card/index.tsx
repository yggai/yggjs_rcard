/**
 * 主卡片组件
 * @description 提供高性能、可定制的卡片容器组件
 */

import styled from '@emotion/styled';
import { forwardRef, KeyboardEvent, useCallback } from 'react';
import { CardBaseProps } from '../../types/card';
import { useCardInteraction } from '../../hooks/useCardInteraction';
import { createCardStyles } from './styles';

/**
 * 卡片容器样式组件
 */
const StyledCard = styled.div<{
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
}>`
  ${createCardStyles}
`;

/**
 * 卡片组件
 * @param props 卡片属性
 * @param ref DOM引用
 * @returns 卡片组件实例
 */
export const Card = forwardRef<HTMLDivElement, CardBaseProps>(
  (
    {
      children,
      size = 'md',
      variant = 'elevated',
      shadow = 'md',
      borderRadius = 'md',
      disabled = false,
      clickable = false,
      selected = false,
      loading = false,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      className,
      style,
      'data-testid': testId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    },
    ref
  ) => {
    // 使用交互hook处理点击和悬停状态
    const {
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      isHovered,
      isPressed,
      isFocused,
      handleFocus,
      handleBlur,
      handleMouseDown,
      handleMouseUp,
    } = useCardInteraction({
      onClick,
      onMouseEnter,
      onMouseLeave,
      disabled,
      clickable,
    });

    // 处理键盘事件
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (!clickable || disabled || !onClick) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          // 直接调用onClick，因为它期望MouseEvent参数
          onClick(event as unknown as React.MouseEvent<HTMLElement>);
        }
      },
      [clickable, disabled, onClick]
    );

    return (
      <StyledCard
        ref={ref}
        $size={size}
        $variant={variant}
        $shadow={shadow}
        $borderRadius={borderRadius}
        $disabled={disabled}
        $clickable={clickable}
        $selected={selected}
        $loading={loading}
        $maxWidth={restProps.maxWidth}
        $minHeight={restProps.minHeight}
        className={className}
        style={style}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-testid={testId}
        data-hovered={isHovered}
        data-pressed={isPressed}
        data-focused={isFocused}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        aria-selected={selected}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {loading ? (
          <div data-testid='card-loading-indicator' className='card-loading'>
            加载中...
          </div>
        ) : (
          children
        )}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';
