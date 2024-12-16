import useQueryData from "@/componets/custom-hook/useQueryData";
import Status from "@/componets/partials/Status";
import { StoreContext } from "@/componets/store/StoreContext";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import LoadMore from "../../LoadMore";

import ModalArchive from "@/componets/partials/modal/ModalArchive";
import ModalRestore from "@/componets/partials/modal/ModalRestore";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/componets/store/StoreAction";
import FetchingSpinner from "@/componets/partials/spinner/FetchingSpinner";
import TableLoader from "../../partials/TableLoader";
import IconNoData from "../../partials/IconNoData";
import IconServerError from "../../partials/IconServerError";
import ModalDelete from "@/componets/partials/modal/ModalDelete";

const UserList = ({ setItemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [id, setIsId] = React.useState("");
  const [dataItem, setDataItem] = React.useState("");
  let counter = 1;

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.role_aid);
    setDataItem(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsId(item.role_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsId(item.role_aid);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const {
    isLoading,
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/role`, //enpoint
    "get", //method
    "role" //key
  );
  return (
    <>
      <div>
        {" "}
        <div className="relative p-4 bg-secondary rounded-md mt-10 border border-line">
          {isFetching && !isLoading && <FetchingSpinner />}

          <div className="table-wrapper custom-scroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Email</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan="100%">
                      <TableLoader count={20} cols={5} />
                    </td>
                  </tr>
                )}

                {result?.count === 0 && (
                  <tr>
                    <td colSpan={100}>
                      <IconNoData />
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={100}>
                      <IconServerError />
                    </td>
                  </tr>
                )}

                {result?.count > 0 &&
                  result.data.map((item, key) => (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>
                        {item.role_is_active === 1 ? (
                          <Status text="Active" />
                        ) : (
                          <Status text="Inactive" />
                        )}
                      </td>
                      <td>{item.role_name}</td>
                      <td>{item.role_description}</td>
                      <td>
                        <ul className="table-action">
                          {item.role_is_active ? (
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
        {store.isDelete && (
          <ModalDelete
            setIsDelete={setIsDelete}
            mysqlApiDelete={`/v2/role/${id}`}
            queryKey={"role"}
            item={dataItem.role_name}
          />
        )}
        {store.isConfirm && <ModalConfirm />}
        {store.isArchive && (
          <ModalArchive
            setIsArchive={setIsArchive}
            mysqlEndpoint={`/v2/role/active/${id}`}
            queryKey={"role"}
          />
        )}
        {store.isRestore && (
          <ModalRestore
            setIsRestore={setIsRestore}
            mysqlEndpoint={`/v2/role/active/${id}`}
            queryKey={"role"}
          />
        )}
      </div>
    </>
  );
};

export default UserList;
