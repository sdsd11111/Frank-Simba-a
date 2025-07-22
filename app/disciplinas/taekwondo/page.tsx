import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, Clock, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Taekwondo - Arte Marcial Olímpico con Frank Simbaña | Club Golden Taekwondo Loja",
  description:
    "Aprende Taekwondo con Frank Simbaña en Loja. Arte marcial olímpico enfocado en disciplina, respeto y técnica. Programas para todas las edades.",
}

export default function TaekwondoPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#FFD700] to-[#F1C40F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-[#1A1A1A]">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Taekwondo: Disciplina, Respeto y Poder con Frank Simbaña
            </h1>
            <p className="text-xl opacity-90">
              Descubre el arte marcial olímpico que transforma cuerpo, mente y espíritu
            </p>
          </div>
        </div>
      </section>

      {/* El Camino del Taekwondo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">El Camino del Taekwondo</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Entrenamiento de Taekwondo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-lg text-[#2C3E50] leading-relaxed mb-6">
                  El Taekwondo, un arte marcial coreano y deporte olímpico, es mucho más que patadas y puñetazos. Es una
                  filosofía de vida que promueve el respeto, la autodisciplina, la perseverancia y la cortesía. Con
                  Frank Simbaña, te sumergirás en sus fundamentos, desde los patrones (poomsae) hasta las técnicas de
                  combate y autodefensa.
                </p>
                <p className="text-lg text-[#2C3E50] leading-relaxed">
                  Desarrollarás tu cuerpo y mente a través de un entrenamiento que combina la tradición milenaria con
                  métodos modernos de enseñanza, creando una experiencia transformadora única.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas por Edades */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">
              Programas de Taekwondo para Todas las Edades
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-2 border-[#FFD700]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Niños (4-12 años)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Desarrollo de coordinación, equilibrio y valores fundamentales como respeto y disciplina
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-[#FFD700]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Jóvenes (13-17 años)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Formación de carácter, rendimiento deportivo y preparación para competiciones
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-[#FFD700]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <CardTitle className="text-[#1A1A1A]">Adultos (18+ años)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2C3E50]">
                    Fitness, autodefensa, bienestar mental y desarrollo personal integral
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg text-[#2C3E50] leading-relaxed text-center">
              Ofrecemos programas de Taekwondo adaptados para niños (desarrollo de coordinación y valores), jóvenes
              (formación de carácter y rendimiento deportivo) y adultos (fitness, autodefensa y bienestar). Cada clase
              está diseñada para fomentar un crecimiento integral y el dominio de este noble arte marcial.
            </p>
          </div>
        </div>
      </section>

      {/* Clases y Ubicaciones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Clases y Ubicaciones</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Loja Centro */}
              <Card className="border-2 border-[#FFD700]">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-6 h-6 text-[#FFD700] mr-3" />
                    <CardTitle className="text-xl text-[#1A1A1A]">Loja Centro - Estudio Principal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Infantil (4-8 años):</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Juvenil (9-17 años):</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Adultos (18+ años):</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Competición:</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                  </div>

                  <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">Mapa de Google Maps - Loja Centro</p>
                  </div>
                  <p className="text-[#2C3E50] text-sm mb-4">[Dirección exacta del estudio en Loja Centro]</p>
                </CardContent>
              </Card>

              {/* Loja Norte */}
              <Card className="border-2 border-[#FFD700]">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-6 h-6 text-[#FFD700] mr-3" />
                    <CardTitle className="text-xl text-[#1A1A1A]">Loja Norte - Centro Complementario</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Clases Especiales:</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#FFD700] mr-3" />
                      <span className="font-semibold text-[#1A1A1A]">Entrenamientos Intensivos:</span>
                      <span className="ml-2 text-[#2C3E50]">[Horarios por definir]</span>
                    </div>
                  </div>

                  <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">Mapa de Google Maps - Loja Norte</p>
                  </div>
                  <p className="text-[#2C3E50] text-sm mb-4">[Dirección exacta del centro en Loja Norte]</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-[#FFD700] hover:bg-[#F1C40F] text-[#1A1A1A]">
                Consultar Horarios y Disponibilidad
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Galería de Entrenamientos Taekwondo</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&query=Taekwondo training session ${item}`}
                    alt={`Entrenamiento Taekwondo ${item}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C3E50]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Inicia tu Camino en el Taekwondo</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre la disciplina, el respeto y el poder del arte marcial olímpico
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#F1C40F] text-[#1A1A1A]">
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
