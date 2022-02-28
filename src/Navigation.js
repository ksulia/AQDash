import React from 'react';
 
import { NavLink } from 'react-router-dom';
import './styles.css'
 
const Navigation = () => {
    return (
       <div id='page-header-flex' style={{display:'flex',flexDirection:'row',margin:0, padding:5, height:'100%',alignItems:'center'}}>
           <div style={{}}>
               <h1>AQ Dashboard</h1>
           </div>
           <div style={{flex:1}}>
               <div style={{display:'flex',flexDirection:'row',margin:0,justifyContent:'flex-end'}}>
                   <Nav loc="/" title="Real Time"/>
                   <Nav loc="/forecast" title="Forecast"/>
                   <Nav loc="/about" title="About"/>
                </div>
            </div>
       </div>
    );
}
 
export default Navigation;

const Nav = ({loc, title}) => {
    return (
        <div style={{margin:5}}> 
            <NavLink to={loc} style={({ isActive }) => ({
                color: isActive ? '#461660' : '#545e6f',
                fontWeight: isActive ? "bold" : "none",
/*                 background: isActive ? '#7600dc' : '#ffffff',*/
                textDecoration: 'none',
                fontStyle: isActive? 'italic':'normal',
                fontSize:20,
                padding:2,
            })}>{title}</NavLink> 
        </div>
    )
}