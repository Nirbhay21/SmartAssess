import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/store.js';

export const useAppDispatch = () => useDispatch<AppDispatch>();
