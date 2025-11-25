const API_URL = "https://tournament-api-f0p2.onrender.com/api";

/**
 * Obtener lista de torneos
 */
export async function getTournaments() {
  try {
    const res = await fetch(`${API_URL}/tournaments`);
    if (!res.ok) throw new Error("Error al obtener torneos");
    return await res.json();
  } catch (error) {
    console.error("getTournaments:", error);
    return [];
  }
}

/**
 * Registrar jugador en torneo (Firebase)
 */
export async function registerPlayer(data) {
  try {
    const res = await fetch(`${API_URL}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error || "Error al registrar jugador");
    return json;
  } catch (error) {
    console.error("registerPlayer:", error);
    throw error;
  }
}

/**
 * Obtener participantes del torneo
 */
export async function getParticipants(tournamentId) {
  try {
    const res = await fetch(`${API_URL}/tournaments/${tournamentId}/participants`);
    if (!res.ok) throw new Error("Error al obtener participantes");
    return await res.json();
  } catch (error) {
    console.error("getParticipants:", error);
    return [];
  }
}

/**
 * Obtener matches del torneo
 */
export async function getMatches(tournamentId) {
  try {
    const res = await fetch(`${API_URL}/tournaments/${tournamentId}/matches`);
    if (!res.ok) throw new Error("Error al obtener matches");
    return await res.json();
  } catch (error) {
    console.error("getMatches:", error);
    return [];
  }
}
