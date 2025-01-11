import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Context from './utils/Context.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Context>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Context>
  </Provider>
)
