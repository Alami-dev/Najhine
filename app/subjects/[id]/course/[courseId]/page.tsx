"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Brain,
  Zap,
  Calendar,
  Target,
  FileText,
  Map,
  Clock,
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Lightbulb,
  Eye,
  Sparkles,
  Award,
  TrendingUp,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function CourseStudyPage({ params }: { params: { id: string; courseId: string } }) {
  const [activeMethod, setActiveMethod] = useState<string | null>(null)
  const [studyProgress, setStudyProgress] = useState(0)
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [feynmanExplanation, setFeynmanExplanation] = useState("")
  const [recallAnswer, setRecallAnswer] = useState("")
  const [isStudying, setIsStudying] = useState(false)
  const [studyTime, setStudyTime] = useState(0)

  // Données du cours (normalement depuis la base de données)
  const course = {
    id: params.courseId,
    title: "Équations du second degré",
    subject: "Mathématiques",
    description:
      "Cours complet sur la résolution des équations du second degré avec méthodes graphiques et analytiques",
    content: `# Équations du second degré

## Introduction
Une équation du second degré est une équation de la forme ax² + bx + c = 0, où a ≠ 0.

## Méthodes de résolution

### 1. Factorisation
Lorsque l'équation peut être factorisée, on cherche à l'écrire sous la forme (x - r₁)(x - r₂) = 0.

### 2. Formule quadratique
La formule générale est : x = (-b ± √(b² - 4ac)) / 2a

### 3. Complétion du carré
Cette méthode consiste à transformer l'équation en un carré parfait.

## Discriminant
Le discriminant Δ = b² - 4ac détermine la nature des solutions :
- Si Δ > 0 : deux solutions réelles distinctes
- Si Δ = 0 : une solution réelle double
- Si Δ < 0 : pas de solution réelle

## Exemples pratiques
1. x² - 5x + 6 = 0
2. 2x² + 3x - 2 = 0
3. x² - 4x + 4 = 0`,
    difficulty: "Avancé",
    estimatedTime: "45 min",
    progress: 65,
    aiScore: 78,
  }

  // Simulation du timer d'étude
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isStudying) {
      timer = setInterval(() => {
        setStudyTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Méthodes d'apprentissage basées sur les neurosciences
  const learningMethods = [
    {
      id: "active-recall",
      name: "Test de Rappel Actif",
      description: "Testez votre mémoire sans consulter le cours",
      icon: Zap,
      color: "bg-yellow-500",
      technique: "Active Recall - Récupération d'information sans support",
    },
    {
      id: "feynman",
      name: "Technique de Feynman",
      description: "Expliquez le concept comme à un enfant de 6 ans",
      icon: Brain,
      color: "bg-purple-500",
      technique: "Simplification et verbalisation pour détecter les lacunes",
    },
    {
      id: "summary",
      name: "Résumer ce cours",
      description: "Génération de résumé avec méthode Cornell",
      icon: FileText,
      color: "bg-blue-500",
      technique: "Cornell Notes - Structure notes/questions/résumé",
    },
    {
      id: "mind-map",
      name: "Créer une Mind Map",
      description: "Visualisation des connexions conceptuelles",
      icon: Map,
      color: "bg-green-500",
      technique: "Chunking - Organisation en blocs de 7±2 éléments",
    },
    {
      id: "spaced-repetition",
      name: "Session d'Apprentissage Espacé",
      description: "Programmation automatique des révisions",
      icon: Calendar,
      color: "bg-red-500",
      technique: "Spaced Repetition - J+1, J+3, J+7, J+15, J+30",
    },
    {
      id: "key-points",
      name: "Axes importants",
      description: "Extraction hiérarchisée selon la méthode chunking",
      icon: Target,
      color: "bg-orange-500",
      technique: "Elaborative Interrogation - Pourquoi est-ce vrai ?",
    },
    {
      id: "mental-palace",
      name: "Palais Mental",
      description: "Création d'associations spatiales pour mémorisation",
      icon: Eye,
      color: "bg-indigo-500",
      technique: "Method of Loci - Association spatiale des informations",
    },
    {
      id: "adaptive-test",
      name: "Auto-Test Adaptatif",
      description: "Questions ajustées selon le niveau de maîtrise",
      icon: TrendingUp,
      color: "bg-pink-500",
      technique: "Testing Effect - Difficultés souhaitables pour l'apprentissage",
    },
  ]

  const handleMethodClick = async (methodId: string) => {
    setActiveMethod(methodId)
    setCurrentSession(methodId)

    // Simulation d'appel à l'agent IA Ollama
    console.log(`Démarrage de la méthode ${methodId} avec Ollama`)

    // Simulation de génération de contenu selon la méthode
    switch (methodId) {
      case "active-recall":
        // Générer des questions de rappel
        break
      case "feynman":
        // Préparer l'interface d'explication simplifiée
        break
      case "summary":
        // Générer un résumé structuré Cornell
        break
      case "mind-map":
        // Créer une carte mentale
        break
      case "spaced-repetition":
        // Programmer les révisions
        break
      default:
        break
    }
  }

  const handleFeynmanSubmit = async () => {
    // Simulation d'analyse IA de l'explication
    console.log("Analyse Feynman avec Ollama:", feynmanExplanation)
    // L'IA analyserait la qualité de l'explication et donnerait un feedback
  }

  const handleRecallSubmit = async () => {
    // Simulation d'évaluation du rappel actif
    console.log("Évaluation Active Recall avec Ollama:", recallAnswer)
    // L'IA évaluerait la réponse et donnerait un score
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href={`/subjects/${params.id}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Najhine</span>
              </Link>
              <div className="text-lg font-medium text-gray-700">{course.title}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={isStudying ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsStudying(!isStudying)}
                >
                  {isStudying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isStudying ? "Pause" : "Étudier"}
                </Button>
                <span className="text-sm font-mono text-gray-600">{formatTime(studyTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Informations du cours */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-2">{course.difficulty}</Badge>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.estimatedTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progression</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    IA: {course.aiScore}%
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Méthodes d'apprentissage IA */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Méthodes d'Apprentissage IA
                </CardTitle>
                <CardDescription>
                  Techniques basées sur les neurosciences cognitives pour optimiser votre apprentissage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        activeMethod === method.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => handleMethodClick(method.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${method.color} bg-opacity-10`}>
                            <method.icon
                              className={`h-5 w-5`}
                              style={{ color: method.color.replace("bg-", "").replace("-500", "") }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{method.name}</h4>
                            <p className="text-xs text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{method.technique}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interface de méthode active */}
            {activeMethod === "feynman" && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    Technique de Feynman
                  </CardTitle>
                  <CardDescription>Expliquez ce concept comme si vous parliez à un enfant de 6 ans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">📝 Consigne</h4>
                    <p className="text-sm text-purple-700">
                      Utilisez des mots simples, des analogies et des exemples concrets pour expliquer les équations du
                      second degré. L'IA analysera votre explication pour détecter les lacunes de compréhension.
                    </p>
                  </div>
                  <Textarea
                    placeholder="Commencez votre explication ici... Par exemple: 'Imagine que tu as une boîte magique...'"
                    value={feynmanExplanation}
                    onChange={(e) => setFeynmanExplanation(e.target.value)}
                    rows={6}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setActiveMethod(null)}>
                      Annuler
                    </Button>
                    <Button
                      onClick={handleFeynmanSubmit}
                      disabled={!feynmanExplanation.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Analyser avec IA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeMethod === "active-recall" && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                    Test de Rappel Actif
                  </CardTitle>
                  <CardDescription>Répondez sans consulter le cours pour tester votre mémoire</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">❓ Question</h4>
                    <p className="text-sm text-yellow-700">
                      Expliquez les trois méthodes principales pour résoudre une équation du second degré et donnez un
                      exemple pour chacune.
                    </p>
                  </div>
                  <Textarea
                    placeholder="Répondez ici sans regarder le cours..."
                    value={recallAnswer}
                    onChange={(e) => setRecallAnswer(e.target.value)}
                    rows={8}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setActiveMethod(null)}>
                      Annuler
                    </Button>
                    <Button
                      onClick={handleRecallSubmit}
                      disabled={!recallAnswer.trim()}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Évaluer ma réponse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contenu du cours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Contenu du cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">{course.content}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques d'apprentissage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Statistiques IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Temps d'étude</span>
                  <span className="font-semibold">{formatTime(studyTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Score IA</span>
                  <span className="font-semibold">{course.aiScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Méthodes utilisées</span>
                  <span className="font-semibold">3/8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Révisions programmées</span>
                  <span className="font-semibold">2</span>
                </div>
              </CardContent>
            </Card>

            {/* Prochaines révisions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Révisions programmées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Demain</p>
                    <p className="text-xs text-gray-600">J+1 - Première révision</p>
                  </div>
                  <Badge variant="outline">Programmé</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Dans 3 jours</p>
                    <p className="text-xs text-gray-600">J+3 - Révision espacée</p>
                  </div>
                  <Badge variant="outline">À venir</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Dans 7 jours</p>
                    <p className="text-xs text-gray-600">J+7 - Consolidation</p>
                  </div>
                  <Badge variant="outline">À venir</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Première session</p>
                    <p className="text-xs text-gray-600">Cours démarré</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-50">
                  <Lightbulb className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">Maître Feynman</p>
                    <p className="text-xs text-gray-600">5 explications réussies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-50">
                  <Star className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">Rappel Expert</p>
                    <p className="text-xs text-gray-600">80% de réussite</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
