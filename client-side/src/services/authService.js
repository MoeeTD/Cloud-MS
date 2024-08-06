const doLogIn = (username, token) => {
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("token", token);
  };
  
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
  };
  
  
  const logOut = () =>{
  
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem('token');
  };
  
  export default {
    doLogIn,
    isLoggedIn,
    logOut
  };
  