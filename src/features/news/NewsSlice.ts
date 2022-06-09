import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostData } from '../../api/endpoints';

export interface State {
  posts: PostData[]
}

const initialState: State = {
  posts: []
};

export const newsSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostData[]>) => {
      state.posts = action.payload;
    },
    pushPost: (state, action: PayloadAction<PostData>) => {
      state.posts.push(action.payload);
    }
  },
});

export const { setPosts, pushPost } = newsSlice.actions;

export default newsSlice.reducer;