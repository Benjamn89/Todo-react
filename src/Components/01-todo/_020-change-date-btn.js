import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import changeDateAction from '../../Reducers/01.3-load-todo-action';

 const ChangeDateBtn = props => {
     console.log('Change Date Btn')
     let svgElement = useRef(null)
     useEffect(() => {
        if (props.changeDayState) {
          svgElement.current.classList.add('change-date-arrow-down')
        } else {
          svgElement.current.classList.remove('change-date-arrow-down')
          }
        })
   
        let hover = <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'C'</div>
        if (props.changeDayState) {
          hover = <div className='add-todo-btn-hover'>To close press Esc</div>
        }

     return <div className='todo-functions-inside add-todo-btn'onClick={props.toggleChangeDay}>Change Day
    <svg className='change-date-arrow' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgElement}>
     <circle cx="17.5" cy="17.5" r="16.25" stroke={props.changeDayState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
     <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
     </svg>
     {hover}
     </div>
 }

 const mapStateToProps = state => {
    return {
      changeDayState: state.changeDateReducer.changeDayState 
     }
    }    

  const mapDispatchToProps = dispatch => {
      return {
        toggleChangeDay: () => dispatch(changeDateAction.toggleChangeDay())
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ChangeDateBtn)