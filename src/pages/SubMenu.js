import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background: #3a3f4d;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #2D283E;
  height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;

  &:hover {
    background: #685d8f;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, selectedSubNav, setSelectedSubNav }) => {

  function handleSubNavSelection(_id) {
    selectedSubNav === _id ? setSelectedSubNav(-1) : setSelectedSubNav(_id);
  }

  return (
    <>
      <SidebarLink to={item.path} onClick={() => handleSubNavSelection(item.id) && item.subNav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && selectedSubNav === item.id
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {selectedSubNav === item.id && item.subNav &&
        item.subNav.map((item, index) => {
          if (item.subNav) return <SubMenu item={item} key={index} />

          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;