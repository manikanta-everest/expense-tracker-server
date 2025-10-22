import { Request, Response, NextFunction } from 'express';
import * as expenseService from '../services/service';

export const getAllExpenses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await expenseService.getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const addExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expense = await expenseService.addExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const expense = await expenseService.getById(id);
    if (!expense) {
      res.status(404).json({ message: 'expense not found' });
      return;
    }
    const updated = await expenseService.updateExpense(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const expense = await expenseService.getById(id);
    if (!expense) {
      res.status(404).json({ message: 'expense not found' });
      return;
    }
    const result = await expenseService.deleteExpense(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
