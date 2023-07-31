import React from "react";

const Modal = (props) => {
    return <div className={"modal_wrapper"}>
        <div className={"backdrop"} onClick={props.close}></div>
        <div className={`content ${props?.className ? props.className : ""} `}>
            <div className={"close-button"} onClick={props.close}>X</div>
            {props?.children}
        </div>
    </div>
}


export default Modal