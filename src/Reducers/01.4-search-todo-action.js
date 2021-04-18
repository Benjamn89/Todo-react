const actionTypes = {
   toggleSearch: () => {
       return {type: 'toggle-search'}
   },
   updateSearchInput: (data) => {
    return {type: 'update-search-input',data}
   },
  }
  export default actionTypes