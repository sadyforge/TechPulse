'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const AllProductsPage = ({ products = [] }) => {
    const [search,setSearch]=useState('')

    const filterdData=products.filter(product=>{
        if(!search.trim())return products;
        const filterProduct=product.name.toLowerCase().includes(search.toLowerCase())
        return filterProduct;
    })


    const formatPrice = (price) =>
        new Intl.NumberFormat('en-BD').format(price ?? 0);

    return (
        <section>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                        <span>⚡</span>
                        All Products
                    </h1>

                    <p className="mt-2 text-sm font-medium text-gray-500">
                        {products.length} products
                    </p>
                </div>

      <div>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='p-2 border border-black rounded-sm' />
      </div>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterdData.map((product) => {
                        const isPriceUp = product?.trend === 'up';
                        const isPriceDown = product?.trend === 'down';

                        return (
                            <div
                                key={product._id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                            >
                                <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/50 p-6">
                                    <img
                                        src={product?.image || 'https://placehold.co/500x500?text=Product'}
                                        alt={product?.name || 'Product'}
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <span
                                        className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
                                            isPriceUp
                                                ? 'bg-red-50 text-red-600'
                                                : isPriceDown
                                                    ? 'bg-emerald-50 text-emerald-600'
                                                    : 'bg-white text-gray-500'
                                        }`}
                                    >
                                        {isPriceUp ? '▲' : isPriceDown ? '▼' : '—'}{' '}
                                        {product?.trendPercent ?? 0}%
                                    </span>

                                    <span className="absolute right-4 top-4 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 text-xs font-semibold capitalize text-gray-600">
                                        {product?.category || 'General'}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                            {product?.brand || 'Brand'}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {product?.unit || 'per piece'}
                                        </span>
                                    </div>

                                    <h2 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                        {product?.name || 'Product Name'}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                                        {product?.description || 'Explore product specifications and details.'}
                                    </p>

                                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                        <p className="text-xs font-medium text-gray-500">
                                            Current Price
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                                            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                                                ৳{formatPrice(product?.currentPrice)}
                                            </span>

                                            {product?.previousPrice != null && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    ৳{formatPrice(product.previousPrice)}
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className={`mt-2 text-xs font-semibold ${
                                                isPriceUp
                                                    ? 'text-red-600'
                                                    : isPriceDown
                                                        ? 'text-emerald-600'
                                                        : 'text-gray-500'
                                            }`}
                                        >
                                            {isPriceUp
                                                ? '↑ Price increased'
                                                : isPriceDown
                                                    ? '↓ Price decreased'
                                                    : '→ Price unchanged'}{' '}
                                            by {product?.trendPercent ?? 0}%
                                        </p>
                                    </div>

                                    <Link
                                        href={`/product/${product?.slug}`}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-600"
                                    >
                                        View Details
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                    <div className="text-4xl">📦</div>
                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                        No products found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Products will appear here when available.
                    </p>
                </div>
            )}
        </section>
    );
};

export default AllProductsPage;