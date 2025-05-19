require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();

app.use(cors({
  origin: '*', // Autorise toutes les origines (ou remplace par ton domaine frontend spécifique)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
  });
  

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const messages = req.body.messages; // array of {role,content}

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('Erreur OpenAI:', err);
    res.status(500).send('Erreur OpenAI');
  }
});


app.listen(PORT, () => console.log(`Server en écoute sur le port ${PORT}`));

