import React from 'react'

const ByState = ({handleFilterToggle}) => {

    const states =[
        'all', 'Karnataka', 'Maharshtra'
    ]


  return (
    <div>
{states.map(state=>(
    <p key={state} onClick={() => handleFilterToggle('state', state)}>
{state}
    </p>
))}
    </div>
  )
}

export default ByState