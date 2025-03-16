import React from "react";

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      @keyframes rotate4 {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash4 {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }

        50% {
          stroke-dasharray: 90, 200;
          stroke-dashoffset: -35px;
        }

        100% {
          stroke-dashoffset: -125px;
        }
      }
    `}</style>
  );
};

export default GlobalStyles;
