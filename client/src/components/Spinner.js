import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
    const [count,setCount] = useState(5)
    const navigate =useNavigate()

     useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue);
        },1000);
        count === 0 && navigate('/login')
        return ()=> clearInterval(interval)
     },count[count,navigate])
  return (
    <>
      <div className="d-flex justify-content-center align-items-center "
      style={{height :"100vh"}}>
        <div className="spinner-border" role="status">

        </div>
      </div>
    </>
  );
};

export default Spinner;
