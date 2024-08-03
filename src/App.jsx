
import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [balance, setBalance] = useState(0);
  const [taskItems, setTaskItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {

    const storedItems = JSON.parse(localStorage.getItem("taskItems")) || [];
    setTaskItems(storedItems);

  }, []);

  const addSubmitHandler = () => {

    mainCalck();

  };

  const addSearchHandler = () => {

    checkItem();

  };

  const removeAllHandler = () => {

    removeAllLocal();

  };

  const myLocalStorig = () => {
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
  };

  const geleteElement = () => {
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
  };

  const createItem = (itemText, addclass) => {
    const newItem = {
      text: itemText,
      addclass: addclass
    };

    setTaskItems(prevItems => [...prevItems, newItem]);
    myLocalStorig();

  };


  function mainCalck() {

    let usernameValue = username;
    let passwordValue = password;
    let number1Value = parseFloat(number1);
    let number2Value = parseFloat(number2);
  
    if (!isNaN(number1Value)) {
      let newBalance = balance + number1Value;
      setBalance(newBalance);
      createItem(`Date/Time: ${getCurrentDateTime()} - Username: ${usernameValue}, Password: ${passwordValue}, Salary++: ${number1Value}, Balance: ${newBalance}`);
      
      setNumber1('');
  
    }
  
    if (!isNaN(number2Value)) {

      if (balance - number2Value >= 0) {
        let newBalance = balance - number2Value;
        setBalance(newBalance);
        createItem(`Date/Time: ${getCurrentDateTime()} - Username: ${usernameValue}, Password: ${passwordValue}, Salary--: ${number2Value}, Balance: ${newBalance}`);
        
        setNumber2('');
  
      } else {
        alert("Balance insufficient for withdrawal.");
      }

    }

  }

  const getCurrentDateTime = () => {

    const now = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[now.getDay()];

    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let period = "AM";
    if (hours >= 12) {
      period = "PM";

      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12;
    }

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedDate = `${dayName}, ${date}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;

    return `${formattedDate} ${formattedTime}`;

  };

  const checkItem = () => {

    const searchValue = search.toLowerCase();
    const foundItem = taskItems.find(item => item.text.toLowerCase().includes(searchValue));

    if (foundItem) {
      setTaskItems([foundItem]);

    } else {
      
      alert(`No items found added by ${searchValue}`);
    }

  };

  const removeAllLocal = () => {

    localStorage.removeItem("taskItems");
    setTaskItems([]);

  };

  const Delete = (index) => {

    const updatedItems = [...taskItems];
    updatedItems.splice(index, 1);
    setTaskItems(updatedItems);
    geleteElement();

  };

  return (

    <div className="content">
      <div className="container">
        <div className="my-input">

          <form className="main-class">
            <input type="text" id="username" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="in1 main-number" type="number" id="number1" placeholder="++ Number" value={number1} onChange={(e) => setNumber1(e.target.value)} />
            <input className="in1 main-number" type="number" id="number2" placeholder="-- Number" value={number2} onChange={(e) => setNumber2(e.target.value)} />
          </form>

        </div>
        <div className="main-input">
          <input type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="element-search">
          <div className="content-click">
            <div className="search">
              <div className="add-search" onClick={addSearchHandler}>Add Search</div>
            </div>
            <div className="add-item">
              <div className="add-submit" onClick={addSubmitHandler}>Add Submit</div>
            </div>
          </div>
          
          <div className="task-content">
            {taskItems.map((item, index) => (
              <div key={index} className={item.addclass ? 'positive' : 'negative'}>
                {item.text}
                <div className="Delete" onClick={() => Delete(index)}>Delete</div>
              </div>
            ))}

          </div>
          <div className="removeAll" onClick={removeAllHandler}>Remove All</div>
        </div>
        <div className="var"></div>
      </div>
    </div>

  );

}

export default App;
