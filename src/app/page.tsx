"use client";
import { useState, useEffect } from "react";

type TodoItem = {
  id: number;
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  // Load stored todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = () => {
    if (!activity.trim()) return;
    const newTodo: TodoItem = {
      id: Date.now(),
      activity,
      price,
      type,
      bookingRequired,
      accessibility,
    };
    setTodos([...todos, newTodo]);
    setActivity("");
    setPrice(0);
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  // Remove todo by ID
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="max-w-lg mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      <p className="text-center text-gray-700 mb-4">Total items: {todos.length}</p>

      {/* Form */}
      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border mb-2"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border mb-2">
          {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={bookingRequired} onChange={() => setBookingRequired(!bookingRequired)} />
          Booking Required
        </label>
        <label className="block mb-2">
          Accessibility: {accessibility}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={accessibility}
            onChange={(e) => setAccessibility(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <button onClick={addTodo} className="w-full bg-blue-500 text-white p-2 rounded">Add</button>
      </div>

      {/* To-Do List */}
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
            <div>
              <p className="font-bold">{todo.activity} (${todo.price})</p>
              <p className="text-sm text-gray-600">{todo.type}</p>
            </div>
            <button onClick={() => removeTodo(todo.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
