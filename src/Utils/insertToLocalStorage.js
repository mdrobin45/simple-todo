const insertToLocalStorage = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
};
export default insertToLocalStorage;
