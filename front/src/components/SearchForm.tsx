import React, { useState, useRef } from "react";
import axios from "axios";
import DisplaySearchData from "./DisplaySearchData";
import { DataI } from "../interfaces";

interface SearchFormPropsI {
  setNotification: (value: string) => void;
  setLoading: (value: boolean) => void;
}

export default function SearchForm({
  setNotification,
  setLoading,
}: SearchFormPropsI) {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [mask, setMask] = useState<string>("");
  const [data, setData] = useState<DataI[] | null>(null);

  const controllerRef = useRef<AbortController>();

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      setLoading(true);
      setData(null);
      const response = await axios.post<DataI[] | string>(
        "http://localhost:3000/find",
        {
          email,
          number,
        },
        { signal }
      );
      setLoading(false);
      if (typeof response.data === "string") {
        setNotification(response.data);
        setData(null);
      } else if (
        typeof response.data === "object" &&
        response.data.length > 0
      ) {
        setNotification(response.data.length + " found");
        setData(response.data);
      }
    } catch (error: any) {
      setNotification(error.response.data.error);
      setLoading(false);
      console.error("Error:", error);
    }
  }

  function handleMask(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value } = ev.target;
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = cleanValue.replace(/(\d{2})(?=\d)/g, "$1-");

    setNumber(cleanValue);
    setMask(formattedValue);
  }

  return (
    <div className="flex flex-col items-center justify-center z-10 h-full">
      <form
        onSubmit={(ev) => {
          handleSubmit(ev);
        }}
        className=" w-3/5"
      >
        <div className=" text-lg">
          <label className="flex flex-col mb-6 ">
            <span className=" relative mb-1">
              Email:&nbsp;
              <span className=" text-red-700 absolute bottom-1">*</span>
            </span>
            <input
              type="email"
              className="rounded-md pl-2"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Number:</span>
            <input
              type="text"
              className="rounded-md pl-2"
              value={mask}
              onChange={(ev) => handleMask(ev)}
            />
          </label>
          <button className="bg-white rounded-lg mt-6 px-3 py-1 hover:bg-white/70 ">
            Submit
          </button>
        </div>
      </form>
      <DisplaySearchData data={data} />
    </div>
  );
}
