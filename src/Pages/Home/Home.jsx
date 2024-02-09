import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";

const Home = () => {
   const [todo, setTodo] = useState({});
   const [storedList, setStoredList] = useState([]);

   // Retrieve initial todo array from local storage
   useEffect(() => {
      const storedData = localStorage.getItem("todo");
      if (storedData) {
         setStoredList(JSON.parse(storedData));
      }
   }, []);

   // Handle todo input change
   const handleTodoInputChange = (e) => {
      const value = e.target.value;
      setTodo({ text: value, checked: "incomplete" });
   };

   // Handle add new todo
   const handleAddTodo = (e) => {
      e.preventDefault();
      setStoredList((prev) => [...prev, todo]);
   };

   // Save todo to local storage
   useEffect(() => {
      if (storedList.length) {
         localStorage.setItem("todo", JSON.stringify(storedList));
      }
   }, [storedList]);

   return (
      <main className="flex items-center flex-col">
         <div className="mt-20 border rounded-md shadow-sm p-6 w-2/4">
            <form onSubmit={handleAddTodo} className="flex items-center gap-2">
               <input
                  onChange={handleTodoInputChange}
                  type="text"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:outline-none focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Todo"
               />
               <button
                  type="submit"
                  className="text-white py-3 bg-primary hover:bg-primary focus:ring-4 focus:ring-purple-100 font-medium rounded-lg text-sm px-5">
                  ADD
               </button>
            </form>
            {storedList.map((item, index) => (
               <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-primary">
                  <div className="flex items-center gap-2">
                     <p>
                        <MdCheckBoxOutlineBlank className="text-gray-500 text-2xl cursor-pointer" />
                     </p>
                     <p>{item.text}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <p>
                        <FaPencilAlt className="text-gray-500 hover:text-gray-900 cursor-pointer" />
                     </p>
                     <p>
                        <MdDelete className="text-xl text-gray-500 hover:text-red-500 cursor-pointer" />
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </main>
   );
};

export default Home;
