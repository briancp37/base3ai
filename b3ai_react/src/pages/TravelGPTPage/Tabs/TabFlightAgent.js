import { MultiSelectManager, useTab } from "../TabsTravelGPTPage";


function TabFlightAgent() {
    const { 
        currentChat, 
        itineraries, 
        setitineraries, 
        selectedDests, 
        setSelectedDests, 
        handleDestClick, 
        handleRemoveDest, 
        value, 
        setValue, 
        // getMessages,
        message, 
        setMessage,
        currentTitle
    } = useTab();

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
            const response = await fetch('https://api.base3ai.net/flight_agent', options);
            console.log(response);
            const ret = await response.json();
            console.log('ret in getMessage');
            console.log(ret);
            setitineraries(ret['flights_tool']);
            setMessage(ret);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flight-tab">
            {/* {currentTitle && <h1>TravelGPT</h1>} */}
            <ul className="feed">
                {currentChat?.map((chatMessage, index) => 
                <li key={index}>
                    <p className="role">{chatMessage.role}</p>
                    <div>
                    <pre>{chatMessage.content}</pre>
                    { chatMessage.dest_arr && 
                        <MultiSelectManager 
                        dest_arr={chatMessage.dest_arr}  
                        onDestClick={handleDestClick}
                        /> }
                    </div>
                </li>
                )}
            </ul>
            <MultiSelectManager/>
            <div className="bottom-section">
                <div className="input-container">
                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={getMessages}>➢ </div>
                </div>
                <p className="info">
                    Brian GPT Free Research Preview.
                </p>
            </div>
        </div>
    );
}

export default TabFlightAgent;