import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Content {
  _id : string;
  title : string;
  link : string;
  type : 'Document' | 'Video' | 'Tweet' | 'Linkedin' | 'Link';
  tags? : string[];
  createdAt? : string
}

interface ContentState {
  contents : Content[]
}

const initialState: ContentState = {
  contents : []
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state , action: PayloadAction<Content[]>) => {
      state.contents = action.payload
    },
    addContent: (state , action: PayloadAction<Content>) => {
      state.contents.push(action.payload)
    },
    removeContent: (state, action: PayloadAction<string>) => {
      state.contents = state.contents.filter((content) => content._id !== action.payload)
    },
    updateContent: (state, action: PayloadAction<Content>) => {
      const index = state.contents.findIndex(
        (content) => content._id === action.payload._id
      );
      if (index !== -1) {
        state.contents[index] = action.payload;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setContent , addContent , removeContent , updateContent } = contentSlice.actions

export default contentSlice.reducer