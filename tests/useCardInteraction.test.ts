/**
 * useCardInteraction Hook测试
 * 测试卡片交互状态管理hook的所有功能
 */

import { renderHook, act } from '@testing-library/react';
import { useCardInteraction } from '../src/hooks/useCardInteraction';

describe('useCardInteraction', () => {
  // 基础功能测试
  describe('基础功能', () => {
    it('应该返回正确的初始状态', () => {
      const { result } = renderHook(() => useCardInteraction({}));
      
      expect(result.current.isHovered).toBe(false);
      expect(result.current.isPressed).toBe(false);
      expect(result.current.isFocused).toBe(false);
    });

    it('应该提供所有必要的事件处理器', () => {
      const { result } = renderHook(() => useCardInteraction({}));
      
      expect(typeof result.current.handleClick).toBe('function');
      expect(typeof result.current.handleMouseEnter).toBe('function');
      expect(typeof result.current.handleMouseLeave).toBe('function');
      expect(typeof result.current.handleMouseDown).toBe('function');
      expect(typeof result.current.handleMouseUp).toBe('function');
      expect(typeof result.current.handleFocus).toBe('function');
      expect(typeof result.current.handleBlur).toBe('function');
    });
  });

  // 鼠标事件测试
  describe('鼠标事件处理', () => {
    it('应该正确处理鼠标进入事件', () => {
      const mockOnMouseEnter = jest.fn();
      const { result } = renderHook(() => 
        useCardInteraction({ onMouseEnter: mockOnMouseEnter })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleMouseEnter(mockEvent);
      });

      expect(result.current.isHovered).toBe(true);
      expect(mockOnMouseEnter).toHaveBeenCalledWith(mockEvent);
    });

    it('应该正确处理鼠标离开事件', () => {
      const mockOnMouseLeave = jest.fn();
      const { result } = renderHook(() => 
        useCardInteraction({ onMouseLeave: mockOnMouseLeave })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      // 先设置悬停状态
      act(() => {
        result.current.handleMouseEnter(mockEvent);
      });
      expect(result.current.isHovered).toBe(true);

      // 然后测试离开
      act(() => {
        result.current.handleMouseLeave(mockEvent);
      });

      expect(result.current.isHovered).toBe(false);
      expect(result.current.isPressed).toBe(false); // 应该同时重置按下状态
      expect(mockOnMouseLeave).toHaveBeenCalledWith(mockEvent);
    });

    it('应该正确处理鼠标按下和释放事件', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ clickable: true })
      );

      act(() => {
        result.current.handleMouseDown();
      });
      expect(result.current.isPressed).toBe(true);

      act(() => {
        result.current.handleMouseUp();
      });
      expect(result.current.isPressed).toBe(false);
    });
  });

  // 点击事件测试
  describe('点击事件处理', () => {
    it('应该在可点击且未禁用时调用onClick', () => {
      const mockOnClick = jest.fn();
      const { result } = renderHook(() => 
        useCardInteraction({ 
          onClick: mockOnClick, 
          clickable: true 
        })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleClick(mockEvent);
      });

      expect(mockOnClick).toHaveBeenCalledWith(mockEvent);
    });

    it('应该在不可点击时不调用onClick', () => {
      const mockOnClick = jest.fn();
      const { result } = renderHook(() => 
        useCardInteraction({ 
          onClick: mockOnClick, 
          clickable: false 
        })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleClick(mockEvent);
      });

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('应该在禁用时不调用onClick', () => {
      const mockOnClick = jest.fn();
      const { result } = renderHook(() => 
        useCardInteraction({ 
          onClick: mockOnClick, 
          clickable: true, 
          disabled: true 
        })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleClick(mockEvent);
      });

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  // 焦点事件测试
  describe('焦点事件处理', () => {
    it('应该正确处理焦点获取和失去', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ clickable: true })
      );

      act(() => {
        result.current.handleFocus();
      });
      expect(result.current.isFocused).toBe(true);

      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.isFocused).toBe(false);
    });

    it('应该在不可点击时不处理焦点事件', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ clickable: false })
      );

      act(() => {
        result.current.handleFocus();
      });
      expect(result.current.isFocused).toBe(false);

      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.isFocused).toBe(false);
    });
  });

  // 禁用状态测试
  describe('禁用状态处理', () => {
    it('应该在禁用时阻止所有状态更新', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ disabled: true, clickable: true })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleMouseEnter(mockEvent);
        result.current.handleMouseDown();
        result.current.handleFocus();
      });

      expect(result.current.isHovered).toBe(false);
      expect(result.current.isPressed).toBe(false);
      expect(result.current.isFocused).toBe(false);
    });

    it('应该在禁用状态改变时重置所有状态', () => {
      let disabled = false;
      const { result, rerender } = renderHook(() => 
        useCardInteraction({ disabled, clickable: true })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      // 先设置一些状态
      act(() => {
        result.current.handleMouseEnter(mockEvent);
        result.current.handleMouseDown();
        result.current.handleFocus();
      });

      expect(result.current.isHovered).toBe(true);
      expect(result.current.isPressed).toBe(true);
      expect(result.current.isFocused).toBe(true);

      // 然后禁用
      disabled = true;
      rerender();

      expect(result.current.isHovered).toBe(false);
      expect(result.current.isPressed).toBe(false);
      expect(result.current.isFocused).toBe(false);
    });

    it('应该在禁用时仍然调用原始的事件处理器', () => {
      const mockOnMouseEnter = jest.fn();
      const mockOnMouseLeave = jest.fn();
      
      const { result } = renderHook(() => 
        useCardInteraction({ 
          disabled: true, 
          onMouseEnter: mockOnMouseEnter,
          onMouseLeave: mockOnMouseLeave
        })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleMouseEnter(mockEvent);
      });
      expect(mockOnMouseEnter).not.toHaveBeenCalled(); // 禁用时不应该调用

      act(() => {
        result.current.handleMouseLeave(mockEvent);
      });
      expect(mockOnMouseLeave).not.toHaveBeenCalled(); // 禁用时不应该调用
    });
  });

  // 稳定性测试
  describe('稳定性', () => {
    it('应该在props不变时保持处理器引用稳定', () => {
      const props = { clickable: true };
      const { result, rerender } = renderHook(() => useCardInteraction(props));

      const initialHandlers = {
        handleClick: result.current.handleClick,
        handleMouseEnter: result.current.handleMouseEnter,
        handleMouseLeave: result.current.handleMouseLeave,
      };

      rerender();

      expect(result.current.handleClick).toBe(initialHandlers.handleClick);
      expect(result.current.handleMouseEnter).toBe(initialHandlers.handleMouseEnter);
      expect(result.current.handleMouseLeave).toBe(initialHandlers.handleMouseLeave);
    });

    it('应该在相关props改变时更新处理器', () => {
      let clickable = true;
      const { result, rerender } = renderHook(() => 
        useCardInteraction({ clickable })
      );

      const initialHandleMouseDown = result.current.handleMouseDown;

      clickable = false;
      rerender();

      expect(result.current.handleMouseDown).not.toBe(initialHandleMouseDown);
    });
  });

  // 复杂交互场景测试
  describe('复杂交互场景', () => {
    it('应该正确处理快速连续的交互事件', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ clickable: true })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      act(() => {
        result.current.handleMouseEnter(mockEvent);
        result.current.handleMouseDown();
        result.current.handleFocus();
      });

      expect(result.current.isHovered).toBe(true);
      expect(result.current.isPressed).toBe(true);
      expect(result.current.isFocused).toBe(true);

      act(() => {
        result.current.handleMouseUp();
        result.current.handleMouseLeave(mockEvent);
        result.current.handleBlur();
      });

      expect(result.current.isHovered).toBe(false);
      expect(result.current.isPressed).toBe(false);
      expect(result.current.isFocused).toBe(false);
    });

    it('应该在鼠标离开时重置按下状态', () => {
      const { result } = renderHook(() => 
        useCardInteraction({ clickable: true })
      );

      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      // 模拟鼠标按下但在离开前未释放的情况
      act(() => {
        result.current.handleMouseEnter(mockEvent);
        result.current.handleMouseDown();
      });

      expect(result.current.isPressed).toBe(true);

      act(() => {
        result.current.handleMouseLeave(mockEvent);
      });

      expect(result.current.isPressed).toBe(false);
      expect(result.current.isHovered).toBe(false);
    });
  });
});