import { ChevronRight, LayoutDashboard, Megaphone, UtensilsCrossed } from 'lucide-react';
import React from 'react'
import { FaDev, FaUserCog, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SettingsList = () => {
  const links = [
    {
      title: "Role",
      slug: "/admin/settings/role",
      icon: <FaUserCog size={16} />,
    },
    {
      title: "Developer",
      slug: "/admin/settings/developer",
      icon: <FaDev size={16} />,
    },
    {
      title: "Users",
      slug: "/admin/settings/users",
      icon: <FaUsers size={16} />,
    },
    
  ];
  return (
    <ul>
      {links.map((item,key) => {
        return (
          <li key={key} className='flex gap-3 text-base items-center '>
            <NavLink to={`${item.slug}`} className={"flex items-center gap-2 py-2 w-full justify-between hover:bg-gray-100/5"}>
              <div className='flex items-center gap-2'>

                {item.icon}
                {item.title}
              </div>
              <div>
                <ChevronRight/>
              </div>
            </NavLink>
        </li>
        )
      })}
      <li></li>
    </ul>
  )
}

export default SettingsList