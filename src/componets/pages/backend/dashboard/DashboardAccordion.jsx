import { ChevronDown, Dot } from 'lucide-react'
import React from 'react'
import { menus } from '../menu-data'
import { getFoodByCategory } from './functions'
import IconNoData from '../partials/IconNoData'

const DashboardAccordion = ({item, foodItem}) => {
  // const getCardDetails = menus.filter((item) => item.menu_category ===filterby);
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggleOpen = () => setIsOpen(prev => !prev)
  return (
    <>
       <div className='accordion mb-2'>
                    <div className="accordion-header p-2 flex justify-between bg-secondary items-center rounded-t-md cursor-pointer" onClick={handleToggleOpen}>
                      <h6 className='mb-0'>{item.category_title}</h6>
                      <button><ChevronDown className={`transition-all ${isOpen ? "rotate-180" : ""}`}/></button>
                    </div>
                    <div className={`accordion-body border border-line rounded-b-md border-t-0 overflow-hidden  h-full transition-all duration-700 ${isOpen ? "max-h-[600px]" : "max-h-[0px]"}`}>
                     

                    <ul className="space-y-3 py-4 px-2">
                {foodItem?.length == 0 && <IconNoData/>}
                {foodItem?.length > 0 && foodItem.map((item, key) => (
                <li className="flex items-center" key={key}>
                <Dot
                size={30}
                className={` ${
                  item.food_is_active ? "text-success" : "text-gray"
                }`}
                />
              {item.food_title}
            </li>
          ))}
        </ul>
                      
                    </div>
                  </div>

    </>
  )
}

export default DashboardAccordion