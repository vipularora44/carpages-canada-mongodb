export const userInput =(input)=>
{
    return{
        type:"USER_INPUT",
        payload:input,
    }
    
}
export const addListings =(input2)=>
{
    return{
        type:"ADD_LISTING_INPUT",
        payload2:input2,
    }
    
}
export const UserloginInput =(input1)=>
{
    return{
        type:"USER_LOG_INPUT",
        payload1:input1,
    }
    
}
export const RESET_ACTION = {
    type: "RESET"
  }