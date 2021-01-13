import React from 'react'

const Helper = (props) => {
    // Detecting pressed keys together for opening the "addtodo" from keyboard
    let detectKeys = {}
    const keyDown = (e) => {
        detectKeys[e.key] = e.type === 'keydown'
        if (detectKeys['a'] && detectKeys['d']) {
           console.log('Toggle todo')
        }
      }
      const keyUp = (e) => {
       detectKeys[e.key] = e.type === 'keydown'
      }

    console.log('Helper Component')
    return <div className='todo-helper' tabIndex='0' onKeyDown={keyDown} onKeyUp={keyUp}></div>
}

export default Helper