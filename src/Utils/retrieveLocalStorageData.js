const retrieveLocalStorageData = (key) => {
   const retrievedItem = localStorage.getItem(key);
   return JSON.parse(retrievedItem);
};

export default retrieveLocalStorageData;
