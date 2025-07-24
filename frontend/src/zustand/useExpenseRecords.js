import { create } from "zustand";

const useExpenseRecords = create((set) => ({
  expenses: [],
  recordToUpdate: null,
  setRecords: (expenses) => set({ expenses }),
  addRecord: (newRecord) =>
    set((state) => ({ expenses: [newRecord, ...state.expenses] })), // state => exsisting state
  deleteRecord: (record) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense._id !== record._id),
    })),
  updateRecord: (updatedRecord) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense._id === updatedRecord._id ? updatedRecord : expense
      ),
    })),
  setRecordToUpdate: (record) => set({ recordToUpdate: record }),
}));

export default useExpenseRecords;
