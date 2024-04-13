import { createListenerMiddleware } from '@reduxjs/toolkit';
import { userApi } from '../app/services/userApi';

export const listnerMiddlware = createListenerMiddleware();

listnerMiddlware.startListening({
   matcher: userApi.endpoints.login.matchFulfilled,
   effect: async (action, listnerApi) => {
      listnerApi.cancelActiveListeners();
      if (action.payload.token) {
         localStorage.setItem('token', action.payload.token);
      }
   },
});
