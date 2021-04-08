import React, {useRef, useEffect} from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import changeDateAction from '../../Reducers/01.3-change-date-action';
import containerAction from '../../Reducers/01-todo-actions';
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action';

const ChangeDate = props => {
    console.log('Change Date Component')
    let dayInput = useRef(null)
    let monthInput = useRef(null)
    let yearInput = useRef(null)
    useEffect(() => {
      if (props.changeDayState) {
        dayInput.current.focus()
        dayInput.current.select()
      }
    }, [props.changeDayState])
    const changeDayInput = (e) => {
      console.log('change is operation')
      const value = e.target.value
      const parseStr = parseInt(value)
      let data = {value,count: 0}
      if (value.length < 2 && parseStr < 4) {
        props.changeDayUpdate(data)
      } else if (value.length > 1 && parseStr < 32) {
        data.count = 1
        monthInput.current.focus()
        monthInput.current.select()
        props.changeDayUpdate(data)
      } else if (value.length < 1) {
        props.changeDayUpdate(data)
      }
    }
    const changeMonthInput = (e) => {
      const value = e.target.value
      const parseStr = parseInt(value)
      let data = {value,count: 0}
      if (value.length < 2 && parseStr < 2) {
        props.changeMonthUpdate(data)
      } else if (value.length > 1 && parseStr < 13 && parseStr > 0) {
        data.count = 1
        yearInput.current.focus()
        yearInput.current.select()
        props.changeMonthUpdate(data)
      } else if (value.length < 1) {
        props.changeMonthUpdate(data)
      }
    }
    const changeYearInput = (e) => {
      const value = e.target.value
      const parseStr = parseInt(value)
      let data = {value,count: 0}
      if (value.length < 2 && parseStr === 2) {
        props.changeYearUpdate(data)
      } else if (value.length > 1 && value.length < 3) {
        data.count = 1
        props.changeYearUpdate(data)
      }
    }
    
    const keyPress = (e) => {
      if (e.key === 'Escape') {
        props.toggleChangeDay(false)
      }
      if (e.key === 'Enter' && props.dayCount + props.monthCount + props.yearCount > 2) {
        submitBtn()
      }
    }
    const focusOut = (e) => {
      if (e.target.value.length < 2) {
        let value = e.target.value
        const keydom = e.target.getAttribute('keyDom')
        value = `0${value}`
        const data = {value,count: 0}
        data.value > 0 ? data.count = 1 : data.count = 0
        keydom === 'day' ? props.changeDayUpdate(data) : props.changeMonthUpdate(data)
      }
    }
    const viButton = () => {
      if (props.dayCount + props.monthCount + props.yearCount > 2) {
        return true
      }
      return false
    }
    const submitBtn = () => {
      props.setToSpinner()
      const date = `${props.day}.${props.month}.20${props.year}`
      const data = {
        user: JSON.parse(localStorage.getItem('todo')).userName,
        date
      }
      props.checkDate(data)
      props.changeDateContainer(date)
      props.toggleChangeDay()
    }
    return <div className={props.changeDayState ? 'change-date-box change-date-box-on' : 'change-date-box'}>

    <div className='change-date-click change-date-cancel' onClick={() => props.toggleChangeDay(false)}>
    <div></div>
    <div></div>
     </div>

     <div onClick={submitBtn} 
     className={viButton() ? 'change-date-click change-date-confirm change-date-confirm-on' : 'change-date-click change-date-confirm'}>
     <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M1 10.5L5 14.5L12.5 1.5" stroke="#00D2D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>
     </div>

         <div className='change-date-wrapper'>
           <div className='change-date-inside'>
             <p className='change-date-p'>D</p>
             <input type='text' value={props.day} className='change-date-input' maxLength='2'
             onKeyDown={keyPress} onChange={changeDayInput} ref={dayInput} keydom='day' onBlur={focusOut}/>
           </div>
           <div className='change-date-inside'>
             <p className='change-date-p'>M</p>
            <input type='text' value={props.month} className='change-date-input' maxLength='2'
            onKeyDown={keyPress} onChange={changeMonthInput} onBlur={focusOut} ref={monthInput}/>
           </div>
           <div className='change-date-inside'>
              <p className='change-date-p'>Y</p>
            <input type='text' value={props.year} className='change-date-input'
            onKeyDown={keyPress} onChange={changeYearInput} ref={yearInput}/>
           </div>
         </div>
    </div>
}
const mapStateToProps = state => {
return {
  changeDayState: state.changeDateReducer.changeDayState,
  day: state.changeDateReducer.dayInput,
  month: state.changeDateReducer.monthInput,
  year: state.changeDateReducer.yearInput,
  dayCount: state.changeDateReducer.dayCount,
  monthCount: state.changeDateReducer.monthCount,
  yearCount: state.changeDateReducer.yearCount,
 }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleChangeDay: () => dispatch(changeDateAction.toggleChangeDay()),
    changeDayUpdate: (data) => dispatch(changeDateAction.changeDayUpdate(data)),
    changeMonthUpdate: (data) => dispatch(changeDateAction.changeMonthUpdate(data)),
    changeYearUpdate: (data) => dispatch(changeDateAction.changeYearUpdate(data)),
    changeDateContainer: date => dispatch(containerAction.changeDateContainer(date)),
    checkDate: (data) => dispatch(loadTodoActionTypes.checkDate(data)),
    setToSpinner: () => dispatch(loadTodoActionTypes.setToSpinner())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeDate)