import React, {useEffect, useRef} from 'react'
// Import redux/ tools
import { connect } from "react-redux";

const ChangeDate = props => {
    return <div className='change-date-box'>
    
    <div className='change-date-click change-date-cancel'>
    <div></div>
    <div></div>
     </div>

     <div className='change-date-click change-date-confirm change-date-confirm-on'>
     <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M1 10.5L5 14.5L12.5 1.5" stroke="#00D2D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>
     </div>
      

         <div className='change-date-wrapper'>
           <div className='change-date-inside'>
             <p className='change-date-p'>D</p>
             <input type='number' value='00' className='change-date-input'/>
           </div>
           <div className='change-date-inside'>
             <p className='change-date-p'>M</p>
            <input type='number' value='00' className='change-date-input'/>
           </div>
           <div className='change-date-inside'>
              <p className='change-date-p'>Y</p>
            <input type='number' value='00' className='change-date-input'/>
           </div>
         </div>
    </div>
}

export default ChangeDate