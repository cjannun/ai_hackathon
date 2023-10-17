import React, { useState } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

const SidebarNav = styled.nav`
  background: #15171c;
  width: 100%;
  height: 100vh;
  display: flex-column; 
`;

const Sidebar = () => {
  const [selectedSubNav, setSelectedSubNav] = useState(-1);

 return (
    <div className='d-flex flex-column flex-shrink-0 w-22' style={{width: "17%"}}>
        <div style={{backgroundColor: "#1E1E1E", color: "#1E1E1E", padding: "0.5rem", textAlign:"right", fontSize: "30px"}}>
                <b style={{visibility: "hidden"}}>aiccountant</b>
            </div>
            
        <SidebarNav>
            {SidebarData.map((item, index) => {
                return <SubMenu 
                item={item} 
                key={index} 
                selectedSubNav={selectedSubNav}
                setSelectedSubNav={setSelectedSubNav} 
                />;
            })}
        </SidebarNav>
    </div>
  );
};

export default Sidebar;