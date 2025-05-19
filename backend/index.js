require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

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


app.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
