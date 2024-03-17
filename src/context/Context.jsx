import  { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const userDetailsContext = createContext();

const UserDetailsProvider = ({ children }) => {
  let [userDetails, setUserDetails] = useState(null);

  return (
    <userDetailsContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </userDetailsContext.Provider>
  );
};

UserDetailsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export const useUserState  = () => {
  return useContext(userDetailsContext);
};

export default UserDetailsProvider;