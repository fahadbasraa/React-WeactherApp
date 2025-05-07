import { useState,useEffect } from "react";

function useWeatherInfo(location){
    const [data,setdata] = useState({})
    try{
        useEffect(()=>{
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=74d7692b80fe4b31864130817250305&q=${location}&days=6`).then((res)=>res.json()).then((res)=>setdata(res));
            console.log(data);
        },[location])
    }catch (err) {
            console.error("Error fetching suggestions:", err);
            setdata({});
    }
    
    return data;
}
export default useWeatherInfo
