import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { useWishlist } from "../../context/wishlist";
import { Badge } from "antd";
import { BsCartCheckFill } from "react-icons/bs"
import { FaShoppingCart, FaHeart } from "react-icons/fa";
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [wishlist] = useWishlist();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("logout ho gye ");
    };
    return (
        <div style={{ backgroundImage: "linear-gradient(45deg, rgb(93, 191, 216),rgb(119, 199, 222),rgb(104, 183, 213) , rgb(97, 178, 206))" }}>
            <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
                <Link to="/">
                    <div className="ml-5">
                        <img src="/logo_bg_no.png" className="h-14" />
                    </div>
                </Link>

                <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/about">
                        About
                    </NavLink>

                    <NavLink to="/cart">
                        <div className="relative">
                            <FaShoppingCart className="text-2xl" />
                            {cart.length > 0 && <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">{cart.length}</span>}
                        </div>
                    </NavLink>
                    <NavLink to="/wishlist">
                        <div className="relative">
                            <FaHeart className="text-2xl" />
                            {wishlist.length > 0 && <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">{wishlist.length}</span>}
                        </div>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;
