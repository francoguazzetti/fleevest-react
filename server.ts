import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

const db = new Database('fleevest.db');

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
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

  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    brand TEXT,
    model TEXT,
    year INTEGER,
    plate TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(owner_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id INTEGER,
    driver_id INTEGER,
    status TEXT,
    start_date DATETIME,
    end_date DATETIME,
    total_price INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(driver_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    reporter_id INTEGER,
    description TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(booking_id) REFERENCES bookings(id)
  );

  CREATE TABLE IF NOT EXISTS market_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT,
    year INTEGER,
    average_price INTEGER,
    source TEXT,
    fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS listings_sale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    price INTEGER,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
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
  app.post('/api/register', (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
      const info = stmt.run(name, email, hashedPassword, role);
      res.status(201).json({ id: info.lastInsertRowid, name, email, role });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as any;

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const authJwt = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };

  app.get('/api/user', authJwt, (req, res) => {
    try {
      const stmt = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?');
      const user = stmt.get(req.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

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
