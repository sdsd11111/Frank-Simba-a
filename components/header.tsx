"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#B8860B] hover:text-[#800020] transition-colors">
            Frank Simbaña
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <Link href="/" className="text-[#343A40] hover:text-gold font-medium transition-colors">
                  Inicio
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" className="text-[#343A40] hover:text-[#B8860B] font-medium transition-colors">
                  Blog
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/logros" className="text-[#343A40] hover:text-[#B8860B] font-medium transition-colors">
                  Logros
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem className="group">
                <NavigationMenuTrigger className="text-charcoal hover:text-gold font-medium transition-colors group-hover:text-gold">
                  Disciplinas
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-hover:block">
                  <div className="grid w-[200px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/disciplinas/mma"
                        className="group h-auto w-full rounded-md bg-background p-3 text-base font-semibold transition-colors hover:bg-navy hover:text-gold text-wine text-center"
                      >
                        MMA
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/disciplinas/taekwondo"
                        className="group h-auto w-full rounded-md bg-background p-3 text-base font-semibold transition-colors hover:bg-navy hover:text-gold text-gold text-center"
                      >
                        Taekwondo
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium text-[#343A40] hover:text-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/blog"
                  className="text-lg font-medium text-[#343A40] hover:text-[#B8860B] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/logros"
                  className="text-lg font-medium text-[#343A40] hover:text-[#B8860B] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Logros
                </Link>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-[#343A40]">Disciplinas</p>
                  <div className="pl-4 space-y-3">
                    <Link
                      href="/disciplinas/mma"
                      className="block text-[#800020] hover:text-[#B8860B] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-semibold">MMA</div>
                      <div className="text-xs text-[#6C757D]">Artes Marciales Mixtas</div>
                    </Link>
                    <Link
                      href="/disciplinas/taekwondo"
                      className="block text-[#B8860B] hover:text-[#800020] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-semibold">Taekwondo</div>
                      <div className="text-xs text-[#6C757D]">Arte Marcial Olímpico</div>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
