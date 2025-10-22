
import { Expense as ExpenseType } from "../types/types";
import { Expense } from '../models/Expense';

export const getExpenses = async () => {
  const expenses = await Expense.findAll();
  return expenses;
};

export const addExpense = async (expense: Omit<ExpenseType, 'id'>) => {
    console.log('expense', expense);
  const newExpense = await Expense.create(expense);
  return newExpense;
};

export const updateExpense = async (id: number, updates: Partial<ExpenseType>) => {
  const expense = await getById(id);
  if (!expense) return null;
  await expense.update(updates);
  return expense;
};

export const deleteExpense = async (id: number) => {
  const expense = await getById(id);
  if (!expense) return null;
  await expense.destroy();
  return { message: 'Deleted successfully' };
};

export const getById = async (id: number) => {
  const expense = await Expense.findByPk(id);
  return expense;
};

const services = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
}

export default services