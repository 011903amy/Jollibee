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
import { useInView } from "react-intersection-observer";
import { queryDataInfinite } from "@/componets/helpers/queryDataInfinite";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchBarWithFilterStatus from "@/componets/partials/SearchBarWithFilterStatus";
import Pills from "../../partials/Pills";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";

const DeveloperList = ({ setItemEdit }) => {
   const [id, setIsId] = React.useState("");
   const { store, dispatch } = React.useContext(StoreContext);
   const [isFilter, setIsFilter] = React.useState(false);
   const [onSearch, setOnSearch] = React.useState(false);
   const [statusFilter, setStatusFilter] = React.useState("");
   const search = React.useRef({ value: "" });
   const [page, setPage] = React.useState(1);
   const { ref, inView } = useInView();
  let counter = 1;

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.user_developer_aid);
    setDataItem(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsId(item.user_developer_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsId(item.user_developer_aid);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: result,
  //   status,
  // } = useQueryData(
  //   `/v2/developer`, //enpoint
  //   "get", //method
  //   "developer" //key
  // );
  const {
    data: result,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["developer", onSearch, isFilter, statusFilter],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "/v2/developer/search", // search or filter endpoint
        `/v2/developer/page/${pageParam}`, //page api/ endpoint
        isFilter || store.isSearch, //search boolean
        {
          isFilter,
          statusFilter,
          searchValue: search?.current.value,
          id: "",
        } //payload
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });
 React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div>
        <div>
          <SearchBarWithFilterStatus
            search={search}
            dispatch={dispatch}
            store={store}
            result={result}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setIsFilter={setIsFilter}
            setPage={setPage}
          />
        </div>
        <div className="relative p-4 bg-secondary rounded-md mt-10 border border-line">
          {/* {isFetching && !isLoading && <FetchingSpinner />} */}

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
                {/* LOADING OF NO DATA */}

                {(status === "pending" ||
                  result?.pages[0].data.length === 0) && (
                  <tr>
                    <td colSpan="100%" className="p-10">
                      {status === "pending" ? (
                        <TableLoader cols={2} count={20} />
                      ) : (
                        <IconNoData />
                      )}
                    </td>
                  </tr>
                )}
                {/* ERROR */}
                {error && (
                  <tr>
                    <td colSpan={100}>
                      <IconServerError />
                    </td>
                  </tr>
                )}

                {/* RESULT */}

                {result?.pages.map((page, pageKey) => (
                  <React.Fragment key={pageKey}>
                    {page.data.map((item, key) => {
                      return (
                        <tr key={key} className="group relative cursor-pointer">
                          <td className="text-center">{counter++}</td>
                          <td>
                            {item.user_developer_is_active === 1 ? (
                              <Status text={"Active"} />
                            ) : (
                              <Status text={"Inactive"} />
                            )}
                          </td>
                          <td>
                            {item.user_developer_first_name}{" "}
                            {item.user_developer_last_name}
                          </td>
                          <td>{item.user_developer_email}</td>
                          <td
                            colSpan="100%"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <div className="flex items-center justify-end gap-2 mr-5">
                              {item.user_developer_is_active == 1 ? (
                                <>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Edit"
                                    disabled={isFetching}
                                    onClick={() => handleEdit(item)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Archive"
                                    disabled={isFetching}
                                    onClick={() => handleArchive(item)}
                                  >
                                    <FaArchive />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Restore"
                                    disabled={isFetching}
                                    onClick={() => handleRestore(item)}
                                  >
                                    <FaTrashRestore />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Delete"
                                    disabled={isFetching}
                                    onClick={() => handleDelete(item)}
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <LoadMore />
          </div>
        </div>
        {store.isDelete && (
          <ModalDelete
            setIsDelete={setIsDelete}
            mysqlApiDelete={`/v2/developer/${id}`}
            queryKey={"developer"}
            item={dataItem.developer_name}
          />
        )}
        {store.isConfirm && <ModalConfirm />}
        {store.isArchive && (
          <ModalArchive
            setIsArchive={setIsArchive}
            mysqlEndpoint={`/v2/developer/active/${id}`}
            queryKey={"developer"}
          />
        )}
        {store.isRestore && (
          <ModalRestore
            setIsRestore={setIsRestore}
            mysqlEndpoint={`/v2/developer/active/${id}`}
            queryKey={"developer"}
          />
        )}
      </div>
    </>
  );
};

export default DeveloperList;
