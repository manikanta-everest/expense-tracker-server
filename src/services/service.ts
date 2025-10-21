
import { db } from "../firebase/firebase";
import { Expense } from "../types/types";

export const getExpenses = async () => {
    const allexpenses = await db.collection('expenses').get();
    const data = allexpenses.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    return data

};
export const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const docRef = db.collection('expenses').doc();
    await docRef.set(expense);
    return { id: docRef.id, ...expense };
};

export const updateExpense = async (id: string, updates: Partial<Expense>) => {
    await db.collection('expenses').doc(id).update(updates);
    return { id, ...updates };
};

export const deleteExpense = async (id: string) => {
    await db.collection('expenses').doc(id).delete();
    return { message: `Expense ${id} deleted` };
};

export const getById = async (id: string) => {
    const expenseRef = db.collection('expenses').doc(id);
    const doc = await expenseRef.get();
    return doc;
}

const services = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
}

export default services