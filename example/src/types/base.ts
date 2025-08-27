/**
 * 基础颜色定义
 */
export interface BaseColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * 主题颜色定义
 */
export interface ThemeColors extends BaseColors {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  shadow: string;
}

/**
 * 间距尺寸类型
 */
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 卡片大小类型
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * 卡片变体类型
 */
export type CardVariant = 'filled' | 'outlined' | 'elevated' | 'ghost';

/**
 * 阴影级别类型
 */
export type ShadowLevel = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 边框半径类型
 */
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * 动画持续时间类型
 */
export type AnimationDuration = 'fast' | 'normal' | 'slow';

/**
 * 响应式断点类型
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 组件状态类型
 */
export type ComponentState =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled';

/**
 * 可点击元素的事件处理器类型
 */
export interface ClickableProps {
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  onDoubleClick?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  onMouseEnter?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  onMouseLeave?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
}

/**
 * 基础组件属性接口
 */
export interface BaseComponentProps {
  /** 组件的唯一标识符 */
  id?: string | undefined;
  /** CSS 类名 */
  className?: string | undefined;
  /** 内联样式 */
  style?: React.CSSProperties | undefined;
  /** 测试标识符 */
  'data-testid'?: string | undefined;
  /** ARIA 标签 */
  'aria-label'?: string | undefined;
  /** ARIA 描述 */
  'aria-describedby'?: string | undefined;
}

/**
 * 主题配置接口
 */
export interface ThemeConfig {
  colors: ThemeColors;
  spacing: Record<SpacingSize, number>;
  borderRadius: Record<BorderRadius, string>;
  shadows: Record<ShadowLevel, string>;
  animations: {
    duration: Record<AnimationDuration, string>;
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  breakpoints: Record<Breakpoint, string>;
}
