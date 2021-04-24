const actionTypes = {
   toggleSearch: () => {
       return {type: 'toggle-search'}
   },
   updateSearchInput: (data) => {
    return {type: 'update-search-input',data}
   },
   updateSearchRes: (res) => {
       return {type: 'update-search-res', res}
   }
  }
  export default actionTypes