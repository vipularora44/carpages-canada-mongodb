const initialState1={
  
};
const SetUserData =(state = initialState1, action)=>
{
    switch(action.type)
    {
      case 'USER_LOG_INPUT':
        return {
          ...state,...action.payload1};

          case "RESET":

            return initialState1;

      default:
        return state;
    }
}
export default SetUserData;