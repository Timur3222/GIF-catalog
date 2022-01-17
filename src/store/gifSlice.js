import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addImage = createAsyncThunk(
  'gif/addImage',
  async (input) => {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=saKUFOoBFm8pHDSrjci6kOclQ3q0aWAJ&tag=${input}`
    );
    const imageData = response.data;
    const tag = input === '' ? 'random gif' : input;
    return {imageData: imageData.data, tag: tag, meta: imageData.meta};
  }
);

const gifSlice = createSlice(
  {
    name: 'gif',
    initialState: {
      images: [],
      isLoading: null,
      tags: [],
      isGroupped: false,
      tooltipActive: false,
      tooltipTitle: null
    },
    reducers: {
      group: (state) => {
        state.isGroupped = !state.isGroupped;
      },
      clear: (state) => {
        state.images = [];
        state.tags = [];
        state.isGroupped = false;
        state.tooltipActive = false;
      },
      tooltipToggle: (state, action) => {
        state.tooltipTitle = action.payload.title;
        state.tooltipActive = action.payload.status;
      }
    },
    extraReducers: {
      [addImage.pending]: (state) => {
        state.isLoading = true;
      },
      [addImage.fulfilled]: (state, action) => {
        state.isLoading = false;
        if(action.payload.imageData.length !== 0) {
          state.images.push({
            id: action.payload.imageData.id,
            src: action.payload.imageData.images.fixed_width.url,
            tag: action.payload.tag
          });
          if(state.tags.includes(action.payload.tag) === false) {
            state.tags.push(action.payload.tag);
          }
        } else {
          state.tooltipTitle = 'По тегу ничего не найдено.';
          state.tooltipActive = true;
        } 
      },
      [addImage.rejected]: () => {
        alert(`Произошла ошибка. Обновите страницу и попробуйте снова.`);
      }
    }
  }
);

export const {group, clear, tooltipToggle} = gifSlice.actions; 

export default gifSlice.reducer;