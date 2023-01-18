import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    status: 'status',
    packages: 'status',
    chatuser: 'chatuser',
    initialState: {
        user: null,
        status: false,
        packages: null,
        chatuser: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(state.user, " : New user");

            state.user = action.payload;
        },
        status: (state, action) => {
            console.log(state.status, " : New status");

            state.status = action.payload;
        },
        packages: (state, action) => {
            console.log(state.packages, " : New Packages");

            state.packages = action.payload;
        },
        chatuser: (state, action) => {
            console.log(state.chatuser, " : New chatuser");

            state.chatuser = action.payload;
        },
        logout: (state) => {
            console.log(state.user, " : Delete user");

            state.user = null;
            state.status = false;
            state.packages = null;
            state.chatuser = null;
        },
    },
});

export const { login, status, packages, logout, chatuser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectPackages = (state) => state.user.packages;
export const selectChatuser = (state) => state.user.chatuser;


export default userSlice.reducer;
// import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

// export const Reducers = (state = [], action) => {
//     switch (action.type) {
//         case ADD_ITEM:
//             console.log(state, 'new state here!');
//             return [...state, action.payload];

//         case REMOVE_ITEM:
//             const deleteArry = state.filter((Item, index) => {
//                 return (index != action.payload);
//             });
//             return deleteArry;
//         default:
//             return state;
//     }
// }

