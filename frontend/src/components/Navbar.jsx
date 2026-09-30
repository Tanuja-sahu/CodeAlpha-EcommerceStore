import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export default function Navbar(){
 const {user,logout,cart}=useApp(); const nav=useNavigate();
 return <header className="nav"><Link className="brand" to="/">Shop<span>Nest</span></Link><nav><Link to="/">Shop</Link>{user&&<Link to="/orders">My Orders</Link>}{user?<button className="linkbtn" onClick={()=>{logout();nav('/')}}>Logout</button>:<Link to="/login">Login</Link>}<Link className="cart" to="/cart">🛒 <b>{cart.reduce((s,x)=>s+x.quantity,0)}</b></Link></nav></header>
}
