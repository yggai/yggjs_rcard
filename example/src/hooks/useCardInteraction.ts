import { useState, useCallback, useEffect } from 'react';

/**
 * 卡片交互状态管理 Hook
 * 用于管理卡片的悬停、激活、聚焦等状态
 */
export interface UseCardInteractionState {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
}

export interface UseCardInteractionActions {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export interface UseCardInteractionReturn
  extends UseCardInteractionState,
    UseCardInteractionActions {}

export interface UseCardInteractionProps {
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  onMouseEnter?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  onMouseLeave?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  disabled?: boolean;
  clickable?: boolean;
}

export const useCardInteraction = (
  props: UseCardInteractionProps
): UseCardInteractionReturn => {
  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    disabled = false,
    clickable = false,
  } = props;
  const [state, setState] = useState<UseCardInteractionState>({
    isHovered: false,
    isPressed: false,
    isFocused: false,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled && clickable && onClick) {
        onClick(event);
      }
    },
    [disabled, clickable, onClick]
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        setState((prev) => ({ ...prev, isHovered: true }));
        if (onMouseEnter) {
          onMouseEnter(event);
        }
      }
    },
    [disabled, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        setState((prev) => ({ ...prev, isHovered: false, isPressed: false }));
        if (onMouseLeave) {
          onMouseLeave(event);
        }
      }
    },
    [disabled, onMouseLeave]
  );

  const handleMouseDown = useCallback(() => {
    if (!disabled && clickable) {
      setState((prev) => ({ ...prev, isPressed: true }));
    }
  }, [disabled, clickable]);

  const handleMouseUp = useCallback(() => {
    if (!disabled && clickable) {
      setState((prev) => ({ ...prev, isPressed: false }));
    }
  }, [disabled, clickable]);

  const handleFocus = useCallback(() => {
    if (!disabled && clickable) {
      setState((prev) => ({ ...prev, isFocused: true }));
    }
  }, [disabled, clickable]);

  const handleBlur = useCallback(() => {
    if (!disabled && clickable) {
      setState((prev) => ({ ...prev, isFocused: false }));
    }
  }, [disabled, clickable]);

  // 当禁用状态改变时，重置所有交互状态
  useEffect(() => {
    if (disabled) {
      setState({
        isHovered: false,
        isPressed: false,
        isFocused: false,
      });
    }
  }, [disabled]);

  return {
    ...state,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleFocus,
    handleBlur,
  };
};
