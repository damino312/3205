import { useState } from "react";
import SearchForm from "../components/SearchBlock";
import { Circle } from "../components/Circle";

export default function SearchPage() {
  return (
    <div className="h-screen  flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative right-">
      <SearchForm />
      <Circle verticalPosition="bottom-14" horizontalPosition="right-32" />
      <Circle verticalPosition="top-14" horizontalPosition="left-32" />
    </div>
  );
}
