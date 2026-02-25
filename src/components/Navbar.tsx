import React from 'react';
import { Car, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900 tracking-tight">Fleevest</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#analisis" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Análisis de Rentabilidad</a>
            <a href="#marketplace" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Marketplace</a>
            <a href="#como-funciona" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Cómo Funciona</a>
            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200">
              <button className="text-gray-600 hover:text-gray-900 font-medium">Ingresar</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Publicar Auto
              </button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#analisis" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Análisis de Rentabilidad</a>
            <a href="#marketplace" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Marketplace</a>
            <a href="#como-funciona" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Cómo Funciona</a>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-2 px-3">
              <button className="w-full text-left py-2 text-base font-medium text-gray-700 hover:text-indigo-600">Ingresar</button>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 text-center">
                Publicar Auto
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
