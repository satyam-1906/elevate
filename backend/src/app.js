const express = require('express');
const cors = require('cors');

const app = express();

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
