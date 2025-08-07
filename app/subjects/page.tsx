"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Beaker,
  Languages,
  Search,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")

  // Données utilisateur (normalement depuis la base de données)
  const userLevel = "Terminale" // Niveau prédéfini lors de l'inscription

  const subjects = [
    {
      id: "mathematics",
      name: "Mathématiques",
      icon: Calculator,
      description: "Algèbre, géométrie, analyse et probabilités",
      color: "bg-blue-500",
      progress: 75,
      totalCourses: 24,
      completedCourses: 18,
      difficulty: "Avancé",
      estimatedTime: "45h",
      rating: 4.8,
      isRecommended: true,
      topics: ["Fonctions", "Dérivées", "Intégrales", "Probabilités"],
    },
    {
      id: "physics",
      name: "Physique",
      icon: Atom,
      description: "Mécanique, thermodynamique, électricité et optique",
      color: "bg-green-500",
      progress: 60,
      totalCourses: 18,
      completedCourses: 11,
      difficulty: "Avancé",
      estimatedTime: "38h",
      rating: 4.6,
      isRecommended: true,
      topics: ["Mécanique", "Électricité", "Ondes", "Thermodynamique"],
    },
    {
      id: "chemistry",
      name: "Chimie",
      icon: Beaker,
      description: "Chimie organique, minérale et physico-chimie",
      color: "bg-red-500",
      progress: 45,
      totalCourses: 16,
      completedCourses: 7,
      difficulty: "Avancé",
      estimatedTime: "32h",
      rating: 4.5,
      isRecommended: false,
      topics: ["Chimie organique", "Réactions", "Équilibres", "Cinétique"],
    },
    {
      id: "french",
      name: "Français",
      icon: Languages,
      description: "Littérature, grammaire et expression écrite",
      color: "bg-purple-500",
      progress: 85,
      totalCourses: 20,
      completedCourses: 17,
      difficulty: "Intermédiaire",
      estimatedTime: "28h",
      rating: 4.7,
      isRecommended: false,
      topics: ["Littérature", "Grammaire", "Expression", "Analyse"],
    },
    {
      id: "history",
      name: "Histoire-Géographie",
      icon: Globe,
      description: "Histoire du monde et géographie physique/humaine",
      color: "bg-orange-500",
      progress: 30,
      totalCourses: 14,
      completedCourses: 4,
      difficulty: "Intermédiaire",
      estimatedTime: "25h",
      rating: 4.4,
      isRecommended: true,
      topics: ["Histoire contemporaine", "Géopolitique", "Géographie", "Cartes"],
    },
    {
      id: "philosophy",
      name: "Philosophie",
      icon: BookOpen,
      description: "Métaphysique, éthique, logique et esthétique",
      color: "bg-indigo-500",
      progress: 20,
      totalCourses: 12,
      completedCourses: 2,
      difficulty: "Avancé",
      estimatedTime: "30h",
      rating: 4.3,
      isRecommended: false,
      topics: ["Métaphysique", "Éthique", "Logique", "Esthétique"],
    },
  ]

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLevel =
      levelFilter === "all" ||
      (levelFilter === "recommended" && subject.isRecommended) ||
      (levelFilter === "in-progress" && subject.progress > 0 && subject.progress < 100) ||
      (levelFilter === "completed" && subject.progress === 100)

    return matchesSearch && matchesLevel
  })

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
              <Link href="/subjects" className="text-blue-600 font-medium">
                Mes Cours
              </Link>
              <Link href="/exercises" className="text-gray-600 hover:text-blue-600">
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Matières</h1>
              <p className="text-gray-600">
                Niveau: <span className="font-semibold text-blue-600">{userLevel}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Progression globale</p>
              <div className="flex items-center space-x-2">
                <Progress value={65} className="w-32" />
                <span className="font-semibold">65%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une matière, un sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={levelFilter === "all" ? "default" : "outline"}
              onClick={() => setLevelFilter("all")}
              size="sm"
            >
              Toutes
            </Button>
            <Button
              variant={levelFilter === "recommended" ? "default" : "outline"}
              onClick={() => setLevelFilter("recommended")}
              size="sm"
            >
              Recommandées
            </Button>
            <Button
              variant={levelFilter === "in-progress" ? "default" : "outline"}
              onClick={() => setLevelFilter("in-progress")}
              size="sm"
            >
              En cours
            </Button>
            <Button
              variant={levelFilter === "completed" ? "default" : "outline"}
              onClick={() => setLevelFilter("completed")}
              size="sm"
            >
              Terminées
            </Button>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Link key={subject.id} href={`/subjects/${subject.id}`}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${subject.color} bg-opacity-10`}>
                        <subject.icon
                          className={`h-6 w-6 text-white`}
                          style={{ color: subject.color.replace("bg-", "").replace("-500", "") }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {subject.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getDifficultyColor(subject.difficulty)}>{subject.difficulty}</Badge>
                          {subject.isRecommended && (
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              <Star className="h-3 w-3 mr-1" />
                              Recommandé
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">{subject.description}</CardDescription>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {subject.completedCourses}/{subject.totalCourses} cours
                      </span>
                      <span>{subject.estimatedTime} restantes</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Sujets principaux:</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{subject.topics.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{subject.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{subject.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>{subject.progress > 50 ? "En progression" : "À commencer"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune matière trouvée</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou contactez votre établissement.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
