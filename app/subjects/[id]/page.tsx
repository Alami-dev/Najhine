"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Upload,
  Search,
  ArrowLeft,
  Brain,
  Users,
  Star,
  Download,
  Eye,
  Clock,
  Target,
  Sparkles,
  Wand2,
  Calculator,
} from "lucide-react"
import Link from "next/link"

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("students")

  // Données de la matière (normalement depuis la base de données)
  const subject = {
    id: params.id,
    name: "Mathématiques",
    icon: Calculator,
    description: "Algèbre, géométrie, analyse et probabilités",
    color: "bg-blue-500",
    progress: 75,
    totalCourses: 24,
    completedCourses: 18,
  }

  const [createCourseForm, setCreateCourseForm] = useState({
    name: "",
    theme: "",
    description: "",
    difficulty: "intermediate",
  })

  const [uploadForm, setUploadForm] = useState({
    name: "",
    specialty: "",
    depositor: "",
    establishment: "",
    files: [],
  })

  // Résultats de recherche simulés
  const searchResults = [
    {
      id: 1,
      title: "Équations du second degré - Cours complet",
      author: "Sarah El Mansouri",
      type: searchType,
      rating: 4.8,
      views: 1250,
      description: "Cours détaillé sur la résolution des équations du second degré avec exercices",
      tags: ["algèbre", "équations", "terminale"],
      difficulty: "Avancé",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Fonctions exponentielles et logarithmes",
      author: "Ahmed Benali",
      type: searchType,
      rating: 4.6,
      views: 890,
      description: "Introduction aux fonctions exponentielles et logarithmiques",
      tags: ["fonctions", "analyse", "terminale"],
      difficulty: "Avancé",
      duration: "60 min",
    },
    {
      id: 3,
      title: "Géométrie dans l'espace",
      author: "Fatima Idrissi",
      type: searchType,
      rating: 4.7,
      views: 1100,
      description: "Étude des solides et calculs de volumes",
      tags: ["géométrie", "espace", "terminale"],
      difficulty: "Intermédiaire",
      duration: "50 min",
    },
  ]

  const handleCreateCourse = async () => {
    // Simulation d'appel à l'agent IA Ollama
    console.log("Création de cours avec IA:", createCourseForm)
    // Redirection vers la page d'apprentissage
    window.location.href = `/subjects/${params.id}/course/new`
  }

  const handleUploadCourse = () => {
    console.log("Upload de cours:", uploadForm)
    setActiveModal(null)
  }

  const filteredResults = searchResults.filter(
    (result) =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/subjects">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Najhine</span>
              </Link>
              <div className="flex items-center space-x-2">
                <subject.icon className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-700">{subject.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{subject.name}</h1>
          <p className="text-gray-600 mb-4">{subject.description}</p>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800">
              {subject.completedCourses}/{subject.totalCourses} cours terminés
            </Badge>
            <Badge className="bg-green-100 text-green-800">{subject.progress}% de progression</Badge>
          </div>
        </div>

        {/* Trois options principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Option 1: Créer un cours */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModal("create")}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Créer un cours</h3>
              <p className="text-gray-600 mb-4">Utilisez l'IA pour générer du contenu pédagogique personnalisé</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Créer avec IA
              </Button>
            </CardContent>
          </Card>

          {/* Option 2: Télécharger un cours */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModal("upload")}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Télécharger un cours</h3>
              <p className="text-gray-600 mb-4">Importez vos propres fichiers PDF, Word, PowerPoint ou Excel</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Importer des fichiers
              </Button>
            </CardContent>
          </Card>

          {/* Option 3: Chercher un cours */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModal("search")}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chercher un cours</h3>
              <p className="text-gray-600 mb-4">Trouvez des cours partagés par d'autres étudiants et enseignants</p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modal Créer un cours */}
        {activeModal === "create" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="h-5 w-5 mr-2 text-purple-600" />
                  Créer un cours avec IA
                </CardTitle>
                <CardDescription>L'agent IA Ollama va vous assister dans la création de votre cours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Nom du cours *</Label>
                    <Input
                      id="courseName"
                      value={createCourseForm.name}
                      onChange={(e) => setCreateCourseForm({ ...createCourseForm, name: e.target.value })}
                      placeholder="Ex: Les équations du second degré"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Thématique/Chapitre *</Label>
                    <Input
                      id="theme"
                      value={createCourseForm.theme}
                      onChange={(e) => setCreateCourseForm({ ...createCourseForm, theme: e.target.value })}
                      placeholder="Ex: Algèbre, Fonctions, Géométrie..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={createCourseForm.description}
                      onChange={(e) => setCreateCourseForm({ ...createCourseForm, description: e.target.value })}
                      placeholder="Décrivez les objectifs et le contenu du cours..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Niveau de difficulté</Label>
                    <select
                      id="difficulty"
                      value={createCourseForm.difficulty}
                      onChange={(e) => setCreateCourseForm({ ...createCourseForm, difficulty: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="beginner">Débutant</option>
                      <option value="intermediate">Intermédiaire</option>
                      <option value="advanced">Avancé</option>
                    </select>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🤖 Assistant IA Ollama</h4>
                  <p className="text-sm text-purple-700">L'IA va générer automatiquement :</p>
                  <ul className="text-sm text-purple-700 mt-2 space-y-1">
                    <li>• Plan de cours structuré</li>
                    <li>• Contenu pédagogique adapté</li>
                    <li>• Exercices d'application</li>
                    <li>• Questions de compréhension</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveModal(null)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={handleCreateCourse}
                    disabled={!createCourseForm.name || !createCourseForm.theme}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Créer avec IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal Télécharger un cours */}
        {activeModal === "upload" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-blue-600" />
                  Télécharger un cours
                </CardTitle>
                <CardDescription>Importez vos fichiers et remplissez les métadonnées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="uploadName">Nom du cours *</Label>
                    <Input
                      id="uploadName"
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                      placeholder="Nom du cours"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Spécialité</Label>
                    <Input
                      id="specialty"
                      value={uploadForm.specialty}
                      onChange={(e) => setUploadForm({ ...uploadForm, specialty: e.target.value })}
                      placeholder="Ex: Algèbre"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositor">Nom du dépositaire</Label>
                    <Input
                      id="depositor"
                      value={uploadForm.depositor}
                      onChange={(e) => setUploadForm({ ...uploadForm, depositor: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishment">Établissement</Label>
                    <Input
                      id="establishment"
                      value={uploadForm.establishment}
                      onChange={(e) => setUploadForm({ ...uploadForm, establishment: e.target.value })}
                      placeholder="Nom de l'établissement"
                    />
                  </div>
                </div>

                {/* Zone de glisser-déposer */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Glissez vos fichiers ici</h3>
                  <p className="text-gray-500 mb-4">Formats acceptés: PDF, Excel, Word, PowerPoint</p>
                  <Button variant="outline">Parcourir les fichiers</Button>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveModal(null)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={handleUploadCourse}
                    disabled={!uploadForm.name}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal Chercher un cours */}
        {activeModal === "search" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-green-600" />
                  Chercher un cours
                </CardTitle>
                <CardDescription>Trouvez des cours partagés par la communauté</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Options de recherche */}
                <div className="flex space-x-4">
                  <Button
                    variant={searchType === "students" ? "default" : "outline"}
                    onClick={() => setSearchType("students")}
                    className="flex-1"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Chez les étudiants
                  </Button>
                  <Button
                    variant={searchType === "teachers" ? "default" : "outline"}
                    onClick={() => setSearchType("teachers")}
                    className="flex-1"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Chez les enseignants
                  </Button>
                </div>

                {/* Barre de recherche */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom ou thématique..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Résultats de recherche */}
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {filteredResults.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-lg">{result.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {result.difficulty}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Par {result.author}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{result.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{result.views} vues</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{result.duration}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Aperçu
                            </Button>
                            <Link href={`/subjects/${params.id}/course/${result.id}`}>
                              <Button size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Utiliser
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setActiveModal(null)}>
                    Fermer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
