// components/AddTaskForm.tsx
import { useState } from 'react';

export default function AddTaskForm({
  onAddTask,
  disabled,
}: {
  onAddTask: (text: string) => void;
  disabled: boolean;
}) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-1 rounded-lg border px-4 py-3"
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !newTask.trim()}
        className="rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600 disabled:bg-green-300"
      >
        Add Task
      </button>
    </div>
  );
}
