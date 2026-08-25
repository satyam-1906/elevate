const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security Headers
app.use(helmet());

// Compress all responses
app.use(compression());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
  ],
  credentials: true,
}));

app.use(express.json());

const eventRoutes     = require('./routes/event.routes');
const challengeRoutes = require('./routes/challenge.routes');
const resourceRoutes  = require('./routes/resource.routes');
const legacyRoutes    = require('./routes/legacy.routes');
const sponsorRoutes   = require('./routes/sponsor.routes');
const mediaRoutes     = require('./routes/media.routes');
const authRoutes      = require('./routes/auth.routes');

app.use('/api/events',     eventRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/resources',  resourceRoutes);
app.use('/api/legacys',    legacyRoutes);
app.use('/api/sponsors',   sponsorRoutes);
app.use('/api/medias',     mediaRoutes);
app.use('/api/auths',      authRoutes);

module.exports = app;
