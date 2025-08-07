"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Brain,
  Trophy,
  Users,
  Shield,
  Star,
  Play,
  Globe,
  Menu,
  X,
  Zap,
  Target,
  TrendingUp,
  Heart,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  Clock,
  MessageCircle,
  Camera,
  Headphones,
  Send,
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Fonction de scroll automatique
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      name: "Sarah Dubois",
      role: "Maman de Léa, 8 ans",
      content:
        "Léa a progressé de 40% en mathématiques en seulement 2 mois ! Elle me demande maintenant de faire ses 'devoirs magiques' chaque soir.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Prof. Ahmed Benali",
      role: "Enseignant CE2",
      content:
        "Najhine a révolutionné ma classe. Les enfants sont 3x plus engagés et je peux suivre leurs progrès en temps réel.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Marc & Julie Martin",
      role: "Parents de Tom, 10 ans",
      content:
        "Tom était en difficulté en français. Maintenant il écrit des histoires et a gagné 2 niveaux ! Merci Najhine.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "Apprentissage Personnalisé IA",
      description: "IA qui s'adapte au rythme unique de chaque enfant",
      color: "from-blue-500 to-purple-600",
      delay: 0,
    },
    {
      icon: Trophy,
      title: "Gamification Motivante",
      description: "Badges, streaks et défis qui créent l'addiction positive",
      color: "from-yellow-500 to-orange-600",
      delay: 0.1,
    },
    {
      icon: Users,
      title: "Collaboration Sociale",
      description: "Communauté d'entraide avec modération bienveillante",
      color: "from-green-500 to-teal-600",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Contenu Certifié",
      description: "Programmes alignés aux standards éducatifs nationaux",
      color: "from-purple-500 to-pink-600",
      delay: 0.3,
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Inscription Express",
      description: "Compte créé en 30 secondes, accès immédiat",
      icon: Rocket,
    },
    {
      number: "02",
      title: "Évaluation IA Personnalisée",
      description: "Notre IA analyse le style d'apprentissage unique",
      icon: Brain,
    },
    {
      number: "03",
      title: "Parcours Adaptatif Généré",
      description: "Curriculum sur-mesure qui évolue avec les progrès",
      icon: Target,
    },
    {
      number: "04",
      title: "Célébration des Victoires",
      description: "Chaque milestone débloque de nouvelles aventures",
      icon: Trophy,
    },
  ]

  const stats = [
    { value: "500K+", label: "Enfants actifs", icon: Users },
    { value: "99%", label: "Satisfaction", icon: Heart },
    { value: "4.9/5", label: "Note moyenne", icon: Star },
    { value: "93%", label: "Taux d'engagement", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Corrigé avec Navigation Fonctionnelle */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Najhine</span>
          </motion.div>

          {/* Navigation Desktop - CORRECTION PRINCIPALE */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("fonctionnalites")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => scrollToSection("comment-ca-marche")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => scrollToSection("enseignants")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pour les enseignants
            </button>
            <button
              onClick={() => scrollToSection("etudiants")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pour les étudiants
            </button>
            <button
              onClick={() => scrollToSection("parents")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pour les parents
            </button>
          </nav>

          {/* Langue et CTA */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-gray-700">
              <Globe className="h-4 w-4" />
              <span>Français</span>
            </button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Inscrivez-vous gratuitement
            </Button>

            {/* Menu Mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20"
            >
              <nav className="flex flex-col space-y-4 p-6">
                <button
                  onClick={() => {
                    scrollToSection("fonctionnalites")
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Fonctionnalités
                </button>
                <button
                  onClick={() => {
                    scrollToSection("comment-ca-marche")
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Comment ça marche
                </button>
                <button
                  onClick={() => {
                    scrollToSection("enseignants")
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Pour les enseignants
                </button>
                <button
                  onClick={() => {
                    scrollToSection("etudiants")
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Pour les étudiants
                </button>
                <button
                  onClick={() => {
                    scrollToSection("parents")
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Pour les parents
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section avec Background Image - CORRECTION MAJEURE */}
      <section className="relative min-h-screen flex items-center">
        {/* Background image avec overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/students-library.png"
            alt="Étudiants collaborant dans une bibliothèque"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transformez
              </span>
              <br />
              <span className="text-gray-900">l'apprentissage de vos enfants</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              La plateforme éducative IA qui personnalise chaque leçon et motive naturellement avec{" "}
              <span className="font-bold text-green-600">93% de taux d'engagement</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="inline h-5 w-5 mr-2" />
                Commencer l'aventure
              </motion.button>
              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="inline h-5 w-5 mr-2" />
                Voir la démo
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rejoint par 500K+ familles</p>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Fonctionnalités avec ID */}
      <section id="fonctionnalites" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quatre piliers pour révolutionner
              </span>
              <br />
              l'éducation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment Najhine transforme l'apprentissage grâce à l'intelligence artificielle et la
              gamification
            </p>
          </motion.div>

          {/* Grid Bento asymétrique */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`${index === 0 ? "lg:col-span-2 lg:row-span-2" : index === 1 ? "lg:col-span-2" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>

                    {index === 0 && (
                      <motion.div
                        className="mt-6 p-4 bg-blue-50 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Adaptation IA</span>
                          <span className="text-sm text-blue-600 font-bold">94%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <motion.div
                            className="bg-blue-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "94%" }}
                            transition={{ delay: 1, duration: 1.5 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça marche avec ID */}
      <section id="comment-ca-marche" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Votre voyage éducatif
              </span>
              <br />
              en 4 étapes magiques
            </h2>
          </motion.div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Contenu */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {step.number}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Visuel */}
                <div className="flex-1">
                  <motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
                    whileHover={{ y: -5, rotateY: index % 2 === 0 ? 2 : -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center h-48">
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <step.icon className="h-12 w-12 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Enseignants avec ID */}
      <section id="enseignants" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    Outils pédagogiques
                  </span>
                  <br />
                  de nouvelle génération
                </h2>
                <p className="text-xl text-gray-600">
                  Créez, suivez et optimisez l'apprentissage avec des outils IA révolutionnaires
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Studio de création : Cours interactifs en glisser-déposer",
                  "Analytics avancés : IA prédictive pour identifier les difficultés",
                  "Communication contextuelle : Feedback automatisé aux parents",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-semibold"
                >
                  Découvrir l'interface pro
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Dashboard Enseignant</h3>
                    <p className="opacity-90">Vue d'ensemble temps réel</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Élèves actifs", value: "28", color: "blue" },
                        { label: "Cours créés", value: "12", color: "green" },
                        { label: "Taux réussite", value: "94%", color: "purple" },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          className="text-center p-3 bg-gray-50 rounded-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3">
                      {[
                        { subject: "Mathématiques", progress: 85, color: "blue" },
                        { subject: "Français", progress: 92, color: "green" },
                        { subject: "Sciences", progress: 78, color: "purple" },
                      ].map((item, index) => (
                        <div key={item.subject}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{item.subject}</span>
                            <span className="text-gray-600">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`bg-${item.color}-500 h-2 rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.progress}%` }}
                              transition={{ delay: index * 0.2, duration: 1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Étudiants avec ID */}
      <section id="etudiants" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interface Étudiant */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold">T</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Tom, 10 ans</h3>
                        <p className="opacity-90">Niveau 15 • Explorateur</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* XP Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Progression XP</span>
                        <span className="text-purple-600 font-bold">3,247 / 4,000 XP</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "81%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="grid grid-cols-4 gap-3">
                      {["🏆", "⭐", "🎯", "🚀"].map((emoji, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-transform"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="text-2xl mb-1">{emoji}</div>
                          <div className="text-xs font-medium text-gray-700">Badge</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mini-jeux */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Activités du jour</h4>
                      {[
                        { name: "Quiz Multiplication", xp: "+50 XP", color: "blue" },
                        { name: "Histoire Interactive", xp: "+75 XP", color: "green" },
                        { name: "Défi Vocabulaire", xp: "+30 XP", color: "purple" },
                      ].map((activity, index) => (
                        <motion.div
                          key={activity.name}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="font-medium">{activity.name}</span>
                          <Badge className={`bg-${activity.color}-100 text-${activity.color}-700`}>{activity.xp}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contenu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    L'apprentissage devient
                  </span>
                  <br />
                  un jeu passionnant
                </h2>
                <p className="text-xl text-gray-600">
                  Système de récompenses, défis et communauté pour maintenir la motivation au maximum
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Parcours évolutif : De débutant à expert avec 200+ niveaux",
                  "Récompenses motivantes : Système de points convertibles en privilèges",
                  "Communauté bienveillante : Entraide modérée par IA émotionnelle",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="h-6 w-6 text-orange-600" />
                  <span className="font-bold text-orange-900">Offre limitée</span>
                </div>
                <p className="text-orange-800 mb-4">Plus que 47 places ce mois-ci pour rejoindre l'aventure !</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold">
                    Rejoindre l'aventure
                    <Rocket className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Parents avec ID */}
      <section id="parents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Suivez les progrès en temps réel
              </span>
            </h2>
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
              <span>96% des parents recommandent</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Dashboard Parent */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Dashboard Parent</h3>
                    <p className="opacity-90">Suivi personnalisé de Léa</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Temps d'apprentissage */}
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-200"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            className="text-teal-500"
                            initial={{ strokeDasharray: "0 351.86" }}
                            whileInView={{ strokeDasharray: "274.45 351.86" }}
                            transition={{ duration: 2 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-600">78%</div>
                            <div className="text-xs text-gray-600">Cette semaine</div>
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">Temps d'apprentissage</p>
                    </div>

                    {/* Graphiques par matière */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Progression par matière</h4>
                      {[
                        { subject: "Mathématiques", progress: 85, color: "blue", status: "excellent" },
                        { subject: "Sciences", progress: 62, color: "orange", status: "attention" },
                        { subject: "Français", progress: 93, color: "green", status: "parfait" },
                        { subject: "Histoire", progress: 41, color: "red", status: "aide" },
                      ].map((item, index) => (
                        <div key={item.subject} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.subject}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold">{item.progress}%</span>
                              {item.status === "parfait" && <Trophy className="h-4 w-4 text-yellow-500" />}
                              {item.status === "attention" && <Clock className="h-4 w-4 text-orange-500" />}
                              {item.status === "aide" && <Target className="h-4 w-4 text-red-500" />}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`bg-${item.color}-500 h-2 rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.progress}%` }}
                              transition={{ delay: index * 0.2, duration: 1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Insights IA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Insights IA personnalisés</h3>
              </div>

              {/* Points forts */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-bold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Points forts détectés
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Logique mathématique", "Créativité", "Persévérance"].map((strength, index) => (
                    <motion.div
                      key={strength}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge className="bg-green-100 text-green-800">{strength}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* À améliorer */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="font-bold text-orange-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Suggestions d'amélioration
                </h4>
                <ul className="space-y-2 text-orange-800">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600" />
                    <span>Réviser les tables de multiplication (15 min/jour)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600" />
                    <span>Lecture quotidienne recommandée (20 min)</span>
                  </li>
                </ul>
              </div>

              {/* Prédictions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Prédictions IA
                </h4>
                <p className="text-blue-800">
                  "Avec le rythme actuel, Léa devrait atteindre ses objectifs de fin de trimestre avec 2 semaines
                  d'avance !"
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold">
                    Créer compte parent
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-blue-500 px-6 py-3 rounded-full font-semibold bg-transparent"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Démo 3 min
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages - Social Proof Dynamique */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                500K+ familles nous font confiance
              </span>
            </h2>

            {/* Stats animées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Carousel de témoignages */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicateurs */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>

          {/* Logos partenaires */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-8">Partenaires éducatifs de confiance</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {["Ministère", "Académie", "UNESCO", "EdTech"].map((partner, index) => (
                <motion.div
                  key={partner}
                  className="text-lg font-semibold text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ opacity: 1 }}
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final - Conversion Optimisée */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Prêt à transformer l'avenir
              <br />
              de votre enfant ?
            </h2>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Rejoignez la révolution éducative - Premiers résultats visibles en 7 jours
            </p>

            {/* CTA Principal */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Commencer gratuitement
              </Button>
            </motion.div>

            {/* Trust Signals */}
            <div className="space-y-4 opacity-90">
              <p className="text-sm">✓ Essai 14 jours, sans engagement</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <span>🔒 Paiement sécurisé</span>
                <span>🛡️ Données protégées</span>
                <span>📞 Support 24/7</span>
              </div>
            </div>

            {/* Urgence */}
            <motion.div
              className="bg-orange-500/20 border border-orange-300/30 rounded-xl p-4 inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">
                  ⚡ Offre de lancement : 3 mois gratuits pour les 100 premiers inscrits
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Najhine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Najhine</span>
              </div>
              <p className="text-gray-400">
                La plateforme éducative qui transforme l'apprentissage grâce à l'IA et la gamification.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: MessageCircle, label: "LinkedIn" },
                  { icon: Camera, label: "Twitter" },
                  { icon: Users, label: "Facebook" },
                  { icon: Headphones, label: "Instagram" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Ressources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold mb-4">Ressources</h3>
              <ul className="space-y-2 text-gray-400">
                {["Documentation", "Centre d'aide", "Tutoriels", "Webinaires"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Légal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                {["Confidentialité", "CGU", "Cookies", "RGPD"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="font-bold">Newsletter</h3>
              <p className="text-gray-400 text-sm">
                Recevez nos conseils éducatifs hebdomadaires + cadeau de bienvenue 🎁
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="votre@email.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 Najhine. Tous droits réservés. Fait avec ❤️ pour l'éducation.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
