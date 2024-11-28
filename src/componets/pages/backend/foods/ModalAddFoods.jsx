import React from "react";
import { ImagePlusIcon, X } from "lucide-react";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { StoreContext } from "@/componets/store/StoreContext";
import { setIsAdd } from "@/componets/store/StoreAction";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import ModalWrapper from "../partials/modals/ModalWrapper";
import {  InputPhotoUpload, InputSelect, InputText } from "@/componets/helpers/FormInputs";
import useUploadPhoto from "@/componets/custom-hook/useUploadPhoto";
import { imgPath } from "@/componets/helpers/functions-general";

const ModalAddFoods = ({itemEdit}) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  console.log(handleChangePhoto)

  const initVal = {
    menu_title: itemEdit ? itemEdit.menu_title : "",
    menu_price:itemEdit ? itemEdit.menu_price : "",
    menu_category: itemEdit ? itemEdit.menu_category : "",
    
  };
  const yupSchema = Yup.object({
    menu_title: Yup.string().required("Required"),
    menu_price: Yup.string().required("Required"),
    menu_category: Yup.string().required("Required"),
    
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Foods</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[80vh] h-full overflow-y-auto custom-scroll">

                        

                      
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
                        {itemEdit === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>

                        ) : (
                          <img
                            src={
                              itemEdit === null
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.menu_img // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full 
                          }`}
                        />
                      </div>
                     
                   <div className="input-wrap mt-8">
                        <InputText
                          label="Title"
                          type="text"
                          name="menu_title"
                        />
                      </div>
                        <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          name="menu_price"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect label="Category" name="menu_category">
                          <option value="" hidden>
                            Select Category
                          </option>
                          <option value="Value Meal">Value Meal</option>
                          <option value="Chicken Joy">Chicken Joy</option>
                          <option value="Burger">Burger</option>
                          <option value="Spaghetti">Spaghetti</option>
                          <option value="Burger">Burger Steak</option>
                          <option value="Palabok">Palabok</option>
                          <option value="Sides">Sides</option>
                          <option value="Desserts">Desserts</option>
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                        <SpinnerButton />
                        Save
                      </button>
                      <button
                        className="btn btn-cancel"
                        type="reset"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddFoods;
