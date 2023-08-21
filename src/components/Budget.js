
import React, {useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const {dispatch, currency,expenses} = useContext(AppContext);
    const [budget, setBudget] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const handleBudgetChange =(event) => {
        console.log("new budget", event.target.value);
        setBudget(parseInt(event.target.value));

        if (event.target.value < totalExpenses){
            alert("Budget cannot be lower than expenses");
            setBudget(totalExpenses);  
        }
        else{
            setErrorMessage("");
        }

        if (event.target.value > 20000) {
            alert("Budget should not exceed 20,000");
            setBudget(20000);
        } else {
            setErrorMessage("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13){
            console.log("enter key pressed");
            dispatch({type:"SET_BUDGET", payload: budget});
        }
    }


    return (
        <div className="alert alert-secondary" >
            <label htmlFor="cost">Budget: {currency}</label>
            <input
                required
                type="number"
                id="cost"
                step = "10"
                max = "20000"
                value={budget}
                style={{ marginLeft: "2rem", width: "10rem" }}
                onChange={handleBudgetChange}
                onKeyDown = {handleKeyDown} 
            />
            {errorMessage }
        </div>
    );
};
export default Budget;