import { ChevronDown, Dot } from "lucide-react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import DashboardCard from "./DashboardCard";
import DashboardAccordion from "./DashboardAccordion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { menus } from "../menu-data";
import useQueryData from "@/componets/custom-hook/useQueryData";
import { StoreContext } from "@/componets/store/StoreContext";
import TableLoader from "../partials/TableLoader";
import React from "react";
import FetchingSpinner from "@/componets/partials/spinner/FetchingSpinner";
import IconNoData from "../partials/IconNoData";
import { getCategoryPrices } from "./functions";

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
  const tableData = getCategoryPrices(dataCategory, dataFood);

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
                   <div className="relative chart mt-2">
                    {(isFetchingCategory || isFetchingFood) && !isLoadingCategory && !isLoadingFood && <FetchingSpinner/>}
                    {isLoadingCategory || isLoadingFood ? (
                      <TableLoader cols={1} count={15}/>
                    ):( <BarChart
                       width={1300}
                       height={300}
                       // data={menus.slice(0, 10)}
                       data={tableData}
                       margin={{
                         top: 5,
                         right: 30,
                         left: 10,
                         bottom: 5,
                       }}
                     >
                       <CartesianGrid strokeDasharray="0 0" />
                       <XAxis dataKey="category_title" interval={0} />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Bar
                         dataKey="menu_price"
                         fill="#8884d8"
                         barSize={80}
                         activeBar={<Rectangle fill="pink" stroke="blue" />}
                       />
                     </BarChart>)
                  }
                    
                   </div>
                   <div className="relative">
                     {isFetchingCategory && isLoadingCategory && (
                       <FetchingSpinner />
                     )}
                     {isLoadingCategory && <TableLoader cols={4} count={20} />}
                     {dataCategory?.count == 0 && <IconNoData />}
                     <div className="grid grid-cols-4 gap-5 custom-scroll h-[calc(100vh-493px)] overflow-y-auto mt-4">
                       {dataCategory?.count > 0 &&
                         dataCategory?.data.map((item, key) => {
                           return (
                             <DashboardCard
                               item={item}
                               key={key}
                               dataFood={dataFood}
                             />
                           );
                         })}
                     </div>
                   </div>
                 </div>
                   
                   <div className=" relative sidebar custom-scroll h-[calc(100vh-180px)] overflow-auto ">{isFetchingCategory && isLoadingCategory && (
                     <FetchingSpinner />
                   )}
                   {isLoadingCategory && <TableLoader cols={1} count={55} />}
                   {dataCategory?.count === 0 && <IconNoData />}
                   
                     
                       {dataCategory?.data.map((item, key) => {
                        const foodItem = dataFood?.data.filter(
                          (foodItem) => foodItem.food_category_id == item.category_aid 
                        )
                         return (
                           <DashboardAccordion
                             item={item}
                             key={key}
                             foodItem={foodItem}
                           />
                         );
                       })}
                   </div>
                 
               </div>
             </div>

             <Footer />
           </main>
         </div>
       </section>
     </>
   );
};

export default Dashboard;
