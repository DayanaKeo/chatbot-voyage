// On stocke tout l'historique des messages ici
const chatHistory = [
  { 
    role: 'system', content: `Tu es TravelBot, un assistant de voyage EXPERT, SYNTHÉTIQUE et STRUCTURÉ.
    Quand l’utilisateur demande un itinéraire de [N] jours à [DESTINATION] :
    - 1 ligne par jour : "Jour X : ..."
    - LIEU principal en MAJUSCULES et **gras** (catégorie)
    - Max 4 activités séparées par des virgules
    - Pas d’intro ni de conclusion : chaque ligne commence “Jour X :”.
    - Toujours terminer la réponse

    Exemple :
    Jour 1 : **CHICHÉN ITZÁ** (Monument) – Pyramide maya, Cenote Ik Kil, photo temple
    Jour 2 : **ISLA MUJERES** (Plage) – Snorkeling, farniente, balade en golfette, coucher de soleil au phare

    Si la demande manque de précision (pas de N ou de destination), POSE une question de clarification en une seule ligne.`
  }
];

async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = '';

  // 2) Ajoute la question de l'utilisateur à l'historique
  chatHistory.push({ role: 'user', content: userMessage });

  // 3) Affiche immédiatement ce que l'utilisateur a tapé
  chatBox.innerHTML += `<div class="bubble user"><strong>Vous :</strong><br>${userMessage}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // 4) Envoie tout l'historique à ton backend
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });

    const { reply } = await res.json();

    // 5) Ajoute la réponse IA à l'historique
    chatHistory.push({ role: 'assistant', content: reply });

    // 6) Formate la réponse (gras et découpage en lignes)
    const formatted = reply
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map(line => `<p>${line.trim()}</p>`)
      .join('');

    // 7) Affiche la réponse finale
    chatBox.innerHTML += `<div class="bubble bot">${formatted}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    console.error('Fetch error:', err);
    chatBox.innerHTML += `<div class="bubble bot"><p>❌ Une erreur est survenue.</p></div>`;
  }
}
