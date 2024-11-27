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
            <div className="p-8">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
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
      {store.isAdd && <ModalAddFoods itemEdit={itemEdit} />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Foods