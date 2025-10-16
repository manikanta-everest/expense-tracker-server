
import { db } from "../firebase/firebase";
import { Expenses } from "../types/types";

export const getExpenses = async () => {
    const allexpenses = await db.collection('expenses').get();
    const data = allexpenses.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    return data

};
export const addExpense = async (expense: Expenses) => {
    const newexpensetracker = (await db.collection('expenses').doc(expense.id + '')).set(expense)
    return newexpensetracker

};
export const updateExpense = async (id: number, updates: Partial<Expenses>) => {
    await db.collection('expenses').doc(id + '').update(updates);
    return { id, ...updates };
};
export const deleteExpense = async (id: number) => {
    await db.collection('expenses').doc(id + '').delete();
    return { message: `Expense ${id} deleted` };
};

const services = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense


}
export default services