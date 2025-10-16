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
    const id = parseInt(req.params.id);
    const updated = await expenseService.updateExpense(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const result = await expenseService.deleteExpense(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
