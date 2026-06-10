import { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types/index';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleEditSubmit = () => {
    onEdit(todo.id, editValue);
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') handleEditCancel();
  };

  return (
    <li
      className={clsx(
        'flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border transition group',
        todo.completed ? 'border-green-100 opacity-70' : 'border-indigo-100 hover:border-indigo-300'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-green-400 border-green-400 text-white'
            : 'border-indigo-300 hover:border-indigo-500'
        )}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleEditSubmit}
          className="flex-1 rounded-lg border border-indigo-300 px-2 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-gray-800 text-sm break-words',
            todo.completed && 'line-through text-gray-400'
          )}
          onDoubleClick={() => !todo.completed && setEditing(true)}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 ml-auto">
        {editing ? (
          <>
            <button
              onClick={handleEditSubmit}
              className="text-green-500 hover:text-green-700 transition p-1 rounded"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleEditCancel}
              className="text-gray-400 hover:text-gray-600 transition p-1 rounded"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button
                onClick={() => setEditing(true)}
                className="text-indigo-400 hover:text-indigo-600 transition p-1 rounded opacity-0 group-hover:opacity-100"
                aria-label="Edit"
              >
                <Pencil size={15} />
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-300 hover:text-red-500 transition p-1 rounded opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
