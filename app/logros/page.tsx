import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Users, Star, Calendar, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Logros y Reconocimientos | Frank Simbaña - Club Golden Taekwondo Loja",
  description:
    "Descubre los logros y reconocimientos de Frank Simbaña y el Club Golden Taekwondo Loja. Campeones formados y éxitos en competiciones nacionales e internacionales.",
}

export default function LogrosPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#FFD700] to-[#F1C40F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-[#1A1A1A]">
            <Trophy className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frank Simbaña y Club Golden Taekwondo Loja: Forjando Campeones
            </h1>
            <p className="text-xl opacity-90">
              Aquí celebramos la dedicación, el esfuerzo y los éxitos que Frank Simbaña y nuestros atletas han cosechado
              en el camino de las artes marciales. Cada logro es un testimonio del arduo trabajo y la pasión que
              impulsan a nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Hitos por Año */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Hitos y Reconocimientos</h2>

            <div className="space-y-12">
              {/* 2024 */}
              <Card className="border-l-4 border-l-[#FFD700] shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#FFD700] mr-3" />
                    <CardTitle className="text-2xl text-[#1A1A1A]">2024: Consolidación y Nuevos Talentos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-lg text-[#2C3E50] leading-relaxed mb-6">
                        Participación destacada en el Campeonato Nacional de Taekwondo, obteniendo múltiples medallas de
                        oro, plata y bronce. Varios atletas clasificados para selecciones provinciales. Inauguración de
                        nuevas instalaciones y programas de entrenamiento de MMA.
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-[#FFD700] p-4 rounded-lg">
                          <Medal className="w-8 h-8 mx-auto mb-2 text-[#1A1A1A]" />
                          <p className="font-bold text-[#1A1A1A]">X Oros</p>
                        </div>
                        <div className="bg-gray-300 p-4 rounded-lg">
                          <Medal className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                          <p className="font-bold text-gray-600">Y Platas</p>
                        </div>
                        <div className="bg-[#CD7F32] p-4 rounded-lg">
                          <Medal className="w-8 h-8 mx-auto mb-2 text-white" />
                          <p className="font-bold text-white">Z Bronces</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-64">
                      <Image
                        src="/images/Logros/Consolidación y Nuevos Talentos.jpg"
                        alt="Consolidación y Nuevos Talentos"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2023 */}
              <Card className="border-l-4 border-l-[#E74C3C] shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#E74C3C] mr-3" />
                    <CardTitle className="text-2xl text-[#1A1A1A]">
                      2023: Expansión y Victorias en Competiciones
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative h-64">
                      <Image
                        src="/images/Logros/Expansión y Victorias en Competiciones.jpg"
                        alt="Expansión y Victorias en Competiciones"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-lg text-[#2C3E50] leading-relaxed mb-6">
                        Campeones provinciales de Taekwondo por tercer año consecutivo. Atletas representando a Ecuador
                        en torneos internacionales. Éxito en la formación de instructores certificados. Notable
                        crecimiento en la matrícula de clases de MMA.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-[#FFD700] mr-3" />
                          <span className="text-[#2C3E50]">Campeones Provinciales por 3er año consecutivo</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-[#E74C3C] mr-3" />
                          <span className="text-[#2C3E50]">Representación internacional de Ecuador</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-[#2C3E50] mr-3" />
                          <span className="text-[#2C3E50]">Instructores certificados formados</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2022 */}
              <Card className="border-l-4 border-l-[#2C3E50] shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#2C3E50] mr-3" />
                    <CardTitle className="text-2xl text-[#1A1A1A]">2022: Fundación y Primeros Triunfos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-lg text-[#2C3E50] leading-relaxed mb-6">
                        Establecimiento del Club Golden Taekwondo Loja bajo la dirección de Frank Simbaña. Primeras
                        participaciones en torneos regionales con resultados prometedores. Consolidación de la
                        metodología de enseñanza. Inicio de programas de MMA complementarios.
                      </p>
                      <div className="bg-[#ECF0F1] p-6 rounded-lg">
                        <h4 className="font-bold text-[#1A1A1A] mb-3">Hitos Fundacionales:</h4>
                        <ul className="space-y-2 text-[#2C3E50]">
                          <li>• Establecimiento oficial del club</li>
                          <li>• Primera metodología de enseñanza</li>
                          <li>• Primeros torneos regionales</li>
                          <li>• Inicio de programas MMA</li>
                        </ul>
                      </div>
                    </div>
                    <div className="relative h-64">
                      <Image
                        src="/images/Logros/Fundación y Primeros Triunfos.jpg"
                        alt="Fundación y Primeros Triunfos"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Campeones */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Galería de Campeones</h2>
            <p className="text-lg text-[#2C3E50] text-center mb-12">
              Conoce a nuestros atletas destacados y revive los momentos de gloria en el podio.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Card 1 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Samuel Esparza-Medalla de Oro-Open Chango Academic.jpg"
                    alt="Samuel Esparza-Medalla de Oro-Open Chango Academic"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Samuel Esparza-Medalla de Oro-Open Chango Academic</h3>
                </CardContent>
              </Card>
              {/* Card 2 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Jeremy Ortiz-Medalla de Bronce-Open Chango Academic.jpg"
                    alt="Jeremy Ortiz-Medalla de Bronce-Open Chango Academic"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Jeremy Ortiz-Medalla de Bronce-Open Chango Academic</h3>
                </CardContent>
              </Card>
              {/* Card 3 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Sofia Loor-Medalla de Oro- Campeonato Nacional.jpg"
                    alt="Sofia Loor-Medalla de Oro- Campeonato Nacional"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Sofia Loor-Medalla de Oro- Campeonato Nacional</h3>
                </CardContent>
              </Card>
              {/* Card 4 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Elizabeth Maldonado-Medalla de Plata-IX Campeonato Nacional Interclubes.jpg"
                    alt="Elizabeth Maldonado-Medalla de Plata-IX Campeonato Nacional Interclubes"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Elizabeth Maldonado-Medalla de Plata-IX Campeonato Nacional Interclubes</h3>
                </CardContent>
              </Card>
              {/* Card 5 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Antonio Maldonado-Medalla de Oro-IX Campeonato Nacional Interclubes.jpg"
                    alt="Antonio Maldonado-Medalla de Oro-IX Campeonato Nacional Interclubes"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Antonio Maldonado-Medalla de Oro-IX Campeonato Nacional Interclubes</h3>
                </CardContent>
              </Card>
              {/* Card 6 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Logros/Marco Prado-Mejor Deportista-IX Campeonato Nacional Interclubes.jpg"
                    alt="Marco Prado-Mejor Deportista-IX Campeonato Nacional Interclubes"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1A1A1A] mb-2">Marco Prado-Mejor Deportista-IX Campeonato Nacional Interclubes</h3>
                </CardContent>
              </Card>
            </div>

            {/* Videos destacados */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-[#FFD700]">
                <CardHeader>
                  <CardTitle className="text-[#1A1A1A] flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-[#FFD700]" />
                    Momentos de Gloria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-48 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src="/images/Logros/Momentos de Gloria.jpg"
                      alt="Momentos de Gloria"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[#2C3E50] text-sm">
                    Revive los momentos más emocionantes de nuestras victorias en competiciones
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#E74C3C]">
                <CardHeader>
                  <CardTitle className="text-[#1A1A1A] flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#E74C3C]" />
                    Entrenamientos Destacados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-48 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src="/images/Logros/Entrenamientos Destacados.jpg"
                      alt="Entrenamientos Destacados"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[#2C3E50] text-sm">
                    Observa la dedicación y técnica que forjan a nuestros campeones
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12">Nuestros Números</h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-[#1A1A1A]" />
                </div>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">50+</h3>
                <p className="text-[#2C3E50]">Medallas Obtenidas</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#E74C3C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">200+</h3>
                <p className="text-[#2C3E50]">Atletas Formados</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#2C3E50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">15+</h3>
                <p className="text-[#2C3E50]">Competiciones</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-[#1A1A1A]" />
                </div>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">3</h3>
                <p className="text-[#2C3E50]">Años de Éxito</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C3E50]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Quieres Ser Parte de Nuestra Historia de Éxito?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestro club y comienza tu camino hacia la excelencia en las artes marciales
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
