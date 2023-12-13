import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import { validateNumber, validateEmail } from './validation.js';
const app = express();

interface DataI {
  email: string;
  number?: string;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function searchData(fetchedData: DataI): Promise<DataI[]> {
  await delay(5000);
  const myJSON = await fs.readFile('./src/data.json', 'utf8');
  const parsedJSON = JSON.parse(myJSON);

  return parsedJSON.filter((el: DataI) => {
    if (fetchedData.number) {
      return el.email === fetchedData.email && el.number === fetchedData.number;
    } else {
      return el.email === fetchedData.email;
    }
  });
}

app.post('/find', async (req: Request, res: Response) => {
  const fetchedData: DataI = req.body;

  if (!validateEmail(fetchedData.email) || (fetchedData.number && !validateNumber(fetchedData.number))) {
    return res.status(400).json({ error: 'Validation error' });
  }
  try {
    const result = await searchData(fetchedData);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json('Data has not been found');
    }
  } catch {
    res.status(400).json({ error: 'Reading error' });
  }
});

export default app;
