import express, { Request, Response } from 'express';
import { Expenses } from './src/types/types';
import { addExpense, deleteExpense, getExpenses, updateExpense } from './src/services/service';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

let expenses: Expenses[] = [
    {
        id: 1,
        description: 'Groceries',
        amount: 85.50,
        category: 'Food',
        date: '2025-10-05',
    },
    {
        id: 2,
        description: 'Electricity Bill',
        amount: 120.00,
        category: 'Utilities',
        date: '2025-10-01',
    },
    {
        id: 3,
        description: 'Train tickets',
        amount: 500.00,
        category: 'Transport',
        date: '2025-10-01',
    },
]

app.get('/expenses', async (_req: Request, res: Response) => {
    const expenses = await getExpenses();
    res.status(200).send(expenses);
});

app.post('/expenses', async (req: Request, res: Response) => {
    try {
        const expense = await addExpense(req.body);
        res.status(201).send(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

app.patch('/expenses/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await updateExpense(id, req.body);
        res.status(200).json({ message: `Updated expense with id: ${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

app.delete('/expenses/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await deleteExpense(id);
        res.status(200).json({ message: `Deleted expense with id: ${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
