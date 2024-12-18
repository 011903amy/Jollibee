import { ChevronDown, Dot } from 'lucide-react'
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import SideNavigation from '../partials/SideNavigation'
import DashboardCard from './DashboardCard'
import DashboardAccordion from './DashboardAccordion'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { menus } from '../menu-data'
import useQueryData from '@/componets/custom-hook/useQueryData'
import { StoreContext } from '@/componets/store/StoreContext'
import TableLoader from '../partials/TableLoader'
import React from 'react'
import FetchingSpinner from '@/componets/partials/spinner/FetchingSpinner'
import IconNoData from '../partials/IconNoData'

const Dashboard = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isCategoryEdit, setIsCategoryEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(null);
  };
  const {
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQueryData(
    `/v2/category`, //enpoint
    "get", //method
    "category" //key
  );
  const {
    isLoading: isLoadingFood,
    isFetching: isFetchingFood,
    error: errorFood,
    data: dataFood,
  } = useQueryData(
    `/v2/food`, //enpoint
    "get", //method
    "food" //key
  );

  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="dashboard" />
          <main>
            <Header title="DashBoard" subtitle="Welcome To Jollibee" />
            <div className="p-2">
              <div className="grid grid-cols-[1fr_400px] gap-5">
                <div className="stats">
                  <div className="chart mt-2">
                    <h3 className='leading-none'>Menu Prices</h3>
                    <BarChart
                      width={1300}
                      height={300}
                      data={menus.slice(0, 10)}
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
                      <Bar
                        dataKey="menu_price"
                        fill="#8884d8"
                        barSize={80}
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                      />
                    </BarChart>
                  </div>
                  <div className='relative'>
                    {isFetchingCategory && isLoadingCategory && (<FetchingSpinner/>)}
                    {isLoadingCategory && <TableLoader cols={4} count={20}/>}
                    {dataCategory?.count == 0 && <IconNoData/>}
                    <div className="grid grid-cols-4 gap-5 custom-scroll h-[calc(100vh-493px)] overflow-y-auto mt-4">
                    
                    {dataCategory?.count > 0 && dataCategory?.data.map((item, key) => {
                      return <DashboardCard item={item} key={key} dataFood={dataFood} />;
                    })}
                  </div>
                  </div>
                  
                </div>
                <div className="sidebar custom-scroll h-[calc(100vh-180px)] overflow-auto ">
                  <DashboardAccordion
                    title="Chicken Joy"
                    filterby="Chicken Joy"
                  />
                  <DashboardAccordion
                    title="Value Meal"
                    filterby="Value Meal"
                  />
                  <DashboardAccordion title="Spaghetti" filterby="Spaghetti" />
                  <DashboardAccordion title="Burger" filterby="Burger" />
                  <DashboardAccordion title="Palabok" filterby="Palabok" />
                  <DashboardAccordion title="Sides" filterby="Sides" />
                  <DashboardAccordion title="Desserts" filterby="Desserts" />
                  <DashboardAccordion
                    title="Burger Steak"
                    filterby="Burger Steak"
                  />
                </div>
              </div>
            </div>

            <Footer />
          </main>
        </div>
      </section>
    </>
  );
}

export default Dashboard;