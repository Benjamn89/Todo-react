import React from 'react'
import {connect} from 'react-redux'

const SearchTodo = props => {
    console.log('Search Todo Main Component')
    return <div className='search-todo-box'></div>
}
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
     return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTodo)