import ModalSuccess from "@/componets/partials/modal/ModalSuccess";
import { setError, setIsAdd, setMessage } from "@/componets/store/StoreAction";
import { StoreContext } from "@/componets/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import ModalError from "../../partials/modals/ModalError";
import SideNavigation from "../../partials/SideNavigation";
import ModalAddUser from "./ModalAddDeveloper";
import UserList from "./DeveloperList";
import DeveloperList from "./DeveloperList";
import useQueryData from "@/componets/custom-hook/useQueryData";
import ModalAddDeveloper from "./ModalAddDeveloper";


const Developer = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  
  const {
    isFetching,
    data: role,
  } = useQueryData(
    `/v2/role`, //enpoint
    "get", //method
    "role" //key
  );

  const developerRole = role?.data.filter(
    (item) => item.role_is_developer == 1
  )
  const handleAdd = () => {
    if(developerRole?.length === 0 ){
      dispatch(setError(true))
      dispatch(setMessage("Developer role is required."))
      return
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="Developer" />
          <main>
            <Header title="Developer" subtitle="Welcome To Jollibee" />

            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                {isFetching ? ("Loading...") : (<button
                  className="btn btn-add mb-5"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus /> Add New
                </button>)}
                
              </div>
              <DeveloperList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isAdd && <ModalAddDeveloper itemEdit={itemEdit} developerRole={developerRole} />}
    </>
  );
};

export default Developer;
