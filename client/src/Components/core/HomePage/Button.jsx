import React from 'react'
import { Link } from 'react-router-dom';
import '../../../pages/Home.css'

const Button = ({children, linkto, active}) => {    /*here active is used for flag to let know which  color is need to used which not*/
  return (
    <Link to={linkto}>
      <div
          className="button"
           style={{
           backgroundColor: active ? "#FFD60A" : "#1a1a1a",
            color: active ? "black" : "white"
  }}
>
             {children}
        </div>
        
    </Link>
  )
}

export default Button;