export const TOGGLE_ROUND = "[Round Trip] Se ha activado o desactivado el roundtrip";
export const toggleRound = (payload)=>{ 
  return ({
    type:TOGGLE_ROUND,
    payload:payload
  })
}




