const menuData = [
    {
        id:1,
        name: "Dashboard",
        iconName: "compass-outline",
        link : "/dashboard",
        subMenu:[]
    },
    { 
        id: 2, 
        name: "Admin Users", 
        iconName: "account-group",
        link:"User",
        subMenu: [
            { id: 2.1, name: "List User", link: "/user" },
            { id: 2.2, name: "Add User", link: "/add-user" }
        ] 
    }, 
    {   id: 3, 
        name: "Products", 
        iconName: "store",
        subMenu: [
            { id: 2.1, name: "List Product", link: "/products" },
            { id: 2.2, name: "Add Page", link: "pages/ui-features/dropdowns.html" },
            { id: 2.3, name: "Delete Page", link: "pages/ui-features/typography.html" }
        ] 
    }
  ];
  
  export default menuData;