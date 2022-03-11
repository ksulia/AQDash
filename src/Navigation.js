import React from 'react';
 
import { NavLink } from 'react-router-dom';
import './styles.css'
 
const Navigation = () => {
    return (
       <div id='page-header-flex' style={{display:'flex',flexDirection:'row',margin:0, padding:5, height:'100%',alignItems:'center'}}>
           <div style={{}}>
               <h1>AQ3 Dashboard</h1>
           </div>
           <div style={{flex:1}}>
               <div style={{display:'flex',flexDirection:'row',margin:0,justifyContent:'flex-end'}}>
                   <Nav loc="/" title="Real Time" color='#461660'/>
                   <Nav loc="/forecast" title="Forecast" color='#EEB211'/>
                   <Nav loc="/about" title="About" color='#461660'/>
                </div>
            </div>
       </div>
    );
}
 
export default Navigation;

const Nav = ({loc, title, color}) => {
    return (
        <div style={{margin:5}}> 
            <NavLink to={loc} style={({ isActive }) => ({
                color: isActive ? color : '#545e6f',
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