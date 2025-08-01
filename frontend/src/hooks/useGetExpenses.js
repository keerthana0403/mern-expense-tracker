import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useExpenseRecords from "../zustand/useExpenseRecords";

const useGetExpenses = () => {
  const [loading, setLoading] = useState(false);
  const { expenses, setRecords } = useExpenseRecords();

  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/expense-record/getAllByUserId");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setRecords(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, []);

  return { expenses, loading };
};

export default useGetExpenses;
