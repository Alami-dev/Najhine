"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Video,
  Calendar,
  Clock,
  Search,
  Bell,
  Settings,
  User,
  Brain,
  Target,
  Award,
  PenTool,
  BarChart3,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Données de progression par matière
  const subjectProgress = [
    { subject: "Mathématiques", progress: 75, totalCourses: 12, completedCourses: 9, color: "bg-blue-500" },
    { subject: "Physique", progress: 60, totalCourses: 8, completedCourses: 5, color: "bg-green-500" },
    { subject: "Français", progress: 85, totalCourses: 10, completedCourses: 8, color: "bg-purple-500" },
    { subject: "Histoire", progress: 45, totalCourses: 6, completedCourses: 3, color: "bg-orange-500" },
    { subject: "Chimie", progress: 30, totalCourses: 5, completedCourses: 2, color: "bg-red-500" },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "Équations du second degré",
      subject: "Mathématiques",
      progress: 90,
      lastAccessed: "Il y a 2h",
      aiScore: 85,
    },
    {
      id: 2,
      type: "exercise",
      title: "Quiz - Lois de Newton",
      subject: "Physique",
      progress: 100,
      lastAccessed: "Hier",
      aiScore: 92,
    },
    {
      id: 3,
      type: "course",
      title: "Analyse littéraire",
      subject: "Français",
      progress: 65,
      lastAccessed: "Il y a 3h",
      aiScore: 78,
    },
  ]

  const aiRecommendations = [
    {
      id: 1,
      type: "review",
      title: "Révision programmée - Trigonométrie",
      subject: "Mathématiques",
      reason: "Spaced Repetition (J+7)",
      priority: "high",
    },
    {
      id: 2,
      type: "practice",
      title: "Exercices - Réactions chimiques",
      subject: "Chimie",
      reason: "Active Recall recommandé",
      priority: "medium",
    },
    {
      id: 3,
      type: "feynman",
      title: "Technique Feynman - Photosynthèse",
      subject: "SVT",
      reason: "Concept complexe détecté",
      priority: "high",
    },
  ]

  const learningStats = {
    totalStudyTime: 45, // heures cette semaine
    activeRecall: 78, // pourcentage de réussite
    spacedRepetition: 12, // sessions programmées
    feynmanSessions: 5, // explications simplifiées
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Najhine</span>
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Rechercher des cours, exercices..." className="pl-10 w-64" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, Youssef 👋</h1>
          <p className="text-gray-600">Continuez votre parcours d'apprentissage avec l'IA Najhine</p>
        </div>

        {/* Navigation rapide */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/subjects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mes Cours</h3>
                <p className="text-gray-600 text-sm">Accéder à vos matières</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/exercises">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-green-200 hover:border-green-400">
              <CardContent className="p-6 text-center">
                <PenTool className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Exercices</h3>
                <p className="text-gray-600 text-sm">Pratiquer et s'évaluer</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/classroom">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-purple-200 hover:border-purple-400">
              <CardContent className="p-6 text-center">
                <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Salle de cours</h3>
                <p className="text-gray-600 text-sm">Sessions en direct</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai-tutor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-orange-200 hover:border-orange-400">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tuteur IA</h3>
                <p className="text-gray-600 text-sm">Assistant personnel</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats d'apprentissage IA */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps d'étude</p>
                  <p className="text-2xl font-bold text-gray-900">{learningStats.totalStudyTime}h</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+5h cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Recall</p>
                  <p className="text-2xl font-bold text-gray-900">{learningStats.activeRecall}%</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">Excellent niveau</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Révisions programmées</p>
                  <p className="text-2xl font-bold text-gray-900">{learningStats.spacedRepetition}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-blue-600 mt-2">3 aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessions Feynman</p>
                  <p className="text-2xl font-bold text-gray-900">{learningStats.feynmanSessions}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">Compréhension profonde</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progression par matière */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Progression par matière
                </CardTitle>
                <CardDescription>Votre avancement dans chaque matière</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectProgress.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                          <span className="font-medium">{subject.subject}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{subject.progress}%</span>
                          <p className="text-xs text-gray-500">
                            {subject.completedCourses}/{subject.totalCourses} cours
                          </p>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activité récente */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Activité récente
                </CardTitle>
                <CardDescription>Vos dernières sessions d'apprentissage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {activity.type === "course" ? (
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          ) : (
                            <PenTool className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Progress value={activity.progress} className="w-16 h-2" />
                          <span className="text-sm font-medium">{activity.progress}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <Brain className="h-3 w-3 mr-1" />
                            IA: {activity.aiScore}%
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.lastAccessed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommandations IA */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  Recommandations IA
                </CardTitle>
                <CardDescription>Suggestions personnalisées pour optimiser votre apprentissage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((rec) => (
                    <div key={rec.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {rec.type === "review" && <Calendar className="h-4 w-4 text-blue-600" />}
                          {rec.type === "practice" && <Target className="h-4 w-4 text-green-600" />}
                          {rec.type === "feynman" && <Brain className="h-4 w-4 text-purple-600" />}
                          <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {rec.priority === "high" ? "Priorité" : "Suggéré"}
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{rec.subject}</p>
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="font-medium text-sm">Maître Feynman</p>
                      <p className="text-xs text-gray-600">10 explications simplifiées</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Rappel Actif Pro</p>
                      <p className="text-xs text-gray-600">80% de réussite moyenne</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Régularité</p>
                      <p className="text-xs text-gray-600">7 jours consécutifs</p>
                    </div>
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
