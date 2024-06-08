import React, { useContext } from 'react';
// import React, { useEffect, useState, useContext } from 'react';
// import { jwtDecode } from 'jwt-decode';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OpticalObjectRecognition from './pages/OpticalObjectRecognition';
import ChatGPTPage from './pages/ChatGPTPage';
// import Llamma3Page from './pages/Llamma3Page';
import Base3GPTPage from './pages/Base3GPTPage';
import TravelGPTPage from './pages/TravelGPTPage/TravelGPTPage';
import TabsTravelGPTPage from './pages/TravelGPTPage/TabsTravelGPTPage';
// import DoodlePage from './pages/DoodlePage';
import AppLocal from './pages/LocalGPTPage/AppLocal';
import { AuthContext, AuthProvider } from './services/providers/AuthContext';
import './App.css';
// import './pages/ChatGPT.css';



function App() {

  // const { user, handleSignOut } = useContext(AuthContext);

  // const [ user, setUser ] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   var userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // }

  // function handleSignOut(event) {
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com',
  //     callback: handleCallbackResponse
  //   });  
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme : "outline", size: "large" }
  //   );
  //   google.accounts.id.prompt();
  // }, []);




  return (
    <div className="App">
      <AuthProvider>
        {/* { Object.keys(user).length != 0 &&
          < button onClick={ (e) => handleSignOut(e)}>SignOut</button>
        }
        { user &&
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        } */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/optical-object-recognition" element={<OpticalObjectRecognition />} />
            <Route path="/chatgpt" element={<ChatGPTPage />} />
            <Route path="/llama3" element={<ChatGPTPage />} />
            <Route path="/base3gpt" element={<Base3GPTPage />} />
            <Route path="/travelgpt" element={<TravelGPTPage />} />
            <Route path="/tabstravelgpt" element={<TabsTravelGPTPage />} />
            <Route path="/localgpt" element={<AppLocal />} />
            {/* <Route path="/doodle" element={<DoodlePage />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;