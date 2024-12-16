import { imgPath } from '@/componets/helpers/functions-general'
import React from 'react'

const MenuTitle = ({categoryName}) => {
  return (
    <>
    <div className="p-4 bg-myred flex items-center gap-5 text-white">
      <img src={`${imgPath}/jollibee-logo.png`} alt="" />
      <h2 className=' mb-0'>{categoryName}</h2>


    </div>
    </>
  )
}

export default MenuTitle