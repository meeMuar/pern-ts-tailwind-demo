import { Route, Routes } from 'react-router-dom'
import Home from './pages/RestaurantList/RestaurantHomePage.tsx'
import RestaurantDetailPage from './pages/RestaurantDetails/RestaurantDetailPage.tsx'
import UpdatePage from './pages/UpdateRestaurant/UpdatePage.tsx'
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
