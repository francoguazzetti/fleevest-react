import React from 'react';
import { Car, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-2xl font-bold text-white tracking-tight">Fleevest</span>
            </div>
            <p className="text-gray-400 text-base max-w-xs">
              La plataforma líder en Argentina para invertir en vehículos y alquilarlos a conductores de Uber.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Plataforma</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#analisis" className="text-base text-gray-400 hover:text-white">Análisis de Rentabilidad</a>
                  </li>
                  <li>
                    <a href="#marketplace" className="text-base text-gray-400 hover:text-white">Marketplace</a>
                  </li>
                  <li>
                    <a href="#como-funciona" className="text-base text-gray-400 hover:text-white">Cómo Funciona</a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Soporte</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Centro de Ayuda</a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Contacto</a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Preguntas Frecuentes</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Términos y Condiciones</a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Política de Privacidad</a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white">Contratos Modelo</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Fleevest. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
