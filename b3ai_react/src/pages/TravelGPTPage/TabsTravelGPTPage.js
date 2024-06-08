import React, { createContext, useContext, useEffect, useState } from 'react';
// import Navbar from '.../components/Navbar/Navbar'; 
import './TravelGPTPage.css'; // Importing CSS for styles
import TabsComponent from '../../components/Tabs/Tabs';
import TabDestinationAgent from './Tabs/TabDestinationAgent';
import TabFlightAgent from './Tabs/TabFlightAgent';

import { AuthContext } from '../../services/providers/AuthContext';
// import MultiSelectManager from '../components/MultiSelect/MultiSelect';
// import './ChatGPTPage.css';


const TabContext = createContext();

export function useTab() {
    return useContext(TabContext);
}

// export function TabProvider({ children }) {
//     const [sharedState, setSharedState] = useState("");
//     const updateState = (newValue) => {
//         setSharedState(newValue);
//     };
    
//     const [itineraries, setitineraries] = useState([])
//     const [selectedDests, setSelectedDests] = useState([]);
//     const handleDestClick = (dest) => {
//         // setSelectedDests(prevDests => [...prevDests, dest]);
//         setSelectedDests(prevDests => {
//             if (!prevDests.includes(dest)) {
//                 return [...prevDests, dest];
//             } else {
//                 return prevDests;
//             }
//         });
//     };
//     const handleRemoveDest = (dest) => {
//         setSelectedDests(prevDests => prevDests.filter(c => c !== dest));
//     };

//     return (
//         <TabContext.Provider value={{ sharedState, updateState, itineraries, setitineraries, selectedDests, setSelectedDests, handleDestClick, handleRemoveDest }}>
//             {children}
//         </TabContext.Provider>
//     );
// }

// function TabDestinationAgent() {
//     const { 
//         currentChat, 
//         itineraries, 
//         setitineraries, 
//         selectedDests, 
//         setSelectedDests, 
//         handleDestClick, 
//         handleRemoveDest, 
//         value, 
//         setValue, 
//         getMessages,
//         message, 
//         currentTitle
//     } = useTab();
//     return (
//         <div className="destination-tab">
//         {/* {currentTitle && <h1>TravelGPT</h1>} */}
//         <ul className="feed">
//             {currentChat?.map((chatMessage, index) => 
//             <li key={index}>
//                 <p className="role">{chatMessage.role}</p>
//                 <div>
//                 <pre>{chatMessage.content}</pre>
//                 { chatMessage.dest_arr && 
//                     <MultiSelectManager 
//                     dest_arr={chatMessage.dest_arr}  
//                     onDestClick={handleDestClick}
//                     /> }
//                 </div>
//             </li>
//             )}
//         </ul>
//         <MultiSelectManager/>
//         <div className="bottom-section">
//             <div className="input-container">
//                 <input value={value} onChange={(e) => setValue(e.target.value)}/>
//                 <div id="submit" onClick={getMessages}>➢ </div>
//             </div>
//             <p className="info">
//                 Brian GPT Free Research Preview.
//             </p>
//         </div>
//         </div>
//     );
// }

// function TabFlightAgent() {
//     const { sharedState, updateState } = useTab();
//     return (
//         <div>
//             <h1>Tab One</h1>
//             <p>Shared state: {sharedState}</p>
//             <button onClick={() => updateState("Updated from Tab One")}>Update State</button>
//         </div>
//     );
// }

function TabLocalAgent() {
    const { sharedState, updateState } = useTab();
    return (
        <div>
            <h1>Tab Two</h1>
            <p>Shared state: {sharedState}</p>
            <button onClick={() => updateState("Updated from Tab Two")}>Update State</button>
        </div>
    );
}



// function TabApp() {
//     const tabs = [
//         { label: "Tab 1", content: <TabOne /> },
//         { label: "Tab 2", content: <TabTwo /> },
//         { label: "Tab 3", content: <TabThree /> },
//     ];

//     return (
//         <TabProvider>
//             <TabsComponent tabs={tabs} />
//         </TabProvider>
//     );
// }



// const TravelGPTPage = () => {
//   return (
//     <div>
//       <Navbar />
//       <h1>TravelGPT</h1>
//       <FlightItinerary flights={flightData} />
//     </div>
//   );
// };

function DataTable({ data_in }) {
  console.log('Inside DataTable');
  console.log(data_in);
  if (data_in.length === 0) {
    data_in = [
      { kiwi_id: '1', destination_airport: 'Alice', origin_airport: 'AUS', price: 24 },
      { kiwi_id: '2', destination_airport: 'Bob', origin_airport: 'AUS', price: 30 },
      { kiwi_id: '3', destination_airport: 'Carol', origin_airport: 'AUS', price: 22 },
      { kiwi_id: '4', destination_airport: 'Dean', origin_airport: 'AUS', price: 22 },
    ];
  }
  return (
    <table>
      <thead>
        <tr>
          <th>kiwi_id</th>
          <th>destination_airport</th>
          <th>origin_airport</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        {data_in.map(item => (
          <tr key={item.kiwi_id}>
            <td>{item.kiwi_id.substring(0, 8)}</td>
            <td>{item.destination_airport}</td>
            <td>{item.origin_airport}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// function MultiSelectManager() {
//   const [selections, setSelections] = useState(['New York, USA', 'Paris, France', 'Tokyo, Japan']);
//   const [inputSelection, setInputSelection] = useState('');

//   const handleRemoveSelection = (selectionToRemove) => {
//       setSelections(selections.filter(selection => selection !== selectionToRemove));
//   };

//   const handleAddSelection = (event) => {
//       event.preventDefault(); // Prevent form submission from reloading the page
//       if (inputSelection && !selections.includes(inputSelection)) { // Prevent adding empty or duplicate selections
//           setSelections([...selections, inputSelection]);
//           setInputSelection(''); // Clear input field after adding
//       }
//   };

//   return (
//       <div>
//           {selections.map(selection => (
//               <button key={selection} onClick={() => handleRemoveSelection(selection)}>
//                   {selection} <span style={{color: 'red', cursor: 'pointer'}}>x</span>
//               </button>
//           ))}
//           <form onSubmit={handleAddSelection}>
//               <input
//                   type="text"
//                   placeholder="Add a city"
//                   value={inputSelection}
//                   onChange={e => setInputSelection(e.target.value)}
//               />
//               <button type="submit">Add Selection</button>
//           </form>
//       </div>
//   );
  
// };

export function MultiSelectManager({ dest_arr=[], onDestClick }) {
  return (
      <div>
          {dest_arr.map((dest, index) => (
              <button key={index} className="dest-button" onClick={() => onDestClick(dest)}>{dest}</button>
          ))}
      </div>
  );
}

function SelectedDests({ dest_arr=[], onRemoveDest }) {
  return (
      <div>
          {/* {dest_arr.map((dest, index) => (
              <div key={index}>
                  <button className="dest-button">{dest}</button>
                  <button onClick={() => onRemoveDest(dest)}>x</button>
              </div>
          ))} */}
          {dest_arr.map(dest => (
            <button className="destination-button" key={dest} onClick={() => onRemoveDest(dest)}>
                {dest} <span style={{color: 'red', cursor: 'pointer'}}>x</span>
            </button>
          ))}
      </div>
  );
}

// function Tabs({ children }) {
//   const [selectedTab, setSelectedTab] = useState(0);
//   console.log(children);
//   return (
//       <div className="container">
//           <div className="tabs">
//               {children.map((child, index) => (
//                   <button key={index} onClick={() => setSelectedTab(index)}>
//                       {child.props.title}
//                   </button>
//               ))}
//           </div>
//           <div className="main-gpt">
//               {children[selectedTab]}
//           </div>
//       </div>
//   );
// }








function TabsTravelGPTPage() {

  const { user, handleSignOut } = useContext(AuthContext);

    const tabs = [
        { label: "Destination Agent", content: <TabDestinationAgent /> },
        { label: "Flight Agent", content: <TabFlightAgent /> },
        { label: "Local Agent", content: <TabLocalAgent /> },
    ];

  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
  const [itineraries, setitineraries] = useState([])
  const [selectedDests, setSelectedDests] = useState([]);

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
  const handleDestClick = (dest) => {
    // setSelectedDests(prevDests => [...prevDests, dest]);
    setSelectedDests(prevDests => {
        if (!prevDests.includes(dest)) {
            return [...prevDests, dest];
        } else {
            return prevDests;
        }
    });
  };

  const handleRemoveDest = (dest) => {
    setSelectedDests(prevDests => prevDests.filter(c => c !== dest));
  };

  // const getMessages = async () => {
  //     const options = {
  //         method: "POST",
  //         body: JSON.stringify({
  //             message: value
  //         }),
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     }
  //     try {
  //         const response = await fetch('https://api.base3ai.net/travelgpt', options);
  //         console.log(response);
  //         const ret = await response.json();
  //         console.log('ret in getMessage');
  //         console.log(ret);
  //         setitineraries(ret['flights_tool']);
  //         setMessage(ret);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // console.log('currentTitle: ', currentTitle)
  // console.log('message: ', message)
  // console.log('value: ', value)
  
  useEffect(() => {
    // console.log(currentTitle, value, message)
    console.log('useEffect[message, currentTitle]')
    console.log('value');
    console.log(value);
    console.log('message');
    console.log(message);
    if (!currentTitle && value && message) {
        console.log('setCurrentTitle(value)');
        setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
        console.log('setPreviousChats()');
        setPreviousChats(prevChats => (
            [
              ...prevChats, 
              ...[{'title': currentTitle, 'role': 'user', 'content': value}],
              ...message['messages'].map(message => ({
                title: currentTitle,
                role: message.role,
                content: message.content,
                ...(message.dest_arr && {dest_arr: message.dest_arr}) // Conditionally add dest_arr if it exists
              }))
            ]
        ))
    }
}, [message, currentTitle])
  
  useEffect(() => {
      // console.log(currentTitle, value, message)
      console.log('useEffect[itineraries]');
  }, [itineraries])

  // console.log('previousChats', previousChats)
  // console.log(message)
  // console.log('hi')

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat =>previousChat.title)))
  // console.log('uniqueTitles5', uniqueTitles)

  // const currentDate = new Date();
  // const dateString = currentDate.toString();
  // console.log(dateString);


    return (
        <div>
            <TabContext.Provider 
                value={{ 
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
            }}>
      
          {/* <Navbar /> */}
          <div className="chat-container">
              <section className="travel-side-bar">

              </section>
              <section className='side-bar'>
                <SelectedDests dest_arr={selectedDests} onRemoveDest={handleRemoveDest} />
                <button onClick={createNewChat}>+ New chat</button>
                <ul className="history">
                    {uniqueTitles.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                </ul>
                <nav>
                    Made by Brian
                </nav>
              </section>
              {/* <Tabs
                tab0={Tab0}>
              </Tabs> */}
              <section className="main-briangpt">
                {currentTitle && <h1>TravelGPT</h1>}
                    <TabsComponent tabs={tabs} />
                {/* <div className="destination-tab">
                  {!currentTitle && <h1>TravelGPT</h1>}
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
                </div> */}
              </section>
          </div>
        </TabContext.Provider>
      </div>
  )
}
// export default TabApp;
export default TabsTravelGPTPage;

