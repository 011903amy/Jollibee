import { Plus } from 'lucide-react'
import React from 'react'
import SideNavigation from '../partials/Sidenavigation'
import Header from '../partials/Header'
import SearchBar from '../partials/SearchBar'
import Footer from '../partials/Footer'
import AdverstisementTable from './AdvertisementTable'
import { StoreContext } from '@/componets/store/StoreContext'
import { setIsAdd } from '@/componets/store/StoreAction'
import ModalAddAdvertisement from './ModalAddAdvertisement'
import ModalValidation from '../partials/modals/ModalValidation'
import ModalError from '../partials/modals/ModalError'
import ToastSuccess from '../partials/ToastSuccess'


const Advertisement = () => {
  const { dispatch, store } = React.useContext(StoreContext);const [isAdvertisementEdit, setIsAdvertisementEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setIsAdvertisementEdit(null)
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="advertisement" />
          <main>
            <Header
              title="Advertisement"
              subtitle="Manage Kiosk Advertisement"
            />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div></div>
                <button
                  className="btn btn-add mb-5"
                  type="reset"
                  onClick={handleAdd}
                >
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <AdverstisementTable
                setIsAdvertisementEdit={setIsAdvertisementEdit}
              />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && (
        <ModalAddAdvertisement
          setIsAdd={setIsAdd}
          setIsAdvertisementEdit={setIsAdvertisementEdit}
          isAdvertisementEdit={isAdvertisementEdit}
        />
      )}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  );
}

export default Advertisement