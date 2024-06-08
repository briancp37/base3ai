import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar'; 
// import './ChatGPTPage.css';
import './Base3GTPPage.css';

function PromptApp() {
  // Array of button labels
  const buttons = ["be concise and only return code, no other words", "assume I have ", "prompt3"];
  // State to track which button is clicked
  const [clicked, setClicked] = useState(Array(buttons.length).fill(false));
  // State to track text inputs and their check states
  const [inputs, setInputs] = useState([{ text: "", checked: false }]);

  const handleButtonClick = index => {
    // Toggle the state of the clicked button
    const newClicked = [...clicked];
    newClicked[index] = !newClicked[index];
    setClicked(newClicked);
  };

  const handleInputChange = (index, newText) => {
    const newInputs = [...inputs];
    newInputs[index].text = newText;
    setInputs(newInputs);
  };

  const handleCheckboxChange = index => {
    const newInputs = [...inputs];
    newInputs[index].checked = !newInputs[index].checked;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { text: "", checked: false }]);
  };

  return (
    <div className="PromptApp" style={{ display: 'flex', height: '100vh' }}>
      <div className="left-column" >
        {buttons.map((label, index) => (
          <button 
            className={`prompt-button ${clicked[index] ? 'prompt-button-clicked' : ''}`}
            key={index}
            // style={{ backgroundColor: clicked[index] ? 'yellow' : 'white', margin: '10px' }}
            onClick={() => handleButtonClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="right-column">
        {inputs.map((input, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              value={input.text}
              onChange={e => handleInputChange(index, e.target.value)}
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
            <input
              type="checkbox"
              checked={input.checked}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ))}
        <button onClick={addInput}>Add Input</button>
      </div>
    </div>
  );
}

// export default App;




function Base3GPTPage() {

    const [value, setValue] = useState(null)
    const [message, setMessage] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)

    const createNewChat = () => {
        setMessage(null)
        setValue("")
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue("")
    }

    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            // const response = await fetch('https://api.base3ai.net/completions', options)
            const response = await fetch('http://api.base3ai.net/completions', options)
            // const response = await fetch('https://13.59.114.78:8000/completions', options)
            // const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json()
            console.log(data)
            setMessage(data.choices[0].message)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('currentTitle: ', currentTitle)
    // console.log('message: ', message)
    // console.log('value: ', value)
    
    useEffect(() => {
        // console.log(currentTitle, value, message)
        // console.log('here')
        if (!currentTitle && value && message) {
            setCurrentTitle(value)
        }
        if (currentTitle && value && message) {
            setPreviousChats(prevChats => (
                [...prevChats, 
                    {
                        title: currentTitle, 
                        role: "user", 
                        content: value
                    }, 
                    {
                        title: currentTitle, 
                        role: message.role, 
                        content: message.content
                    }
                ]
            ))
        }
    }, [message, currentTitle])

    console.log('previousChats', previousChats)
    // console.log(message)
    // console.log('hi')

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat =>previousChat.title)))
    console.log('uniqueTitles5', uniqueTitles)

    return (
        <div>
            <Navbar />
            <div className="chat-container">
                <section className='side-bar'>
                    <button className="button-new-chat" onClick={createNewChat}>+ New chat</button>
                    <ul className="history">
                        {uniqueTitles.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                    </ul>
                    <nav>
                        Made by Brian
                    </nav>
                </section>
                <section className="main-briangpt">
                    {!currentTitle && <h1>Base3GPT</h1>}
                    <PromptApp/>
                    <ul className="feed">
                        {currentChat?.map((chatMessage, index) => <li key={index}>
                            <p className="role">{chatMessage.role}</p>
                            <p>{chatMessage.content}</p>
                        </li>)}
                    </ul>
                    <div className="bottom-section">
                        <div className="input-container">
                            <input value={value} onChange={(e) => setValue(e.target.value)}/>
                            <div id="submit" onClick={getMessages}>➢ </div>
                        </div>
                        <p className="info">
                            Brian GPT Free Research Preview.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Base3GPTPage;