import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskList from '@/components/TaskList';

describe('TaskList', () => {
  const mockOnToggle = vi.fn();
  const mockTasks = [
    { description: 'Task 1', completed: false },
    { description: 'Task 2', completed: true },
    { description: 'Task 3', completed: false },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all tasks', () => {
    render(
      <TaskList tasks={mockTasks} onToggle={mockOnToggle} isPending={false} />
    );

    expect(screen.getByText('Task 1')).toBeTruthy();
    expect(screen.getByText('Task 2')).toBeTruthy();
    expect(screen.getByText('Task 3')).toBeTruthy();
  });

  it('renders correct number of task items', () => {
    render(
      <TaskList tasks={mockTasks} onToggle={mockOnToggle} isPending={false} />
    );

    const taskItems = screen.getAllByRole('button');
    expect(taskItems).toHaveLength(3);
  });

  it('renders empty list when no tasks', () => {
    render(<TaskList tasks={[]} onToggle={mockOnToggle} isPending={false} />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('passes correct props to TaskItem components', () => {
    render(
      <TaskList tasks={mockTasks} onToggle={mockOnToggle} isPending={true} />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
