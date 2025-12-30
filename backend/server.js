const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const borrowersRoutes = require('./routes/borrowers');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/borrowers', borrowersRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
