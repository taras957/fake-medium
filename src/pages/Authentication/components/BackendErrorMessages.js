import React from 'react'

const BackendErrorMessages = ({ backendError }) => {
    const errors = Object.keys(backendError).map(  (name) => {
        const message = backendError[name].join(' ')
        return `${name} ${message}`
    })
  return (
    <ul>
      {errors.map(mesage => (
        <li key={mesage}>{mesage}</li>
      ))}
    </ul>
  );
};

export default BackendErrorMessages
