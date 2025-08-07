"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Search,
  Plus,
  Play,
  Download,
  Eye,
  Clock,
  Star,
  Brain,
  FileText,
  Video,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSubject, setFilterSubject] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Introduction à l'algèbre",
      subject: "Mathématiques",
      type: "video",
      description: "Cours complet sur les bases de l'algèbre avec exercices pratiques",
      duration: "45 min",
      views: 1250,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-10",
      isAIGenerated: false,
      tags: ["algèbre", "équations", "mathématiques"],
    },
    {
      id: 2,
      title: "Quiz - Les lois de Newton",
      subject: "Physique",
      type: "quiz",
      description: "Évaluation interactive sur les trois lois fondamentales de Newton",
      duration: "15 min",
      views: 890,
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-12",
      isAIGenerated: true,
      tags: ["newton", "mécanique", "physique"],
    },
    {
      id: 3,
      title: "Histoire du Maroc - Résumé",
      subject: "Histoire",
      type: "document",
      description: "Synthèse complète de l'histoire du Maroc de l'antiquité à nos jours",
      duration: "30 min",
      views: 2100,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-08",
      isAIGenerated: true,
      tags: ["maroc", "histoire", "chronologie"],
    },
    {
      id: 4,
      title: "Tableau blanc - Géométrie",
      subject: "Mathématiques",
      type: "whiteboard",
      description: "Vidéo animée expliquant les théorèmes de géométrie plane",
      duration: "25 min",
      views: 756,
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-15",
      isAIGenerated: false,
      tags: ["géométrie", "théorèmes", "animation"],
    },
    {
      id: 5,
      title: "Conjugaison française - Exercices",
      subject: "Français",
      type: "interactive",
      description: "Exercices interactifs pour maîtriser la conjugaison française",
      duration: "20 min",
      views: 1450,
      rating: 4.5,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-14",
      isAIGenerated: true,
      tags: ["conjugaison", "français", "exercices"],
    },
    {
      id: 6,
      title: "Chimie organique - Bases",
      subject: "Chimie",
      type: "video",
      description: "Introduction aux concepts fondamentaux de la chimie organique",
      duration: "60 min",
      views: 980,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-11",
      isAIGenerated: false,
      tags: ["chimie", "organique", "molécules"],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "quiz":
        return <ImageIcon className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "whiteboard":
        return <ImageIcon className="h-4 w-4" />
      case "interactive":
        return <Play className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      video: "bg-blue-100 text-blue-800",
      quiz: "bg-green-100 text-green-800",
      document: "bg-gray-100 text-gray-800",
      whiteboard: "bg-purple-100 text-purple-800",
      interactive: "bg-orange-100 text-orange-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === "all" || course.type === filterType
    const matchesSubject = filterSubject === "all" || course.subject === filterSubject
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
              <Link href="/classroom" className="text-gray-600 hover:text-blue-600">
                Salle de cours
              </Link>
              <Link href="/courses" className="text-blue-600 font-medium">
                Cours
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bibliothèque de cours</h1>
            <p className="text-gray-600">Gérez et créez votre contenu pédagogique</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/courses/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Brain className="h-4 w-4 mr-2" />
                Créer avec IA
              </Button>
            </Link>
            <Link href="/whiteboard">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Tableau blanc
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher des cours, sujets, tags..."
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
              <option value="video">Vidéos</option>
              <option value="quiz">Quiz</option>
              <option value="document">Documents</option>
              <option value="whiteboard">Tableau blanc</option>
              <option value="interactive">Interactif</option>
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
              <option value="Géographie">Géographie</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total des cours</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vues totales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.reduce((sum, course) => sum + course.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Créés par IA</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.filter((c) => c.isAIGenerated).length}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getTypeBadge(course.type)}>
                    <span className="flex items-center space-x-1">
                      {getTypeIcon(course.type)}
                      <span className="capitalize">{course.type}</span>
                    </span>
                  </Badge>
                </div>
                {course.isAIGenerated && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-purple-600 text-white">
                      <Brain className="h-3 w-3 mr-1" />
                      IA
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {course.duration}
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{course.subject}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{course.views.toLocaleString()} vues</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(course.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun cours trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== "all" || filterSubject !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Créez votre premier cours"}
            </p>
            <div className="flex justify-center space-x-3">
              <Link href="/courses/create">
                <Button>
                  <Brain className="h-4 w-4 mr-2" />
                  Créer avec IA
                </Button>
              </Link>
              <Link href="/whiteboard">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Tableau blanc
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
