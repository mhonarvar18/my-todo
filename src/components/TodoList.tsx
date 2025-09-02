import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onMove?: (id: string, overId: string) => void; // ⬅️ برای Drag
  sortable?: boolean; // ⬅️ فقط وقتی manual است
};

function SortableRow({ todo, children }: { todo: Todo; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    cursor: "grab",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function TodoList({ todos, onToggle, onEdit, onRemove, onMove, sortable = false }: Props) {
  if (!todos.length) return <EmptyState text="موردی برای نمایش نیست." />;

  if (!sortable) {
    // حالت معمولی بدون Drag
    return (
      <div className="list">
        {todos.map(t => (
          <TodoItem key={t.id} todo={t} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    );
  }

  // حالت Drag & Drop
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!active?.id || !over?.id || active.id === over.id) return;
    onMove?.(String(active.id), String(over.id));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="list">
          {todos.map(t => (
            <SortableRow key={t.id} todo={t}>
              <TodoItem todo={t} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
