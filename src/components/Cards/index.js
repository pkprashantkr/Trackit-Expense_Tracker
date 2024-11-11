import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button";
import ResetBalanceButton from "../../components/Modals/ResetBalanceButton";

function Cards({
  income,
  expense,
  totalBalance,
  setIncome,
  setExpense,
  setTotalBalance,
  showExpenseModal,
  showIncomeModal,
}) {
  return (
    <div>
      <Row className="my-row">
        {/* Current Balance Card */}
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{totalBalance}</p>
          {/* Place ResetBalanceButton inside this card */}
          <ResetBalanceButton
            setIncome={setIncome}
            setExpense={setExpense}
            setTotalBalance={setTotalBalance}
          />
        </Card>

        {/* Total Income Card */}
        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>

        {/* Total Expenses Card */}
        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
