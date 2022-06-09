import { useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = () => useContext(AuthContext);
