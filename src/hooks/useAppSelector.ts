import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/app/store.js';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
