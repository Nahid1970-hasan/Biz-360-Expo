import { useEffect } from "react"; 
import { toast, ToastContainer, Zoom } from "react-toastify";

export const Toast = ({color, msg, hidebar=false}) => {  
    useEffect(() => { 
        color=="success"? toast.success(msg, {
            position: "top-right", 
            autoClose: 4000,
            hideProgressBar: hidebar,
            closeOnClick: false, 
            theme: "light",
            transition: Zoom,
            }): toast.error(msg, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: hidebar,
                closeOnClick: false, 
                theme: "light",
                transition:  Zoom,
                });;
    }, [color, msg]);

    return (<div><ToastContainer/></div> );
}