import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 卡片可见性检测 Hook
 * 用于检测卡片是否在视口中，支持懒加载等场景
 */
export interface UseCardVisibilityOptions {
  /** 根边距，用于提前触发可见性检测 */
  rootMargin?: string;
  /** 可见性阈值 */
  threshold?: number | number[];
  /** 是否启用可见性检测 */
  enabled?: boolean;
}

export interface UseCardVisibilityReturn {
  /** 元素引用 */
  ref: React.RefObject<HTMLElement>;
  /** 是否可见 */
  isVisible: boolean;
  /** 是否曾经可见过 */
  hasBeenVisible: boolean;
}

export const useCardVisibility = (
  options: UseCardVisibilityOptions = {}
): UseCardVisibilityReturn => {
  const { rootMargin = '50px', threshold = 0.1, enabled = true } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const hasBeenVisibleRef = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries.find((e) => e.target === ref.current);
      if (!entry) {
        return;
      }

      const visible = entry.isIntersecting;
      setIsVisible(visible);

      if (visible && !hasBeenVisibleRef.current) {
        hasBeenVisibleRef.current = true;
        setHasBeenVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | undefined;

    const checkAndCreateObserver = () => {
      if (ref.current && !observer) {
        observer = new IntersectionObserver(handleIntersection, {
          rootMargin,
          threshold,
        });
        observer.observe(ref.current);
      }
    };

    // 立即检查
    checkAndCreateObserver();

    // 定期检查（用于ref延迟设置的情况）
    const checkInterval = setInterval(() => {
      checkAndCreateObserver();
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [enabled, rootMargin, threshold, handleIntersection]);

  return {
    ref,
    isVisible,
    hasBeenVisible,
  };
};
