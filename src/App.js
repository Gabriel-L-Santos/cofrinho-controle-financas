import React, { useState, useEffect } from "react";
import Form from './components/Form';
import Header from './components/Header';
import Resume from './components/Resume';
import GlobalStyle from './styles/global';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

import './App.css';

const App = () => {
    const data = localStorage.getItem("transactions");
    const [transactionsList, setTransactionsList] = useState(
        data ? JSON.parse(data) : []
    );
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const amountExpense = transactionsList
          .filter((item) => item.expense)
          .map((transaction) => Number(transaction.amount));
    
        const amountIncome = transactionsList
          .filter((item) => !item.expense)
          .map((transaction) => Number(transaction.amount));
    
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    
        const total = Math.abs(income - expense).toFixed(2);
    
        setIncome(`R$ ${income}`);
        setExpense(`R$ ${expense}`);
        setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
      }, [transactionsList]);

      const handleAdd = (transaction) => {
        const newArrayTransactions = [...transactionsList, transaction];
    
        setTransactionsList(newArrayTransactions);
    
        localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
      };

    return (
        <>
            <Header />
            <Resume income={income} expense={expense} total={total} />
            <Form handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
            <GlobalStyle />

            <div className="footer">
                <footer>
                <p>Gabriel Leme dos Santos - 2023</p>
                </footer>
            </div> 

            <div className="button-footer">  
                <button className="buttonSearchFooter">
                <a href="https://www.linkedin.com/in/gabriel-leme-dos-santos-7b220b197/"><BsLinkedin size={25} color="#000000"/></a>
                </button>

                <button className="buttonSearchFooter">
                <a href="https://github.com/Gabriel-L-Santos"><BsGithub size={25} color="#000000"/></a>
                </button>
            </div> 

        </>
        
    );   
};

export default App;
