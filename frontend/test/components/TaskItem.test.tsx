import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from '@/components/TaskItem';

describe('TaskItem', () => {
  const mockOnToggle = vi.fn();
  const mockTask = {
    description: 'Test task',
    completed: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task description', () => {
    render(
      <TaskItem
        task={mockTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={false}
      />
    );

    expect(screen.getByText('Test task')).toBeTruthy();
  });

  it('shows "Complete" button for incomplete task', () => {
    render(
      <TaskItem
        task={mockTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={false}
      />
    );

    expect(screen.getByText('Complete')).toBeTruthy();
  });

  it('shows "Undo" button for completed task', () => {
    const completedTask = { ...mockTask, completed: true };

    render(
      <TaskItem
        task={completedTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={false}
      />
    );

    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('calls onToggle with correct index when button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={false}
      />
    );

    fireEvent.click(screen.getByText('Complete'));

    expect(mockOnToggle).toHaveBeenCalledWith(0);
  });

  it('disables button when disabled prop is true', () => {
    render(
      <TaskItem
        task={mockTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={true}
      />
    );

    const button = screen.getByText('Complete');
    expect(button).toBeDisabled();
  });

  it('applies line-through style to completed task text', () => {
    const completedTask = { ...mockTask, completed: true };

    render(
      <TaskItem
        task={completedTask}
        index={0}
        onToggle={mockOnToggle}
        disabled={false}
      />
    );

    const textElement = screen.getByText('Test task');
    expect(textElement).toHaveClass('line-through', 'text-gray-500');
  });
});
