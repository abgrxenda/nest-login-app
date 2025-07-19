import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('✅ DB Connected'))
  .catch((err) => console.error('❌ DB Connection Failed:', err));