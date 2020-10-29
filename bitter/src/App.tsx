import React, { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineComment, AiFillDislike } from 'react-icons/ai';

interface IRant {
  text: string;
  user: string;
  dislikes: number;
  comments: number;
  date: Date;
}

function App() {
  const [text, setText] = useState('');
  const [rants, setRants] = useState<IRant[]>([{}] as IRant[]);

  // Call the fetch function passing the url as a parameter, tries proxy domain if not found
  useEffect(() => {
    //console.log('rants are being fetched from database');
    fetch('/getRants')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setRants(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleRant = () => {
    console.log('rant is being processed');
    const rant: IRant = { text: text, user: 'bitter_user', dislikes: 0, comments: 0, date: new Date() };
    setText('');
    fetch('/addRant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rant),
    })
      .then(response => console.log(response))
      .then(() => setRants([rant].concat(rants)))
      .catch(error => console.log(error));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleRant();
  };

  return (
    <div className=''>
      <div id='feed' className='w-full lg:w-1/2 flex flex-col content-center m-auto'>
        <div id='rant-writer' className='bg-blue-400 m-3 rounded-xl flex p-4 shadow-lg'>
          <img
            src='http://simpleicon.com/wp-content/uploads/loudspeaker.png'
            className='w-12 h-12 bg-white rounded-full mr-4 '
          />
          <input
            className='w-full m-1 rounded-md p-2 mr-4'
            placeholder="What's grinding your gears?"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleEnter}
          />
          <button onClick={e => handleRant()} className='bg-blue-700 rounded-full p-2 text-white'>
            Rant
          </button>
        </div>
        {rants &&
          rants.map((rant: IRant) => (
            <div id='rant' className='bg-blue-400 m-3 rounded-xl flex p-4 shadow-lg'>
              <img
                src='http://simpleicon.com/wp-content/uploads/loudspeaker.png'
                className='w-12 h-12 bg-white rounded-full mr-4 '
              />
              <div className='w-full'>
                <div className='flex flex-row'>
                  <p className='mr-3'>@{rant.user}</p>
                  <p className='text-gray-700'>{rant.date && new Date(rant.date).toLocaleTimeString()}</p>
                </div>
                <p className='text-white'>{rant.text}</p>
                <div
                  className='flex flex-row w-full gap-4
                 '>
                  <div className='flex flex-row gap-2' onClick={() => {}}>
                    <AiOutlineDislike className='w-5 h-5 hover:bg-red-500 hover:opacity-50  ' />
                    <div className='h-5 w-5 text-xl align-middle m-auto'>{rant.dislikes}</div>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <AiOutlineComment className='h-full' />
                    {rant.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
