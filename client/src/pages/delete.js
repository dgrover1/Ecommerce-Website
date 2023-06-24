import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./../components/layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../Styles/Homepage.css";
import { useCart } from "../context/cart";
import { useWishlist } from "../context/wishlist";
import "../App.css"
import { FaShoppingCart, FaHeart } from "react-icons/fa";
const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [wishlist, setwishlist] = useWishlist();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"ALl Products - Best offers "}>
            {/* banner image */}
            <div className="relative">
                <img
                    src="/banner.jpeg"
                    alt="bannerimage"
                    width={"100%"}
                />
                {/* <div className="absolute top-[150px] right-11 text-2xl w-[720px] font-bold italic" >
                    Welcome to <span className="text-purple-900 italic">Cara</span>, your ultimate online destination for all your shopping needs.<br></br><br></br>
                    Unleash your inner shopaholic and indulge in the convenience of hassle-free shopping.<br></br>

                    Revolutionize the way you shop with Cara. Start exploring now and let the adventure begin!<br></br>
                </div> */}
            </div>
            {/* banner image */}
            <div className="container-fluid row mt-3 home-page">
                <div className="col-md-3 filters">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Products</h1>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]" >
                        {products?.map((p) => (
                            <div className="flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in   shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] p-4 mt-10 ml-5 rounded-xl ">


                                <div className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{p.name.substring(0, 20)}
                                    {p.name.length > 20 && "..."}
                                </div>

                                <div className="w-40 text-gray-400 font-normal text-[10px] text-left"> {p.description.substring(0, 40)}
                                    {p.description.length > 40 && "..."}
                                </div>
                                <div className="h-[180px]">
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="h-full w-full" />
                                </div>
                                <div className=" flex justify-between gap-x-11 items-center w-full mt-5 flex-wrap ">
                                    <div>
                                        {p.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </div>

                                    <div >
                                        <button className="border-2 text-gray-700 border-gray-700 rounded-full font-semibold text-[12px] uppercase p-1 px-3 transition duration-300 ease-in hover:text-white hover:bg-[#71C0DA]"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                    <div >
                                        <button className="border-2 text-gray-700 border-gray-700 rounded-full font-semibold text-[12px] uppercase p-1 px-3 transition duration-300 ease-in hover:text-white hover:bg-[#71C0DA]"
                                            onClick={() => {
                                                setwishlist([...wishlist, p]);
                                                localStorage.setItem(
                                                    "wishlist",
                                                    JSON.stringify([...wishlist, p])
                                                );
                                                toast.success("Item Added to wishlist");
                                            }}
                                        >
                                            <FaHeart />
                                        </button>
                                    </div>
                                </div>

                            </div>

                        ))}
                    </div>
                    <div >
                        {products && products.length < total && (
                            <button

                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>

                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default HomePage;


