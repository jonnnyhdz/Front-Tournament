"use client";
import React from 'react';

// Color de acento para las líneas de la llave
const LINE_COLOR = 'bg-cyan-400';
// Color de acento para la ronda final/campeón
const WINNER_COLOR = 'bg-yellow-500';

/* ---------------------------------
 * COMPONENTE: PlayerBox
 * --------------------------------- */
function PlayerBox({ name, winner }) {
  const isPending = name === "Pendiente";
  const isWinner = name && name !== "Pendiente" && name === winner;
  const isLoser = name && name !== "Pendiente" && winner && name !== winner;
  
  const baseStyle = "px-3 py-2 mt-1.5 rounded-lg transition-all duration-300 text-center text-xs sm:text-sm font-medium border-b-2";

  let specificStyle;
  if (isPending) {
    specificStyle = "bg-gray-800/60 text-gray-500 italic border-gray-700";
  } else if (isWinner) {
    specificStyle = "bg-gradient-to-r from-amber-400/90 to-yellow-300 text-gray-900 font-bold shadow-lg shadow-yellow-500/40 border-b-yellow-700";
  } else if (isLoser) {
    specificStyle = "bg-gray-800 text-gray-400 border-b-gray-700 opacity-80";
  } else {
    specificStyle = "bg-blue-900/40 text-white hover:bg-blue-800/60 border-b-blue-700";
  }

  return (
    <div className={`${baseStyle} ${specificStyle}`}>
      {name}
    </div>
  );
}

/* ---------------------------------
 * COMPONENTE: BracketMatch
 * --------------------------------- */
function BracketMatch({ match, roundIndex, expectedRounds }) {
  const isGrandFinalMatch = roundIndex + 1 === expectedRounds;
  const hasOutgoingConnector = !isGrandFinalMatch; 
  
  // Cálculo de dimensiones
  const verticalLineHeight = hasOutgoingConnector
    ? 4.5 * Math.pow(2, roundIndex) + (roundIndex > 0 ? 0.75 : 0)
    : 0;
    
  const spacerHeight = 3 * Math.pow(2, roundIndex) - 3;

  return (
    <div 
      className="flex items-center" 
      style={{ 
        marginTop: roundIndex > 0 ? `${spacerHeight}rem` : '0',
        marginBottom: roundIndex > 0 ? `${spacerHeight}rem` : '0',
      }}
    >
      {/* Contenedor de la Partida */}
      <div 
        className={`
          p-3 border-2 rounded-xl bg-gray-900/90 w-52 sm:w-60 relative z-10 flex-shrink-0 shadow-xl shadow-gray-900/70
          ${isGrandFinalMatch ? 'border-yellow-600 shadow-yellow-800/20' : 'border-blue-700'}
        `}
      >
        <PlayerBox name={match.player1} winner={match.winner} />
        <div className={`h-0.5 my-2 ${isGrandFinalMatch ? 'bg-yellow-700' : 'bg-blue-800'}`}></div> {/* Separador de jugadores */}
        <PlayerBox name={match.player2} winner={match.winner} />
      </div>

      {/* Estilo de Llave (Conectores) */}
      {hasOutgoingConnector && (
        <div className="relative h-full ml-2 sm:ml-6 w-8 sm:w-12 flex-shrink-0">
          {/* Línea horizontal (de la partida) */}
          <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 ${LINE_COLOR} rounded-full`}></div>

          {/* Línea vertical (la rama de la llave) */}
          <div 
            className={`absolute left-full w-1 ${LINE_COLOR} transform -translate-x-1/2 rounded-full`} 
            style={{ 
              height: `${verticalLineHeight}rem`,
              top: match.matchIndex % 2 === 0 ? '50%' : 'auto',
              bottom: match.matchIndex % 2 !== 0 ? '50%' : 'auto',
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

// En BracketTree.js, dentro de la función BracketTree({...})

export default function BracketTree({ players = [], matches = [], totalSlots }) {
  
  // ⬅️ AÑADE ESTE LOG DE DEPURACIÓN
  console.log("BracketTree Renderizado - Matches:", matches); 
  // Ahora, mira el JSON que llega aquí.
  
  if (!totalSlots || totalSlots < 2 || Math.log2(totalSlots) % 1 !== 0) return null; 

  /* Lógica de Agrupación y Rondas */
  const grouped = matches.reduce((acc, m) => {
// ... (resto del código)
    if (!m.round || typeof m.round !== 'number') return acc;
    
    if (!acc[m.round]) acc[m.round] = [];
    m.matchIndex = acc[m.round].length; 
    acc[m.round].push(m);
    return acc;
  }, {});

  const expectedRounds = Math.log2(totalSlots);
  const bracketRounds = [];

  // 1. Crear las rondas del bracket con LÓGICA DE AVANCE
  for (let r = 1; r <= expectedRounds; r++) {
    const matchesInCurrentRound = grouped[r];
    const emptyMatchesCount = totalSlots / Math.pow(2, r);

    // A. Si la API ya reportó las partidas de esta ronda, las usamos.
    if (matchesInCurrentRound) {
      bracketRounds.push(matchesInCurrentRound);
      continue;
    }

    // B. Si la ronda actual NO existe, intentamos construirla con ganadores (solo a partir de R2).
    if (r > 1) {
        const matchesInPreviousRound = grouped[r - 1];
        
        // Si no hay partidas reportadas en la ronda anterior, no podemos avanzar.
        if (!matchesInPreviousRound || matchesInPreviousRound.length === 0) {
             // Creamos partidas "Pendiente" si no hay datos previos
             bracketRounds.push(
                Array.from({ length: emptyMatchesCount }).map((_, i) => ({
                    player1: "Pendiente",
                    player2: "Pendiente",
                    winner: null,
                    matchIndex: i
                }))
             );
             continue;
        }

        // 1. Recolectar todos los ganadores de la ronda anterior
        const winners = matchesInPreviousRound
            .map(match => match.winner || "Pendiente")
            .filter(winner => winner !== null); 

        // 2. Agrupar los ganadores de dos en dos
        const newRound = [];
        for (let i = 0; i < winners.length; i += 2) {
            newRound.push({
                player1: winners[i],
                player2: winners[i + 1] || "Pendiente",
                winner: null, 
                matchIndex: i / 2
            });
        }
        
        bracketRounds.push(newRound);

    } else {
        // C. Caso base (Ronda 1) si no hay datos de la API: Mostrar todas Pendientes.
        bracketRounds.push(
            Array.from({ length: emptyMatchesCount }).map((_, i) => ({
                player1: "Pendiente",
                player2: "Pendiente",
                winner: null,
                matchIndex: i
            }))
        );
    }
  }

  // Obtenemos la última partida reportada por la API (la final) para el bloque del campeón
  const finalMatch = grouped[expectedRounds]?.[0] || null;
  const championName = finalMatch?.winner || "Esperando Ganador";
  
  // Calcula el espacio vertical para centrar el bloque del campeón
  const finalSpacerHeight = 3 * Math.pow(2, expectedRounds - 1) - 3;


  return (
    <div className="text-white min-h-screen bg-gray-900 p-6 sm:p-10 font-sans overflow-x-auto">
      <h2 className="text-3xl sm:text-4xl font-black text-center text-cyan-400 mb-10 uppercase tracking-widest border-b-4 border-cyan-400/50 pb-2 mx-auto max-w-lg">
        ⚔️ Torneo de Eliminación
      </h2>

      {/* Contenedor principal del Bracket */}
      <div className="flex gap-6 sm:gap-8 lg:gap-12 min-w-max">
        
        {/* Renderiza las Rondas del Bracket */}
        {bracketRounds.map((round, roundIndex) => (
          <div 
            key={roundIndex} 
            className="flex flex-col flex-shrink-0"
          >
            {/* Título de la Ronda */}
            <h3 className={`text-center mb-8 font-extrabold tracking-widest text-base sm:text-lg ${roundIndex + 1 === expectedRounds ? 'text-yellow-400' : 'text-blue-300'}`}>
              {roundIndex + 1 === expectedRounds ? "GRAN FINAL" : `RONDA ${roundIndex + 1}`}
            </h3>

            {/* Renderizar Partidas */}
            <div className="flex flex-col">
              {round.map((match, matchIndex) => (
                <BracketMatch
                  key={matchIndex}
                  match={match}
                  roundIndex={roundIndex}
                  expectedRounds={expectedRounds} 
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Columna de Conexión y el CAMPEÓN */}
        <div className="flex flex-col flex-shrink-0">
            {/* Título de la Ronda de Campeón */}
            <h3 className="text-center mb-8 font-black tracking-widest text-base sm:text-lg text-yellow-400">
                CAMPEÓN
            </h3>

            {/* Bloque del Campeón */}
            <div 
                className="flex items-center" 
                style={{ 
                    marginTop: `${finalSpacerHeight}rem`,
                    marginBottom: `${finalSpacerHeight}rem`,
                }}
            >
                {/* Línea horizontal que conecta la Final con el Campeón */}
                <div className={`w-8 sm:w-12 h-1 ${LINE_COLOR} rounded-full mr-4`}></div>
                
                <div className="p-6 border-4 border-yellow-500 rounded-3xl bg-yellow-900/30 w-52 sm:w-60 shadow-2xl shadow-yellow-500/40 transform scale-105 relative z-10">
                    <p className="text-center text-yellow-300 font-black mb-3 text-lg sm:text-xl uppercase tracking-wider">TROFEO</p>
                    <PlayerBox name={championName} winner={championName} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}