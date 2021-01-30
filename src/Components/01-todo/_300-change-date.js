import React, {useRef, useEffect} from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import changeDateAction from '../../Reducers/01.3-change-date-action';

const ChangeDate = props => {
    console.log('Change Date Component')
    let inputElement = useRef(null)
    useEffect(() => {
      if (props.changeDayState) {
        inputElement.current.focus()
        inputElement.current.select()
      }
    }, [props.changeDayState])
    const changeDayInput = (e) => {
      const value = e.target.value
      const parseStr = parseInt(value)
      if (value.length < 2 && parseStr < 4) {
        props.changeDayUpdate(value)
      } else if (value.length > 1 && parseStr < 32) {
        props.changeDayUpdate(value)
      } else if (value.length < 1) {
        props.changeDayUpdate('')
      }
    }
    const changeMonthInput = (e) => {
      const value = e.target.value
      const parseStr = parseInt(value)
      if (value.length < 2 && parseStr < 2) {
        props.changeMonthUpdate(value)
      } else if (value.length > 1 && parseStr < 13 && parseStr > 0) {
        props.changeMonthUpdate(value)
      } else if (value.length < 1) {
        props.changeMonthUpdate('')
      }
    }
    const changeYearInput = (e) => {
      const value = e.target.value
      const parseStr = parseInt(value)
      if (value.length < 2 && parseStr === 2) {
        props.changeYearUpdate(value)
      } else if (value.length > 1) {
        props.changeYearUpdate(value)
      }
    }
    
    const keyPress = (e) => {
      if (e.key === 'Escape') {
        props.toggleChangeDay(false)
      }
    }
    const focusOut = (e) => {
      if (e.target.value.length < 2) {
        let newValue = e.target.value
        const keydom = e.target.getAttribute('keyDom')
        newValue = `0${newValue}`
        keydom === 'day' ? props.changeDayUpdate(newValue) : props.changeMonthUpdate(newValue)
      }
    }
    return <div className={props.changeDayState ? 'change-date-box change-date-box-on' : 'change-date-box'}>

    <div className='change-date-click change-date-cancel' onClick={() => props.toggleChangeDay(false)}>
    <div></div>
    <div></div>
     </div>

     <div className={props.allowSubmit ? 'change-date-click change-date-confirm change-date-confirm-on' : 'change-date-click change-date-confirm'}>
     <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M1 10.5L5 14.5L12.5 1.5" stroke="#00D2D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>
     </div>

         <div className='change-date-wrapper'>
           <div className='change-date-inside'>
             <p className='change-date-p'>D</p>
             <input type='text' value={props.day} className='change-date-input' maxLength='2'
             onKeyDown={keyPress} onChange={changeDayInput} ref={inputElement} keydom='day' onBlur={focusOut}/>
           </div>
           <div className='change-date-inside'>
             <p className='change-date-p'>M</p>
            <input type='text' value={props.month} className='change-date-input' maxLength='2'
            onKeyDown={keyPress} onChange={changeMonthInput} onBlur={focusOut}/>
           </div>
           <div className='change-date-inside'>
              <p className='change-date-p'>Y</p>
            <input type='text' value={props.year} className='change-date-input'
            onKeyDown={keyPress} onChange={changeYearInput}/>
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
  allowSubmit: state.changeDateReducer.allowSubmit
 }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleChangeDay: () => dispatch(changeDateAction.toggleChangeDay()),
    changeDayUpdate: (data) => dispatch(changeDateAction.changeDayUpdate(data)),
    changeMonthUpdate: (data) => dispatch(changeDateAction.changeMonthUpdate(data)),
    changeYearUpdate: (data) => dispatch(changeDateAction.changeYearUpdate(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeDate)