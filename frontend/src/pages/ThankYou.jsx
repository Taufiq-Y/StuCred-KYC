import React from "react";

const ThankYou = () => {
  setTimeout(() => {
    window.location.href='/';
}, 3000)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "cursive",
        fontSize: "2rem",
      }}
    >
      Thank You
    </div>
  );
};

export default ThankYou;
