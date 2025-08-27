import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { CardHeaderProps } from '../../types';
import { defaultTheme } from '../../utils';

/**
 * 卡片头部样式组件
 */
const StyledCardHeader = styled.div<{ hasAction: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${defaultTheme.spacing.md}px;
  padding-bottom: ${(props) =>
    props.hasAction ? defaultTheme.spacing.sm : defaultTheme.spacing.md}px;

  .card-header-content {
    flex: 1;
    min-width: 0;
  }

  .card-header-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${defaultTheme.colors.text.primary};
    word-wrap: break-word;
  }

  .card-header-subtitle {
    margin: ${defaultTheme.spacing.xs}px 0 0 0;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4;
    color: ${defaultTheme.colors.text.secondary};
    word-wrap: break-word;
  }

  .card-header-action {
    margin-left: ${defaultTheme.spacing.md}px;
    flex-shrink: 0;
  }
`;

/**
 * 卡片头部组件
 *
 * @description 提供卡片的标题、副标题和操作区域
 * @param props - 卡片头部属性
 * @returns JSX.Element
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...rest }, ref) => {
    const hasAction = Boolean(action);

    return (
      <StyledCardHeader
        ref={ref}
        className={`card-header ${className || ''}`}
        hasAction={hasAction}
        {...rest}
      >
        <div className="card-header-content">
          {title && <h3 className="card-header-title">{title}</h3>}
          {subtitle && <p className="card-header-subtitle">{subtitle}</p>}
          {children}
        </div>
        {action && <div className="card-header-action">{action}</div>}
      </StyledCardHeader>
    );
  }
);

CardHeader.displayName = 'CardHeader';
