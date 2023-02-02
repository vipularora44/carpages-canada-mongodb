const initialState={
  
};
const saveAddListingData =(state = initialState, action)=>
{
    switch(action.type)
    {
      case 'ADD_LISTING_INPUT':
        return {
          ...state,...action.payload2};
      
          case "RESET":

            return initialState;

      default:
        return state;
    }
}
export default saveAddListingData;