"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Calendar, Users, Settings, Mail, MessageSquare, Video, Mic, Share, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateClassroom() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    maxParticipants: "30",
    isRecurring: false,
    recurringType: "weekly",
    enableRecording: true,
    enableChat: true,
    enableScreenShare: true,
    participantVideo: true,
    participantAudio: false,
    waitingRoom: true,
    sendEmail: true,
    sendSMS: false,
    sendNotification: true,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de création de session
    console.log("Création de session:", formData)
    // Redirection vers la page de la session créée
    window.location.href = "/classroom/session/new"
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link href="/classroom">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer une session</h1>
            <p className="text-gray-600">Organisez un cours en visioconférence</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Informations de base
              </CardTitle>
              <CardDescription>Définissez les détails principaux de votre session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la session *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Ex: Mathématiques - Équations du second degré"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Matière</Label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Sélectionner une matière</option>
                    <option value="mathematiques">Mathématiques</option>
                    <option value="physique">Physique</option>
                    <option value="chimie">Chimie</option>
                    <option value="francais">Français</option>
                    <option value="arabe">Arabe</option>
                    <option value="anglais">Anglais</option>
                    <option value="histoire">Histoire</option>
                    <option value="geographie">Géographie</option>
                    <option value="svt">SVT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Décrivez le contenu et les objectifs de cette session..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Planification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Planification
              </CardTitle>
              <CardDescription>Définissez quand aura lieu votre session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <select
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="90">1h30</option>
                    <option value="120">2 heures</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="recurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => handleInputChange("isRecurring", checked)}
                />
                <Label htmlFor="recurring">Session récurrente</Label>
              </div>

              {formData.isRecurring && (
                <div className="space-y-2">
                  <Label htmlFor="recurringType">Fréquence</Label>
                  <select
                    id="recurringType"
                    value={formData.recurringType}
                    onChange={(e) => handleInputChange("recurringType", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Participants
              </CardTitle>
              <CardDescription>Gérez l'accès et les invitations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Nombre maximum de participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Méthodes d'invitation</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendEmail"
                      checked={formData.sendEmail}
                      onCheckedChange={(checked) => handleInputChange("sendEmail", checked)}
                    />
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="sendEmail">Envoyer par email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendSMS"
                      checked={formData.sendSMS}
                      onCheckedChange={(checked) => handleInputChange("sendSMS", checked)}
                    />
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="sendSMS">Envoyer par SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendNotification"
                      checked={formData.sendNotification}
                      onCheckedChange={(checked) => handleInputChange("sendNotification", checked)}
                    />
                    <Settings className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="sendNotification">Notification in-app</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paramètres avancés */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Paramètres de session
              </CardTitle>
              <CardDescription>Configurez les fonctionnalités disponibles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Fonctionnalités</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableRecording"
                        checked={formData.enableRecording}
                        onCheckedChange={(checked) => handleInputChange("enableRecording", checked)}
                      />
                      <Video className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="enableRecording">Enregistrement automatique</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableChat"
                        checked={formData.enableChat}
                        onCheckedChange={(checked) => handleInputChange("enableChat", checked)}
                      />
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="enableChat">Chat en direct</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableScreenShare"
                        checked={formData.enableScreenShare}
                        onCheckedChange={(checked) => handleInputChange("enableScreenShare", checked)}
                      />
                      <Share className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="enableScreenShare">Partage d'écran</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Permissions des participants</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="participantVideo"
                        checked={formData.participantVideo}
                        onCheckedChange={(checked) => handleInputChange("participantVideo", checked)}
                      />
                      <Video className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="participantVideo">Caméra activée par défaut</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="participantAudio"
                        checked={formData.participantAudio}
                        onCheckedChange={(checked) => handleInputChange("participantAudio", checked)}
                      />
                      <Mic className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="participantAudio">Micro activé par défaut</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="waitingRoom"
                        checked={formData.waitingRoom}
                        onCheckedChange={(checked) => handleInputChange("waitingRoom", checked)}
                      />
                      <Users className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="waitingRoom">Salle d'attente</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/classroom">
              <Button variant="outline">Annuler</Button>
            </Link>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Créer la session
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
