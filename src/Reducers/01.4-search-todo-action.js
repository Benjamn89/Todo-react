const actionTypes = {
   toggleSearch: () => {
       return {type: 'toggle-search'}
   },
   updateSearchInput: (val) => {
    return {type: 'update-search-input',val}
   },
   changeViBtn: (condition) => {
       return {type: 'change-vi-btn',condition}
      }
  }
  export default actionTypes