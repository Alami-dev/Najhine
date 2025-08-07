"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Video, Calendar, Users, Clock, Search, Plus, Play, Settings, Copy, Edit, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ClassroomPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const sessions = [
    {
      id: 1,
      title: "Mathématiques - Équations du second degré",
      subject: "Mathématiques",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 min",
      participants: 24,
      maxParticipants: 30,
      status: "scheduled",
      description: "Résolution d'équations du second degré avec méthodes graphiques",
      link: "https://najhine.daily.co/math-equations-123",
    },
    {
      id: 2,
      title: "Physique - Lois de Newton",
      subject: "Physique",
      date: "2024-01-15",
      time: "16:00",
      duration: "45 min",
      participants: 18,
      maxParticipants: 25,
      status: "live",
      description: "Étude des trois lois fondamentales de la mécanique",
      link: "https://najhine.daily.co/physics-newton-456",
    },
    {
      id: 3,
      title: "Français - Analyse littéraire",
      subject: "Français",
      date: "2024-01-14",
      time: "10:00",
      duration: "90 min",
      participants: 32,
      maxParticipants: 35,
      status: "completed",
      description: "Analyse de 'L'Étranger' d'Albert Camus",
      link: "https://najhine.daily.co/french-literature-789",
    },
    {
      id: 4,
      title: "Histoire - Le Maroc contemporain",
      subject: "Histoire",
      date: "2024-01-16",
      time: "09:00",
      duration: "75 min",
      participants: 28,
      maxParticipants: 30,
      status: "scheduled",
      description: "L'évolution politique et sociale du Maroc au XXe siècle",
      link: "https://najhine.daily.co/history-morocco-101",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500 hover:bg-red-600">En direct</Badge>
      case "scheduled":
        return <Badge variant="outline">Programmé</Badge>
      case "completed":
        return <Badge variant="secondary">Terminé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || session.status === filterStatus
    return matchesSearch && matchesFilter
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
              <Link href="/classroom" className="text-blue-600 font-medium">
                Salle de cours
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-blue-600">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Salle de cours</h1>
            <p className="text-gray-600">Gérez vos sessions de visioconférence</p>
          </div>
          <Link href="/classroom/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle session
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              Toutes
            </Button>
            <Button
              variant={filterStatus === "live" ? "default" : "outline"}
              onClick={() => setFilterStatus("live")}
              size="sm"
            >
              En direct
            </Button>
            <Button
              variant={filterStatus === "scheduled" ? "default" : "outline"}
              onClick={() => setFilterStatus("scheduled")}
              size="sm"
            >
              Programmées
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
              size="sm"
            >
              Terminées
            </Button>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                    <CardDescription>{session.description}</CardDescription>
                  </div>
                  {getStatusBadge(session.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Session Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(session.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {session.time} ({session.duration})
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {session.participants}/{session.maxParticipants} participants
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">{session.subject}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    ></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {session.status === "live" && (
                      <Link href={`/classroom/session/${session.id}`} className="flex-1">
                        <Button className="w-full bg-red-500 hover:bg-red-600">
                          <Play className="h-4 w-4 mr-2" />
                          Rejoindre
                        </Button>
                      </Link>
                    )}
                    {session.status === "scheduled" && (
                      <Link href={`/classroom/session/${session.id}`} className="flex-1">
                        <Button className="w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Démarrer
                        </Button>
                      </Link>
                    )}
                    {session.status === "completed" && (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Play className="h-4 w-4 mr-2" />
                        Voir l'enregistrement
                      </Button>
                    )}

                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Créez votre première session de cours"}
            </p>
            <Link href="/classroom/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer une session
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
