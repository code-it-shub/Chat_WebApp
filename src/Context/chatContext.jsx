import { createContext, useContext } from "react";
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const { currUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currUser.uid > action.payload.uid
              ? currUser.uid + action.payload.uid
              : action.payload.uid + currUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
