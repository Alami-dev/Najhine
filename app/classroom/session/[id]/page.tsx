"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Share,
  MessageSquare,
  Users,
  Hand,
  PhoneOff,
  BookOpen,
  Send,
  MoreVertical,
  RepeatIcon as Record,
  Pause,
} from "lucide-react"
import Link from "next/link"

export default function SessionPage({ params }: { params: { id: string } }) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [sessionTime, setSessionTime] = useState(0)

  // Simulation du temps de session
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const participants = [
    { id: 1, name: "Prof. Ahmed", role: "teacher", video: true, audio: true, handRaised: false },
    { id: 2, name: "Fatima El Mansouri", role: "student", video: true, audio: false, handRaised: true },
    { id: 3, name: "Youssef Benali", role: "student", video: false, audio: false, handRaised: false },
    { id: 4, name: "Aicha Tazi", role: "student", video: true, audio: false, handRaised: false },
    { id: 5, name: "Omar Alami", role: "student", video: true, audio: false, handRaised: false },
    { id: 6, name: "Salma Idrissi", role: "student", video: false, audio: false, handRaised: true },
  ]

  const chatMessages = [
    {
      id: 1,
      user: "Prof. Ahmed",
      message: "Bonjour tout le monde ! Bienvenue dans ce cours de mathématiques.",
      time: "14:01",
      isTeacher: true,
    },
    { id: 2, user: "Fatima", message: "Bonjour professeur !", time: "14:01", isTeacher: false },
    { id: 3, user: "Youssef", message: "Bonjour", time: "14:02", isTeacher: false },
    {
      id: 4,
      user: "Prof. Ahmed",
      message: "Aujourd'hui nous allons étudier les équations du second degré",
      time: "14:03",
      isTeacher: true,
    },
    { id: 5, user: "Aicha", message: "J'ai une question sur l'exercice précédent", time: "14:05", isTeacher: false },
  ]

  const sendMessage = () => {
    if (chatMessage.trim()) {
      // Simulation d'envoi de message
      console.log("Message envoyé:", chatMessage)
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Najhine</span>
              </Link>
              <div className="text-sm text-gray-300">Mathématiques - Équations du second degré</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isRecording && <Record className="h-4 w-4 text-red-400 animate-pulse" />}
                <span className="text-sm text-gray-300">{formatTime(sessionTime)}</span>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">
                En direct
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {/* Teacher Video (Main) */}
              <div className="md:col-span-2 lg:col-span-2 relative bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
                    PA
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded">
                  <span className="text-sm">Prof. Ahmed (Vous)</span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  {isScreenSharing && <Badge className="bg-green-600">Partage d'écran</Badge>}
                </div>
              </div>

              {/* Student Videos */}
              {participants.slice(1, 5).map((participant) => (
                <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {participant.video ? (
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                        <VideoOff className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                    {participant.name.split(" ")[0]}
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {participant.handRaised && <Hand className="h-4 w-4 text-yellow-400" />}
                    {!participant.audio && <MicOff className="h-4 w-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex justify-center items-center space-x-4">
              {/* Audio Control */}
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="icon"
                onClick={() => setIsAudioOn(!isAudioOn)}
                className="rounded-full"
              >
                {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>

              {/* Video Control */}
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="icon"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full"
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              {/* Screen Share */}
              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="icon"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className="rounded-full"
              >
                <Share className="h-4 w-4" />
              </Button>

              {/* Record */}
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={() => setIsRecording(!isRecording)}
                className="rounded-full"
              >
                {isRecording ? <Pause className="h-4 w-4" /> : <Record className="h-4 w-4" />}
              </Button>

              {/* Raise Hand */}
              <Button
                variant={handRaised ? "default" : "outline"}
                size="icon"
                onClick={() => setHandRaised(!handRaised)}
                className="rounded-full"
              >
                <Hand className="h-4 w-4" />
              </Button>

              {/* Chat Toggle */}
              <Button
                variant={showChat ? "default" : "outline"}
                size="icon"
                onClick={() => setShowChat(!showChat)}
                className="rounded-full"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>

              {/* Participants */}
              <Button
                variant={showParticipants ? "default" : "outline"}
                size="icon"
                onClick={() => setShowParticipants(!showParticipants)}
                className="rounded-full"
              >
                <Users className="h-4 w-4" />
              </Button>

              {/* Leave Call */}
              <Link href="/classroom">
                <Button variant="destructive" className="rounded-full px-6">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  Quitter
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={showChat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowChat(true)
                    setShowParticipants(false)
                  }}
                  className="flex-1"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant={showParticipants ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowParticipants(true)
                    setShowChat(false)
                  }}
                  className="flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Participants ({participants.length})
                </Button>
              </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${msg.isTeacher ? "text-blue-400" : "text-gray-300"}`}>
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-200 bg-gray-700 rounded p-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Participants Panel */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{participant.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{participant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {participant.handRaised && <Hand className="h-4 w-4 text-yellow-400" />}
                        {participant.video ? (
                          <Video className="h-4 w-4 text-green-400" />
                        ) : (
                          <VideoOff className="h-4 w-4 text-gray-500" />
                        )}
                        {participant.audio ? (
                          <Mic className="h-4 w-4 text-green-400" />
                        ) : (
                          <MicOff className="h-4 w-4 text-gray-500" />
                        )}
                        {participant.role === "teacher" && (
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
