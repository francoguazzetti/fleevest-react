import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';

const db = new Database('fleevest.db');

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rental_rates (
    id TEXT PRIMARY KEY,
    name TEXT,
    priceUsd INTEGER,
    rentArs INTEGER,
    maintenanceArs INTEGER,
    insuranceArs INTEGER,
    patentArs INTEGER
  );

  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    year INTEGER,
    price INTEGER,
    location TEXT,
    fuel TEXT,
    image TEXT,
    available BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const ratesCount = db.prepare('SELECT COUNT(*) as count FROM rental_rates').get() as { count: number };
if (ratesCount.count === 0) {
  const insertRate = db.prepare('INSERT INTO rental_rates (id, name, priceUsd, rentArs, maintenanceArs, insuranceArs, patentArs) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const rates = [
    ['peugeot_208', 'Peugeot 208 Active', 15000, 1020000, 100000, 80000, 50000],
    ['renault_logan', 'Renault Logan', 12000, 1440000, 90000, 70000, 40000],
    ['toyota_corolla', 'Toyota Corolla', 18000, 1360000, 120000, 100000, 60000],
    ['vw_polo', 'VW Nuevo Polo MSI', 14000, 1440000, 95000, 85000, 55000],
    ['fiat_cronos', 'Fiat Cronos', 13000, 1440000, 85000, 75000, 45000],
    ['renault_kangoo', 'Renault Kangoo II Stepway', 16000, 1520000, 110000, 90000, 50000],
  ];
  rates.forEach(r => insertRate.run(...r));
}

const listingsCount = db.prepare('SELECT COUNT(*) as count FROM listings').get() as { count: number };
if (listingsCount.count === 0) {
  const insertListing = db.prepare('INSERT INTO listings (name, year, price, location, fuel, image, available) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const listings = [
    ['Renault Logan 1.6 Life', 2022, 360000, 'Palermo, CABA', 'GNC/Nafta', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 1],
    ['Peugeot 208 Active', 2023, 280000, 'Belgrano, CABA', 'Nafta', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 1],
    ['Toyota Corolla XLI', 2021, 340000, 'Caballito, CABA', 'GNC/Nafta', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0],
  ];
  listings.forEach(l => insertListing.run(...l));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/rental-rates', (req, res) => {
    try {
      const rates = db.prepare('SELECT * FROM rental_rates').all();
      res.json(rates);
    } catch (error) {
      console.error('Error fetching rental rates:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/listings', (req, res) => {
    try {
      const listings = db.prepare('SELECT * FROM listings').all();
      // Convert SQLite integer boolean (1/0) back to true/false
      const formatted = listings.map((l: any) => ({ ...l, available: l.available === 1 }));
      res.json(formatted);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built static files
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
