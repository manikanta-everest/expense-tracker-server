import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

let expenses = [
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

app.get('/expenses', (_req: Request, res: Response) => {
    res.status(200).send(expenses);
});

app.post('/expenses', async (req: Request, res: Response) => {
    try {
        const newId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
        expenses = [
            ...expenses,
            {
                id: newId,
                ...req.body
            }
        ]
        res.status(201).send(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

app.patch('/expenses/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const isExists = expenses.some(expense => expense.id === id);

        if (!isExists) {
            return res.status(404).json({ error: `Expense with id ${id} not found` });
        }

        expenses = expenses.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    ...req.body
                }
            }
            return item;
        })
        res.status(200).json({ message: `Updated expense with id: ${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

app.delete('/expenses/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const isExists = expenses.some(expense => expense.id === id);

        if (!isExists) {
            return res.status(404).json({ error: `Expense with id ${id} not found` });
        }

        expenses = expenses.filter((item) => item.id !== id)
        res.status(200).json({ message: `Deleted expense with id: ${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
