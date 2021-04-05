const actionTypes = {
   toggleSearch: () => {
       return {
           type: 'toggle-search'
       }
   },
   updateSearchInput: (val) => {
    return {
        type: 'update-search-input',
        val
    }
   }
  }
  
  export default actionTypes