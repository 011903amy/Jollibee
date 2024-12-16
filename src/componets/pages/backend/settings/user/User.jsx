import ModalSuccess from "@/componets/partials/modal/ModalSuccess";
import { setIsAdd } from "@/componets/store/StoreAction";
import { StoreContext } from "@/componets/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import ModalError from "../../partials/modals/ModalError";
import SideNavigation from "../../partials/SideNavigation";
import ModalAddUser from "./ModalAddUser";
import UserList from "./UserList";


const User = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="Role" />
          <main>
            <Header title="Settings" subtitle="Welcome To Jollibee" />

            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                <button
                  className="btn btn-add"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus /> Add New
                </button>
              </div>
              <UserList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isAdd && <ModalAddUser itemEdit={itemEdit} />}
    </>
  );
};

export default User;
