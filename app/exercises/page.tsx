"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  PenTool,
  Search,
  Plus,
  Brain,
  Target,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSubject, setFilterSubject] = useState("all")

  const exercises = [
    {
      id: 1,
      title: "Quiz - Équations du second degré",
      subject: "Mathématiques",
      type: "quiz",
      difficulty: "Avancé",
      questions: 15,
      duration: "20 min",
      completed: true,
      score: 85,
      attempts: 2,
      lastAttempt: "Il y a 2 jours",
      aiAnalysis: "Excellente maîtrise des méthodes de résolution",
      tags: ["algèbre", "équations", "terminale"],
    },
    {
      id: 2,
      title: "Exercices - Lois de Newton",
      subject: "Physique",
      type: "exercise",
      difficulty: "Intermédiaire",
      questions: 8,
      duration: "30 min",
      completed: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      aiAnalysis: null,
      tags: ["mécanique", "forces", "première"],
    },
    {
      id: 3,
      title: "QCM - Révolution française",
      subject: "Histoire",
      type: "quiz",
      difficulty: "Intermédiaire",
      questions: 20,
      duration: "15 min",
      completed: true,
      score: 92,
      attempts: 1,
      lastAttempt: "Hier",
      aiAnalysis: "Très bonne connaissance des dates et événements",
      tags: ["révolution", "histoire", "première"],
    },
    {
      id: 4,
      title: "Analyse de texte - Baudelaire",
      subject: "Français",
      type: "exercise",
      difficulty: "Avancé",
      questions: 5,
      duration: "45 min",
      completed: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      aiAnalysis: null,
      tags: ["littérature", "poésie", "terminale"],
    },
    {
      id: 5,
      title: "Problèmes - Réactions chimiques",
      subject: "Chimie",
      type: "exercise",
      difficulty: "Avancé",
      questions: 12,
      duration: "40 min",
      completed: true,
      score: 78,
      attempts: 3,
      lastAttempt: "Il y a 1 semaine",
      aiAnalysis: "Amélioration nécessaire sur l'équilibrage des équations",
      tags: ["réactions", "équilibres", "terminale"],
    },
  ]

  const stats = {
    totalExercises: exercises.length,
    completed: exercises.filter((e) => e.completed).length,
    averageScore: Math.round(
      exercises.filter((e) => e.score).reduce((acc, e) => acc + e.score!, 0) / exercises.filter((e) => e.score).length,
    ),
    totalTime: 180, // minutes
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <BarChart3 className="h-4 w-4" />
      case "exercise":
        return <PenTool className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      quiz: "bg-blue-100 text-blue-800",
      exercise: "bg-green-100 text-green-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant":
        return "text-green-600 bg-green-100"
      case "Intermédiaire":
        return "text-yellow-600 bg-yellow-100"
      case "Avancé":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === "all" || exercise.type === filterType
    const matchesSubject = filterSubject === "all" || exercise.subject === filterSubject

    return matchesSearch && matchesType && matchesSubject
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Najhine</span>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/subjects" className="text-gray-600 hover:text-blue-600">
                Mes Cours
              </Link>
              <Link href="/exercises" className="text-blue-600 font-medium">
                Exercices
              </Link>
              <Link href="/classroom" className="text-gray-600 hover:text-blue-600">
                Salle de cours
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercices</h1>
            <p className="text-gray-600">Pratiquez et évaluez vos connaissances avec l'IA</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/exercises/create">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer un exercice
              </Button>
            </Link>
            <Link href="/exercises/search">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total exercices</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalExercises}</p>
                </div>
                <PenTool className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terminés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Progress value={(stats.completed / stats.totalExercises) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score moyen</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.floor(stats.totalTime / 60)}h{stats.totalTime % 60}m
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher des exercices, sujets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="all">Tous les types</option>
              <option value="quiz">Quiz</option>
              <option value="exercise">Exercices</option>
            </select>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="all">Toutes les matières</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique">Physique</option>
              <option value="Chimie">Chimie</option>
              <option value="Français">Français</option>
              <option value="Histoire">Histoire</option>
            </select>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getTypeBadge(exercise.type)}>
                        <span className="flex items-center space-x-1">
                          {getTypeIcon(exercise.type)}
                          <span className="capitalize">{exercise.type}</span>
                        </span>
                      </Badge>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-1">{exercise.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {exercise.subject} • {exercise.questions} questions • {exercise.duration}
                    </CardDescription>
                  </div>
                  {exercise.completed ? (
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(exercise.score!)}`}>{exercise.score}%</div>
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto mt-1" />
                    </div>
                  ) : (
                    <div className="text-center">
                      <AlertCircle className="h-8 w-8 text-gray-400 mx-auto" />
                      <span className="text-xs text-gray-500">À faire</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {exercise.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {exercise.attempts} tentative{exercise.attempts !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{exercise.lastAttempt || "Jamais fait"}</span>
                  </div>
                </div>

                {/* IA Analysis */}
                {exercise.aiAnalysis && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-900">Analyse IA</p>
                        <p className="text-xs text-blue-700">{exercise.aiAnalysis}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/exercises/${exercise.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {exercise.completed ? "Refaire" : "Commencer"}
                    </Button>
                  </Link>
                  {exercise.completed && (
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Stats
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun exercice trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== "all" || filterSubject !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer ou rechercher des exercices"}
            </p>
            <div className="flex justify-center space-x-3">
              <Link href="/exercises/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un exercice
                </Button>
              </Link>
              <Link href="/exercises/search">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
