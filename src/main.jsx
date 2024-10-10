import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>    {/*By wrapping it , it will enable react router in the whole app */}
        <App />
    </BrowserRouter>
)
