import DeveloperProtectedRoute from "@/componets/pages/backend/access/DeveloperProtectedRoute";
import Advertisement from "@/componets/pages/backend/developer/advertisement/Adevertisement";
import AdverstisementTable from "@/componets/pages/backend/developer/advertisement/AdvertisementTable";
import Category from "@/componets/pages/backend/developer/category/Category";
import Dashboard from "@/componets/pages/backend/developer/dashboard/Dashboard";
import Foods from "@/componets/pages/backend/developer/foods/Foods";
import Developer from "@/componets/pages/backend/developer/settings/developer/Developer";
import Role from "@/componets/pages/backend/developer/settings/role/Role";
import Settings from "@/componets/pages/backend/developer/settings/Settings";
import User from "@/componets/pages/backend/developer/settings/user/User";




export const routeDeveloper = [
  {
    route: `/developer/`,
    element: (
      <DeveloperProtectedRoute>
        <Dashboard />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/dashboard`,
    element: (
      <DeveloperProtectedRoute>
        <Dashboard />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/advertisement`,
    element: (
      <DeveloperProtectedRoute>
        <Advertisement />,
      </DeveloperProtectedRoute>
    ),
  },

  {
    route: `/developer/category`,
    element: (
      <DeveloperProtectedRoute>
        <Category />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/foods`,
    element: (
      <DeveloperProtectedRoute>
        <Foods />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings`,
    element: (
      <DeveloperProtectedRoute>
        <Settings />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings/role`,
    element: (
      <DeveloperProtectedRoute>
        <Role />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `developer/settings/developer`,
    element: (
      <DeveloperProtectedRoute>
        <Developer />
      </DeveloperProtectedRoute>
    ),
  },

  {
    route: `/developer/settings/users`,
    element: (
      <DeveloperProtectedRoute>
        <User />,
      </DeveloperProtectedRoute>
    ),
  },
];
