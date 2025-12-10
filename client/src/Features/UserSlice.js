import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
import axios from "axios"; 

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData) => {
    try {
      const formData = new FormData();
      formData.append("email", userData.email);
      formData.append("name", userData.name);
      formData.append("password", userData.password);
      if (userData.profilePic) {
        formData.append("profilePic", userData.profilePic);
      }

      const response = await axios.put(
        `http://localhost:3001/updateUserProfile/${userData.email}`,
        formData
      );

      return response.data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post("http://localhost:3001/logout");
  } 
  catch (error) {
    console.log(error);
  }
});

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
      const user = response.data.user; //retrieve the response from the server
      return user; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    //handle the error
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const userSlice = createSlice(
    {
        name:"users",
        initialState,
        reducers:{
                addUser:(state,action)=>
                {
                    state.value.push(action.payload);
                },
                deleteUser:(state,action)=>
                {
                    state.value = state.value.filter((user)=>
                        user.email !=action.payload);
                },
                updateUsers: (state, action) => {
                    
                    const idx = state.value.findIndex(
                      (user) => user.email === action.payload.email
                    );
                    if (idx !== -1) {
                      
                      state.value[idx] = { ...state.value[idx], ...action.payload };
                    }
                  },
  },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;   // <-- set to null
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });


},

});
export const {addUser,deleteUser,updateUsers} = userSlice.actions;
export default userSlice.reducer;