import React from "react";
import MenuItemSidebar from "./MenuItemSidebar";
import { Assignment, ImportContacts } from "@mui/icons-material";

const MenuRps = () => {
  return (
    <>
      <MenuItemSidebar title="Pengisian RPS" icon={<Assignment />} isOpen={true}>
        <MenuItemSidebar url="/rps/input" title="Input RPS" icon={<ImportContacts />} />
        <MenuItemSidebar url="/rps/review" title="Review RPS" icon={<Assignment />} />
      </MenuItemSidebar>
      <MenuItemSidebar title="Dosen" icon={<Assignment/>} url="/dosen" ></MenuItemSidebar>
      <MenuItemSidebar title="Dosen Pengampu" icon={<Assignment/>} url="/dosen-pengampu" ></MenuItemSidebar>
    </>
  );
};

export default MenuRps;
