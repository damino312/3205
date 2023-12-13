import React from "react";

interface CircleI {
  verticalPosition: string;
  horizontalPosition: string;
}

export const Circle: React.FC<CircleI> = ({
  verticalPosition,
  horizontalPosition,
}) => {
  return (
    <div
      className={
        verticalPosition +
        " " +
        horizontalPosition +
        " h-32 w-32 rounded-full absolute bg-gradient-to-br from-white"
      }
    ></div>
  );
};
