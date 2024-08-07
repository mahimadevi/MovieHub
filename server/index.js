import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/v3', routes);

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb connected');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Export the app for Vercel
export default app;
