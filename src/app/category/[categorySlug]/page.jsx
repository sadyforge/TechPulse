import Link from 'next/link';
import baseUrl from '../../../Services/baseUrl';
import React from 'react';
import SingleCategoryProduct from '@/app/components/SingleCategoryProduct';

const categoryProduct=async(categorySlug)=>{
    const res=await fetch(`${baseUrl}/api/products?category=${categorySlug}`)
    const data=await res.json()
    return data
}

const getCategories = async () => {
  const res = await fetch(`${baseUrl}/api/categories`);
  const data = await res.json();
  return data;
};

const CategoryProductPage =async ({params}) => {
    const {categorySlug}=await params
      const categoryProducts = await categoryProduct(categorySlug);
           const categories=await getCategories()

      
    const currentCategory = categories.find(c => c.slug == categorySlug)
    console.log(currentCategory);
    return (
   <div className="min-h-screen bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

    {/* Breadcrumb */}
    <div className="mb-8 flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="font-medium text-gray-500 transition hover:text-blue-600"
      >
        Home
      </Link>
      <span className="text-gray-300">/</span>
      <span className="font-semibold capitalize text-gray-900">
        {currentCategory?.slug}
      </span>
    </div>

    {/* Category Hero */}
    <div className="relative mb-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-purple-100/60 blur-3xl" />

      <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-4xl shadow-sm sm:h-24 sm:w-24 sm:text-5xl">
            {currentCategory?.icon}
          </div>

          <div className="pt-1">
            <span className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              Explore Products
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentCategory?.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              {currentCategory?.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-600">
            ✓
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">
              Prices Updated
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Check the latest prices
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Products Toolbar */}
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          Explore {currentCategory?.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Compare prices and find the right product for you.
        </p>
      </div>

      <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75h6.5v6.5h-6.5zm10 0h6.5v6.5h-6.5zm-10 10h6.5v6.5h-6.5zm10 0h6.5v6.5h-6.5z"
            />
          </svg>
        </div>

        <div>
          <p className="text-lg font-extrabold leading-5 text-gray-900">
            {categoryProducts.length}
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500">
            Products Available
          </p>
        </div>
      </div>
    </div>

    {/* Product Grid */}
    {categoryProducts.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryProducts.map((product) => (
          <SingleCategoryProduct
            key={product._id}
            product={product}
          />
        ))}
      </div>
    ) : (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
          🔍
        </div>

        <h3 className="mt-5 text-xl font-bold text-gray-900">
          No products found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          There are currently no products in this category.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Explore All Products
        </Link>
      </div>
    )}

  </div>
</div>
    );
};

export default CategoryProductPage;