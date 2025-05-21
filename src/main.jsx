import { StrictMode } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/custom/Header'
import Createtrip from './create-trip/Createtrip'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripid]/Viewtrip'
import Mytrip from './my-trip'

const router=createBrowserRouter([
  {
    path:"/",
    element:(
      <>
      <Header />
      <App />
      </>
    ),
  },
  {
    path:"/create-trip",
    element:(
      <>
       <Header />
       <Createtrip />
      </>
    ),
  },
  {
    path:"/view-trip/:tripid",
    element:(
      <>
      <Header />
      <Viewtrip />
      </>
    )
  },
  {
    path:"/my-trip",
    element:(
      <>
      <Header />
      <Mytrip/>
      </>
    )
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)



