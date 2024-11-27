import { ChevronDown, Dot } from 'lucide-react'
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import SideNavigation from '../partials/SideNavigation'
import DashboardCard from './DashboardCard'
import DashboardAccordion from './DashboardAccordion'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { menus } from '../menu-data'

const Dashboard = () => {

  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="dashboard" />
          <main>
            <Header title="DashBoard" subtitle='Welcome To Jollibee' />
            <div className="p-8">
              <div className="grid grid-cols-[1fr_400px] gap-5">
                <div className="stats">
                  <div className="grid grid-cols-4 gap-5">
                    <DashboardCard title="Chicken Joy" filterby='Chicken Joy'/>
                    <DashboardCard title="Value Meal" filterby='Value Meal'/>
                    <DashboardCard title="Spaghetti" filterby='Spaghetti'/>
                    <DashboardCard title="Burger" filterby='Burger'/>
                    <DashboardCard title="Palabok" filterby='Palabok'/>
                    <DashboardCard title="Sides" filterby='Sides'/>
                    <DashboardCard title="Desserts" filterby='Desserts'/>
                    <DashboardCard title="Burger Steak" filterby='Burger Steak'/>                        
                  </div>

                  <div className='chart mt-10 '>
                 
                  <h3>Menu Prices</h3>
                    <BarChart
                      width={1300}
                      height={300}
                      data={menus.slice(0,10)}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                      }}
                   >
                      <CartesianGrid strokeDasharray="0 0" />
                      <XAxis dataKey="menu_category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="menu_price" fill="#8884d8" barSize={20} activeBar={<Rectangle fill="pink" stroke="blue"  />} />
          
                    </BarChart>
                  
                 
                 
               
                  </div>
                </div>
                <div className="sidebar custom-scroll h-[calc(100vh-180px)] overflow-auto ">
               <DashboardAccordion  title="Chicken Joy" filterby='Chicken Joy'/>
               <DashboardAccordion  title="Value Meal" filterby='Value Meal'/>
               <DashboardAccordion  title="Spaghetti" filterby='Spaghetti'/>
               <DashboardAccordion  title="Burger" filterby='Burger'/>
               <DashboardAccordion  title="Palabok" filterby='Palabok'/>
               <DashboardAccordion  title="Sides" filterby='Sides'/>
               <DashboardAccordion   title="Desserts" filterby='Desserts'/>
               <DashboardAccordion  title="Burger Steak" filterby='Burger Steak'/>
                </div>
              </div>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard;