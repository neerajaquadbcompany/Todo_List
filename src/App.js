import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo, toggleComplete, setFilter } from './todo_Slice';
import { FaPlus } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import empty from './asserts/Detective-check-footprint 1.png'


function App() {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const filter = useSelector((state) => state.todos.filter);

  const filteredTodos = () => {
    let filtered = todos;

    switch (filter) {
      case 'Completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case 'Incomplete':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    if (searchValue.trim() !== '') {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAdd = () => {
    if (inputValue.trim() === '') return;

    
    if (editId === null) {
      dispatch(addTodo(inputValue));
    } else {
      dispatch(editTodo({ id: editId, text: inputValue }));
      setEditId(null); 
    }

    setInputValue('');
    setIsModalOpen(false);
  };

  const handleEdit = (id, text) => {
    setEditId(id); 
    setInputValue(text); 
    setIsModalOpen(true); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} min-h-screen p-6`}>
      <div className='container mx-auto max-w-[1000px]'>
        <h1 className={`text-3xl font-bold mb-4 text-center ${isDarkMode ? 'text-white':''}`}>To Do List</h1>
        <div className="flex mb-4 items-center">
          <div className={`border-2 ${isDarkMode ?'border-white' :'border-customPurple'}  rounded-md p-0 flex items-center flex-grow mr-2`}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search note..."
              className="flex-grow border-none bg-transparent ml-3 outline-none placeholder:text-gray-300"
            />
            <button className="ml-2 p-1">
              <CiSearch className={`${isDarkMode ? 'text-white':'text-customPurple'} `} style={{ fontSize: '30px' }} />
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="mx-1 p-2 border border-customPurple cursor-pointer bg-customPurple text-white rounded-lg outline-none"
          >
            <option
              value="All"
              className="text-customPurple cursor-pointer bg-white hover:bg-blue-400"
            >
              All
            </option>
            <option
              value="Completed"
              className="text-customPurple cursor-pointer bg-white hover:bg-blue-400"
            >
              Completed
            </option>
            <option
              value="Incomplete"
              className="text-customPurple cursor-pointer bg-white hover:bg-blue-400"
            >
              Incomplete
            </option>
          </select>

          <button
            onClick={() => setIsDarkMode((prevMode) => !prevMode)}
            className="ml-2 p-3 border-customPurple bg-customPurple text-white rounded-lg">
            {isDarkMode ? <LuSunMedium /> : <FaRegMoon />}
          </button>
        </div>
        <div className="w-full max-w-md mx-auto mt-4">
          {filteredTodos().length > 0 ? (
            filteredTodos().map((todo) => (
              <div key={todo.id}>
                <div className="flex items-center justify-between mb-2 cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)} 
                      className="mr-2 cursor-pointer h-5 w-5 border-customPurple "
                    />
                    <span
                      onClick={() => handleToggleComplete(todo.id)}
                      className={`cursor-pointer flex-grow font-bold ${
                        todo.completed
                          ? isDarkMode
                            ? 'line-through text-gray-500'  
                            : 'line-through text-gray-400'  
                          : isDarkMode
                          ? 'text-white'                   
                          : 'text-black'                   
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(todo.id, todo.text)} 
                      className=" text-gray-300 px-2 py-1 rounded-lg mr-1">
                      <MdOutlineModeEditOutline style={{ fontSize: '20px' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className=" text-gray-300 px-2 py-1 rounded-lg">
                      <GoTrash />
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-customPurple w-full mb-4 mt-5"></div>
              </div>
            ))
          ) : (
            <div className='flex flex-col gap-3 items-center'> 
                <img src={empty} alt='' className="w-[280px] h-[250px]" /> 
                <p className={`${isDarkMode ?'text-white':'text-gray-500'} `}>Empty...</p>
            </div>
            
          )}
        </div>

        {isModalOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${isDarkMode ? 'bg-customBlack border-2 border-white rounded-lg' :''}bg-white rounded-lg p-6 shadow-lg w-[600px] `}>
              <h2 className="text-2xl mb-4 font-semibold text-center">{editId !== null ? 'Edit Note' : 'New Note'}</h2>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Input your note..."
                className={`border ${isDarkMode ? 'border-white' :'border-customPurple'}  bg-transparent rounded-lg p-2 mb-24 w-full`}
              />
              <div className="flex justify-between items-center">
                <button onClick={() => setIsModalOpen(false)} className="bg-transparent border-2 border-customPurple text-customPurple px-6 py-1 rounded-lg capitalize" >CANCEL</button>
                <button onClick={handleAdd} className="bg-customPurple flex items-center text-white px-6 py-1 mt-1 rounded-lg capitalize">{editId !== null ? 'SAVE' : 'APPLY'}</button>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white rounded-full p-4 absolute bottom-2 lg:bottom-6 right-6 shadow-lg">
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default App;
