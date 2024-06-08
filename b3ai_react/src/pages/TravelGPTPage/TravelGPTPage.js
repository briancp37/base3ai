import React, { useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  
import Navbar from '../../components/Navbar/Navbar'; 
import TabsComponent from '../../components/Tabs/Tabs';
import { AuthContext } from '../../services/providers/AuthContext';
import FlightSearchFilters from '../../components/Flights/SearchFilters/FlightSearchFilters';
import FlightsTable, { FlightsTableExpandable } from '../../components/Flights/DisplayTables/DisplayTables';
// import FlightsTableExpandable from '../../components/Flights/DisplayTables/DisplayTables';
import './TravelGPTPage.css'; // Importing CSS for styles
import ThreadFlightSearch from '../../components/Flights/SearchFilters/ThreadFlightSearch';
import FlightSearchBar from '../../components/Flights/SearchFilters/FlightSearchBar';
import RefreshButton from '../../components/Flights/SearchFilters/ThreadSearchFilters/RefreshButton';
import { Box } from '@mui/material';

const MemoizedFlightsTable = React.memo(FlightsTable);
const MemoizedFlightsTableExpandable = React.memo(FlightsTableExpandable);


function MultiSelectManager({ dest_arr=[], onDestClick }) {
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

function ContextMenu({ x, y, onEdit, onDelete, chat }) {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <button onClick={() => onEdit(chat)}>Edit</button>
      <button onClick={() => onDelete(chat.thread_id)}>Delete</button>
    </div>
  );
}

function TravelGPTPage() {

  const { user } = useContext(AuthContext); 

  const [value, setValue] = useState('')
  const [message, setMessage] = useState(null)
  const [lastHumanMessageId, setLastHumanMessageId] = useState('')
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState('New Chat');
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [flightSearchParamsArr, setFlightSearchParamsArr] = useState([]);
  const [editableFlightSearchParamsArr, setEditableFlightSearchParamsArr] = useState([]);
  const [currentFlightData, setCurrentFlightData] = useState(null);
  const [threadFlightData, setThreadFlightData] = useState([]);
  const [favoriteFlightData, setFavoriteFlightData] = useState(null);
  const [itineraries, setItineraries] = useState([])
  const [selectedDests, setSelectedDests] = useState([]);
  const [stops, setStops] = useState('any');
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectAllAirlines, setSelectAllAirlines] = useState(true);
  const [carryOnBag, setCarryOnBag] = useState(0);
  const [price, setPrice] = useState(1000);
  const [outboundTime, setOutboundTime] = useState(0);
  const [returnTime, setReturnTime] = useState(0);
  const [layoverDuration, setLayoverDuration] = useState(0);
  const [connectingAirports, setConnectingAirports] = useState([]);
  const [allConnectingAirports, setAllConnectingAirports] = useState(true);
  const [flightDuration, setFlightDuration] = useState(0);
  const [showFlightSearchFilters, setShowFlightSearchFilters] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, chat: null });
  const [showMessageId, setShowMessageId] = useState(false);
  
  useEffect(() => {
    if (user && user.user_id) {
      if (previousChats.length === 0) {
        console.log('useEffect[user]()', user);
        fetchUserFavoriteFlights(user.user_id);
        fetchUserThreads(user.user_id);
        setCurrentThreadId();
      }
    }
  }, [user]);

  // useEffect(() => {
  //     console.log('useEffect[user]()', user);
  //     fetchUserFavoriteFlights(user.user_id);
  //     fetchUserThreads(user.user_id);
  //     setCurrentThreadId();
  // }, [currentThreadId]);


  const fetchUserThreads = async (user_id) => {
    try {
      const response = await fetch(`https://api.base3ai.net/travel/database/user_threads?user_id=${user_id}`);
      if (!response.ok) { throw new Error('Failed to fetch user threads') }
      const threads = await response.json();
      setPreviousChats(prevChats => threads.map(thread => ({ 
        title: thread.thread_name, 
        thread_id: thread.thread_id, 
        ...(thread.history ? { history: thread.history } : {})
      })));
    } catch (error) {
      console.error('Error fetching user threads:', error);
    }
  };

  const fetchFlightSearchParams = async (user_id, thread_id, ai_message_id) => {
    try {
      const backend_params = {
        user_id,
        thread_id,
        ...(ai_message_id && { ai_message_id })
      };
      const queryString = new URLSearchParams(backend_params).toString();
      const url = `https://api.base3ai.net/travel/database/user/flight_search_params?${queryString}`;
      const response = await fetch(url);
      if (!response.ok) { throw new Error('Failed to fetch user threads') }
      const flightSearchParamsRet = await response.json();
      const flightSearchParamsObj = flightSearchParamsRet['data'];
      // setFlightSearchParams({
      //   user_id,
      //   thread_id,
      //   ...(ai_message_id && { ai_message_id })
      // })
      console.log('fetchFlightSearchParams.flightSearchParamsObj', flightSearchParamsObj)
      const mergedParamsObj = [...flightSearchParamsArr, ...flightSearchParamsObj].reduce((acc, param) => {
          acc[param.ai_message_id] = param;
          return acc;
      }, {});
      const mergedSearchParams = Object.values(mergedParamsObj);
      console.log('fetchFlightSearchParams.mergedSearchParams', mergedSearchParams)
      setFlightSearchParamsArr(mergedSearchParams);
      setEditableFlightSearchParamsArr(mergedSearchParams);
      // setFlightSearchParams(prevState => ({
      //   ...prevState,
      //   [ai_message_id]: {
      //       ...(prevState[ai_message_id] || {}),
      //       ...flightSearchParamsObj
      //   }
      // }));
    } catch (error) {
      console.error('Error fetching flightSearchParams:', error);
    }
  };

  // const getThreadFlightSearchParams = async (fetchFlightSearchParams) => {
    
  // }

  const fetchUserFavoriteFlights = async (user_id) => {
    try {
      const response = await fetch(`https://api.base3ai.net/travel/database/user/favorite_flights?user_id=${user_id}&fav_type=user_fav`);
      if (!response.ok) { throw new Error('Failed to fetch user threads') }
      const favorites = await response.json();
      // console.log('fetchUserFavoriteFlights.favorites', favorites)
      setFavoriteFlightData(favorites['data']);
      // console.log('fetchUserFavoriteFlights.favoriteFlightData', favoriteFlightData)
    } catch (error) {
      console.error('Error fetching user threads:', error);
    }
  };


  const createNewChat = async () => {
    const newThreadId = uuidv4();
    console.log('createNewChat.newThreadId', newThreadId)
    const newChatName = value ? value.substring(0, 16) : `Chat ${previousChats.length + 1}`;
    setCurrentThreadId(newThreadId);
    setMessage(null);
    setValue("");
    setCurrentTitle(newChatName);
    // setCurrentTitle(`Chat ${previousChats.length + 1}`);
    console.log('createNewChat.user', user);
    try {
      const response = await fetch('https://api.base3ai.net/travel/database/user_threads', {
        method: 'POST',
        body: JSON.stringify({
          thread_id: newThreadId,
          thread_name: newChatName,
          user_id: user.user_id // Replace with actual user ID
        }),
        headers: {'Content-Type': 'application/json'}
      });
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Failed to create new chat in the database');
      }

      const newThread = await response.json();
      // setPreviousChats([...previousChats, { title: newThread.thread_name, thread_id: newThread.thread_id }]);
      setPreviousChats(prevChats => [
        ...previousChats, 
        { title: newThread.thread_name, thread_id: newThread.thread_id }
      ]);
      setCurrentThreadId(newThread.thread_id);
      setCurrentTitle(newThread.thread_name);
      console.log(newThread.thread_name);
      console.log('New chat created in the database');
    } catch (error) {
      console.error('Error creating new chat in the database:', error);
    }
  }

  const getChat = async (user_id, thread_id, thread_title) => {;
    console.log('getChat.thread_id',thread_id)
    try {
      const response = await fetch(`https://api.base3ai.net/travel/database/thread?thread_id=${thread_id}&title=${thread_title}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      const chatHistory = await response.json();
      console.log('chatHistory', chatHistory);
      console.log('chatHistory[0][history]', chatHistory[0]['history']);
      console.log('previousChats', previousChats);
      console.log('currentThreadId', currentThreadId)

      setPreviousChats(prevChats => prevChats.map(chat => 
        chat.thread_id === thread_id 
          ? { 
            ...chat, 
            history: chatHistory[0]['history']
        } 
          : chat
      ));

      getThreadFlights(user_id, thread_id);

    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const deleteChat = async (thread_id) => {
    try {
      const response = await fetch(`https://api.base3ai.net/travel/database/user_threads?thread_id=${thread_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      setPreviousChats(previousChats.filter(chat => chat.thread_id !== thread_id));
      console.log('Chat deleted successfully');
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const updateChat = async (thread_id, newThreadName) => {
    try {
      const response = await fetch('https://api.base3ai.net/travel/database/user_threads', {
        method: 'PUT',
        body: JSON.stringify({
          thread_id: thread_id,
          thread_name: newThreadName,
        }),
        headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        throw new Error('Failed to update chat');
      }

      console.log('previousChats', previousChats);
      setPreviousChats(prevChats => prevChats.map(chat => 
          chat.thread_id === thread_id ? { ...chat, title: newThreadName } : chat
      ));
      setCurrentTitle(newThreadName);
      console.log('previousChats', previousChats);
      console.log('Chat updated successfully');
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  // useEffect(() => {
  //   return() => {};
  // }, [currentThreadId]);

  // const handleClick = (uniqueTitle) => {
  const handleClick = (threadId) => {
    const chat = previousChats.find(chat => chat.thread_id === threadId);
    if (chat) {
      console.log('handleClick.chat',chat)
      setCurrentThreadId(threadId);
      setCurrentTitle(chat.title);
      setMessage(null);
      setValue("");
      fetchFlightSearchParams(user.user_id, threadId);
      getChat(user.user_id, threadId, chat.title); // Fetch chat history for the selected chat
      getThreadFlights(user.user_id, threadId); // Fetch flight data for the selected chat
      
    }
  };

  
  const handleDestClick = (dest) => {
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


  const getThreadFlights = async (user_id, thread_id) => {
    try {
      const response = await fetch(`https://api.base3ai.net/travel/database/user/thread_flights?user_id=${user_id}&thread_id=${thread_id}`);
      if (!response.ok) { throw new Error('Failed to fetch chat history') }
      const flights = await response.json();
      console.log('getThreadFlights.flights', flights);
      setThreadFlightData(flights['data']);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const getMessages = async () => {
      const options = {
          method: "POST",
          body: JSON.stringify({
              human_message: value,
              thread_id: currentThreadId, // null
              user_id: user.user_id, // null
              title: currentTitle
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try {
        const response = await fetch('https://api.base3ai.net/travel/flight_conversation_step', options);
        // const response = await fetch('https://api.base3ai.net/travel/conversation_step', options);
          console.log(response);
          const ret = await response.json();
          console.log('ret in getMessage');
          console.log(ret);
          const data = {'messages': [ret]};
          // setItineraries(ret['flights_tool']);
          if (ret['thread_name']) {
            console.log('ret[thread_name]', ret['thread_name'])
            updateChat(currentThreadId, ret['thread_name']) // setCurrentTitle(ret['thread_name'])
          } 
          setMessage(data);
          setLastHumanMessageId(ret['run_id']);
          if (ret['flight_search_params']) {
            setFlightSearchParamsArr((prev) => [...prev, ret['flight_search_params']]);
            setEditableFlightSearchParamsArr((prev) => [...prev, ret['flight_search_params']]);
          }
          if (ret['flight_data']) {
            setCurrentFlightData(ret['flight_data']);
            setThreadFlightData(threadFlightData => [
              ...threadFlightData,
              ...ret['flight_data']
            ])
          } else {
            setCurrentFlightData(null);
          }
      } catch (error) {
          console.log(error);
      }
  }
  function getLastAIMessageFromPrevChats(thread_id) {
    console.log('thread_id', thread_id);
    console.log('previousChats', previousChats);
    const chat = previousChats.find(chat => chat.thread_id === thread_id);
    if (!chat || !chat.history) {
      return null;
    }
    return chat?.history.filter(message => message.role === 'ai').pop() || null;
  }

  useEffect(() => {
    console.log('useEffect[message].message', message)
    // console.log('useEffect[message].previousChats', previousChats)
    // console.log('value', value);
    // console.log('currentTitle', currentTitle);
    if (value && message && currentTitle) {
      const new_ai_message_id = message['messages'][0]['ai_message_id'];
      const last_ai_message_id = getLastAIMessageFromPrevChats(currentThreadId)?.id;
      if (new_ai_message_id !== last_ai_message_id) {
        console.log('new_ai_message_id', new_ai_message_id);
        console.log('last_ai_message_id', last_ai_message_id);
        // console.log('previousChats0', previousChats);
        // console.log('currentThreadId', currentThreadId);

        setPreviousChats(prevChats => {
          console.log('prevChats before update', prevChats);
          const updatedChats = prevChats.map(chat => {
            if (chat.thread_id === currentThreadId) {
              // console.log('chat',chat);
              const newMessage = {
                role: 'user',
                content: value,
                id: message['messages'][0]['human_message_id'],
                run_id: message['messages'][0]['run_id'],
              };
        
              const aiMessages = message['messages'].map(msg => {
                const aiMessage = {
                  role: msg.role,
                  content: msg.content,
                  id: msg.ai_message_id,
                  run_id: msg.run_id,
                  ...(msg.flight_data !== undefined && { flight_data: msg.flight_data })
                };
                // console.log('aiMessage', aiMessage); // Log each aiMessage
                return aiMessage;
              });
        
              const updatedHistory = [
                ...(chat.history || []),
                newMessage,
                ...aiMessages
              ];
        
              // console.log('newMessage', newMessage); // Log the new user message
              // console.log('updatedHistory', updatedHistory); // Log the updated history
        
              return {
                ...chat,
                history: updatedHistory
              };
            }
            return chat;
          });
          console.log('updatedChats', updatedChats); // Log updatedChats
          return updatedChats;
        });
        console.log('previousChats1', previousChats);
        setValue("");
      }
    }
  }, [message])//, currentTitle])//, value, currentTitle])
  
  // useEffect(() => {
  //     console.log('useEffect[itineraries]');
  // }, [itineraries])


  // const currentChat = previousChats.filter(previousChat => previousChat.thread_id === currentThreadId)

   

//   const handleFavoriteClick = async (newFavoriteStatus) => {
//     setIsFavorite(newFavoriteStatus);
//     try {
//         const response = await fetch('https://api.base3ai.net/travel/database/user/favorite_flights', {
//             method: 'PUT',
//             body: JSON.stringify({
//                 user_id: flightData.user_id,
//                 thread_id: flightData.thread_id,
//                 kiwi_id: flightData.kiwi_id,
//                 fav_type: 'user_fav',
//                 is_favorite: newFavoriteStatus,
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log(response.data); // Log or handle response data as needed
//     } catch (error) {
//         console.error('Failed to update favorite status', error);
//         setIsFavorite(isFavorite); // Revert the state on error
//     }
// };
  const handleContextMenu = (event, chat) => {
    event.preventDefault();
    setContextMenu({
      show: true,
      x: event.clientX,
      y: event.clientY,
      chat
    });
  };

  const handleEditChat = (chat) => {
    const newTitle = prompt("Enter new chat name:", chat.title);
    if (newTitle && newTitle !== chat.title) {
      updateChat(chat.thread_id, newTitle);
    }
    setContextMenu({ show: false, x: 0, y: 0, chat: null });
  };

  const handleDeleteChat = (thread_id) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteChat(thread_id);
    }
    setContextMenu({ show: false, x: 0, y: 0, chat: null });
  };

  useEffect(() => {
    // console.log('useEffect[].favoriteFlightData', favoriteFlightData);
    const handleClickOutside = (event) => {
      if (!event.target.closest('.context-menu') && !event.target.closest('.travelgpt-history li')) {
        setContextMenu({ show: false, x: 0, y: 0, chat: null });
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /////////////
  // FLIGHTS //
  /////////////
  const toggleFlightSearchFilters = () => {
    setShowFlightSearchFilters(!showFlightSearchFilters);
  };

  const filteredMessageFlightData = ({ threadFlightData, chatMessage, user_id, thread_id }) => {
    console.log('filteredMessageFlightData.threadFlightData', threadFlightData);
    const filteredFlightData = threadFlightData.filter(obj => obj['user_id'] === user_id && obj['thread_id'] === thread_id && obj['thread_id'] === thread_id);
  
    return (
      <>
        {threadFlightData && chatMessage.role === 'AI' && filteredFlightData.length > 0 && (
          <FlightsTable flightDataArr={filteredFlightData} />
        )}
      </>
    );
  };
  const currentChat = useMemo(() => {
    return previousChats.find(chat => chat.thread_id === currentThreadId);
  }, [previousChats, currentThreadId]);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat =>previousChat.title)))
  const uniqueThreadIds = Array.from(new Set(previousChats.map(previousChat =>previousChat.thread_id)))
  // console.log('uniqueThreadIds',uniqueThreadIds);

  const chatHistory = useMemo(() => {
    return currentChat?.history || [];
  }, [currentChat]);

  const filteredFlightDataMap = useMemo(() => {
    console.log('filteredFlightDataMap');
    const map = {};
    chatHistory.forEach(chatMessage => {
      map[chatMessage.id] = threadFlightData.filter(flight => flight.ai_message_id === chatMessage.id);
    });
    return map;
  }, [chatHistory, threadFlightData]);



  // const FlightSearchComponent = ({ chatMessage }) => {
  //   const matchingFlightSearch = flightSearchParamsArr.find(param => param.ai_message_id === chatMessage.id);
  
  //   return (
  //     <>
  //       {threadFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && matchingFlightSearch && (
  //         <FlightSearchBar flightSearch={matchingFlightSearch} setFlightSearchParamsArr={setFlightSearchParamsArr} />
  //       )}
  //     </>
  //   );
  // };

  const FlightSearchComponent = ({ chatMessage }) => {
    console.log('FlightSearchComponent.editableFlightSearchParamsArr', editableFlightSearchParamsArr);
    const matchingFlightSearch = useMemo(() => {
      return editableFlightSearchParamsArr.find(param => param.ai_message_id === chatMessage.id);
    }, [editableFlightSearchParamsArr, chatMessage.id]);
    return (
      <>
        {threadFlightData.length > 0 && matchingFlightSearch && chatMessage.role === 'ai' && matchingFlightSearch && (
          <FlightSearchBar flightSearch={matchingFlightSearch} setEditableFlightSearchParamsArr={setEditableFlightSearchParamsArr} />
        )}
      </>
    );
  };

  // useEffect(() => {
  //   console.log('useEffect[chatMessage]', );
  //   // return () => {
  //   //   document.removeEventListener('click', handleClickOutside);
  //   // };
  // }, []);

  return (
      <div>
          <Navbar />
          <div className="travelgpt-container">
              {/* <section className="travelgpt-side-bar"> */}
              <div className="flight-search-filters-container">
                <button 
                  className={`flight-search-filters-toggle-button ${showFlightSearchFilters ? 'open' : ''}`}
                  onClick={toggleFlightSearchFilters}
                >
                  {showFlightSearchFilters ? '❮' : '❯'}
                </button>
                <div className={`flight-search-filters-app ${showFlightSearchFilters ? 'open' : 'closed'}`}>
                  {showFlightSearchFilters && (
                    <FlightSearchFilters
                      stops={stops}
                      setStops={setStops}
                      selectedAirlines={selectedAirlines}
                      setSelectedAirlines={setSelectedAirlines}
                      selectAllAirlines={selectAllAirlines}
                      setSelectAllAirlines={setSelectAllAirlines}
                      carryOnBag={carryOnBag}
                      setCarryOnBag={setCarryOnBag}
                      price={price}
                      setPrice={setPrice}
                      outboundTime={outboundTime}
                      setOutboundTime={setOutboundTime}
                      returnTime={returnTime}
                      setReturnTime={setReturnTime}
                      layoverDuration={layoverDuration}
                      setLayoverDuration={setLayoverDuration}
                      connectingAirports={connectingAirports}
                      setConnectingAirports={setConnectingAirports}
                      allConnectingAirports={allConnectingAirports}
                      setAllConnectingAirports={setAllConnectingAirports}
                      flightDuration={flightDuration}
                      setFlightDuration={setFlightDuration}
                      closeFilters={toggleFlightSearchFilters}
                    />
                  )}
                </div>
              </div>


              <section className='travelgpt-side-bar'>
                <SelectedDests dest_arr={selectedDests} onRemoveDest={handleRemoveDest} />
                <button className="travelgpt-button" onClick={createNewChat}>+ New chat</button>
                <ul className="travelgpt-history">
                    {/* {uniqueThreadIds.map((threadId, index) => (
                      <li 
                        key={index} 
                        onContextMenu={(e) => handleContextMenu(e, { title: previousChats.find(chat => chat.thread_id === threadId).title, thread_id: threadId})} 
                        onClick={() => handleClick(threadId)}
                        className={currentThreadId === threadId ? 'selected' : ''}
                      >{previousChats.find(chat => chat.thread_id === threadId).title}</li>
                    ))} */}
                    {uniqueThreadIds.map((threadId, index) => {
                      const chat = previousChats.find(chat => chat.thread_id === threadId);
                      if (!chat) {
                        return null; // Skip rendering if chat is not found
                      } else {
                        // console.log('previousChats', previousChats)
                        // console.log('currentThreadId', currentThreadId)
                        // console.log('threadId', threadId)
                      }
                      return (
                        <li
                          key={index}
                          onContextMenu={(e) => handleContextMenu(e, { title: chat.title, thread_id: threadId })}
                          onClick={() => handleClick(threadId)}
                          className={currentThreadId === threadId ? 'selected' : ''}
                        >
                          {chat.title}
                        </li>
                      );
                    })}
                    {/* {uniqueTitles.map((uniqueTitle, index) => (
                      <li 
                        key={index} 
                        onContextMenu={(e) => handleContextMenu(e, { title: uniqueTitle, thread_id: previousChats.find(chat => chat.title === uniqueTitle).thread_id })} 
                        onClick={() => handleClick(uniqueTitle)}
                        className={currentTitle === uniqueTitle ? 'selected' : ''}
                      >{uniqueTitle}</li>
                    ))} */}
                </ul>
                <nav>
                    Made by Brian
                </nav>
              </section>


              {/* <Tabs
                tab0={Tab0}>
              </Tabs> */}
              <section className="travelgpt-main">
                <div className="travel-gpt-main-chat-history">
                  {/* {!currentTitle && <h1>TravelGPT</h1>} */}
                  {/* <div>
                    <input
                      onChange={(event) => {
                        setShowMessageId(event.target.value);
                      }}
                    />
                  </div> */}
                  <div className="chat-title">
                    <p>{currentTitle} -- {currentThreadId}</p>
                  </div>
                  {/* <ul className="travelgpt-feed">
                    {previousChats.find(chat => chat.thread_id === currentThreadId)?.history?.map((chatMessage, index) => {
                      console.log('chatMessage',chatMessage);
                      console.log('chatMessage.id',chatMessage.id);
                      console.log('threadFlightData',threadFlightData);
                      // const filteredFlightData = threadFlightData.filter(flight => flight.ai_message_id === chatMessage.id);
                      // const filteredFlightData = threadFlightData?.filter(flight => {
                      //   // console.log(flight);
                      //   // console.log('Comparing:', flight.ai_message_id, chatMessage.id);
                      //   return flight.ai_message_id === chatMessage.id;
                      // }) || [];

                      const filteredFlightData = filteredFlightDataMap[chatMessage.id] || [];
                      console.log('filteredFlightData',filteredFlightData);
                      return (
                        <li key={index}>
                          <div className="chat-message">
                            <p className="role">{chatMessage.role}</p>
                            <div className="content">
                              <pre>{chatMessage.content}</pre>
                              <div className="message-flight-table">
                                {filteredFlightData.length > 0 && chatMessage.role === 'AI' && (
                                  <FlightsTable flightDataArr={filteredFlightData} />
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    )}
                  </ul> */}
                  <ul className="travelgpt-feed">
                    {previousChats.find(chat => chat.thread_id === currentThreadId)?.history?.map((chatMessage, index) => {

                      const filteredFlightData = filteredFlightDataMap[chatMessage.id] || [];

                      console.log('chatMessage', chatMessage);
                      // console.log('currentThreadId', currentThreadId);
                      // console.log('filteredFlightData', filteredFlightData);
                      // console.log('flightSearchParams', flightSearchParamsArr);
                      // console.log(flightSearchParamsArr.find(param => param.ai_message_id === chatMessage.id));
                      return (
                        <li key={index}>
                          <div className="chat-message">
                            <p className="role">{chatMessage.role}</p>
                            <div className="content">
                              <pre>{chatMessage.content}</pre>
                              <div className="search-params-thread">
                                {/* <pre>
                                  {JSON.stringify(flightSearchParamsArr.find(param => param.ai_message_id === chatMessage.id), 2)}
                                </pre> */}

                                {/* {/* {threadFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && ( */}
                                {filteredFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && (
                                <div>
                                  <Box 
                                    sx={{ 
                                        width: '100%', 
                                        borderBottom: '1.5px solid gray', 
                                        margin: '20px 0px 5px 0px' 
                                    }} 
                                  />
                                  <Box 
                                    sx={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      padding: '0 0 8px 20px'
                                    }}
                                  >
                                    <p style={{ margin: 0, padding: 0 }}>Search Query</p>
                                    <Box sx={{ marginLeft: '10px' }}>
                                      <RefreshButton />
                                    </Box>
                                  </Box>
                                  {/* <p style={{'padding':'0 0 8px 20px'}}>Search Query</p>
                                  <RefreshButton/> */}
                                </div>
                                )}
                                <div className="search-params-component">
                                  <FlightSearchComponent chatMessage={chatMessage} />
                                </div>
                                {/* {threadFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && (
                                  <FlightSearchBar flightSearch={flightSearchParamsArr.find(param => param.ai_message_id === chatMessage.id)} setFlightSearchParamsArr={setFlightSearchParamsArr}/>
                                )} */}
                                {/* {flightSearchParams.find(param => param.ai_message_id === chatMessage.id)} */}
                              </div>
                              <div>
                              {filteredFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && (
                                    <div>
                                      <Box 
                                        sx={{ 
                                            width: '100%', 
                                            borderBottom: '1px solid gray', 
                                            margin: '13px 0px 5px 0px' 
                                        }} 
                                    />
                                    <p style={{'padding':'0 0 8px 20px'}}>Search Results</p>
                                  </div>
                                  )}
                                </div>
                              <div className="message-flight-table">
                                {/* {filteredFlightData.length > 0 && flightSearchParamsArr.length > 0 && chatMessage.role === 'ai' && (
                                    <div>
                                      <Box 
                                        sx={{ 
                                            width: '100%', 
                                            borderBottom: '1px solid gray', 
                                            margin: '13px 0px 5px 0px' 
                                        }} 
                                    />
                                    <p style={{'padding':'0 0 8px 0px'}}>Search Results</p>
                                  </div>
                                  )} */}
                                {filteredFlightData.length > 0 && chatMessage.role === 'ai' && (
                                  <MemoizedFlightsTable 
                                    flightDataArr={filteredFlightData} 
                                    threadFlightData={threadFlightData} 
                                    setThreadFlightData={setThreadFlightData} 
                                    setFavoriteFlightData={setFavoriteFlightData}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <MultiSelectManager/>
                  <div className="travelgpt-bottom-section">
                      <div className="travelgpt-input-container">
                          <input className="travelgpt-chat-user-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                          <div className="submit-button" id="submit" onClick={getMessages}>➢ </div>
                      </div>
                      {/* FlightsTableExpandable */}
                      <p className="travelgpt-info">
                          Brian GPT Free Research Preview.
                      </p>
                  </div>
                </div>
                <div className="expandable-flight-table">
                  {favoriteFlightData && 
                    // <FlightsTableExpandable flightDataArr={favoriteFlightData} />
                    <MemoizedFlightsTableExpandable
                      flightDataArr={favoriteFlightData} 
                      threadFlightData={threadFlightData} 
                      setThreadFlightData={setThreadFlightData} 
                      setFavoriteFlightData={setFavoriteFlightData}
                    />
                  }
                </div>
              </section>
          </div>
          {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} onEdit={handleEditChat} onDelete={handleDeleteChat} chat={contextMenu.chat} />}
      </div>
  )
}
 
export default TravelGPTPage;