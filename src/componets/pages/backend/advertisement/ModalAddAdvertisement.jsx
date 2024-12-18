import React from "react";
import { ImagePlusIcon, X } from "lucide-react";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { StoreContext } from "@/componets/store/StoreContext";
import { setError, setIsAdd, setMessage, setSuccess } from "@/componets/store/StoreAction";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import ModalWrapper from "../partials/modals/ModalWrapper";
import {  InputPhotoUpload, InputText } from "@/componets/helpers/FormInputs";
import useUploadPhoto from "@/componets/custom-hook/useUploadPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/componets/helpers/queryData";
import useQueryData from "@/componets/custom-hook/useQueryData";
import { imgPath } from "@/componets/helpers/functions-general";

const ModalAddAdvertisement = ({
  isAdvertisementEdit,
  itemEdit,
  setIsAdvertisementEdit,
}) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto("");
  const [value, setValue] = React.useState("");
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        isAdvertisementEdit
          ? `/v2/ads/${isAdvertisementEdit.ads_aid}`
          : "/v2/ads",
        isAdvertisementEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ads"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successful!"));
      }
    },
  });
  const {
    isLoading,
    isFetching,
    error,
    data: results,
  } = useQueryData(
    `/v2/ads`, // endpoint
    "get", // method
    "ads" // key
  );

  const initVal = {
    ads_title: isAdvertisementEdit ? isAdvertisementEdit.ads_title : "",
    ads_image: isAdvertisementEdit ? isAdvertisementEdit.ads_image : "",
  };
  const yupSchema = Yup.object({
    ads_title: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Advertisement</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                ads_image:
                  (isAdvertisementEdit?.ads_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && isAdvertisementEdit?.ads_image !== photo?.name)
                    ? photo?.name || ""
                    : isAdvertisementEdit?.ads_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[80vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="ads_title"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
                        {isAdvertisementEdit === null && photo === null ? (
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
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.ads_image // check db
                            }
                            alt="advertisement photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto ${
                              mutation.isPending
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
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
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                        {mutation.isPending && <SpinnerButton />}
                        {itemEdit ? "Save" : "Add"}
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

export default ModalAddAdvertisement;
