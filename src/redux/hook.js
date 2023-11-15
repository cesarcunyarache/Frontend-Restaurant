import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

const useAppDispatch = () => useDispatch(AppDispatch);
const useAppSelector = useSelector;
