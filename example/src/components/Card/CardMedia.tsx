import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { CardMediaProps } from '../../types';
import { defaultTheme } from '../../utils';

/**
 * 卡片媒体区域样式组件
 */
const StyledCardMedia = styled.div<{ height: string | number }>`
  position: relative;
  overflow: hidden;
  background-color: ${defaultTheme.colors.surface};

  /* 高度设置 */
  height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}px` : props.height};

  /* 图片样式 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* 视频样式 */
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* 自定义内容样式 */
  &.custom-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${defaultTheme.colors.surface};
  }
`;

/**
 * 卡片媒体区域组件
 *
 * @description 提供卡片的媒体内容展示区域，支持图片、视频或自定义内容
 * @param props - 卡片媒体区域属性
 * @returns JSX.Element
 */
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      children,
      image,
      alt = '',
      height = '200px',
      component = 'img',
      className,
      ...rest
    },
    ref
  ) => {
    const renderMediaContent = (): React.ReactNode => {
      // 如果有自定义内容，优先显示自定义内容
      if (children) {
        return children;
      }

      // 根据组件类型渲染不同的媒体内容
      switch (component) {
        case 'img':
          return image ? (
            <img
              src={image}
              alt={alt}
              loading="lazy"
              onError={(e) => {
                // 图片加载失败时的处理
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : null;

        case 'video':
          return image ? (
            <video
              src={image}
              controls
              preload="metadata"
              onError={(e) => {
                // 视频加载失败时的处理
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
              }}
            />
          ) : null;

        case 'div':
        default:
          return null;
      }
    };

    const hasCustomContent = Boolean(children);
    const mediaContent = renderMediaContent();

    return (
      <StyledCardMedia
        ref={ref}
        className={`card-media ${hasCustomContent ? 'custom-content' : ''} ${className || ''}`}
        height={height}
        {...rest}
      >
        {mediaContent}
      </StyledCardMedia>
    );
  }
);

CardMedia.displayName = 'CardMedia';
