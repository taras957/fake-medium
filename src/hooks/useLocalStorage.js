import {useState,useEffect} from 'react'
export default (key, initValue= '') => {
const [value, setValue] =useState(()=> {
    return localStorage.getItem(key) || initValue
})

useEffect(() => {
  localStorage.setItem(key, value);
}, [value, key]);
return [value, setValue]
}