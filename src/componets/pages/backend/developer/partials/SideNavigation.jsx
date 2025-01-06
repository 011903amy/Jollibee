
import { imgPath } from '@/componets/helpers/functions-general'
import { LayoutDashboard, Megaphone, MousePointerClick, UtensilsCrossed } from 'lucide-react'
import { FaCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const SideNavigation = ({menu}) => {
  const links =[
    {
      title:"Dashboard",
      slug: "/developer/dashboard",
      icon:<LayoutDashboard size={16} />
    },
    {
      title:"Advertisement",
      slug: "/developer/advertisement",
      icon:<Megaphone size={16} />
    },
    {
      title:"Foods",
      slug: "/developer/foods",
      icon:<UtensilsCrossed size={16}/>
    },
    {
      title:"Category",
      slug: "/developer/category",
      icon:<MousePointerClick size={16}/>
    },
    {
      title:"Settings",
      slug: "/developer/settings",
      icon:<FaCog size={16}/>
    },

  ]
  return (
    <>
     <aside className='p-4 border-r border-line'>
            <img src={`${imgPath}/jollibee-logo.webp`} alt="" className='w-[80%] mx-auto mt-2' />
        <nav>
          <ul className='mt-10'>
            {links.map((item,key)=>(
            <li className={`${menu === item.slug.replaceAll("/developer/" , "") ? "border-accent bg-accent  text-white opacity-100": ""} p-2 py-2 mb-2 rounded-md border border-transparent opacity-60 hover:opacity-100`}key ={key}><NavLink to={`${item.slug}`} className="flex gap-2 items-center">{item.icon}{item.title}</NavLink></li>  
            ))}
            
           
          </ul>
        </nav>
        </aside>
    </>
  )
}

export default SideNavigation