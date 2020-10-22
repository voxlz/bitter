import React, { useState } from 'react';
import rantsJSON from './rants.json';

interface IRant {
  text: string;
  user: string;
  dislikes: number;
  comments: number;
}

function App() {
  const [rants] = useState(rantsJSON);
  return (
    <div className=''>
      <div id='feed' className=' w-1/2 flex flex-col content-center m-auto'>
      <div id='rant-writer' className='bg-blue-400 m-3 rounded-xl flex p-4 shadow-lg'>
      <img src='http://simpleicon.com/wp-content/uploads/loudspeaker.png' className='w-12 h-12 bg-white rounded-full mr-4 ' />
        <input className='w-full m-1 rounded-md p-2' placeholder="What's grinding your gears?" />
        <button className='bg-blue-700 rounded-full p-2 text-white'>Rant</button>
      </div>
        {rants.map((rant: IRant) => (
          <div id='rant' className='bg-blue-400 m-3 rounded-xl flex p-4 shadow-lg'>
            <img src='http://simpleicon.com/wp-content/uploads/loudspeaker.png' className='w-12 h-12 bg-white rounded-full mr-4 ' />
            <div className=''>
              <p>@{rant.user}</p>
              <p className='text-white'>{rant.text}</p>
              <div className=''>
                {rant.dislikes}
                {rant.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
