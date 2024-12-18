import { Plus } from 'lucide-react'
import React from 'react'
import { setIsAdd } from '@/componets/store/StoreAction'
import { StoreContext } from '@/componets/store/StoreContext'
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import ModalError from '../partials/modals/ModalError'
import ModalValidation from '../partials/modals/ModalValidation'
import SearchBar from '../partials/SearchBar'
import SideNavigation from '../partials/SideNavigation'
import ToastSuccess from '../partials/ToastSuccess'
import FoodsTable from './FoodsTable'
import ModalAddFoods from './ModalAddFoods'

const Foods= () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null)
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="foods" />
          <main>
            <Header title="Foods" subtitle='Manage Kiosk Advertisement' />
            <div className="px-4 pt-4">
              <div className="flex justify-between items-center">
                <div></div>
                <button className="btn btn-add mb-5 " onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <FoodsTable setItemEdit={setItemEdit}/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddFoods setIsAdd={setIsAdd} itemEdit={itemEdit} setItemEdit={setItemEdit} />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Foods