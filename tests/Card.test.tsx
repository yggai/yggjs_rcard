/**
 * Card组件单元测试
 * 遵循TDD原则，全面测试组件的功能和交互
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Card } from '../src/components/Card';

describe('Card组件', () => {
  // 基础渲染测试
  describe('基础渲染', () => {
    it('应该正确渲染基本内容', () => {
      render(<Card>测试内容</Card>);
      expect(screen.getByText('测试内容')).toBeInTheDocument();
    });

    it('应该具有正确的默认属性', () => {
      render(<Card data-testid="test-card">内容</Card>);
      const card = screen.getByTestId('test-card');
      
      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('tabIndex');
      expect(card).toHaveAttribute('aria-disabled', 'false');
      expect(card).toHaveAttribute('aria-selected', 'false');
    });

    it('应该支持自定义className和style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(
        <Card 
          className="custom-class" 
          style={customStyle}
          data-testid="styled-card"
        >
          内容
        </Card>
      );
      
      const card = screen.getByTestId('styled-card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveAttribute('style');
    });
  });

  // 大小和变体测试
  describe('大小和变体', () => {
    it('应该正确应用不同的大小', () => {
      const { rerender } = render(<Card size="sm" data-testid="card">内容</Card>);
      let card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();

      rerender(<Card size="md" data-testid="card">内容</Card>);
      card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();

      rerender(<Card size="lg" data-testid="card">内容</Card>);
      card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    });

    it('应该正确应用不同的变体', () => {
      const variants = ['filled', 'outlined', 'elevated', 'ghost'] as const;
      
      variants.forEach(variant => {
        const { container } = render(<Card variant={variant} data-testid={`card-${variant}`}>内容</Card>);
        const card = screen.getByTestId(`card-${variant}`);
        expect(card).toBeInTheDocument();
        container.remove();
      });
    });

    it('应该正确应用不同的阴影级别', () => {
      const shadows = ['none', 'sm', 'md', 'lg', 'xl'] as const;
      
      shadows.forEach(shadow => {
        const { container } = render(<Card shadow={shadow} data-testid={`card-${shadow}`}>内容</Card>);
        const card = screen.getByTestId(`card-${shadow}`);
        expect(card).toBeInTheDocument();
        container.remove();
      });
    });
  });

  // 交互状态测试
  describe('交互状态', () => {
    it('应该正确处理点击事件', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Card clickable onClick={handleClick} data-testid="clickable-card">
          点击我
        </Card>
      );

      const card = screen.getByTestId('clickable-card');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');

      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理鼠标悬停事件', async () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      const user = userEvent.setup();

      render(
        <Card
          clickable
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-testid="hoverable-card"
        >
          悬停我
        </Card>
      );

      const card = screen.getByTestId('hoverable-card');
      
      await user.hover(card);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(card).toHaveAttribute('data-hovered', 'true');

      await user.unhover(card);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
      expect(card).toHaveAttribute('data-hovered', 'false');
    });

    it('应该正确处理键盘导航', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Card clickable onClick={handleClick} data-testid="keyboard-card">
          键盘导航
        </Card>
      );

      const card = screen.getByTestId('keyboard-card');
      
      // Tab键聚焦
      await user.tab();
      expect(card).toHaveFocus();

      // Enter键点击
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Space键点击
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('应该在禁用状态下阻止交互', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Card
          disabled
          clickable
          onClick={handleClick}
          data-testid="disabled-card"
        >
          禁用卡片
        </Card>
      );

      const card = screen.getByTestId('disabled-card');
      expect(card).toHaveAttribute('aria-disabled', 'true');

      await user.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // 状态测试
  describe('组件状态', () => {
    it('应该正确显示选中状态', () => {
      render(<Card selected data-testid="selected-card">选中的卡片</Card>);
      const card = screen.getByTestId('selected-card');
      expect(card).toHaveAttribute('aria-selected', 'true');
    });

    it('应该正确显示加载状态', () => {
      render(<Card loading data-testid="loading-card">加载中</Card>);
      
      const card = screen.getByTestId('loading-card');
      const loadingIndicator = screen.getByTestId('card-loading-indicator');
      
      expect(loadingIndicator).toBeInTheDocument();
      expect(loadingIndicator).toHaveTextContent('加载中...');
      expect(screen.queryByText('加载中')).not.toBeInTheDocument();
    });
  });

  // 尺寸限制测试
  describe('尺寸限制', () => {
    it('应该正确应用最大宽度', () => {
      render(
        <Card maxWidth={400} data-testid="max-width-card">
          最大宽度400px
        </Card>
      );
      const card = screen.getByTestId('max-width-card');
      expect(card).toBeInTheDocument();
    });

    it('应该正确应用最小高度', () => {
      render(
        <Card minHeight="200px" data-testid="min-height-card">
          最小高度200px
        </Card>
      );
      const card = screen.getByTestId('min-height-card');
      expect(card).toBeInTheDocument();
    });
  });

  // 可访问性测试
  describe('可访问性', () => {
    it('应该支持ARIA标签', () => {
      render(
        <Card
          aria-label="用户信息卡片"
          aria-describedby="card-description"
          data-testid="aria-card"
        >
          用户信息
        </Card>
      );

      const card = screen.getByTestId('aria-card');
      expect(card).toHaveAttribute('aria-label', '用户信息卡片');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
    });

    it('应该在可点击时具有正确的role和tabIndex', () => {
      render(
        <Card clickable data-testid="accessible-card">
          可访问的卡片
        </Card>
      );

      const card = screen.getByTestId('accessible-card');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('应该在禁用时具有正确的aria-disabled', () => {
      render(
        <Card disabled data-testid="disabled-accessible-card">
          禁用的可访问卡片
        </Card>
      );

      const card = screen.getByTestId('disabled-accessible-card');
      expect(card).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // 性能测试
  describe('性能', () => {
    it('应该支持React.forwardRef', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>带ref的卡片</Card>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('应该具有正确的displayName', () => {
      expect(Card.displayName).toBe('Card');
    });

    it('应该在多次重新渲染时保持稳定', () => {
      const handleClick = jest.fn();
      const { rerender } = render(
        <Card clickable onClick={handleClick} data-testid="stable-card">
          稳定卡片
        </Card>
      );

      const card = screen.getByTestId('stable-card');
      const initialCard = card;

      // 重新渲染相同的props
      rerender(
        <Card clickable onClick={handleClick} data-testid="stable-card">
          稳定卡片
        </Card>
      );

      expect(screen.getByTestId('stable-card')).toBe(initialCard);
    });
  });

  // 边界情况测试
  describe('边界情况', () => {
    it('应该处理空children', () => {
      render(<Card data-testid="empty-card" />);
      const card = screen.getByTestId('empty-card');
      expect(card).toBeInTheDocument();
      expect(card).toBeEmptyDOMElement();
    });

    it('应该处理null children', () => {
      render(<Card data-testid="null-card">{null}</Card>);
      const card = screen.getByTestId('null-card');
      expect(card).toBeInTheDocument();
    });

    it('应该处理复杂的children结构', () => {
      render(
        <Card data-testid="complex-card">
          <div>
            <h3>标题</h3>
            <p>内容</p>
            <button>操作</button>
          </div>
        </Card>
      );

      expect(screen.getByText('标题')).toBeInTheDocument();
      expect(screen.getByText('内容')).toBeInTheDocument();
      expect(screen.getByText('操作')).toBeInTheDocument();
    });
  });
});