import { useEffect, useState } from 'react';
import { Image } from './components/Image';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

import './App.css';

function App() {

  const [ word, setWord ] = useState( getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length ) );
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );

  // Determinar si la persona perdió
  useEffect( () => {
    if ( attempts >= 9 ) {
      setLose( true );
    }
  }, [ attempts ] );

  // Determinar si la persona ganó
  useEffect(()=> {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if ( currentHiddenWord === word ) {
      setWon( true );
    }
  }, [ hiddenWord ])

  const checkLetter = ( letter: string ) => {
    if ( lose ) return;
    if ( won ) return;
    
    if ( !word.includes(letter) ) {
      setAttempts( Math.min( attempts + 1, 9 )  );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for( let i = 0; i < word.length; i++ ) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord( hiddenWordArray.join(' ') );
  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord( '_ '.repeat( newWord.length ) );

    setAttempts( 0 );
    setLose( false );
    setWon( false );
  }

  return (
    <div className="App min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-3xl">
        {/* Tarjeta principal */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
          
          {/* Encabezado */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-wide">Ahorcado</h1>
          </header>

          {/* Imágenes */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px]">
              <Image imageNumber={ attempts } />
            </div>
          </div>

          {/* Palabra oculta */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="m-0 text-center text-3xl font-bold select-none">
              { hiddenWord }
            </h3>
          </div>

          {/* Contador de intentos */}
          <div className="mt-4">
            <h3 className="text-sm text-slate-300">
              Intentos: <span className="font-semibold text-slate-100">{ attempts }</span>
            </h3>
          </div>

          {/* Mensajes */}
          <div className="mt-4 space-y-3" aria-live="polite" role="status">
            {
              ( lose ) 
                ? <h2 className="rounded-lg border border-rose-700/40 bg-rose-900/30 px-4 py-3 text-rose-100 text-sm sm:text-base">
                    Perdiste — la palabra era <span className="font-bold tracking-wider">{ word }</span>.
                  </h2>
                : ''
            }

            {
              ( won ) 
                ? <h2 className="rounded-lg border border-emerald-700/40 bg-emerald-900/30 px-4 py-3 text-emerald-100 text-sm sm:text-base">
                    ¡Felicidades, ganaste el juego!!
                  </h2>
                : ''
            }
          </div>

          {/* Botones de letras */}
          <div className="mt-6">
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
              {
                letters.map( (letter) => (
                  <button
                    onClick={ () => checkLetter(letter) } 
                    key={ letter }
                    className="h-10 min-w-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 font-semibold transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    { letter }
                  </button>
                ))
              }
            </div>
          </div>

          {/* Nueva partida */}
          <div className="mt-6">
            <button
              onClick={ newGame }
              className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              ¿Nuevo juego?
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
