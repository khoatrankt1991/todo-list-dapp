import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddTaskForm from '@/components/AddTaskForm';

describe('AddTaskForm', () => {
  const mockOnAddTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} disabled={false} />);

    expect(
      screen.getByPlaceholderText('Enter a new task...')
    ).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('calls onAddTask when form is submitted', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} disabled={false} />);

    const input = screen.getByPlaceholderText('Enter a new task...');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);

    expect(mockOnAddTask).toHaveBeenCalledWith('Test task');
  });

  it('does not call onAddTask for empty input', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} disabled={false} />);

    fireEvent.click(screen.getByText('Add Task'));

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
