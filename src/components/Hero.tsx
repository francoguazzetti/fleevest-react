import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, CarFront } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Invierte en autos,</span>{' '}
                <span className="block text-indigo-600 xl:inline">genera ingresos pasivos</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                La plataforma líder en Argentina que conecta propietarios de vehículos con conductores de Uber verificados. Analiza la rentabilidad, alquila tu auto y maximiza tu inversión con total seguridad.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#analisis" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors">
                    Analizar Rentabilidad
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#marketplace" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors">
                    Ver Autos Disponibles
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Alta Rentabilidad</h3>
                <p className="mt-2 text-sm text-gray-500 text-center lg:text-left">Ingresos mensuales superiores a $1.000.000 ARS por vehículo.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Conductores Verificados</h3>
                <p className="mt-2 text-sm text-gray-500 text-center lg:text-left">Filtramos y validamos a cada conductor de Uber en la plataforma.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <CarFront className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Gestión Integral</h3>
                <p className="mt-2 text-sm text-gray-500 text-center lg:text-left">Contratos, pagos y gestión de flota en un solo lugar.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Conductor de Uber en su auto"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent lg:via-white/20"></div>
      </div>
    </div>
  );
}
