import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Quote, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/Images/Portada.jpg"
          alt="Frank Simbaña en acción de Taekwondo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold mb-6 leading-tight drop-shadow-lg">
            Frank Simbaña:
            <br />
            <span className="text-white">Donde la Disciplina Forja Campeones y Transforma Vidas</span>
          </h1>
          <p className="text-lg md:text-xl text-cleanwhite mb-8 max-w-3xl mx-auto drop-shadow">
            Maestro en Taekwondo y MMA en Loja, Ecuador. Más allá del entrenamiento físico, cultivamos el carácter y el potencial ilimitado en cada estudiante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-wine hover:bg-gold text-white px-8 py-4 text-lg font-semibold">
              Inicia tu Transformación
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-charcoal bg-transparent px-8 py-4 text-lg font-semibold"
            >
              Explora Nuestras Disciplinas
            </Button>
          </div>
        </div>
      </section>

      {/* Conoce a Frank Simbaña Section */}
      <section className="py-16 bg-cleanwhite">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="/images/Inicio/La Pasión que Impulsa tu Potencial.jpg"
                  alt="Frank Simbaña - Retrato profesional"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-6">
                  La Pasión que Impulsa tu Potencial
                </h2>
                <p className="text-lg text-[#6C757D] leading-relaxed mb-8">
                  Para Frank Simbaña, las artes marciales son mucho más que técnicas de combate. Son un camino de
                  transformación personal que forja el carácter, desarrolla la disciplina y desbloquea el potencial
                  ilimitado que existe en cada persona. A través del Club Golden Taekwondo Loja, Frank ha dedicado su
                  vida a guiar a estudiantes de todas las edades hacia la excelencia, no solo en el tatami, sino en
                  todos los aspectos de sus vidas.
                </p>
                <p className="text-lg text-[#6C757D] leading-relaxed mb-8">
                  Su filosofía va más allá de enseñar patadas y puñetazos; se trata de cultivar valores como el respeto,
                  la perseverancia y la confianza que acompañarán a sus estudiantes para toda la vida.
                </p>
                <Button className="bg-[#B8860B] hover:bg-[#A0750A] text-white font-semibold">
                  Descubre Mi Historia Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Disciplinas Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-6">
                Tu Camino Hacia la Maestría: Taekwondo y MMA
              </h2>
              <p className="text-lg text-[#6C757D] max-w-3xl mx-auto">
                Cada disciplina que enseñamos está diseñada para desarrollar no solo habilidades físicas excepcionales,
                sino también fortaleza mental y valores que perduran toda la vida. Descubre cuál es tu camino hacia la
                excelencia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Taekwondo Card */}
              <Card className="border-2 border-[#B8860B] hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/Inicio/Taekwondo Disciplina, Precisión y Respeto.jpg"
                    alt="Entrenamiento de Taekwondo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-[#343A40]">
                    Taekwondo: Disciplina, Precisión y Respeto
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[#6C757D] mb-6 leading-relaxed">
                    El arte marcial olímpico que desarrolla defensa personal excepcional, forma física superior y
                    enfoque mental inquebrantable. Cultivamos los valores olímpicos de excelencia, respeto y amistad en
                    cada clase.
                  </p>
                  <div className="flex items-center justify-center text-[#B8860B] mb-6">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-[#343A40]">Disponible en Loja Centro y Norte</span>
                  </div>
                  <Link href="/disciplinas/taekwondo">
                    <Button className="bg-[#B8860B] hover:bg-[#A0750A] text-white w-full">
                      Explora Taekwondo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* MMA Card */}
              <Card className="border-2 border-[#800020] hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/Inicio/MMA Fuerza, Versatilidad y Estrategia.jpg"
                    alt="Entrenamiento de MMA"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-[#343A40]">
                    MMA: Fuerza, Versatilidad y Estrategia
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[#6C757D] mb-6 leading-relaxed">
                    Entrenamiento integral que combina múltiples disciplinas marciales. Desarrolla autodefensa real,
                    confianza inquebrantable y acondicionamiento físico excepcional a través de técnicas versátiles y
                    estratégicas.
                  </p>
                  <div className="flex items-center justify-center text-[#800020] mb-6">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-[#343A40]">Disponible en Loja Norte</span>
                  </div>
                  <Link href="/disciplinas/mma">
                    <Button className="bg-[#800020] hover:bg-[#600018] text-white w-full">
                      Explora MMA
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Logros y Testimonios Section */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-12 text-center">
              Resultados que Hablan: La Excelencia de Nuestros Atletas
            </h2>

            {/* Mini Galería de Logros */}
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
              {/* Card 1 */}
              <div className="relative group">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/Inicio/1er Open Zamora 2023.jpg"
                    alt="1er Open Zamora 2023"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">1er Open Zamora 2023</p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="relative group">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/Inicio/Ecuador series Ambato.jpg"
                    alt="Ecuador series Ambato"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">Ecuador series Ambato</p>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="relative group">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/Inicio/Seleccion de Loja.jpg"
                    alt="Selección de Loja"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">Selección de Loja</p>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="relative group">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/Inicio/Primer Open Cariamanga 2023.jpg"
                    alt="Primer Open Cariamanga 2023"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">Primer Open Cariamanga 2023</p>
                  </div>
                </div>
              </div>
              {/* Card 5 */}
              <div className="relative group">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/Inicio/Campeonato Nacional Infantil Machala 2022.jpg"
                    alt="Campeonato Nacional Infantil Machala 2022"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">Campeonato Nacional Infantil Machala 2022</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonios */}
            <div className="bg-white rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-[#B8860B] mb-4" />
                    <p className="text-[#6C757D] italic mb-4 leading-relaxed">
                      "Frank no solo enseña técnicas, transforma vidas. Mi hijo ha desarrollado una confianza y
                      disciplina que se refleja en todos los aspectos de su vida. Los valores que aprende aquí son para
                      toda la vida."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#B8860B] rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">MR</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#343A40]">María Rodríguez</p>
                        <p className="text-sm text-[#6C757D]">Madre de estudiante</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-[#800020] mb-4" />
                    <p className="text-[#6C757D] italic mb-4 leading-relaxed">
                      "Entrenar con Frank ha sido la mejor decisión de mi vida. No solo mejoré físicamente, sino que
                      desarrollé una mentalidad de campeón que me ayuda en mi carrera profesional y personal."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#800020] rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">CL</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#343A40]">Carlos López</p>
                        <p className="text-sm text-[#6C757D]">Atleta de MMA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/logros">
                  <Button className="bg-[#353a40] hover:bg-charcoal text-white">
                    Ver Todos los Logros
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dónde Encontrarnos / Contacto Section */}
      <section className="py-16" style={{ background: '#353a40' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Inicia Tu Camino Hoy Mismo</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulario de Contacto - Ajustar altura */}
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h3>
                <form className="space-y-4 flex-1 flex flex-col">
                  <Input placeholder="Nombre completo *" required className="bg-[#F8F8F8] border-gray-300" />
                  <Input type="email" placeholder="Email *" required className="bg-[#F8F8F8] border-gray-300" />
                  <Input type="tel" placeholder="Teléfono *" required className="bg-[#F8F8F8] border-gray-300" />
                  <Textarea placeholder="Mensaje *" required rows={8} className="bg-[#F8F8F8] border-gray-300 flex-1" />
                  <Button
                    type="submit"
                    className="w-full bg-[#800020] hover:bg-[#600018] text-white font-semibold py-3 mt-auto"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </div>

              {/* Mapas y Ubicaciones - Mantener altura total */}
              <div className="space-y-6 h-full">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gold" />
                    Loja Norte
                  </h4>
                  <a href="https://maps.app.goo.gl/xkFhoPiWJ46hRNpJ7" target="_blank" rel="noopener noreferrer">
                    <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center mb-3 hover:ring-4 ring-gold transition">
                      <p className="text-charcoal font-semibold">Av. Manuel Carrión Pinzano &, Loja</p>
                    </div>
                  </a>
                  <p className="text-gray-300 text-sm">
                    Av. Manuel Carrión Pinzano &, Loja - Horarios: Lun-Vie 6:00-21:00, Sáb 8:00-16:00
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gold" />
                    Loja Centro
                  </h4>
                  <a href="https://maps.app.goo.gl/7KTCtmAifiMN19d6A" target="_blank" rel="noopener noreferrer">
                    <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center mb-3 hover:ring-4 ring-gold transition">
                      <p className="text-charcoal font-semibold">Quito 152-12 entre Av. Universitaria y, 18 de Noviembre, Loja</p>
                    </div>
                  </a>
                  <p className="text-gray-300 text-sm">
                    Quito 152-12 entre Av. Universitaria y, 18 de Noviembre, Loja - Horarios: Lun-Vie 15:00-20:00, Sáb 9:00-14:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Últimos del Blog Section */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-12 text-center">
              Reflexiones y Consejos: Nuestro Blog
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Post 1 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Inicio/5 Beneficios de Entrenar Taekwondo desde Joven.jpg"
                    alt="5 Beneficios de Entrenar Taekwondo desde Joven"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold mr-2 bg-[#B8860B] text-white">Taekwondo</span>
                    <div className="flex items-center text-[#6C757D] text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date("2024-01-15").toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2">5 Beneficios de Entrenar Taekwondo desde Joven</h3>
                  <p className="text-[#6C757D] text-sm mb-4 line-clamp-2">Descubre cómo el Taekwondo transforma la vida de niños y jóvenes...</p>
                  <Button size="sm" variant="outline" className="text-[#800020] border-[#800020] hover:bg-[#800020] hover:text-white bg-transparent">Leer más</Button>
                </CardContent>
              </Card>
              {/* Post 2 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Inicio/Preparación Mental para Competiciones de MMA.jpg"
                    alt="Preparación Mental para Competiciones de MMA"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold mr-2 bg-[#800020] text-white">MMA</span>
                    <div className="flex items-center text-[#6C757D] text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date("2024-01-10").toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2">Preparación Mental para Competiciones de MMA</h3>
                  <p className="text-[#6C757D] text-sm mb-4 line-clamp-2">Estrategias psicológicas que utilizan los campeones...</p>
                  <Button size="sm" variant="outline" className="text-[#800020] border-[#800020] hover:bg-[#800020] hover:text-white bg-transparent">Leer más</Button>
                </CardContent>
              </Card>
              {/* Post 3 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/Inicio/Disciplina y Respeto Pilares de las Artes Marciales.jpg"
                    alt="Disciplina y Respeto: Pilares de las Artes Marciales"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold mr-2 bg-[#353a40] text-white">Filosofía</span>
                    <div className="flex items-center text-[#6C757D] text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date("2024-01-05").toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2">Disciplina y Respeto: Pilares de las Artes Marciales</h3>
                  <p className="text-[#6C757D] text-sm mb-4 line-clamp-2">Los valores fundamentales que van más allá del tatami...</p>
                  <Button size="sm" variant="outline" className="text-[#800020] border-[#800020] hover:bg-[#800020] hover:text-white bg-transparent">Leer más</Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button className="bg-[#353a40] hover:bg-charcoal text-white">
                  Ver Todos los Artículos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
