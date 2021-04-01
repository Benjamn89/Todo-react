import React from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import searchTodoAction from '../../Reducers/01.4-search-todo-action';

const SearchTodoBtn = props => {
    console.log('Search TodoBtn Component')
    return <div className='todo-functions-inside'  onClick={() => props.searchTodoState ? '' : props.toggleSearch()}>
        <h6 className={props.searchTodoState ? 'search-h6 search-h6-off' : 'search-h6'}>Search Todo</h6>
        <input type='text' className={props.searchTodoState ? 'search-input search-input-on' : 'search-input'}></input>
      <svg className={props.searchTodoState ? 'search-todo-arrow search-todo-arrow-down' : 'search-todo-arrow'}
       onClick={() => props.searchTodoState ? props.toggleSearch() : ''}
        width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="17.5" r="16.25" stroke={props.searchTodoState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
         <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
     </svg>
    </div>
}
const mapStateToProps = state => {
    return {
        searchTodoState: state.searchTodoReducer.searchTodoState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleSearch: () => dispatch(searchTodoAction.toggleSearch())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTodoBtn)