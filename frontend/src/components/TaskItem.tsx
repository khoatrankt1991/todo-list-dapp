type TaskItemProps = {
  task: {
    description: string;
    completed: boolean;
  };
  index: number;
  onToggle: (index: number) => void;
  disabled: boolean;
};

export default function TaskItem({
  task,
  index,
  onToggle,
  disabled,
}: TaskItemProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg border-2 p-4 ${
        task.completed
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex-1">
        <p
          className={
            task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
          }
        >
          {task.description}
        </p>
      </div>
      <button
        onClick={() => onToggle(index)}
        disabled={disabled}
        className={`rounded-lg px-4 py-2 text-white ${
          task.completed
            ? 'bg-yellow-500 hover:bg-yellow-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {task.completed ? 'Undo' : 'Complete'}
      </button>
    </div>
  );
}
