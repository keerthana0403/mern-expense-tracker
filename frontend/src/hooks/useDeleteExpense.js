import { useState } from "react";
import toast from "react-hot-toast";
import useExpenseRecords from "../zustand/useExpenseRecords";
import API from "../api/api";

const useDeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const { deleteRecord } = useExpenseRecords();

  const deleteExpenseRecord = async (recordId) => {
    setLoading(true);

    try {
      const res = await API.delete(`/api/expense-record/${recordId}`);
      const data = await res.data;
      if (data.error) throw new Error(data.error);
      deleteRecord(data);
      toast.success("Record deleted");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteExpenseRecord };
};

export default useDeleteExpense;
