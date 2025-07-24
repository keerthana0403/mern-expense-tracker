import { useState } from "react";
import toast from "react-hot-toast";
import useExpenseRecords from "../zustand/useExpenseRecords";

const useDeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const { deleteRecord } = useExpenseRecords();

  const deleteExpenseRecord = async (recordId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/expense-record/${recordId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      deleteRecord(data);
      console.log(data);
      toast.success("Record deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteExpenseRecord };
};

export default useDeleteExpense;
