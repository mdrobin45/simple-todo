import EdiText from "react-editext";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import emptyImage from "../../assets/images/emptyList.svg";
import useTodoLogic from "./useTodoLogic";

const Home = () => {
   const {
      handleTodoInputChange,
      inputValue,
      storedList,
      handleAddTodo,
      handleDelete,
      handleEditTodo,
      handleTaskComplete,
      completeTodoCount,
   } = useTodoLogic();

   return (
      <main className="flex items-center flex-col">
         <div className="mt-20 border rounded-md shadow-sm p-6 w-2/4">
            <p>
               Completed: {completeTodoCount} out of {storedList.length}
            </p>
            <form
               onSubmit={handleAddTodo}
               className="flex items-center gap-2 mt-2">
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
            {storedList.length !== 0 ? (
               <>
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
                              <EdiText
                                 type="text"
                                 onSave={handleEditTodo}
                                 value={item.text}
                                 // editing={isEditing}
                                 hint
                              />
                           ) : (
                              <del>{item.text}</del>
                           )}
                        </div>
                        <div className="flex items-center gap-2">
                           <p>
                              <MdDelete
                                 onClick={() => {
                                    handleDelete(index);
                                 }}
                                 className="text-xl text-gray-500 hover:text-red-500 cursor-pointer"
                              />
                           </p>
                        </div>
                     </div>
                  ))}
               </>
            ) : (
               <div className="mt-20">
                  <img src={emptyImage} alt="Empty" />
               </div>
            )}
         </div>
      </main>
   );
};

export default Home;
