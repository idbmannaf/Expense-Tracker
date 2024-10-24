import React, { useState } from "react";
import BlanceSummary from "./BlanceSummary";
import Expence from "./Expence";
import ExpenseTracker from "./ExpenseTracker";
import Income from "./Income";

const ExpenseBoard = () => {
  const [isExpence, setIsExpence] = useState(true);
  const [trackToUpdate, setTrackToUpdate] = useState(null);
  const [trackerData, setTrackerData] = useState([]);

  //Handle Submit
  const handleOnSubmit = (newTrack, isUpdate) => {
    if (isUpdate) {
      setTrackerData(
        trackerData.map((track) => {
          if (track.id === newTrack.id) {
            return {
              ...newTrack,
              amount: parseInt(newTrack.amount),
            };
          }
          return track;
        })
      );
    } else {
      const updateTrack = {
        ...newTrack,
        amount: parseInt(newTrack.amount),
      };
      setTrackerData([...trackerData, updateTrack]);
    }
  };

  const handleOnEdit = (trackId) => {
    const copyTrackerData = [...trackerData];
    const trackerIndex = copyTrackerData.findIndex(
      (track) => track.id === trackId
    );
    let newTrack = copyTrackerData[trackerIndex];
    setTrackToUpdate(newTrack);
    if (newTrack.isExpence === false) {
      setIsExpence(false);
    } else {
      setIsExpence(true);
    }
  };

  const handelOnDelete = (trackId) => {
    const copyTrackerData = [...trackerData];
    const trackerIndex = copyTrackerData.filter(
      (track) => track.id !== trackId
    );
    setTrackerData(trackerIndex);
  };

  const expences = trackerData.filter((expence) => expence.isExpence === true);
  const incomes = trackerData.filter((expence) => expence.isExpence === false);
  const totalExpences = expences.reduce(
    (amount, item) => amount + parseInt(item.amount),
    0
  );
  const totalIncome = incomes.reduce(
    (amount, item) => amount + parseInt(item.amount),
    0
  );

  //Expence and Income toggle
  const handleExpenceAndIncomeToggle = (expenceOrIncome) => {
    if (expenceOrIncome === "income") {
      setIsExpence(false);
    } else {
      setIsExpence(true);
    }
  };

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpenseTracker
          isExpence={isExpence}
          handleToggle={handleExpenceAndIncomeToggle}
          onSave={handleOnSubmit}
          trackToUpdate={trackToUpdate}
        />
        <div className="lg:col-span-2">
          {/* <!-- Total Balance Stat--> */}
          <BlanceSummary expence={totalExpences} income={totalIncome} />

          {/* <!-- List Down --> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {/* <!-- Expense --> */}
            <Income
              incomes={incomes}
              onEdit={handleOnEdit}
              onDelete={handelOnDelete}
            />
            <Expence
              expences={expences}
              onEdit={handleOnEdit}
              onDelete={handelOnDelete}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExpenseBoard;
