import express from 'express';
import expenseRoutes from '../router/expenseRoutes';
import { errorHandler } from '../middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/expenses', expenseRoutes);
app.use(errorHandler);

export default app;
