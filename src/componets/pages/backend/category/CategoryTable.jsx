
import {
  Archive,
  ArchiveRestore,
  FilePenLine,
  Trash2,
} from "lucide-react";

import LoadMore from "../partials/LoadMore";
import Pills from "../partials/Pills";
import ModalConfirm from "../partials/modals/ModalConfirm";

import React from "react";
import { setIsAdd, setIsArchive, setIsConfirm, setIsDelete, setIsRestore } from "@/componets/store/StoreAction";
import { StoreContext } from "@/componets/store/StoreContext";
import useQueryData from "@/componets/custom-hook/useQueryData";
import Status from "@/componets/partials/Status";
import ModalArchive from "@/componets/partials/modal/ModalArchive";
import ModalSuccess from "@/componets/partials/modal/ModalSuccess";
import ModalRestore from "@/componets/partials/modal/ModalRestore";
import ModalDelete from "../partials/modals/ModalDelete";




const CategoryTable = ({setIsCategoryEdit}) => {
  const [id , setIsId] = React.useState("")
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 1;
  

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.category_aid)

  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsId(item.category_aid)
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsId(item.category_aid)
  };
 
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(item)


  };

  const {
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/category`, //enpoint
    "get", //method
    "category" //key
  );



  return (
    <div>
      {" "}
      <div className="relative p-4 bg-secondary rounded-md mt-10 border border-line">
        {/* <SpinnerTable /> */}
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={20} cols={4}/> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
            <td colSpan={100}>
              <IconNoData/>
            </td>
          </tr> */}
              {/* <tr>
            <td colSpan={100}>
              <IconServerError/>
            </td>
          </tr> */}

             {result?.count > 0 && result.data.map((item,key) => (
              <tr key={key}>
              <td>{counter++}.</td>
              <td>
                {item.category_is_active === 1 ? (<Status text="Active" />) : (<Status text="Inactive"/>)}
                
              </td>
              <td>{item.category_title}</td>
              <td>
                <ul className="table-action">
                  {item.category_is_active === 1 ? (
                    <>
                      <li>
                        <button
                          className="tooltip"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FilePenLine />
                        </button>
                      </li>
                      <li>
                        <button
                          className="tooltip"
                          data-tooltip="Archive"
                          onClick={() => handleArchive(item)}
                        >
                          <Archive />
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          className="tooltip"
                          data-tooltip="Restore"
                          onClick={() => handleRestore(item)}
                        >
                          <ArchiveRestore />
                        </button>
                      </li>
                      <li>
                        <button
                          className="tooltip"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 />
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </td>
            </tr>
             ))}
            </tbody>
          </table>

          <LoadMore />
        </div>
      </div>
      {store.isDelete && (<ModalDelete setIsDelete={setIsDelete} mysqlApiDelete={`/v2/category/${id}`} queryKey={"category"}/>)}

      {store.isConfirm && <ModalConfirm />}

      {store.isArchive && (<ModalArchive setIsArchive={setIsArchive} mysqlEndpoint={`/v2/category/active/${id}`} queryKey={"category"}/>)}


      {store.isRestore && (<ModalRestore setIsRestore={setIsRestore} mysqlEndpoint={`/v2/category/active/${id}`} queryKey={"category"}/>)}
      
      
    </div>
  );
};

export default CategoryTable;
