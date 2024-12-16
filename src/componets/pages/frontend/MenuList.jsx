import { imgPath } from "@/componets/helpers/functions-general";
import React from "react";
import { menus } from "../backend/menu-data";
import useQueryData from "@/componets/custom-hook/useQueryData";
import TableLoader from "../backend/partials/TableLoader";
import FetchingSpinner from "@/componets/partials/spinner/FetchingSpinner";
import NoData from "@/componets/partials/NoData";

const MenuList = ({ categoryId, cartData, setCartData, setIsSuccess }) => {
  // const menuFilter = menus.filter((item) => item.food_category_id === category);

  const handleAdd = (item) => {
    const exist = cartData.find((data) => data.food_aid === item.food_aid);
    if (exist !== undefined) {
      setCartData(
        cartData.map((cart) =>
          cart.food_aid === item.food_aid
            ? { ...exist, quantity: exist.quantity + 1 }
            : cart
        )
      );
    } else {
      setCartData([...cartData, { ...item, quantity: 1 }]);
    }
    setIsSuccess(true);
  };

  const {
    isLoading,
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/food/read-food-by-category`, //enpoint
    "post", //method
    "food/read-food-by-category", //key
    { categoryId },
    { categoryId }
  );

  return (
    <div className="relative">
      {isFetching && !isLoading && <FetchingSpinner />}
      {isLoading && (
        <div className="p-5">
          <TableLoader cols={3} count={50} />
        </div>
      )}

      {result?.count === 0 && (
        <div className="p-10">
          <NoData />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 p-4">
        {result?.count > 0 &&
          result.data.map((item, key) => (
            <button key={key} onClick={() => handleAdd(item)}>
              <img
                src={`${imgPath}/${item.food_image}`}
                alt=""
                className="w-[80%] mx-auto mb-2"
              />
              <h6 className="font-bold text-sm">{item.food_title}</h6>
              <p className="text-sm">P {item.food_price}</p>
            </button>
          ))}
      </div>
    </div>
  );
};

export default MenuList;
