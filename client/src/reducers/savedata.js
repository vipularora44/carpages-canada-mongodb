

const initialState={
  
};
const setData =(state = initialState, action)=>
{
    switch(action.type)
    {
      case 'USER_INPUT':
        return {
          ...state,...action.payload};
      
          case "RESET":

            return initialState;

      default:
        return state;
    }
}
export default setData;