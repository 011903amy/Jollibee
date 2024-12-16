import React from 'react';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import SideNavigation from '../../partials/SideNavigation';
import RoleList from './RoleList';
import { StoreContext } from '@/componets/store/StoreContext';
import { FaPlus } from 'react-icons/fa';
import ModalAddRole from './ModalAddRole';
import { setIsAdd } from '@/componets/store/StoreAction';
import ModalDelete from '../../partials/modals/ModalDelete';
import ModalError from '../../partials/modals/ModalError';
import ModalSuccess from '@/componets/partials/modal/ModalSuccess';
import ToastSuccess from '../../partials/ToastSuccess';

const Role = () => {
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
          <SideNavigation menu="Role" />
          <main>
            <Header title="Settings" subtitle="Welcome To Jollibee" />

            <div className="p-5">
              <div className='flex justify-between items-center'>
                <div></div>
                <button className='btn btn-add' type='button' onClick={handleAdd}>
                  <FaPlus/> Add New
                </button>
              </div>
              <RoleList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.success && <ModalSuccess/>}
      {store.error && <ModalError/>}
      {store.isAdd && <ModalAddRole itemEdit={itemEdit}/>}
    </>
  );
}

export default Role