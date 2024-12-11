
import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Welcome from './componets/pages/frontend/Welcome'
import Order from './componets/pages/frontend/Order'
import Adevertisement from './componets/pages/backend/advertisement/Adevertisement'
import { StoreProvider } from './componets/store/StoreContext'
import Foods from './componets/pages/backend/foods/Foods'
import Category from './componets/pages/backend/category/Category'
import Dashboard from './componets/pages/backend/dashboard/Dashboard'
import LogIn from './componets/pages/backend/access/LogIn'
import SetPassword from './componets/pages/backend/access/SetPassword'
import ForgotPassword from './componets/pages/backend/access/ForgotPassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
    <Router>
      <Routes>
        <Route index element={<Welcome />}/>
        <Route path='/order' element={<Order />}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/advertisement' element={<Adevertisement />}/>
        <Route path='/admin/foods' element={<Foods/>}/>
        <Route path='/admin/category' element={<Category/>}/>


        <Route path='/admin/login' element={<LogIn/>}/>
        <Route path='/admin/set-password' element={<SetPassword/>}/>
        <Route path='/admin/forgot-password' element={<ForgotPassword/>}/>
        
      </Routes>
    </Router>
    </StoreProvider>
    </QueryClientProvider>
  )
}

export default App