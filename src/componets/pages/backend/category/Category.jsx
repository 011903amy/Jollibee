import { Plus } from 'lucide-react'
import React from 'react'
import SideNavigation from '../partials/Sidenavigation'
import Header from '../partials/Header'
import SearchBar from '../partials/SearchBar'
import Footer from '../partials/Footer'
import CategoryTable from './CategoryTable'
import { StoreContext } from '@/componets/store/StoreContext'
import { setIsAdd } from '@/componets/store/StoreAction'
import ModalAddCategory from './ModalAddCategory'
import ModalValidation from '../partials/modals/ModalValidation'
import ModalError from '../partials/modals/ModalError'
import ToastSuccess from '../partials/ToastSuccess'

const Category = () => {
  const { dispatch, store } = React.useContext(StoreContext);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="advertisement" />
          <main>
            <Header title="Advertisement" subtitle='Manage Kiosk Advertisement' />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <CategoryTable/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddCategory />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Category