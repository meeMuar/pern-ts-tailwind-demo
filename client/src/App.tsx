import { Route, Routes } from 'react-router-dom'
import Home from './setup/routes/RestaurantHomePage.tsx'
import RestaurantDetailPage from './setup/routes/RestaurantDetailPage.tsx'
import UpdatePage from './setup/routes/UpdatePage.tsx'
import RestaurantContextProvider from './setup/context/RestaurantContext.tsx'
import './index.css'

function App() {


  return (


    <RestaurantContextProvider>


      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/restaurants/:id/update" element={<UpdatePage />} />


        </Routes>
      </main>

    </RestaurantContextProvider>

  )
}

export default App
