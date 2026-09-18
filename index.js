require('dotenv').config();

const dns = require('dns');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const categoryRulesRoutes = require('./routes/categoryRules');
const productsRoutes = require('./routes/products');
const ocrTestRoutes = require('./routes/ocrTest');
const inspectRoutes = require('./routes/inspect');
const inspectionsRoutes = require('./routes/inspections');
const dashboardRoutes = require('./routes/dashboard');
const batchInspectRoutes = require('./routes/batchInspect');
const reportPdfRoutes = require('./routes/reportPdf');
const authRoutes = require('./routes/auth');
const inspectMultiRoutes = require('./routes/inspectMulti');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Server chal raha hai! 🚀');
});

app.use('/api/categoryRules', categoryRulesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/ocr-test', ocrTestRoutes);
app.use('/api/inspect', inspectRoutes);
app.use('/api/inspections', inspectionsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inspect-batch', batchInspectRoutes);
app.use('/api/report', reportPdfRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inspect-multi', inspectMultiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});