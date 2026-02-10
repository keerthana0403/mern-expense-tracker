import React, { useState } from "react";
import useExpenseRecords from "../zustand/useExpenseRecords";
import toast from "react-hot-toast";
import API from "../api/api";

const useUpdateExpense = () => {
  const [loading, setLoading] = useState(false);
  const { updateRecord } = useExpenseRecords();

  const updateExpenseRecord = async (recordId, newRecord, setShowModal) => {
    setLoading(true);
    try {
      const res = await API.put(`/api/expense-record/${recordId}`, newRecord);
      const data = await res.data;
      if (data.error) throw new Error(data.error);
      updateRecord(data);
      toast.success("Updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateExpenseRecord };
};

export default useUpdateExpense;
