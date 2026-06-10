import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight drop-shadow">My Todos</h1>
          <p className="mt-1 text-sm text-gray-500">
            {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
          </p>
        </div>

        {/* Add todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filter bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        {/* Todo list */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {filteredTodos.length === 0 && (
          <div className="mt-10 text-center text-gray-400 text-sm select-none">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
              ? 'No active tasks. Great job!'
              : 'Add your first task above!'}
          </div>
        )}
      </div>
    </div>
  );
}
