const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const USER_ID = 'Sai Chakradhar Rao Mahendrakar_09032004';
const EMAIL = 'saichakradharrao_m@srmap.edu.in';        
const ROLL_NUMBER = 'AP21110011360';       


app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

  
  const highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0];

  
  res.json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : []
  });
});


app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
