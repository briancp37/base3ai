/* global gapi */
import React, { createContext, useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin } from 'react-google-login';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  /* global google */

  const [user, setUser] = useState(null);
  const [userDatabaseLoggedIn, setUserDatabaseLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const signInDivRef = useRef(null);
  const googleClientInitialized = useRef(false); // Add this line
  const GOOGLE_CLIENT_ID = '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com'



  useEffect(() => {
    // console.log('useEffect()[] user', user);
    const token = localStorage.getItem('token');
    console.log('useEffect()[] token', token);
    // const decodedToken = token ? jwtDecode(token) : null;
    // console.log('useEffect()[] token', token);
    // console.log('useEffect()[] decodedToken', decodedToken);

    const checkAndAuthenticate = async () => {
      if (token) {
        if (isTokenExpired(token)) {
          console.log('token expired.')
          await refreshAuthToken();
        } else {
          authenticateUser(token);
        }
        if (signInDivRef.current) {
          signInDivRef.current.hidden = true;
        }
      } else {
        setLoading(false);
      }
    };

    checkAndAuthenticate();

    // console.log('useEffect()[] user', user);
    if (typeof google !== 'undefined' && google.accounts) {
      if (!googleClientInitialized.current) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(
          signInDivRef.current,
          { theme: 'outline', size: 'large' }
        );
        if (!token) {
          google.accounts.id.prompt();
        }
        googleClientInitialized.current = true; // Set to true after initialization
      } else {
        // console.error('Google Sign-In library is not loaded.');
      }
    }
  }, []);


  const isTokenExpired = (token) => {
    // var decodedToken = '';
    try {
      const decodedToken = jwtDecode(token);   
    // } catch (error) {
    //   console.log('Error checking token expiration:', error);
    // }
    // try {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix format
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.log('Error checking token expiration:', error);
    }
    return true
  };

  const authenticateUser = async (token) => {
    // console.log('authenticateUser()');
    try {
      const response = await fetch('https://api.base3ai.net/auth/google', {
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: {'Content-Type': 'application/json'}
      });
      // const userData = response.data;
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('token', token);
      if (!response.ok) {
        // throw new Error('Failed to create new chat in the database');
        console.log('authenticateUser.response', response);
        console.log('handleCallbackResponse.userData', userData);
      }
      else {
        console.log('User authenticated.')
      }
      setUserDatabaseLoggedIn(true);
      if (signInDivRef.current) {
        signInDivRef.current.hidden = true;
      }
      setLoading(false);
    } catch (error) {
      console.error('Error during authentication:', error);
      setLoading(false);
    }
  };

  const refreshAuthToken = async () => {
    // console.log('refreshAuthToken()');
    try {
      google.accounts.oauth2.initTokenClient({
        client_id: '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com',
        scope: 'email profile',
        callback: (tokenResponse) => {
          const token = tokenResponse.access_token;
          localStorage.setItem('token', token);
          authenticateUser(token);
        },
        error_callback: (error) => {
          console.error('Error during token refresh:', error);
          handleSignOut();
        },
      }).requestAccessToken();
    } catch (error) {
      console.error('Error during token refresh:', error);
      handleSignOut();
    }
  };


  function handleSignOut() {
    setUser(null);
    if (signInDivRef.current) {
        signInDivRef.current.hidden = false;
      }
    localStorage.removeItem('token');
    setLoading(false);
  }




  useEffect(() => {
    if (user !== null) { 
      console.log('AuthProvider.useEffect[user]()', user);
      if (signInDivRef.current) {
        signInDivRef.current.hidden = true; // Ensure the button is hidden if user is authenticated
      }
      setLoading(false);
    }
  }, [user]);


  const handleCallbackResponse = async (response) => {
    console.log('handleCallbackResponse', user);
    const { credential: token } = response;
    authenticateUser(token);
  };

  return (
    <AuthContext.Provider value={{ user, handleSignOut, signInDivRef, loading }}>
      <div ref={signInDivRef} id="signInDiv"></div>
      {children}
    </AuthContext.Provider>
  );
};
const Login = () => {
  const onSuccess = (response) => {
    console.log('Login successful:', response);
  };

  const onFailure = (response) => {
    console.error('Login failed:', response);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    isSignedIn: true,
  });

  return (
    <button onClick={signIn}>Sign in with Google</button>
  );
};


export { AuthContext, AuthProvider, Login };




  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   var decodedToken = jwtDecode(response.credential);
  //   const userObject = {
  //     google_id: decodedToken.sub,
  //     email: decodedToken.email,
  //     name: decodedToken.name,
  //     picture: decodedToken.picture,
  //   };
  //   console.log('userObject = ', userObject);
  //   setUser(userObject); 
    
  //   fetchUserData(userObject.email).then((fetchedUser) => {
  //     if (!fetchedUser || !fetchedUser.user_id) {
  //       console.log('New user detected, saving to database.');
  //       saveUserToDatabase(userObject);
  //     }
  //   });
    
  //   if (signInDivRef.current) {
  //       signInDivRef.current.hidden = true;
  //     } 
  //   localStorage.setItem('token', response.credential);
  //   setLoading(false);
  // }


  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     var userObject = jwtDecode(token);
  //     setUser(userObject);
  //     // fetchUserData(userObject.email);
  //     fetchUserData(userObject.email).then((fetchedUser) => {
  //       if (!fetchedUser || !fetchedUser.user_id) {
  //         console.log('New user detected, saving to database.');
  //         saveUserToDatabase(userObject);
  //       }
  //     });
  //     if (signInDivRef.current) {
  //       signInDivRef.current.hidden = true;
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  //   console.log('AuthProvider.useEffect[]().user', user);
  //   console.log('AuthProvider.useEffect[]().google', google);
  //   const initializeGoogleSignIn = () => {
  //     if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
  //       google.accounts.id.initialize({
  //         client_id: '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com',
  //         callback: handleCallbackResponse
  //       });
  //       google.accounts.id.renderButton(
  //         signInDivRef.current,
  //         { theme: "outline", size: "large" }
  //       );
  //       google.accounts.id.prompt();
  //     } else {
  //       console.error('Google Sign-In library is not loaded.');
  //     }
  //   };
  //   initializeGoogleSignIn();
  // }, []);


  // const fetchUserData = async (email) => {
  //   try {
  //     const response = await fetch(`https://api.base3ai.net/travel/database/user?email=${email}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUser(data);
  //       // setUserDatabase(data);
  //       console.log('AuthProvider.fetchUserData.data', data)
  //       return data;
  //     } else {
  //       console.error('User not found');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     return null;
  //   }
  // };

  // const saveUserToDatabase = async (userObject) => {
  //   try {
  //     const response = await fetch('https://api.base3ai.net/travel/database/user', { 
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json'},
  //       body: JSON.stringify(userObject),
  //     });
  //     console.log('userObject1 = ', userObject); 

  //     const data = await response.json();
  //     console.log('data = ', data);
  //     setUser(data);      
  //   } catch (error) { 
  //     console.error('Error saving user to database:', error); 
  //   }
  // };
  // useEffect(() => {
  //   console.log('useEffect()[] user', user);
  //   const token = localStorage.getItem('token');
  //   console.log('useEffect()[] token', token);
  //   if (token) {
  //     if (userDatabaseLoggedIn === false) {
  //       authenticateUser(token);
  //     }
  //     // var userObject = jwtDecode(token);
  //     // setUser(userObject);
  //     // console.log('useEffect()[] userObject', userObject);
  //     // console.log('useEffect()[] signInDivRef.current', signInDivRef.current);
  //     if (signInDivRef.current) {
  //       signInDivRef.current.hidden = true;
  //     }
  //   } else {
  //     setLoading(false);
  //   }
    
  //   const initializeGoogleSignIn = () => {
  //     if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
  //       google.accounts.id.initialize({
  //         client_id: '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com',
  //         callback: handleCallbackResponse
  //       });
  //       google.accounts.id.renderButton(
  //         signInDivRef.current,
  //         { theme: "outline", size: "large" }
  //       );
  //       google.accounts.id.prompt();
  //     } else {
  //       console.error('Google Sign-In library is not loaded.');
  //     }
  //   };
  //   initializeGoogleSignIn();
  // }, []);


  // useEffect(() => {
  //   const initializeGoogleSignIn = () => {
  //     if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
  //       google.accounts.id.initialize({
  //         client_id: '171097678489-nitif89gpocv5co6praornsmhipg0qa8.apps.googleusercontent.com',
  //         callback: handleCallbackResponse
  //       });
  //       google.accounts.id.renderButton(
  //         signInDivRef.current,
  //         { theme: "outline", size: "large" }
  //       );
  //       google.accounts.id.prompt();
  //       googleClientInitialized.current = true;
  //     } else {
  //       console.error('Google Sign-In library is not loaded.');
  //     }
  //   };
  //   console.log('useEffect()[] user', user);
  //   const token = localStorage.getItem('token');
  //   // console.log('useEffect()[] token', token);

  //   const checkAndAuthenticate = async () => {
  //     if (token) {
  //       if (isTokenExpired(token)) {
  //         const newToken = await refreshAuthToken();
  //         if (newToken) {
  //           authenticateUser(newToken);
  //         }
  //       } else {
  //         authenticateUser(token);
  //       }
  //       if (signInDivRef.current) {
  //         signInDivRef.current.hidden = true;
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   checkAndAuthenticate();
  //   initializeGoogleSignIn();
  // }, []);