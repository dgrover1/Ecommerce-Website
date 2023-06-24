import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useWishlist } from "../context/wishlist";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from "react-toastify";
import "../Styles/CartStyles.css";

const WishlistPage = () => {
    const [auth, setAuth] = useAuth();
    const [wishlist, setwishlist] = useWishlist();


    // detele item
    const removewishlistItem = (pid) => {
        try {
            let mywishlist = [...wishlist];
            let index = mywishlist.findIndex((item) => item._id === pid);
            mywishlist.splice(index, 1);
            setwishlist(mywishlist);
            localStorage.setItem("wishlist", JSON.stringify(mywishlist));
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    // }, [auth?.token]);
    return (
        <Layout>
            {/* console.log(wishlist.length); */}
            <div className=" cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                            <p className="text-center">
                                {wishlist?.length
                                    ? `You Have ${wishlist.length} items in your wishlist ${auth?.token ? "" : "please login to checkout !"
                                    }`
                                    : " Your wishlist Is Empty"}
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-7  p-0 m-0">
                            {wishlist?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100%"
                                            height={"130px"}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price : {p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removewishlistItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WishlistPage;