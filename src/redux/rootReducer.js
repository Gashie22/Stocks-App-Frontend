// //default states
// const initialState = {
//     loading : false,
//     cartItems : []
// }

// export const rootReducer = (state=initialState,action)=>{
//     switch (action.type){
//         //updating cart
//         case 'updateCart':
//             return{
//                 ...state,
//                 cartItems:[...state.cartItems , action.payload]
//             }
//         default : return state
//     }
// }