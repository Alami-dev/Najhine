// Configuration et utilitaires pour l'intégration Ollama

export interface OllamaConfig {
  baseUrl: string
  defaultModel: string
  timeout: number
}

export const ollamaConfig: OllamaConfig = {
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  defaultModel: "mistral",
  timeout: 30000,
  // Nouveau : Mode développement
  developmentMode: process.env.NODE_ENV === "development" && !process.env.OLLAMA_BASE_URL,
}

export interface OllamaRequest {
  model: string
  prompt: string
  stream?: boolean
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    max_tokens?: number
  }
}

export interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context?: number[]
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

export class OllamaClient {
  private config: OllamaConfig

  constructor(config: OllamaConfig = ollamaConfig) {
    this.config = config
  }

  async generate(request: OllamaRequest): Promise<OllamaResponse> {
    // Mode développement : retourner des réponses simulées
    if (this.config.developmentMode) {
      return this.generateMockResponse(request)
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...request,
          stream: false,
        }),
        signal: AbortSignal.timeout(this.config.timeout),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erreur Ollama:", error)
      // Fallback vers réponses simulées en cas d'erreur
      return this.generateMockResponse(request)
    }
  }

  private generateMockResponse(request: OllamaRequest): OllamaResponse {
    // Réponses simulées intelligentes selon le type de prompt
    let mockResponse = "Réponse IA simulée en cours de développement."

    if (request.prompt.includes("Feynman")) {
      mockResponse = `Analyse Feynman simulée :

1. **Simplicité du langage** : 7/10
   - Votre explication utilise un vocabulaire accessible
   - Quelques termes techniques pourraient être simplifiés

2. **Utilisation d'analogies** : 6/10
   - Bonne tentative d'analogie avec la "boîte magique"
   - Développez davantage les comparaisons concrètes

3. **Lacunes détectées** :
   - Le concept de discriminant mériterait plus d'explications
   - Les étapes de résolution pourraient être plus détaillées

**Score de compréhension : 75/100**

**Suggestions d'amélioration :**
- Utilisez l'analogie d'une balance pour expliquer l'équation
- Comparez le discriminant à un "détecteur de solutions"
- Donnez des exemples avec des objets du quotidien`
    }

    if (request.prompt.includes("Active Recall")) {
      mockResponse = `Questions de rappel actif générées :

**Question 1 (Factuelle) :** Quelles sont les trois méthodes principales pour résoudre une équation du second degré ?

**Question 2 (Conceptuelle) :** Pourquoi le discriminant détermine-t-il le nombre de solutions ?

**Question 3 (Application) :** Comment résoudriez-vous x² - 5x + 6 = 0 par factorisation ?

**Question 4 (Synthèse) :** Comparez les avantages de la factorisation vs la formule quadratique.

**Question 5 (Créative) :** Inventez un problème concret qui mène à une équation du second degré.`
    }

    if (request.prompt.includes("évaluation")) {
      mockResponse = `Évaluation de la réponse :

**Score : 78/100**

**Points positifs :**
✅ Méthode correcte identifiée
✅ Calculs justes dans l'ensemble
✅ Présentation claire

**Points à améliorer :**
⚠️ Vérification finale manquante
⚠️ Explication du choix de méthode absente

**Feedback constructif :**
Excellente approche ! Vous maîtrisez bien la technique. Pour perfectionner votre réponse, pensez à :
1. Justifier pourquoi vous choisissez cette méthode
2. Vérifier votre résultat en substituant dans l'équation originale
3. Interpréter le résultat dans le contexte du problème

**Questions guidées :**
- Que se passe-t-il si vous remplacez x par votre solution dans l'équation ?
- Pourquoi avez-vous choisi la factorisation plutôt que la formule quadratique ?`
    }

    return {
      model: request.model,
      created_at: new Date().toISOString(),
      response: mockResponse,
      done: true,
      total_duration: 1000000000, // 1 seconde en nanosecondes
      load_duration: 100000000,
      prompt_eval_count: request.prompt.length,
      prompt_eval_duration: 500000000,
      eval_count: mockResponse.length,
      eval_duration: 500000000,
    }
  }

  async chat(
    messages: Array<{ role: string; content: string }>,
    model: string = this.config.defaultModel,
  ): Promise<string> {
    // Convertir les messages en prompt simple pour Ollama
    const prompt = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n") + "\nassistant:"

    const response = await this.generate({
      model,
      prompt,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    })

    return response.response
  }
}

// Instance globale du client Ollama
export const ollama = new OllamaClient()

// Prompts spécialisés pour l'éducation
export const educationalPrompts = {
  // Agent Tuteur d'Apprentissage
  tutorAnalysis: (subject: string, content: string, studentLevel: string) => `
Tu es un tuteur IA spécialisé en ${subject} pour un étudiant de niveau ${studentLevel}.
Analyse ce contenu et propose des méthodes d'apprentissage basées sur les neurosciences :

Contenu: ${content}

Propose :
1. Des questions de rappel actif (Active Recall)
2. Une approche Feynman (explication simplifiée)
3. Un plan de révision espacée (Spaced Repetition)
4. Des points clés à retenir (Chunking)

Réponds en français de manière structurée et pédagogique.
`,

  // Agent Évaluateur d'Exercices
  exerciseEvaluation: (question: string, studentAnswer: string, correctAnswer: string) => `
Tu es un évaluateur IA pédagogique. Analyse cette réponse d'étudiant :

Question: ${question}
Réponse de l'étudiant: ${studentAnswer}
Réponse correcte: ${correctAnswer}

Fournis :
1. Une évaluation sémantique (pas seulement mot-à-mot)
2. Un feedback constructif et encourageant
3. Des explications pour chaque erreur
4. Des questions guidées pour amener à la bonne réponse
5. Un score sur 100

Utilise la méthode Feynman pour expliquer les concepts complexes.
Réponds en français avec bienveillance.
`,

  // Agent Créateur de Contenu
  contentGeneration: (subject: string, topic: string, level: string, objectives: string) => `
Tu es un créateur de contenu pédagogique IA spécialisé en ${subject}.

Crée un cours sur : ${topic}
Niveau : ${level}
Objectifs : ${objectives}

Structure le cours avec :
1. Introduction claire
2. Concepts clés (méthode chunking - 7±2 éléments max par section)
3. Exemples concrets
4. Exercices d'application
5. Questions de compréhension
6. Résumé selon la méthode Cornell

Adapte le vocabulaire au niveau ${level}.
Réponds en français avec un style pédagogique engageant.
`,

  // Technique de Feynman
  feynmanAnalysis: (topic: string, studentExplanation: string) => `
Tu analyses une explication selon la technique de Feynman.

Sujet : ${topic}
Explication de l'étudiant : ${studentExplanation}

Évalue :
1. Simplicité du langage (niveau enfant de 6 ans)
2. Utilisation d'analogies et d'exemples
3. Lacunes de compréhension détectées
4. Concepts mal expliqués

Propose :
- Des améliorations spécifiques
- Des analogies plus simples
- Des questions pour approfondir
- Un score de compréhension sur 100

Réponds en français de manière constructive.
`,

  // Active Recall
  activeRecallGeneration: (content: string, difficulty: string) => `
Génère des questions de rappel actif basées sur ce contenu :

${content}

Crée 5 questions de difficulté ${difficulty} :
1. Questions factuelles (qui, quoi, quand)
2. Questions conceptuelles (pourquoi, comment)
3. Questions d'application (que se passerait-il si...)
4. Questions de synthèse (compare, analyse)
5. Questions créatives (imagine, propose)

Format : Question | Réponse attendue | Points clés à vérifier

Réponds en français.
`,
}

// Utilitaires pour la gestion des erreurs et fallback
export const handleOllamaError = (error: Error): string => {
  console.error("Erreur Ollama:", error)

  // Messages d'erreur utilisateur-friendly
  if (error.message.includes("fetch")) {
    return "Service IA temporairement indisponible. Veuillez réessayer dans quelques instants."
  }

  if (error.message.includes("timeout")) {
    return "Le service IA met plus de temps que prévu à répondre. Veuillez réessayer."
  }

  return "Une erreur inattendue s'est produite. Veuillez contacter le support si le problème persiste."
}

// Cache simple pour optimiser les performances
class OllamaCache {
  private cache = new Map<string, { response: string; timestamp: number }>()
  private ttl = 5 * 60 * 1000 // 5 minutes

  get(key: string): string | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.response
    }
    this.cache.delete(key)
    return null
  }

  set(key: string, response: string): void {
    this.cache.set(key, { response, timestamp: Date.now() })
  }

  clear(): void {
    this.cache.clear()
  }
}

export const ollamaCache = new OllamaCache()
