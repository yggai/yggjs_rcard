import {
  BaseComponentProps,
  ClickableProps,
  CardSize,
  CardVariant,
  ShadowLevel,
  BorderRadius,
} from './base';

/**
 * 卡片组件基础属性接口
 */
export interface CardBaseProps extends BaseComponentProps, ClickableProps {
  /** 卡片内容 */
  children: React.ReactNode;
  /** 卡片大小 */
  size?: CardSize | undefined;
  /** 卡片变体 */
  variant?: CardVariant | undefined;
  /** 阴影级别 */
  shadow?: ShadowLevel | undefined;
  /** 边框半径 */
  borderRadius?: BorderRadius | undefined;
  /** 是否禁用 */
  disabled?: boolean | undefined;
  /** 是否可点击 */
  clickable?: boolean | undefined;
  /** 是否选中状态 */
  selected?: boolean | undefined;
  /** 是否显示加载状态 */
  loading?: boolean | undefined;
  /** 最大宽度 */
  maxWidth?: string | number | undefined;
  /** 最小高度 */
  minHeight?: string | number | undefined;
}

/**
 * 卡片头部属性接口
 */
export interface CardHeaderProps extends BaseComponentProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subtitle?: React.ReactNode;
  /** 头部操作区域 */
  action?: React.ReactNode;
  /** 头部内容 */
  children?: React.ReactNode;
}

/**
 * 卡片内容区域属性接口
 */
export interface CardContentProps extends BaseComponentProps {
  /** 内容 */
  children: React.ReactNode;
  /** 是否添加默认内边距 */
  padding?: boolean;
}

/**
 * 卡片底部操作栏属性接口
 */
export interface CardActionsProps extends BaseComponentProps {
  /** 操作按钮或内容 */
  children: React.ReactNode;
  /** 操作区域对齐方式 */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /** 是否添加分隔线 */
  divider?: boolean;
}

/**
 * 卡片媒体区域属性接口
 */
export interface CardMediaProps extends BaseComponentProps {
  /** 媒体内容 */
  children?: React.ReactNode;
  /** 图片源 */
  image?: string;
  /** 图片替代文本 */
  alt?: string;
  /** 媒体高度 */
  height?: string | number;
  /** 媒体组件类型 */
  component?: 'img' | 'video' | 'div';
}

/**
 * 完整卡片组件属性接口
 */
export interface CardProps extends CardBaseProps {
  /** 卡片头部配置 */
  header?: CardHeaderProps;
  /** 是否显示媒体区域 */
  media?: CardMediaProps;
  /** 是否显示操作区域 */
  actions?: CardActionsProps;
}
