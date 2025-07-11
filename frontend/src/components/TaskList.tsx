import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: {
    description: string;
    completed: boolean;
  }[];
  onToggle: (index: number) => void;
  isPending: boolean;
};

export default function TaskList({
  tasks,
  onToggle,
  isPending,
}: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onToggle={onToggle}
          disabled={isPending}
        />
      ))}
    </div>
  );
}
