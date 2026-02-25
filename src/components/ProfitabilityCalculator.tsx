import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus, X, Info } from "lucide-react";

const EXCHANGE_RATE = 1100; // 1 USD = 1100 ARS

const CAR_MODELS = [
  {
    id: "peugeot_208",
    name: "Peugeot 208 Active",
    priceUsd: 15000,
    rentArs: 1020000,
    maintenanceArs: 100000,
    insuranceArs: 80000,
    patentArs: 50000,
  },
  {
    id: "renault_logan",
    name: "Renault Logan",
    priceUsd: 12000,
    rentArs: 1440000,
    maintenanceArs: 90000,
    insuranceArs: 70000,
    patentArs: 40000,
  },
  {
    id: "toyota_corolla",
    name: "Toyota Corolla",
    priceUsd: 18000,
    rentArs: 1360000,
    maintenanceArs: 120000,
    insuranceArs: 100000,
    patentArs: 60000,
  },
  {
    id: "vw_polo",
    name: "VW Nuevo Polo MSI",
    priceUsd: 14000,
    rentArs: 1440000,
    maintenanceArs: 95000,
    insuranceArs: 85000,
    patentArs: 55000,
  },
  {
    id: "fiat_cronos",
    name: "Fiat Cronos",
    priceUsd: 13000,
    rentArs: 1440000,
    maintenanceArs: 85000,
    insuranceArs: 75000,
    patentArs: 45000,
  },
  {
    id: "renault_kangoo",
    name: "Renault Kangoo II Stepway",
    priceUsd: 16000,
    rentArs: 1520000,
    maintenanceArs: 110000,
    insuranceArs: 90000,
    patentArs: 50000,
  },
];

const formatCurrency = (value: number, currency: "ARS" | "USD" = "ARS") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export function ProfitabilityCalculator() {
  const [selectedCar1, setSelectedCar1] = useState(CAR_MODELS[1].id);
  const [selectedCar2, setSelectedCar2] = useState<string | null>(null);

  const car1 = CAR_MODELS.find((c) => c.id === selectedCar1);
  const car2 = CAR_MODELS.find((c) => c.id === selectedCar2);

  const calculateMetrics = (car: (typeof CAR_MODELS)[0]) => {
    const priceArs = car.priceUsd * EXCHANGE_RATE;
    const totalCostsArs = car.maintenanceArs + car.insuranceArs + car.patentArs;
    const netIncomeMonthlyArs = car.rentArs - totalCostsArs;
    const netIncomeYearlyArs = netIncomeMonthlyArs * 12;
    const roi = (netIncomeYearlyArs / priceArs) * 100;
    const paybackMonths = priceArs / netIncomeMonthlyArs;

    return {
      priceArs,
      totalCostsArs,
      netIncomeMonthlyArs,
      netIncomeYearlyArs,
      roi,
      paybackMonths,
    };
  };

  const metrics1 = car1 ? calculateMetrics(car1) : null;
  const metrics2 = car2 ? calculateMetrics(car2) : null;

  const chartData = [
    {
      name: "Ingreso Bruto",
      [car1?.name || "Auto 1"]: car1?.rentArs || 0,
      ...(car2 ? { [car2.name]: car2.rentArs } : {}),
    },
    {
      name: "Costos",
      [car1?.name || "Auto 1"]: metrics1?.totalCostsArs || 0,
      ...(car2 ? { [car2.name]: metrics2?.totalCostsArs || 0 } : {}),
    },
    {
      name: "Ingreso Neto",
      [car1?.name || "Auto 1"]: metrics1?.netIncomeMonthlyArs || 0,
      ...(car2 ? { [car2.name]: metrics2?.netIncomeMonthlyArs || 0 } : {}),
    },
  ];

  const projectionData = [12, 24, 36].map((months) => ({
    name: `${months} Meses`,
    [car1?.name || "Auto 1"]: (metrics1?.netIncomeMonthlyArs || 0) * months,
    ...(car2
      ? { [car2.name]: (metrics2?.netIncomeMonthlyArs || 0) * months }
      : {}),
  }));

  return (
    <section id="analisis" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Análisis de Rentabilidad
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Descubre cuánto puedes ganar alquilando tu auto a conductores de
            Uber. Compara modelos y toma decisiones de inversión informadas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-10 border-b border-gray-100 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Car 1 Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona un vehículo
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border bg-gray-50"
                  value={selectedCar1}
                  onChange={(e) => setSelectedCar1(e.target.value)}
                >
                  {CAR_MODELS.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Car 2 Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comparar con (Opcional)
                </label>
                {selectedCar2 ? (
                  <div className="flex items-center">
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border bg-gray-50"
                      value={selectedCar2}
                      onChange={(e) => setSelectedCar2(e.target.value)}
                    >
                      {CAR_MODELS.filter((c) => c.id !== selectedCar1).map(
                        (car) => (
                          <option key={car.id} value={car.id}>
                            {car.name}
                          </option>
                        ),
                      )}
                    </select>
                    <button
                      onClick={() => setSelectedCar2(null)}
                      className="ml-3 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setSelectedCar2(
                        CAR_MODELS.find((c) => c.id !== selectedCar1)?.id ||
                          null,
                      )
                    }
                    className="mt-1 w-full flex justify-center items-center py-3 px-4 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Agregar vehículo para comparar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Car 1 Metrics */}
            {car1 && metrics1 && (
              <div className="p-6 sm:p-10 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {car1.name}
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center">
                        Inversión Inicial Estimada
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(car1.priceUsd, "USD")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      ~ {formatCurrency(metrics1.priceArs, "ARS")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-gray-500">
                        Ingreso Bruto Mensual
                      </p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {formatCurrency(car1.rentArs)}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-red-500">
                        Costos Mensuales
                      </p>
                      <p className="text-xl font-bold text-red-700 mt-1">
                        -{formatCurrency(metrics1.totalCostsArs)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
                      Ingreso Neto Mensual
                    </p>
                    <p className="text-4xl font-extrabold text-indigo-900 mt-2">
                      {formatCurrency(metrics1.netIncomeMonthlyArs)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        ROI Anual Proyectado
                      </p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {metrics1.roi.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Recupero de Inversión
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.ceil(metrics1.paybackMonths)} meses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Car 2 Metrics */}
            {car2 && metrics2 ? (
              <div className="p-6 sm:p-10 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {car2.name}
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center">
                        Inversión Inicial Estimada
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(car2.priceUsd, "USD")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      ~ {formatCurrency(metrics2.priceArs, "ARS")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-gray-500">
                        Ingreso Bruto Mensual
                      </p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {formatCurrency(car2.rentArs)}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-red-500">
                        Costos Mensuales
                      </p>
                      <p className="text-xl font-bold text-red-700 mt-1">
                        -{formatCurrency(metrics2.totalCostsArs)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
                      Ingreso Neto Mensual
                    </p>
                    <p className="text-4xl font-extrabold text-indigo-900 mt-2">
                      {formatCurrency(metrics2.netIncomeMonthlyArs)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        ROI Anual Proyectado
                      </p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {metrics2.roi.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Recupero de Inversión
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.ceil(metrics2.paybackMonths)} meses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Plus className="h-10 w-10 text-indigo-600" />
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-2">
                  Compara dos vehículos
                </h4>
                <p className="text-gray-500 max-w-sm">
                  Selecciona un segundo vehículo arriba para comparar la
                  rentabilidad, costos y tiempo de recupero lado a lado.
                </p>
              </div>
            )}
          </div>

          {/* Charts Section */}
          <div className="p-6 sm:p-10 border-t border-gray-100 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              Proyección Financiera
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Monthly Breakdown Chart */}
              <div className="h-80">
                <h4 className="text-sm font-medium text-gray-500 mb-4 text-center">
                  Desglose Mensual (ARS)
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000000).toFixed(1)}M`
                      }
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Legend iconType="circle" />
                    <Bar
                      dataKey={car1?.name || "Auto 1"}
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={60}
                    />
                    {car2 && (
                      <Bar
                        dataKey={car2.name}
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={60}
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Long Term Projection Chart */}
              <div className="h-80">
                <h4 className="text-sm font-medium text-gray-500 mb-4 text-center">
                  Ingreso Neto Acumulado (ARS)
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000000).toFixed(1)}M`
                      }
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Legend iconType="circle" />
                    <Bar
                      dataKey={car1?.name || "Auto 1"}
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={60}
                    />
                    {car2 && (
                      <Bar
                        dataKey={car2.name}
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={60}
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
