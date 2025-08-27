/**
 * useCardVisibility Hook测试
 * 测试卡片可见性检测hook的功能
 */

import { renderHook } from '@testing-library/react';
import { useCardVisibility } from '../src/hooks/useCardVisibility';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  root: null,
  rootMargin: '0px',
  thresholds: [0],
}));

beforeAll(() => {
  (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver = mockIntersectionObserver;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCardVisibility', () => {
  describe('基础功能', () => {
    it('应该返回正确的初始状态', () => {
      const { result } = renderHook(() => useCardVisibility());
      
      expect(result.current.ref.current).toBeNull();
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasBeenVisible).toBe(false);
    });

    it('应该在enabled为false时不创建observer', () => {
      renderHook(() => useCardVisibility({ enabled: false }));
      
      // 由于disabled，不应该尝试创建observer
      expect(mockIntersectionObserver).not.toHaveBeenCalled();
    });

    it('应该处理IntersectionObserver不可用的情况', () => {
      // 暂时删除IntersectionObserver
      const originalIntersectionObserver = (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver;
      delete (global as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;

      const { result } = renderHook(() => useCardVisibility());
      
      // 应该返回默认状态，不抛出错误
      expect(result.current.ref.current).toBeNull();
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasBeenVisible).toBe(false);

      // 恢复IntersectionObserver
      (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver = originalIntersectionObserver;
    });

    it('应该接受自定义选项', () => {
      const options = {
        rootMargin: '100px',
        threshold: [0.25, 0.5, 0.75],
        enabled: true,
      };

      const { result } = renderHook(() => useCardVisibility(options));
      
      // 应该正常创建hook，不抛出错误
      expect(result.current.ref.current).toBeNull();
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasBeenVisible).toBe(false);
    });

    it('应该提供稳定的ref对象', () => {
      const { result, rerender } = renderHook(() => useCardVisibility());
      
      const firstRef = result.current.ref;
      
      // 重新渲染
      rerender();
      
      // ref对象应该保持稳定
      expect(result.current.ref).toBe(firstRef);
    });
  });

  describe('状态管理', () => {
    it('应该正确初始化状态', () => {
      const { result } = renderHook(() => useCardVisibility());
      
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasBeenVisible).toBe(false);
    });

    it('应该在不同选项下保持正确的状态', () => {
      const { result: result1 } = renderHook(() => useCardVisibility({ enabled: false }));
      const { result: result2 } = renderHook(() => useCardVisibility({ enabled: true }));
      
      expect(result1.current.isVisible).toBe(false);
      expect(result1.current.hasBeenVisible).toBe(false);
      expect(result2.current.isVisible).toBe(false);
      expect(result2.current.hasBeenVisible).toBe(false);
    });
  });

  describe('选项处理', () => {
    it('应该处理默认选项', () => {
      const { result } = renderHook(() => useCardVisibility());
      
      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.isVisible).toBe('boolean');
      expect(typeof result.current.hasBeenVisible).toBe('boolean');
    });

    it('应该处理空选项对象', () => {
      const { result } = renderHook(() => useCardVisibility({}));
      
      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.isVisible).toBe('boolean');
      expect(typeof result.current.hasBeenVisible).toBe('boolean');
    });

    it('应该处理部分选项', () => {
      const { result } = renderHook(() => useCardVisibility({ rootMargin: '20px' }));
      
      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.isVisible).toBe('boolean');
      expect(typeof result.current.hasBeenVisible).toBe('boolean');
    });
  });

  describe('类型安全', () => {
    it('应该有正确的返回类型', () => {
      const { result } = renderHook(() => useCardVisibility());
      
      // 验证返回对象的结构
      expect(result.current).toHaveProperty('ref');
      expect(result.current).toHaveProperty('isVisible');
      expect(result.current).toHaveProperty('hasBeenVisible');
      
      // 验证类型
      expect(typeof result.current.isVisible).toBe('boolean');
      expect(typeof result.current.hasBeenVisible).toBe('boolean');
      expect(result.current.ref).toHaveProperty('current');
    });
  });
});