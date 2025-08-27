import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { CardContentProps } from '../../types';
import { defaultTheme } from '../../utils';

/**
 * 卡片内容样式组件
 */
const StyledCardContent = styled.div<{ padding: boolean }>`
  flex: 1;
  padding: ${props =>
    props.padding ? `0 ${defaultTheme.spacing.md}px ${defaultTheme.spacing.md}px` : '0'};
  color: ${defaultTheme.colors.text.primary};
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* 确保内容不会溢出 */
  min-width: 0;

  /* 为子元素提供合理的间距 */
  > * + * {
    margin-top: ${defaultTheme.spacing.sm}px;
  }

  /* 段落样式 */
  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: ${defaultTheme.spacing.sm}px;
    }
  }

  /* 列表样式 */
  ul,
  ol {
    margin: 0;
    padding-left: ${defaultTheme.spacing.lg}px;

    &:not(:last-child) {
      margin-bottom: ${defaultTheme.spacing.sm}px;
    }
  }

  /* 标题样式 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 ${defaultTheme.spacing.sm}px 0;
    color: ${defaultTheme.colors.text.primary};
  }
`;

/**
 * 卡片内容组件
 *
 * @description 提供卡片的主要内容区域
 * @param props - 卡片内容属性
 * @returns JSX.Element
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, padding = true, className, ...rest }, ref) => {
    return (
      <StyledCardContent
        ref={ref}
        className={`card-content ${className || ''}`}
        padding={padding}
        {...rest}
      >
        {children}
      </StyledCardContent>
    );
  }
);

CardContent.displayName = 'CardContent';
