import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+[]{}~";
  
    for(let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
  
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Generate password on initial render and whenever dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-8 text-orange-100 bg-gray-800'>
        <h1 className="text-white text-center mb-5 text-2xl font-bold">Password Generator</h1>
        <div className='flex mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none py-2 px-4 bg-gray-700 text-white w-full rounded-l-lg'
            placeholder='Generated Password'
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-blue-700 text-white px-3 py-2 rounded-r-lg hover:bg-blue-800'
          >
            Copy
          </button>
        </div>
        <div className='flex items-center mb-4'>
          <label className='text-white mr-4'>Length:</label>
          <input
            type='range'
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='cursor-pointer w-full'
          />
          <span className='text-white ml-2'>{length}</span>
        </div>
        <div className='flex items-center mb-4'>
          <input
            type='checkbox'
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
            className='form-checkbox h-5 w-5 text-blue-600'
          />
          <label className='ml-2 text-white'>Include Numbers</label>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
            className='form-checkbox h-5 w-5 text-blue-600'
          />
          <label className='ml-2 text-white'>Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

