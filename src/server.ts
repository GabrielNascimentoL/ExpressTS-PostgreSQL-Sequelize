import express from 'express';
import sequelize from './database';
import userRoutes from './routes/user';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
