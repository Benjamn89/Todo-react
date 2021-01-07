import React, {useEffect, useRef} from 'react'
// Import redux/ tools
import { connect } from "react-redux";

const ChangeDate = props => {
    return <div className='change-date-box'>
         <div className='change-date-wrapper'>
           <div className='change-date-inside'>
             <input type='number' value='00' className='change-date-input'/>
           </div>
           <div className='change-date-inside'>
            <input type='number' value='00' className='change-date-input'/>
           </div>
           <div className='change-date-inside'>
            <input type='number' value='00' className='change-date-input'/>
           </div>
         </div>
    </div>
}

export default ChangeDate