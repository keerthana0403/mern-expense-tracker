import Expense from "../models/expense.model.js";

export const fetchRecords = async (req, res) => {
  try {
    const userId = req.user._id;

    const userRecords = await Expense.find({ userId }).sort({ date: -1 });

    if (!userRecords || userRecords.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(userRecords);
  } catch (error) {
    console.log("Error in fetchRecords", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const addRecord = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, amount, type, category, date } = req.body;

    const newExpense = new Expense({
      userId,
      title,
      amount,
      type,
      category,
      date,
    });

    const savedExpense = await newExpense.save();

    return res.status(200).json(savedExpense);
  } catch (error) {
    console.log("Error in createRecord", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recordId } = req.params;
    const updatedData = req.body;

    const userRecord = await Expense.findOneAndUpdate(
      { _id: recordId, userId },
      {
        $set: {
          title: updatedData.title,
          amount: updatedData.amount,
          type: updatedData.type,
          category: updatedData.type,
          paymentMethod: updatedData.paymentMethod,
          data: updatedData.date,
        },
      },
      { new: true }
    );

    if (!userRecord) {
      res.status(404).json({ error: "Record not found" });
    }

    return res.status(200).json({ userRecord });
  } catch (error) {
    console.log("Error in updateRecord", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recordId } = req.params;

    const record = await Expense.findOne({ _id: recordId, userId });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    await record.deleteOne();

    res.status(200).json({ message: "record deleted" });
  } catch (error) {
    console.log("Error in deleteRecord", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
