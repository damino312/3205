import React from "react";
import { DataI } from "../interfaces";

interface DisplaySearchDataProps {
  data: DataI[] | null;
}

export default function DisplaySearchData({ data }: DisplaySearchDataProps) {
  return (
    <div className="bg-white flex flex-col w-3/5 mt-6 h-16 p-2 rounded-md overflow-y-auto">
      {data ? (
        data.map((element: DataI, index: number) => (
          <span key={index}>
            {index + 1}&#41; {element.email} | {element.number}
          </span>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
