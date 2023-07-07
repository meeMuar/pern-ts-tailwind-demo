import { Route, Routes,useParams } from 'react-router-dom'
import Home from './routes/Home.tsx'
import RestaurantDetailPage from './routes/RestaurantDetailPage.tsx'
import UpdatePage from './routes/UpdatePage.tsx'
import RestaurantContextProvider from './context/RestaurantContext.tsx'
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
