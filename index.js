const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mime = require('mime-types');
const fs = require('fs');  // Import fs to handle file operations
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const USER_ID = 'Sai Chakradhar Rao Mahendrakar_09032004';
const EMAIL = 'saichakradharrao_m@srmap.edu.in';        
const ROLL_NUMBER = 'AP21110011360';   


function validateBase64File(file_b64) {
  if (!file_b64) return { valid: false, mimeType: null, size: 0 };

  const matches = file_b64.match(/^data:(.*);base64,(.*)$/);
  if (!matches || matches.length !== 3) return { valid: false, mimeType: null, size: 0 };

  const mimeType = matches[1]; 
  const buffer = Buffer.from(matches[2], 'base64');  
  const sizeKB = (buffer.length / 1024).toFixed(2);  

  return { 
    valid: true, 
    mimeType, 
    sizeKb: sizeKB 
  };
}


app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;  
  

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

  
  const highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0];

  
  let fileMetadata = {
    valid: false,
    mimeType: null,
    sizeKb: null
  };
  
  if (file_b64) {
    fileMetadata = validateBase64File(file_b64);
  }

  res.json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
    file_valid: fileMetadata.valid,
    file_mime_type: fileMetadata.mimeType,
    file_size_kb: fileMetadata.sizeKb
  });
});


app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
