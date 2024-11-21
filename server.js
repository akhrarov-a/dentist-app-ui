import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Use import.meta.url to get the current file URL and then convert it to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Define the port Heroku provides
const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
