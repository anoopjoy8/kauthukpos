import React, { useState, useEffect } from "react";
import "../../../Assets/css/developer.css";
import "@mdi/font/css/materialdesignicons.min.css";
import menuData from "../../Data/Menudata";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentActionState } from "../../Actions/currentAction";

function Menu() {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(1);
  const [currentAction, setCurrentAction] = useState("");
  const handleMenuClick = (menuId,currentTitle,mainMenu,subMenu) => {
    if(menuId !== -1){
      setOpenMenuId((prevMenuId) => (prevMenuId === menuId ? null : menuId));
    }
    dispatch(currentActionState(currentTitle,mainMenu,subMenu));
  };
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    setCurrentAction(path.substring(path.lastIndexOf("/") + 1));
  }, [location]);
  const isExpanded = (menu) => {
    return (
      openMenuId === menu.id ||
      menu.name.toLowerCase() === currentAction.toLowerCase()
    );
  };
  return (
    <>
      {menuData.map((menu, index) => (
        <li
          className={`nav-item ${isExpanded(menu) ? "active" : ""}`}
          key={menu.id || index}
        >
          {menu.subMenu && menu.subMenu.length > 0 ? (
            <span
              className={`nav-link ${menu.id}`}
              onClick={() => handleMenuClick(menu.id,menu.name,"","")}
              aria-expanded={isExpanded(menu)}
            >
              <i
                className={`mdi mdi-${menu.iconName} menu-icon`}
              ></i>
              <span className="menu-click"> {menu.name} </span>
              <span className="iconRight">
                <i
                  className={`mdi ${
                    isExpanded(menu)
                      ? "mdi-chevron-down"
                      : "mdi-chevron-right"
                  } menu-click`}
                ></i>
              </span>
            </span>
          ) : (
            <Link
              className="nav-link"
              to={menu.link}
              onClick={() => handleMenuClick(menu.id,menu.name,"","")}
            >
              <i
                  className={`mdi mdi-${menu.iconName} menu-icon`}
              ></i>
              {menu.name}
            </Link>
          )}
          {menu.subMenu.length > 0 && openMenuId === menu.id && (
            <div
                className="collapse show"
                id={`submenu-${menu.id}`}
            >
              <ul className="nav flex-column sub-menu">
                {menu.subMenu.map((sub) => (
                  <li key={sub.id} className="nav-item">
                    <Link
                        className="nav-link"
                        to={sub.link}
                        onClick={() => handleMenuClick(-1,sub.name,menu.name,sub.name)}
                    >
                        {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </>
  );
}

export default Menu;
