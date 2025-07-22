import Link from "next/link"
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#343A40] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold text-[#B8860B] mb-4">Contáctanos</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#B8860B]" />
                <span>[Número de teléfono]</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#B8860B]" />
                <span>[Email de contacto]</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-[#B8860B]" />
                <span>[Dirección principal - Loja Norte]</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[#B8860B] font-semibold mb-3">Síguenos en:</p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=100038545512449&locale=es_LA"
                  target="_blank"
                  className="text-white hover:text-[#B8860B] transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-white hover:text-[#B8860B] transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-white hover:text-[#B8860B] transition-colors">
                  <Youtube className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xl font-bold text-[#B8860B] mb-4">Navegación</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-[#B8860B] transition-colors">
                Inicio
              </Link>
              <Link href="/blog" className="block hover:text-[#B8860B] transition-colors">
                Blog
              </Link>
              <Link href="/logros" className="block hover:text-[#B8860B] transition-colors">
                Logros
              </Link>
              <Link href="/disciplinas/mma" className="block hover:text-[#B8860B] transition-colors">
                MMA
              </Link>
              <Link href="/disciplinas/taekwondo" className="block hover:text-[#B8860B] transition-colors">
                Taekwondo
              </Link>
            </div>
          </div>

          {/* Últimos Blogs */}
          <div>
            <h3 className="text-xl font-bold text-[#B8860B] mb-4">Artículos Recientes</h3>
            <div className="space-y-3">
              <Link href="#" className="block hover:text-[#B8860B] transition-colors text-sm">
                5 Beneficios de Entrenar Taekwondo desde Joven
              </Link>
              <Link href="#" className="block hover:text-[#B8860B] transition-colors text-sm">
                Preparación para Competiciones de MMA: Estrategias Clave
              </Link>
              <Link href="#" className="block hover:text-[#B8860B] transition-colors text-sm">
                Disciplina y Respeto: Pilares de las Artes Marciales
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#6C757D] mt-8 pt-8 text-center">
          <p className="text-[#6C757D]">
            © {new Date().getFullYear()} Frank Simbaña - Club Golden Taekwondo Loja. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
