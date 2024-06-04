import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/store.js'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <BrowserRouter> 
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    // </BrowserRouter>
    // </React.StrictMode>
)
