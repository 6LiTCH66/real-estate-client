import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from "react-redux"
import store from "./store/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
);

