import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import insertToLocalStorage from "../../Utils/insertToLocalStorage";
import retrieveLocalStorageData from "../../Utils/retrieveLocalStorageData";

const Home = () => {
   const [inputValue, setInputValue] = useState("");
   const [storedList, setStoredList] = useState([]);

   // Retrieve initial todo array from local storage
   useEffect(() => {
      const storedData = retrieveLocalStorageData("todo");
      if (storedData) {
         setStoredList(storedData);
      }
   }, []);

   // Handle todo input change
   const handleTodoInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
   };

   // Handle add new todo
   const handleAddTodo = (e) => {
      e.preventDefault();
      setStoredList((prev) => [
         ...prev,
         { text: inputValue, checked: "incomplete" },
      ]);
   };

   // Save todo to local storage
   useEffect(() => {
      if (storedList.length) {
         insertToLocalStorage("todo", storedList);
         setInputValue("");
      }
   }, [storedList]);

   // Handle complete task
   const handleTaskComplete = (id) => {
      const findTaskIndex = storedList.findIndex((obj, index) => index === id);

      storedList[findTaskIndex].checked = "complete";
      insertToLocalStorage("todo", storedList);

      const storedData = retrieveLocalStorageData("todo");
      if (storedData) {
         setStoredList(storedData);
      }
   };

   return (
      <main className="flex items-center flex-col">
         <div className="mt-20 border rounded-md shadow-sm p-6 w-2/4">
            <form onSubmit={handleAddTodo} className="flex items-center gap-2">
               <input
                  value={inputValue}
                  onChange={handleTodoInputChange}
                  type="text"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:outline-none focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Write Todo"
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
                        {item.checked === "incomplete" ? (
                           <MdCheckBoxOutlineBlank
                              onClick={() => {
                                 handleTaskComplete(index);
                              }}
                              className="text-gray-500 text-2xl cursor-pointer"
                           />
                        ) : (
                           <MdCheckBox className="text-primary text-2xl cursor-pointer" />
                        )}
                     </p>
                     {item.checked === "incomplete" ? (
                        <p>{item.text}</p>
                     ) : (
                        <del>{item.text}</del>
                     )}
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
