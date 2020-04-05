import React from 'react'
const Tab = ({number,deleteTab}) => {
    return (
      <>
        <h4>{`tab #${number}`}</h4>
        <label htmlFor="input1"></label>
        <input id="input1" />
        <label htmlFor="input2"></label>
        <input id="input2" />
        <button onClick={()=> { deleteTab(number)}}>Delete</button>
      </>
    );
  
};
export default Tab