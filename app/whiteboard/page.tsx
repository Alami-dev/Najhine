"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  BookOpen,
  Pen,
  Eraser,
  Square,
  Circle,
  Type,
  ImageIcon,
  Play,
  Pause,
  RotateCcw,
  Download,
  Save,
  Palette,
  ArrowLeft,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Layers,
  Clock,
  Sparkles,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState("pen")
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState([3])
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(false)

  const [projectSettings, setProjectSettings] = useState({
    title: "Nouveau tableau blanc",
    subject: "",
    duration: "5",
    voiceText: "",
    template: "blank",
  })

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
  ]

  const templates = [
    { id: "blank", name: "Vierge", icon: Square },
    { id: "math", name: "Mathématiques", icon: Square },
    { id: "science", name: "Sciences", icon: Circle },
    { id: "language", name: "Langues", icon: Type },
    { id: "history", name: "Histoire", icon: BookOpen },
  ]

  // Simulation du temps d'enregistrement
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineWidth = brushSize[0]
    ctx.lineCap = "round"
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const generateVoice = () => {
    // Simulation de génération de voix IA
    console.log("Génération de voix pour:", projectSettings.voiceText)
  }

  const exportVideo = () => {
    // Simulation d'export vidéo
    console.log("Export vidéo en cours...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Najhine</span>
              </Link>
              <div className="text-lg font-medium text-gray-700">{projectSettings.title}</div>
            </div>
            <div className="flex items-center space-x-4">
              {isRecording && (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() =>
                  setProjectSettings({ ...projectSettings, title: prompt("Nouveau titre:") || projectSettings.title })
                }
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Toolbar */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
          <Button variant={tool === "pen" ? "default" : "ghost"} size="icon" onClick={() => setTool("pen")}>
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant={tool === "eraser" ? "default" : "ghost"} size="icon" onClick={() => setTool("eraser")}>
            <Eraser className="h-4 w-4" />
          </Button>
          <Button variant={tool === "rectangle" ? "default" : "ghost"} size="icon" onClick={() => setTool("rectangle")}>
            <Square className="h-4 w-4" />
          </Button>
          <Button variant={tool === "circle" ? "default" : "ghost"} size="icon" onClick={() => setTool("circle")}>
            <Circle className="h-4 w-4" />
          </Button>
          <Button variant={tool === "text" ? "default" : "ghost"} size="icon" onClick={() => setTool("text")}>
            <Type className="h-4 w-4" />
          </Button>
          <Button variant={tool === "image" ? "default" : "ghost"} size="icon" onClick={() => setTool("image")}>
            <ImageIcon className="h-4 w-4" />
          </Button>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <Button variant="ghost" size="icon" onClick={clearCanvas}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Controls */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Color Palette */}
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-gray-600" />
                <div className="flex space-x-1">
                  {colors.map((c) => (
                    <button
                      key={c}
                      className={`w-6 h-6 rounded border-2 ${color === c ? "border-gray-800" : "border-gray-300"}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Taille:</span>
                <div className="w-24">
                  <Slider value={brushSize} onValueChange={setBrushSize} max={20} min={1} step={1} />
                </div>
                <span className="text-sm text-gray-600 w-6">{brushSize[0]}</span>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                onClick={() => {
                  setIsRecording(!isRecording)
                  if (!isRecording) setRecordingTime(0)
                }}
              >
                {isRecording ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRecording ? "Arrêter" : "Enregistrer"}
              </Button>

              <Button
                variant={micEnabled ? "default" : "outline"}
                size="icon"
                onClick={() => setMicEnabled(!micEnabled)}
              >
                {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>

              <Button
                variant={voiceEnabled ? "default" : "outline"}
                size="icon"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-sm mx-auto" style={{ width: "800px", height: "600px" }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-full cursor-crosshair rounded-lg"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Project Settings */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Paramètres du projet</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectTitle">Titre</Label>
                <Input
                  id="projectTitle"
                  value={projectSettings.title}
                  onChange={(e) => setProjectSettings({ ...projectSettings, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Matière</Label>
                <select
                  id="subject"
                  value={projectSettings.subject}
                  onChange={(e) => setProjectSettings({ ...projectSettings, subject: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Sélectionner</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique">Physique</option>
                  <option value="Chimie">Chimie</option>
                  <option value="Français">Français</option>
                  <option value="Histoire">Histoire</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée cible</Label>
                <select
                  id="duration"
                  value={projectSettings.duration}
                  onChange={(e) => setProjectSettings({ ...projectSettings, duration: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="2">2 minutes</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Modèles</h3>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant={projectSettings.template === template.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProjectSettings({ ...projectSettings, template: template.id })}
                  className="flex flex-col items-center p-3 h-auto"
                >
                  <template.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{template.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Settings */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Voix IA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voiceText">Texte à narrer</Label>
                <textarea
                  id="voiceText"
                  value={projectSettings.voiceText}
                  onChange={(e) => setProjectSettings({ ...projectSettings, voiceText: e.target.value })}
                  placeholder="Entrez le texte que l'IA doit lire pendant l'animation..."
                  className="w-full p-2 border rounded-md resize-none"
                  rows={4}
                />
              </div>
              <Button onClick={generateVoice} className="w-full" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Générer la voix
              </Button>
            </div>
          </div>

          {/* Layers */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              Calques
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                <span className="text-sm">Arrière-plan</span>
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span className="text-sm">Dessins</span>
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span className="text-sm">Texte</span>
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Timeline
            </h3>
            <div className="space-y-2">
              <div className="bg-blue-100 p-2 rounded text-sm">
                <div className="flex justify-between items-center">
                  <span>Intro</span>
                  <span className="text-xs text-gray-600">0:00 - 0:05</span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded text-sm">
                <div className="flex justify-between items-center">
                  <span>Contenu principal</span>
                  <span className="text-xs text-gray-600">0:05 - 0:45</span>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded text-sm">
                <div className="flex justify-between items-center">
                  <span>Conclusion</span>
                  <span className="text-xs text-gray-600">0:45 - 1:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="p-4 border-t border-gray-200">
            <Button onClick={exportVideo} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exporter en vidéo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
