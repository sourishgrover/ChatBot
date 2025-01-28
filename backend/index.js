const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});