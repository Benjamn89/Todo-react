import React, { Component } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import searchTodoAction from '../../Reducers/01.4-search-todo-action';

class SearchTodoBtn extends Component {
    constructor(props) {
        super(props)
        this.inputEl = React.createRef()
    }
    shouldComponentUpdate(n) {
        return this.props.allowRender === !n.allowRender
    }
    componentDidUpdate(){
      this.props.searchTodoState ? this.inputEl.current.focus() : this.inputEl.current.blur()
    }
    keyDown = (e) => {
        if (e.key === 'Escape') {
            this.props.toggleSearch()
        }
    }
    search = (e) => {
        const val = e.target.value
        this.props.updateSearchInput(val)
        if (e.target.value.length > 2) {
            console.log('We have 3')
        }
      }
      render() {
        console.log('Search TodoBtn Component')
        return <div className='todo-functions-inside add-todo-btn'  onClick={() => this.props.searchTodoState ? '' : this.props.toggleSearch()}>
            <h6 className={this.props.searchTodoState ? 'search-h6 search-h6-off' : 'search-h6'}>Search Todo</h6>
            <input type='text' className={this.props.searchTodoState ? 'search-input search-input-on' : 'search-input'}
             ref={this.inputEl} onChange={this.search} onKeyDown={this.keyDown} value={this.props.searchInput}></input>
          <svg className={this.props.searchTodoState ? 'search-todo-arrow search-todo-arrow-down' : 'search-todo-arrow'}
           onClick={() => this.props.searchTodoState ? this.props.toggleSearch() : ''}
            width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17.5" cy="17.5" r="16.25" stroke={this.props.searchTodoState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
             <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
         </svg>
         {this.props.searchTodoState ? <div className='add-todo-btn-hover'>Esc to close or click the arrow</div> : <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'S'</div>}
        </div>
      }
}
const mapStateToProps = state => {
    return {
        searchTodoState: state.searchTodoReducer.searchTodoState,
        searchInput: state.searchTodoReducer.serachInput,
        allowRender: state.searchTodoReducer.allowRender,
        todos: state.loadTodoReducer.globalTodos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleSearch: () => dispatch(searchTodoAction.toggleSearch()),
        updateSearchInput: (val) => dispatch(searchTodoAction.updateSearchInput(val))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTodoBtn)