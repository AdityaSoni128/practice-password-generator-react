import React, { useRef, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

function Card() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const ref  = useRef(null)


  const copyMessage = ()=> {
    ref.current?.select();
    window.navigator.clipboard?.writeText(password)
  }

  const generatePassword = useCallback(()=> {
    let charset ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let newPassword = "";

    if (charAllowed) charset += "!@#$%^&*()";
    if (numberAllowed) charset += "0123456789";

    for (let i = 0; i < length; i++) {
        newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }


    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed])

  useEffect(()=> {
    generatePassword()
  },[length, numberAllowed, charAllowed])

  return (
    <div className=" max-w-fit p-4 bg-orange-900 m-auto">
      <input
        className=" w-4/5 rounded p-2"
        type="text"
        name="password"
        id="password"
        readOnly
        value={password}
        ref={ref}
      />
      <button className=" bg-slate-500 p-2 rounded-lg ml-3" onClick={copyMessage}>Copy</button>
      <div className="mt-4">
        <input
          className="text-red bg-red-400 w-64"
          type="range"
          name="charLength"
          id="charLength"
          min={6}
          max={15}
          value={length}
          onChange={(event)=> setLength(event.target.value)}
        />
        <label htmlFor="charLength" className="pl-1 inline-block w-24">
          Length : {length}
        </label>

        <input
          type="checkbox"
          className="ml-2"
          name="number"
          id="number"
          value={numberAllowed}
          onChange={()=> setnumberAllowed((prev)=> !prev)}
        />
        <label htmlFor="number" className="pl-1">
          Numbers Allowed
        </label>

        <input
          type="checkbox"
          className="ml-2"
          name="char"
          id="char"
          value={charAllowed}
          onChange={()=> setcharAllowed((prev)=> !prev)}

        />
        <label htmlFor="char" className="pl-1">
          Chars Allowed
        </label>
      </div>
    </div>
  );
}

export default Card;
