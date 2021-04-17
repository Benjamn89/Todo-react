import React, { Component } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import searchTodoAction from '../../Reducers/01.4-search-todo-action';
// import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action';

class SearchTodoBtn extends Component {
    constructor(props) {
        super(props)
        this.inputEl = React.createRef()
        this.viBtn = React.createRef()
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
            this.viBtn.current.setAttribute('class', 'search-vi-btn search-vi-btn-on')
            let copyAllTodos = JSON.parse(JSON.stringify(this.props.todos))
              const searchResult = () => {
                  return copyAllTodos.filter((el) => {
                      return el.text.toLowerCase().indexOf(val.toLowerCase()) !== -1
                  })
              }
              console.log(searchResult())
        }
      }
      render() {
        console.log('Search TodoBtn Component')
        return <div className='todo-functions-inside add-todo-btn'  onClick={() => this.props.searchTodoState ? '' : this.props.toggleSearch()}>
            <h6 className={this.props.searchTodoState ? 'search-h6 search-h6-off' : 'search-h6'}>Search Todo</h6>
            <input type='text' maxLength='15' className={this.props.searchTodoState ? 'search-input search-input-on' : 'search-input'}
             ref={this.inputEl} onChange={this.search} onKeyDown={this.keyDown} value={this.props.searchInput}></input>
          <svg className={this.props.searchTodoState ? 'search-todo-arrow search-todo-arrow-down' : 'search-todo-arrow'}
           onClick={() => this.props.searchTodoState ? this.props.toggleSearch() : ''}
            width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17.5" cy="17.5" r="16.25" stroke={this.props.searchTodoState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
             <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/></svg>
             <svg className='search-vi-btn' ref={this.viBtn} width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 10.5L5 14.5L12.5 1.5" stroke="#00D2D3" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round"/></svg>
         {this.props.searchTodoState ? <div className='add-todo-btn-hover'>Esc to close or click the arrow</div> : <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'S'</div>}
        </div>
      }
}
const mapStateToProps = state => {
    return {
        searchTodoState: state.searchTodoReducer.searchTodoState,
        searchInput: state.searchTodoReducer.serachInput,
        allowRender: state.searchTodoReducer.allowRender,
        viBtn: state.searchTodoReducer.viBtn,
        todos: state.loadTodoReducer.globalTodos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleSearch: () => dispatch(searchTodoAction.toggleSearch()),
        updateSearchInput: (val) => dispatch(searchTodoAction.updateSearchInput(val)),
        changeViBtn: (condition) => dispatch(searchTodoAction.changeViBtn(condition)),
        // setLoadState: (state) => dispatch(loadTodoActionTypes.setLoadState(state))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTodoBtn)