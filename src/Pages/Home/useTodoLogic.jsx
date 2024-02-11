import { useEffect, useState } from "react";
import insertToLocalStorage from "../../Utils/insertToLocalStorage";
import retrieveLocalStorageData from "../../Utils/retrieveLocalStorageData";

const useTodoLogic = () => {
   const [inputValue, setInputValue] = useState("");
   const [storedList, setStoredList] = useState([]);
   const [completeTodoCount, setCountTodoCount] = useState(0);

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
   const handleTaskComplete = (index) => {
      storedList[index].checked = "complete";
      insertToLocalStorage("todo", storedList);
      const storedData = retrieveLocalStorageData("todo");

      if (storedData) {
         setStoredList(storedData);
      }
   };

   // Handle Delete todo
   const handleDelete = (index) => {
      storedList.splice(index, 1);
      insertToLocalStorage("todo", storedList);

      const storedData = retrieveLocalStorageData("todo");
      if (storedData) {
         setStoredList(storedData);
      }
   };

   // handle edit todo list
   const handleEditTodo = (value) => {
      console.log(value);
   };

   // Count todos
   useEffect(() => {
      const todos = retrieveLocalStorageData("todo");

      if (todos) {
         // Completed todos
         const countCompletedTodo = todos.filter(
            (item) => item.checked === "complete"
         ).length;

         setCountTodoCount(countCompletedTodo);
      }
   }, [storedList]);

   return {
      handleTodoInputChange,
      storedList,
      inputValue,
      handleAddTodo,
      handleDelete,
      handleEditTodo,
      handleTaskComplete,
      completeTodoCount,
   };
};

export default useTodoLogic;
