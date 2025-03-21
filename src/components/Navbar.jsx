import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png";
import { useLogoutMutation } from '../redux/auth/authApi';
import { logout as logoutAction } from '../redux/auth/authSlice';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const cartItemCount = products.reduce((total, product) => total + product.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleCartToggle = () => setIsCartOpen(!isCartOpen);
  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  const dropdownMenus = user?.role === 'admin' ? adminDropDownMenus : userDropDownMenus;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="logo">
          <Link to="/">Shop lib<span className="red-dot">.</span></Link>
        </div>

        <div className="nav-icons">
          <Link to="/search"><i className="ri-search-line"></i></Link>
          
          <button onClick={handleCartToggle} className="cart-btn">
            <i className='ri-shopping-bag-line'></i>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>

          {user ? (
            <div className="profile-dropdown">
              <img onClick={handleDropDownToggle} src={user?.profileImage || avatarImg} alt="User Avatar" className="avatar" />
              {isDropDownOpen && (
                <div className="dropdown-menu">
                  {dropdownMenus.map((menu, index) => (
                    <Link key={index} onClick={() => setIsDropDownOpen(false)} to={menu.path}>{menu.label}</Link>
                  ))}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><i className="ri-user-line"></i></Link>
          )}
        </div>
      </nav>
      {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </header>
  );
};

export default Navbar;

/* CSS */
const styles = `
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    height: 60px;
  }
  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
  }
  .nav-links li a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
  }
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  .logo .red-dot {
    color: #f00;
  }
  .nav-icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cart-btn {
    position: relative;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  .cart-count {
    position: absolute;
    top: -8px;
    right: -10px;
    font-size: 12px;
    color: #fff;
    background-color: #f00;
    border-radius: 50%;
    padding: 3px 6px;
  }
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #ccc;
  }
  .profile-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 45px; /* Adjust dropdown position */
  right: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-width: 180px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropdown-menu a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}

.dropdown-menu button {
  background: none;
  border: none;
  color: #d9534f;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  text-align: left;
}

.dropdown-menu button:hover {
  background-color: #f8d7da;
}

  }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
