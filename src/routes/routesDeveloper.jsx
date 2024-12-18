import Advertisement from "@/componets/pages/backend/advertisement/Adevertisement";
import Adevertisement from "@/componets/pages/backend/advertisement/Adevertisement";
import Category from "@/componets/pages/backend/category/Category";
import Dashboard from "@/componets/pages/backend/dashboard/Dashboard";
import Foods from "@/componets/pages/backend/foods/Foods";
import Role from "@/componets/pages/backend/settings/role/Role";
import Settings from "@/componets/pages/backend/settings/Settings";
import User from "@/componets/pages/backend/settings/user/User";

export const routeDeveloper = [
  {
    route: `/admin/dashboard`,
    element: <Dashboard />,
  },
  {
    route: `/admin/advertisement`,
    element: <Advertisement />,
  },

  {
    route: `/admin/category`,
    element: <Category />,
  },
  {
    route: `/admin/foods`,
    element: <Foods />,
  },
  {
    route: `/admin/settings`,
    element: <Settings />,
  },
  {
    route: `/admin/settings/role`,
    element: <Role />,
  },
  {
    route: `/admin/settings/users`,
    element: <User />,
  },
  
];
