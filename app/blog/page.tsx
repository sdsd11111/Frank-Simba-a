import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Blog - Artículos sobre Artes Marciales | Frank Simbaña",
  description:
    "Lee los últimos artículos sobre MMA, Taekwondo, entrenamiento y filosofía de las artes marciales por Frank Simbaña y el equipo del Club Golden Taekwondo Loja.",
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Beneficios de Entrenar Taekwondo desde Joven",
      excerpt:
        "Descubre cómo el Taekwondo puede transformar la vida de los niños y jóvenes, desarrollando no solo habilidades físicas sino también valores fundamentales para la vida.",
      date: "2024-01-15",
      author: "Frank Simbaña",
      category: "Taekwondo",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Preparación para Competiciones de MMA: Estrategias Clave",
      excerpt:
        "Una guía completa sobre cómo prepararse mental y físicamente para competiciones de MMA, incluyendo rutinas de entrenamiento y técnicas de concentración.",
      date: "2024-01-10",
      author: "Frank Simbaña",
      category: "MMA",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Disciplina y Respeto: Pilares de las Artes Marciales",
      excerpt:
        "Exploramos los valores fundamentales que hacen de las artes marciales mucho más que un simple deporte, convirtiéndolas en una filosofía de vida.",
      date: "2024-01-05",
      author: "Frank Simbaña",
      category: "Filosofía",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Nutrición para Atletas de Artes Marciales",
      excerpt:
        "Consejos nutricionales específicos para maximizar el rendimiento en entrenamientos de MMA y Taekwondo, incluyendo planes de alimentación pre y post entrenamiento.",
      date: "2023-12-28",
      author: "Equipo Golden Taekwondo",
      category: "Nutrición",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "La Evolución del MMA: De Bruce Lee a la Actualidad",
      excerpt:
        "Un recorrido histórico por el desarrollo de las Artes Marciales Mixtas, desde sus orígenes hasta convertirse en uno de los deportes más populares del mundo.",
      date: "2023-12-20",
      author: "Frank Simbaña",
      category: "Historia",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Técnicas de Respiración en las Artes Marciales",
      excerpt:
        "Aprende las técnicas de respiración fundamentales que utilizan los maestros de artes marciales para mejorar el rendimiento y mantener la calma.",
      date: "2023-12-15",
      author: "Frank Simbaña",
      category: "Técnica",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#2C3E50] to-[#34495E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#FFD700]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog de Artes Marciales</h1>
            <p className="text-xl opacity-90">
              Conocimiento, técnicas y filosofía de las artes marciales compartidos por Frank Simbaña y el equipo del
              Club Golden Taekwondo Loja
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Artículo Destacado</h2>

            <Card className="overflow-hidden border-2 border-[#FFD700] shadow-lg">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-[#FFD700] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold mr-3">
                      {blogPosts[0].category}
                    </span>
                    <div className="flex items-center text-[#2C3E50] text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blogPosts[0].date).toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{blogPosts[0].title}</h3>
                  <p className="text-[#2C3E50] mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#2C3E50]">
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-sm">{blogPosts[0].author}</span>
                    </div>
                    <Button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white">
                      Leer Artículo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center">Todos los Artículos</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold mr-2 ${
                          post.category === "MMA"
                            ? "bg-[#E74C3C] text-white"
                            : post.category === "Taekwondo"
                              ? "bg-[#FFD700] text-[#1A1A1A]"
                              : "bg-[#2C3E50] text-white"
                        }`}
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center text-[#2C3E50] text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("es-ES")}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-[#2C3E50] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#2C3E50] text-xs">
                        <User className="w-3 h-3 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#E74C3C] border-[#E74C3C] hover:bg-[#E74C3C] hover:text-white bg-transparent"
                      >
                        Leer más
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button className="bg-[#2C3E50] hover:bg-[#1A252F] text-white px-8">Cargar Más Artículos</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-[#2C3E50]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Mantente Actualizado</h2>
            <p className="text-xl text-gray-300 mb-8">
              Suscríbete a nuestro newsletter y recibe los últimos artículos sobre artes marciales directamente en tu
              correo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              <Button className="bg-[#FFD700] hover:bg-[#F1C40F] text-[#1A1A1A] px-6">Suscribirse</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">¿Listo para Poner en Práctica lo Aprendido?</h2>
          <p className="text-xl text-[#2C3E50] mb-8 max-w-2xl mx-auto">
            Únete a nuestras clases y experimenta de primera mano las técnicas y filosofía que compartimos en nuestros
            artículos
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-[#E74C3C] hover:bg-[#C0392B] text-white">
              Inscríbete a Nuestras Clases
            </Button>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-[#2C3E50] border-[#2C3E50] hover:bg-[#2C3E50] hover:text-white bg-transparent"
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
