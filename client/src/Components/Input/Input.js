import React from "react"

const Input=(props)=>{
    return <div className="input_wrapper">
        <label>{props?.label}</label>
        <input type="text"{...props} onChange={(e)=>props.onChange(e.target.value)}/>
    </div>
}
export default Input