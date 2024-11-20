import React from 'react'
import SliderBanner from './SliderBanner'
import MenuTitle from './MenuTitle'
import SideNav from './SideNav'
import MenuList from './MenuList'
import ModalCart from './ModalCart'
import ToastSuccess from './ToastSuccess'

const Order = () => {

  const [category, setCategory] = React.useState("Value Meal");
  const [cartData, setCartData] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);


  const getTotal = cartData.reduce((acc, item) => {
    return acc + item.menu_price * item.quantity
},0)

  return (
    <>
    <SliderBanner/>
    <div className="grid grid-rows-[auto,_1fr,_auto] min-h-[calc(100vh-200px)]">
    <MenuTitle category={category} />
    <section className="grid grid-cols-[150px,_1fr] bg-primary px-3">
      <aside className='m-1 bg-white rounded-md h-[59vh] overflow-y-scroll custom-scroll'><SideNav setCategory={setCategory}/></aside>



      <main className='m-1 bg-white rounded-md h-[59vh] overflow-y-scroll custom-scroll'>
        <MenuList category={category} cartData={cartData} setCartData={setCartData} setIsSuccess={setIsSuccess}/>

        


      </main>
      </section>




      <div className="flex justify-between items-center bg-primary text-white p-1 px-3">
      <button className='px-4 py-2 border bg-white text-primary border-white rounded-md'>Cancel</button>
        <div className='px-4 py-2 border border-white rounded-md w-[300px] text-center'>
        <small>View Total Order</small>
        <h4 className='mb-0'>P {getTotal.toFixed(2)}</h4>
      </div>
      <button className='px-4 py-2 bg-secondary rounded-md relative' onClick={() => setShowCart(true)}>
        {cartData.length > 0 && (<span className='absolute -top-2 -left-2 text-[12px] bg-white text-primary rounded-full size-[20px] font-bold grid place-content-center'>{cartData.length}</span>)}
        
        
        
        View Cart


      </button>

     
      </div>
      </div>
    {showCart && <ModalCart setShowCart={setShowCart} cartData={cartData} setCartData={setCartData} getTotal={getTotal}/> }
    
    {isSuccess && <ToastSuccess setIsSuccess={setIsSuccess}/>}
    </>
    
    
  )
}

export default Order