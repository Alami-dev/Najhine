"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Brain,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Award,
  Send,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { ollama, educationalPrompts } from "@/lib/ollama"

export default function ExercisePage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)

  // Données de l'exercice (normalement depuis la base de données)
  const exercise = {
    id: params.id,
    title: "Quiz - Équations du second degré",
    subject: "Mathématiques",
    type: "quiz", // ou "exercise" pour réponses ouvertes
    difficulty: "Avancé",
    duration: "20 min",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Quelle est la forme générale d'une équation du second degré ?",
        options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + cx + d = 0", "ax² + b = 0"],
        correct: 1,
        explanation: "Une équation du second degré a la forme ax² + bx + c = 0 où a ≠ 0.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Que représente le discriminant Δ = b² - 4ac ?",
        options: [
          "Le nombre de solutions",
          "La nature des solutions",
          "La valeur des solutions",
          "La méthode de résolution",
        ],
        correct: 1,
        explanation: "Le discriminant détermine la nature des solutions : réelles distinctes, double, ou complexes.",
      },
      {
        id: 3,
        type: "open-ended",
        question:
          "Résolvez l'équation x² - 5x + 6 = 0 en utilisant la méthode de votre choix. Justifiez votre démarche.",
        correctAnswer:
          "Factorisation: x² - 5x + 6 = (x-2)(x-3) = 0, donc x = 2 ou x = 3. Vérification: 2² - 5(2) + 6 = 0 ✓",
        points: 10,
      },
    ],
  }

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer })
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    setIsEvaluating(true)

    // Évaluation des réponses
    const questionResults = await Promise.all(
      exercise.questions.map(async (question, index) => {
        const userAnswer = answers[index] || ""

        if (question.type === "multiple-choice") {
          const isCorrect = Number.parseInt(userAnswer) === question.correct
          return {
            questionId: question.id,
            isCorrect,
            userAnswer: question.options[Number.parseInt(userAnswer)] || "Non répondu",
            correctAnswer: question.options[question.correct],
            explanation: question.explanation,
            points: isCorrect ? 5 : 0,
          }
        } else {
          // Évaluation IA pour les questions ouvertes
          try {
            const aiEvaluation = await ollama.generate({
              model: "mistral",
              prompt: educationalPrompts.exerciseEvaluation(question.question, userAnswer, question.correctAnswer),
            })

            // Parser la réponse IA pour extraire le score
            const scoreMatch = aiEvaluation.response.match(/score.*?(\d+)/i)
            const score = scoreMatch ? Number.parseInt(scoreMatch[1]) : 50

            return {
              questionId: question.id,
              isCorrect: score >= 70,
              userAnswer,
              correctAnswer: question.correctAnswer,
              aiAnalysis: aiEvaluation.response,
              points: Math.round((score / 100) * question.points),
              score,
            }
          } catch (error) {
            console.error("Erreur évaluation IA:", error)
            return {
              questionId: question.id,
              isCorrect: false,
              userAnswer,
              correctAnswer: question.correctAnswer,
              aiAnalysis: "Évaluation IA temporairement indisponible",
              points: 0,
              score: 0,
            }
          }
        }
      }),
    )

    const totalPoints = questionResults.reduce((sum, result) => sum + result.points, 0)
    const maxPoints = exercise.questions.reduce(
      (sum, q) => sum + (q.type === "multiple-choice" ? 5 : q.points || 10),
      0,
    )
    const finalScore = Math.round((totalPoints / maxPoints) * 100)

    setResults({
      questions: questionResults,
      totalPoints,
      maxPoints,
      score: finalScore,
      timeSpent,
    })

    setIsEvaluating(false)
  }

  const resetExercise = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setSubmitted(false)
    setResults(null)
    setTimeSpent(0)
    setAiAnalysis(null)
  }

  if (submitted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/exercises">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">Najhine</span>
                </Link>
                <div className="text-lg font-medium text-gray-700">{exercise.title}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Résultats */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {results.score >= 80 ? (
                  <Award className="h-16 w-16 text-yellow-500" />
                ) : results.score >= 60 ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <Target className="h-16 w-16 text-orange-500" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                Score:{" "}
                <span
                  className={
                    results.score >= 80 ? "text-green-600" : results.score >= 60 ? "text-yellow-600" : "text-red-600"
                  }
                >
                  {results.score}%
                </span>
              </CardTitle>
              <CardDescription>
                {results.totalPoints}/{results.maxPoints} points • Temps: {formatTime(results.timeSpent)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">Performance</p>
                  <p className="text-sm text-gray-600">
                    {results.score >= 80 ? "Excellente" : results.score >= 60 ? "Bonne" : "À améliorer"}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Bonnes réponses</p>
                  <p className="text-sm text-gray-600">
                    {results.questions.filter((q: any) => q.isCorrect).length}/{results.questions.length}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold">Efficacité</p>
                  <p className="text-sm text-gray-600">
                    {results.timeSpent < 600 ? "Rapide" : results.timeSpent < 1200 ? "Normal" : "Lent"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détail des réponses */}
          <div className="space-y-6">
            {results.questions.map((result: any, index: number) => (
              <Card
                key={result.questionId}
                className={`border-l-4 ${result.isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {result.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <Badge variant={result.isCorrect ? "default" : "destructive"}>{result.points} pts</Badge>
                    </div>
                  </div>
                  <CardDescription>{exercise.questions[index].question}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-sm text-gray-700 mb-1">Votre réponse:</p>
                      <p
                        className={`text-sm p-2 rounded ${result.isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                      >
                        {result.userAnswer || "Non répondu"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-700 mb-1">Réponse correcte:</p>
                      <p className="text-sm p-2 rounded bg-green-50 text-green-800">{result.correctAnswer}</p>
                    </div>
                  </div>

                  {result.explanation && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Explication</p>
                          <p className="text-sm text-blue-700">{result.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {result.aiAnalysis && (
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-purple-900">Analyse IA</p>
                          <div className="text-sm text-purple-700 whitespace-pre-wrap">{result.aiAnalysis}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button onClick={resetExercise} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refaire l'exercice
            </Button>
            <Link href="/exercises">
              <Button>Retour aux exercices</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/exercises">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Najhine</span>
              </Link>
              <div className="text-lg font-medium text-gray-700">{exercise.title}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                {formatTime(timeSpent)}
              </div>
              <Badge variant="outline">
                {currentQuestion + 1}/{exercise.questions.length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>{Math.round(((currentQuestion + 1) / exercise.questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / exercise.questions.length) * 100} className="h-2" />
        </div>

        {/* Question actuelle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
            <CardDescription className="text-base">{exercise.questions[currentQuestion].question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {exercise.questions[currentQuestion].type === "multiple-choice" ? (
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
              >
                {exercise.questions[currentQuestion].options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="Rédigez votre réponse détaillée ici..."
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Conseil IA</p>
                      <p className="text-sm text-blue-700">
                        Détaillez votre démarche étape par étape. L'IA analysera votre raisonnement et vous donnera un
                        feedback personnalisé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Précédent
          </Button>

          <div className="flex space-x-2">
            {exercise.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : answers[index] ? "outline" : "ghost"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 ${answers[index] ? "bg-green-100 border-green-300" : ""}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {currentQuestion === exercise.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isEvaluating || Object.keys(answers).length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isEvaluating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Évaluation IA...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Terminer l'exercice
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(exercise.questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === exercise.questions.length - 1}
            >
              Suivant
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
