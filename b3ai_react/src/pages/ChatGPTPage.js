import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar/Navbar'; 

import './ChatGPTPage.css';



function ChatGPTPage() {

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
            const response = await fetch('https://api.base3ai.net/completions', options)
            // const response = await fetch('http://api.base3ai.net/completions', options)
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
            <div className="chatgpt-container">
                <section className='chatgpt-side-bar'>
                    <button className="chatgpt-button" onClick={createNewChat}>+ New chat</button>
                    <ul className="history">
                        {uniqueTitles.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                    </ul>
                    <nav>
                        Made by Brian
                    </nav>
                </section>
                <section className="main-briangpt">
                    {!currentTitle && <h1>BrianGPT</h1>}
                    <ul className="feed">
                        {currentChat?.map((chatMessage, index) => <li key={index}>
                            <p className="role">{chatMessage.role}</p>
                            <p>{chatMessage.content}</p>
                        </li>)}
                    </ul>
                    <div className="bottom-section">
                        <div className="input-container">
                            <input className="chat-user-input" value={value} onChange={(e) => setValue(e.target.value)}/>
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

export default ChatGPTPage;