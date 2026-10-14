import React from "react";
import Link from "next/link";

const SingleCategoryProduct = ({ product }) => {
  const isPriceDown = product?.currentPrice < product?.previousPrice;
  const isPriceUp = product?.currentPrice > product?.previousPrice;

  const savedAmount = product?.previousPrice - product?.currentPrice;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-BD").format(price ?? 0);

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gray-50 p-6">
        <img
          src={product?.image}
          alt={product?.name || "Product"}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
            isPriceDown
              ? "bg-emerald-100 text-emerald-700"
              : isPriceUp
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isPriceDown ? "▼" : isPriceUp ? "▲" : "—"}{" "}
          {product?.trendPercent ?? 0}%
        </span>

        {isPriceDown && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
            Save ৳{formatPrice(savedAmount)}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {product?.category}
          </span>

          <span className="text-xs font-medium text-gray-400">
            {product?.unit || "per piece"}
          </span>
        </div>

        <p className="mb-1 text-sm font-medium text-gray-500">
          {product?.brand}
        </p>

        <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-blue-600">
          {product?.name}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {product?.description}
        </p>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-xs text-gray-400">Current Price</p>

              <p className="text-2xl font-extrabold tracking-tight text-gray-900">
                ৳{formatPrice(product?.currentPrice)}
              </p>

              {product?.previousPrice != null && (
                <p className="mt-1 text-sm text-gray-400">
                  Previous:{" "}
                  <span
                    className={
                      isPriceDown ? "line-through" : "line-through"
                    }
                  >
                    ৳{formatPrice(product.previousPrice)}
                  </span>
                </p>
              )}
            </div>

            <Link
              href={`/product/${product?.slug}`}
              className="shrink-0 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
            >
              View Details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryProduct;