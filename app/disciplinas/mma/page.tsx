import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Shield, Clock, MapPin, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "MMA - Artes Marciales Mixtas con Frank Simbaña | Club Golden Taekwondo Loja",
  description:
    "Entrena MMA con Frank Simbaña en Loja. Artes Marciales Mixtas que combinan boxeo, muay thai, jiu-jitsu y lucha. Clases para todos los niveles.",
}

export default function MMAPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#E74C3C] to-[#C0392B]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              MMA: Maestría en Artes Marciales Mixtas con Frank Simbaña
            </h1>
            <p className="text-xl opacity-90">
              Desarrolla tu potencial completo con el entrenamiento más versátil y desafiante
            </p>
          </div>
        </div>
      </section>

      {/* ¿Qué es el MMA? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">¿Qué es el MMA?</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-[#2C3E50] leading-relaxed mb-6">
                  Las Artes Marciales Mixtas (MMA) son un deporte de combate que combina técnicas de diferentes
                  disciplinas marciales y deportes de contacto. Bajo la guía de Frank Simbaña, aprenderás a integrar
                  boxeo, muay thai, jiu-jitsu, lucha libre y más, desarrollando un conjunto completo de habilidades de
                  pie y en el suelo.
                </p>
                <p className="text-lg text-[#2C3E50] leading-relaxed">
                  Prepárate para un entrenamiento intenso que te transformará física y mentalmente, construyendo no solo
                  tu fuerza y técnica, sino también tu confianza y disciplina personal.
                </p>
              </div>
              <div className="relative h-80">
                <Image
                  src="/images/MMA/Que es el MMA.jpg"
                  alt="¿Qué es el MMA?"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Nuestro Enfoque en MMA</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-2 border-[#E74C3C]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#E74C3C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Técnica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Perfeccionamiento de movimientos fundamentales y técnicas avanzadas de cada disciplina
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-[#E74C3C]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#E74C3C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Entrenamiento controlado y progresivo con énfasis en la prevención de lesiones
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-[#E74C3C]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#E74C3C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Estrategia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Desarrollo del pensamiento táctico y la capacidad de adaptación en combate
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg text-[#2C3E50] leading-relaxed text-center">
              Enfocamos el entrenamiento de MMA en la técnica, la estrategia y la seguridad. Frank Simbaña y su equipo
              te guiarán a través de ejercicios funcionales, sparring controlado y simulaciones de combate, construyendo
              tu confianza y habilidad paso a paso. Ideal para quienes buscan un desafío completo y una autodefensa
              efectiva.
            </p>
          </div>
        </div>
      </section>

      {/* Horarios y Ubicación */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Horarios y Ubicación</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-[#E74C3C] mr-3" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Loja Norte - Centro Principal</h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                    <span className="font-semibold text-[#1A1A1A]">Principiantes:</span>
                    <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                    <span className="font-semibold text-[#1A1A1A]">Intermedios:</span>
                    <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                    <span className="font-semibold text-[#1A1A1A]">Avanzados:</span>
                    <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                  </div>
                </div>

                <p className="text-[#2C3E50] mb-6">
                  Clases de MMA disponibles en nuestro centro de Loja Norte. Contamos con horarios flexibles para
                  adaptarnos a tu rutina. Grupos organizados por nivel de experiencia para garantizar un aprendizaje
                  óptimo y seguro.
                </p>

                <Button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white">Consultar Horarios Disponibles</Button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Ubicación</h3>
                <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-600">Mapa de Google Maps - Loja Norte</p>
                </div>
                <p className="text-[#2C3E50] text-sm">[Dirección exacta del centro de entrenamiento en Loja Norte]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Galería de Entrenamientos MMA</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: "/images/MMA/Galeria entrenamiento MMA 1.jpg", title: "Galería entrenamiento MMA 1" },
                { src: "/images/MMA/Galeria entrenamiento MMA 2.jpg", title: "Galería entrenamiento MMA 2" },
                { src: "/images/MMA/Galeria entrenamiento MMA 3.jpg", title: "Galería entrenamiento MMA 3" },
                { src: "/images/MMA/Galeria entrenamiento MMA 4.jpg", title: "Galería entrenamiento MMA 4" },
                { src: "/images/MMA/Galeria entrenamiento MMA 5.jpg", title: "Galería entrenamiento MMA 5" },
                { src: "/images/MMA/Galeria entrenamiento MMA 6.jpg", title: "Galería entrenamiento MMA 6" },
              ].map((img, idx) => (
                <div key={idx} className="relative h-64 rounded-lg overflow-hidden flex flex-col">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 text-sm font-semibold">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C3E50]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Listo para Comenzar tu Entrenamiento de MMA?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestras clases y descubre el poder transformador de las Artes Marciales Mixtas
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-[#E74C3C] hover:bg-[#C0392B] text-white">
              Inscríbete Ahora
            </Button>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[#2C3E50] bg-transparent"
              >
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
