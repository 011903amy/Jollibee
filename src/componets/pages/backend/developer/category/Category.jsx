import { setIsAdd } from "@/componets/store/StoreAction";
import { StoreContext } from "@/componets/store/StoreContext";
import { Plus } from "lucide-react";
import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import ModalConfirm from "../partials/modals/ModalConfirm";
import ModalError from "../partials/modals/ModalError";
import ModalValidation from "../partials/modals/ModalValidation";
import SearchBar from "../partials/SearchBar";
import SideNavigation from "../partials/Sidenavigation";
import ToastSuccess from "../partials/ToastSuccess";
import CategoryTable from "./CategoryTable";
import ModalAddCategory from "./ModalAddCategory";

const Category = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isCategoryEdit, setIsCategoryEdit] = React.useState(null);


  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(null)
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="category" />
          <main>
            <Header title="Category" subtitle="Manage Kiosk Advertisement" />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div></div>
                <button className="btn btn-add mb-5" type="reset" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <CategoryTable setIsCategoryEdit={setIsCategoryEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && (
        <ModalAddCategory
          setIsAdd={setIsAdd}
          setIsCategoryEdit={setIsCategoryEdit}
          isCategoryEdit={isCategoryEdit}
        />
      )}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      
    </>
  );
};

export default Category;
