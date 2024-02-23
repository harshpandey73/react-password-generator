import { useCallback } from 'react';
import { useState } from 'react'
import './index.css'
import { useEffect } from 'react';
import { useRef } from 'react';
function App() {


  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [charac, setCharac] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numpass = "0123456789";
    let spchar = "@$#!%^&*+-`~";
    if (num) alp += numpass;
    if (charac) alp += spchar;

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * alp.length + 1);
      pass += alp.charAt(char);
    }

    setPassword(pass);
  }, [length, num, charac, setPassword])

  const passRef = useRef(null);
  const copyToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  },[length, num, charac, passwordGenerator])

  return (
    <>
      <div className="main h-screen flex items-center justify-center" >
        <div className="mid h-[60%] w-[50%] bg-gray-900 shadow-md flex rounded-xl">
          <div className="left h-[100%] w-[50%] flex flex-col items-center justify-center">

            <input type="text" value={password} contentEditable="false"
              id="large-input" readOnly ref={passRef} className="block w-auto p-4 text-white-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-5" />


            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Length {length}</label>
            <input id="default-range" type="range" min={4} max={50} value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className="w-[80%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

            <div className="w-[80%] mt-4 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" defaultChecked={num} onChange={()=> {setNum((prev)=> !prev)}}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numbers</label>
            </div>
            <div className="w-[80%] mt-4 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" defaultChecked={charac} onChange={()=> {setCharac((prev)=> !prev)}}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Characters</label>
            </div>

          </div>
          <div className="right flex items-center justify-center h-[100%] w-[50%]">
            <button onClick={copyToClip} className='w-[100%] h-[100%] bg-gray-300'>copy</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
