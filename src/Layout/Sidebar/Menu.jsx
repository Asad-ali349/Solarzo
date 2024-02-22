export const MENUITEMS = [
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [

         { path: '/dashboard', icon: "icofont-home", id:'dashboard',title: "Dashboard", type: "link" },
         { path: '/inventry', icon: "icofont-vehicle-delivery-van", id:'inventry',title: "Inventory", type: "link" },
         { path: '/assign_inventry', icon: "icofont-tick-boxed", id:'assign_inventry',title: "Assign Inventory", type: "link" },
    ],
  },
    {
    menutitle: "SETTINGS",
    menucontent: "Ready to use Apps",
    Items: [
      { path: '/users', icon: "icofont-users-alt-3", id:'users', title: "Users", type: "link" },
      { path: '/profile', icon: "icofont-user-alt-3", id:'profile', title: "Profile", type: "link" },
      { path: '/change_password', icon: "icofont-ui-password",id:'change_password', title: "Change Password", type: "link" },
      { path: `${process.env.PUBLIC_URL}/`, icon: "icofont-logout",id:'logout', title: "Logout", type: "link" },
    
    ],
  },


];
