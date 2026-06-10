import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

type AddTodoFormProps = {
  onAdd: (text: string) => void;
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="flex-1 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        aria-label="New todo"
      />
      <button
        type="submit"
        className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-3 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50"
        disabled={!value.trim()}
        aria-label="Add todo"
      >
        <PlusCircle size={20} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
