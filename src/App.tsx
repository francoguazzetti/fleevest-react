/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfitabilityCalculator } from './components/ProfitabilityCalculator';
import { FeaturedCars } from './components/FeaturedCars';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <ProfitabilityCalculator />
        <FeaturedCars />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
