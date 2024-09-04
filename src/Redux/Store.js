import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// 3-reducer from slice
import employeedetailsReducer from './EmployeeRedux/employeedetailsSlice';
import teamdetailsReducer from './TeamRedux/teamdetailSlice';
import roledetailsReducer from  './TeamRole/teamroleSlice';
import EmploytypeSlice from './EmploymentType/employtypeSlice';
import employStatusSlice from './EmploymentStatus/employstatusSlice';
// import companydetailsSlice from './Company/companydetailsSlice';
import UserReducer from './UserRedux/UserSlice';
import UserInfoReducer from './UserRedux/UserinfoSlice'
import employeeshiftsReducer from './EmployeeShifts/employeeshiftsSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
    employees:employeedetailsReducer,
    teams:teamdetailsReducer,
    roles:roledetailsReducer,
    employTypes:EmploytypeSlice,
    employStatus:employStatusSlice,
    user:UserReducer,
    userInfo:UserInfoReducer,
    shifts:employeeshiftsReducer,

    // companyDetails:companydetailsSlice

});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// export let persistor = persistStore(store);
export const  persistor = persistStore(store)
