import React, { useState, useEffect } from 'react';
import { CheckCircle2, MapPin, Calendar, Fuel, Loader2 } from 'lucide-react';

interface Listing {
  id: number;
  name: string;
  year: number;
  price: number;
  location: string;
  fuel: string;
  image: string;
  available: boolean;
}

export function FeaturedCars() {
  const [cars, setCars] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <section id="marketplace" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Marketplace de Alquiler
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Encuentra el vehículo ideal para trabajar con Uber.
            </p>
          </div>
          <a href="#" className="hidden sm:block text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            Ver todos los vehículos &rarr;
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    {car.available ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Disponible
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Alquilado
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{car.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-600">${(car.price / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">/ semana</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {car.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Fuel className="h-4 w-4 mr-2 text-gray-400" />
                      {car.fuel}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                      Mantenimiento y seguro incluido
                    </div>
                  </div>

                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                      car.available 
                        ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!car.available}
                  >
                    {car.available ? 'Reservar Ahora' : 'No Disponible'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            Ver todos los vehículos &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
