import { useEffect, useState } from "react";

const expenceCategories = [
  { id: 1, name: "Education" },
  { id: 2, name: "Food" },
  { id: 3, name: "Health" },
  { id: 4, name: "Bill" },
  { id: 5, name: "Insurance" },
  { id: 6, name: "Tax" },
  { id: 7, name: "Transport" },
  { id: 8, name: "Telephone" },
];

const incomeCategories = [
  { id: 1, name: "Salary" },
  { id: 2, name: "Outsourcing" },
  { id: 3, name: "Bond" },
  { id: 4, name: "Dividend" },
];

const isObject = (value) => {
  return value !== null && typeof value === "object";
};
const ExpenseTracker = ({ isExpence, handleToggle, onSave, trackToUpdate }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [track, setTrack] = useState({
    id: crypto.randomUUID(),
    category: "",
    isExpence: isExpence,
    amount: 0,
    date: "",
  });

  useEffect(() => {
    if (isObject(trackToUpdate)) {
      setIsUpdate(true);
      setTrack(trackToUpdate);
    } else {
      setIsUpdate(false);
      setTrack({
        id: crypto.randomUUID(),
        category: "",
        isExpence: isExpence,
        amount: 0,
        date: "",
      });
    }
  }, [trackToUpdate, isExpence]);

  const categories = isExpence ? expenceCategories : incomeCategories;
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setTrack({
      ...track,
      [name]: value,
      isExpence: isExpence,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(track, isUpdate);
    setTrack({
      id: crypto.randomUUID(),
      category: "",
      isExpence: isExpence,
      amount: 0,
      date: "",
    });
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              isExpence && "active"
            }`}
            onClick={() => {
              handleToggle("expence");
            }}
          >
            Expense
          </div>
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900  ${
              isExpence || "active"
            }`}
            onClick={() => {
              handleToggle("income");
            }}
          >
            Income
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              value={track.category}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              required
              value={track.amount}
              onChange={handleChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              required
              value={track.date}
              onChange={handleChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {isUpdate ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseTracker;
