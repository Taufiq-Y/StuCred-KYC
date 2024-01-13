import React from 'react'

const Unauthorized = () => {
    setTimeout(() => {
        window.location.href='/';
    }, 4000)
  return (
    <div  style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "cursive",
        fontSize: "2rem",
      }}>Unauthorized... Pls wait while we are re-directing you to login..</div>
  )
}

export default Unauthorized