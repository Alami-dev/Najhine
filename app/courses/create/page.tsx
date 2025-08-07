"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Brain,
  Wand2,
  FileText,
  Video,
  BarChart3,
  Upload,
  ArrowLeft,
  Sparkles,
  Clock,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("ai-generate")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)

  const [aiForm, setAiForm] = useState({
    subject: "",
    topic: "",
    level: "",
    duration: "30",
    contentType: "lesson",
    language: "french",
    objectives: "",
    additionalInfo: "",
  })

  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    description: "",
    tags: "",
    level: "",
    files: [],
  })

  const handleAiGenerate = async () => {
    setIsGenerating(true)
    // Simulation de génération IA
    setTimeout(() => {
      setGeneratedContent({
        title: `${aiForm.topic} - ${aiForm.subject}`,
        content: `# ${aiForm.topic}

## Introduction
Ce cours vous permettra de comprendre les concepts fondamentaux de ${aiForm.topic.toLowerCase()} en ${aiForm.subject.toLowerCase()}.

## Objectifs d'apprentissage
- Maîtriser les bases de ${aiForm.topic.toLowerCase()}
- Appliquer les concepts dans des exercices pratiques
- Développer une compréhension approfondie du sujet

## Contenu du cours

### 1. Définitions et concepts clés
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### 2. Exemples pratiques
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 3. Exercices d'application
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Quiz d'évaluation
1. Question 1 sur ${aiForm.topic.toLowerCase()}
2. Question 2 sur les applications pratiques
3. Question 3 sur la compréhension générale

## Conclusion
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        quiz: [
          {
            question: `Quelle est la définition principale de ${aiForm.topic.toLowerCase()} ?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0,
          },
          {
            question: `Comment applique-t-on ${aiForm.topic.toLowerCase()} dans la pratique ?`,
            options: ["Méthode 1", "Méthode 2", "Méthode 3", "Méthode 4"],
            correct: 1,
          },
        ],
        summary: `Résumé automatique du cours sur ${aiForm.topic} en ${aiForm.subject}. Ce cours couvre les aspects essentiels et fournit une base solide pour la compréhension du sujet.`,
      })
      setIsGenerating(false)
    }, 3000)
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link href="/courses">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer du contenu pédagogique</h1>
            <p className="text-gray-600">Utilisez l'IA ou importez vos propres ressources</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "ai-generate" ? "default" : "ghost"}
            onClick={() => setActiveTab("ai-generate")}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Générer avec IA</span>
          </Button>
          <Button
            variant={activeTab === "upload" ? "default" : "ghost"}
            onClick={() => setActiveTab("upload")}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Importer des fichiers</span>
          </Button>
        </div>

        {/* AI Generation Tab */}
        {activeTab === "ai-generate" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wand2 className="h-5 w-5 mr-2 text-purple-600" />
                    Assistant IA
                  </CardTitle>
                  <CardDescription>
                    Décrivez ce que vous souhaitez créer et l'IA générera le contenu pour vous
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Matière *</Label>
                      <select
                        id="subject"
                        value={aiForm.subject}
                        onChange={(e) => setAiForm({ ...aiForm, subject: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Sélectionner</option>
                        <option value="Mathématiques">Mathématiques</option>
                        <option value="Physique">Physique</option>
                        <option value="Chimie">Chimie</option>
                        <option value="Français">Français</option>
                        <option value="Histoire">Histoire</option>
                        <option value="Géographie">Géographie</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Niveau *</Label>
                      <select
                        id="level"
                        value={aiForm.level}
                        onChange={(e) => setAiForm({ ...aiForm, level: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Sélectionner</option>
                        <option value="6ème">6ème</option>
                        <option value="5ème">5ème</option>
                        <option value="4ème">4ème</option>
                        <option value="3ème">3ème</option>
                        <option value="2nde">2nde</option>
                        <option value="1ère">1ère</option>
                        <option value="Terminale">Terminale</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Sujet du cours *</Label>
                    <Input
                      id="topic"
                      value={aiForm.topic}
                      onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                      placeholder="Ex: Les équations du second degré, La révolution française..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contentType">Type de contenu</Label>
                      <select
                        id="contentType"
                        value={aiForm.contentType}
                        onChange={(e) => setAiForm({ ...aiForm, contentType: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="lesson">Leçon complète</option>
                        <option value="quiz">Quiz d'évaluation</option>
                        <option value="summary">Résumé de cours</option>
                        <option value="exercises">Exercices pratiques</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée estimée</Label>
                      <select
                        id="duration"
                        value={aiForm.duration}
                        onChange={(e) => setAiForm({ ...aiForm, duration: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 heure</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectives">Objectifs d'apprentissage</Label>
                    <Textarea
                      id="objectives"
                      value={aiForm.objectives}
                      onChange={(e) => setAiForm({ ...aiForm, objectives: e.target.value })}
                      placeholder="Décrivez ce que les élèves doivent apprendre..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Informations supplémentaires</Label>
                    <Textarea
                      id="additionalInfo"
                      value={aiForm.additionalInfo}
                      onChange={(e) => setAiForm({ ...aiForm, additionalInfo: e.target.value })}
                      placeholder="Contexte, prérequis, références spécifiques..."
                      rows={2}
                    />
                  </div>

                  <Button
                    onClick={handleAiGenerate}
                    disabled={!aiForm.subject || !aiForm.topic || !aiForm.level || isGenerating}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Générer le contenu
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Preview/Result */}
            <div className="space-y-6">
              {isGenerating && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
                      <h3 className="text-lg font-semibold">Génération en cours...</h3>
                      <p className="text-gray-600">L'IA analyse votre demande et crée le contenu pédagogique</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Analyse du sujet</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Génération du contenu</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 opacity-50">
                          <Clock className="h-4 w-4" />
                          <span>Création des exercices</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {generatedContent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Contenu généré
                    </CardTitle>
                    <CardDescription>Votre cours a été créé avec succès</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{generatedContent.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{aiForm.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4" />
                            <span>{aiForm.level}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{aiForm.subject}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm">
                          {generatedContent.content.substring(0, 500)}...
                        </pre>
                      </div>

                      {generatedContent.quiz && (
                        <div>
                          <h4 className="font-medium mb-2">Quiz généré ({generatedContent.quiz.length} questions)</h4>
                          <div className="space-y-2">
                            {generatedContent.quiz.map((q, i) => (
                              <div key={i} className="bg-blue-50 p-3 rounded text-sm">
                                <p className="font-medium">{q.question}</p>
                                <p className="text-gray-600 mt-1">{q.options.length} options de réponse</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Publier le cours
                        </Button>
                        <Button variant="outline">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isGenerating && !generatedContent && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-8 text-center">
                    <Brain className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Prêt à générer</h3>
                    <p className="text-gray-500">
                      Remplissez le formulaire et cliquez sur "Générer" pour créer votre contenu
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Importer des fichiers
                </CardTitle>
                <CardDescription>Ajoutez vos propres ressources pédagogiques à la bibliothèque</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre du contenu *</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      placeholder="Ex: Cours sur les fractions"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matière *</Label>
                    <select
                      id="subject"
                      value={uploadForm.subject}
                      onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Sélectionner</option>
                      <option value="Mathématiques">Mathématiques</option>
                      <option value="Physique">Physique</option>
                      <option value="Chimie">Chimie</option>
                      <option value="Français">Français</option>
                      <option value="Histoire">Histoire</option>
                      <option value="Géographie">Géographie</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Décrivez le contenu de vos fichiers..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="level">Niveau</Label>
                    <select
                      id="level"
                      value={uploadForm.level}
                      onChange={(e) => setUploadForm({ ...uploadForm, level: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Sélectionner</option>
                      <option value="6ème">6ème</option>
                      <option value="5ème">5ème</option>
                      <option value="4ème">4ème</option>
                      <option value="3ème">3ème</option>
                      <option value="2nde">2nde</option>
                      <option value="1ère">1ère</option>
                      <option value="Terminale">Terminale</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                    <Input
                      id="tags"
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                      placeholder="Ex: algèbre, équations, exercices"
                    />
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Glissez vos fichiers ici</h3>
                  <p className="text-gray-500 mb-4">Formats supportés: PDF, DOC, PPT, XLS, MP4, MOV, JPG, PNG</p>
                  <Button variant="outline">Parcourir les fichiers</Button>
                </div>

                {/* Supported Formats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <FileText className="h-8 w-8 mx-auto text-red-600 mb-2" />
                    <span className="text-sm font-medium">PDF, DOC</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium">PPT, XLS</span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Video className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <span className="text-sm font-medium">MP4, MOV</span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Upload className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <span className="text-sm font-medium">Images</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Annuler</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Importer les fichiers</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
