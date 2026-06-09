import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

// IMPORTANT: Requires OPENAI_API_KEY in .env

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `
Tu es "ElecBot", l'assistant expert virtuel de l'application ElecNorme, spécialisé exclusivement dans la norme électrique française NFC 15-100 (édition 2020 et amendements jusqu'à 2026).
Ton rôle est d'aider les électriciens sur le terrain à obtenir des réponses rapides, précises et sûres concernant la réglementation.

Règles de comportement :
1. Réponds TOUJOURS en français, de manière professionnelle, claire et directe.
2. Si une question ne concerne pas l'électricité ou le bâtiment, refuse poliment d'y répondre en rappelant ton rôle.
3. Ne donne jamais de conseils qui pourraient mettre en danger la sécurité d'une installation ou des personnes.
4. Si tu n'es pas absolument certain d'une norme, dis-le clairement ("Il est recommandé de vérifier ce point précis dans le texte officiel...").
5. Essaie toujours de citer le contexte (ex: "Dans le volume 2 d'une salle de bain...", "Pour un circuit spécialisé...").

(Note: l'injection du contexte réel RAG des fiches NFC 15-100 se fera ici dans une version ultérieure)
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.2, // Low temperature for factual normative answers
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Erreur API Chat:", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la communication avec l'assistant." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
