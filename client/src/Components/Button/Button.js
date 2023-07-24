import React from "react";

const Button = (props) => {
    return <button className={`button_wrapper version_${props.version ? props.version : 1} size_${props.size ? props.size : 1}`} {...props} type="button">{props?.children}</button>
}

export default Button