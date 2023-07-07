import React from "react";

const Button =(props)=>{
    return <button {...props} type="button">{props?.children}</button>
}

export default Button