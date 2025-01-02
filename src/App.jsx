
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
import Settings from './componets/pages/backend/settings/Settings'
import Role from './componets/pages/backend/settings/role/Role'
import { routeAdmin } from './routes/routesAdmin'
import { routeDeveloper } from './routes/RoutesDeveloper'
import DeveloperCreatePassword from './componets/pages/backend/access/create-password/DeveloperCreatePassword'
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
    <Router>
      <Routes>
        
        <Route index element={<Welcome />}/>
        <Route path='/order' element={<Order />}/>
        {routeAdmin.map((item,key) => {
          return(<Route path={item.route} key={key} element={item.element}/>
            
          )
          
        })}
        
        {routeDeveloper.map((item,key) => {
          return(<Route path={item.route} key={key} element={item.element}/>

          )
          
        })}
      


        <Route path='/admin/login' element={<LogIn/>}/>
        <Route path='/admin/set-password' element={<SetPassword/>}/>
        <Route path='/developer/create-password' element={<DeveloperCreatePassword/>}/>
        <Route path='/admin/forgot-password' element={<ForgotPassword/>}/>
        
      </Routes>
    </Router>
    </StoreProvider>
    </QueryClientProvider>
  )
}

export default App