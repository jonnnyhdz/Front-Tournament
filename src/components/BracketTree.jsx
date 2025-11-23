"use client";

export default function BracketTree({ players = [], matches = [], totalSlots }) {
  
  if (!totalSlots) return null;

  /* -----------------------------
   * 1) Agrupar matches por ronda
   * ----------------------------- */
  const grouped = matches.reduce((acc, m) => {
    if (!acc[m.round]) acc[m.round] = [];
    acc[m.round].push(m);
    return acc;
  }, {});

  console.log("MATCHES AGRUPADOS:", grouped);

  /* -----------------------------
   * 2) Rondas esperadas
   * ----------------------------- */
  const expectedRounds = Math.log2(totalSlots);
  console.log("RONDAS ESPERADAS:", expectedRounds);

  /* -----------------------------
   * 3) Generar bracket SIN inventar
   * ----------------------------- */
  const bracket = [];

  for (let r = 1; r <= expectedRounds; r++) {
    const matchesInRound = grouped[r];

    if (matchesInRound) {
      bracket.push(matchesInRound);
    } else {
      // Ronda aún sin jugar
      const emptyMatches = totalSlots / Math.pow(2, r);
      bracket.push(
        Array.from({ length: emptyMatches }).map(() => ({
          player1: "Pendiente",
          player2: "Pendiente",
          winner: null
        }))
      );
    }
  }

  console.log("🏗️ BRACKET FINAL:", bracket);

  /* -----------------------------
   * 4) Detectar final real
   * ----------------------------- */
  const maxRound = Math.max(...matches.map(m => m.round), 1);
  const finalMatch = grouped[maxRound]?.[0] || null;

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold text-center">Bracket</h2>

      <div className="flex gap-10 overflow-x-auto mt-10">
        {bracket.map((round, index) => (
          <div key={index}>
            <h3 className="text-center text-purple-400 mb-4">
              {index + 1 === bracket.length ? "Final" : `Ronda ${index + 1}`}
            </h3>

            {index + 1 === bracket.length && finalMatch ? (
              <div className="p-4 border rounded-xl bg-purple-900/40 w-52 text-center">
                <PlayerBox name={finalMatch.winner} />
              </div>
            ) : (
              round.map((match, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl bg-purple-900/40 w-52 mb-6"
                >
                  <PlayerBox name={match.player1} winner={match.winner} />
                  <PlayerBox name={match.player2} winner={match.winner} />
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayerBox({ name, winner }) {
  const isPending = name === "Pendiente";

  return (
    <div
      className={`px-3 py-2 mt-2 rounded-lg text-center ${
        isPending
          ? "bg-gray-600/30 text-gray-400"
          : name === winner
          ? "bg-yellow-400 text-black font-bold"
          : "bg-purple-600 text-white"
      }`}
    >
      {name}
    </div>
  );
}
