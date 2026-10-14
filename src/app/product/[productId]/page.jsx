
import baseUrl from "@/Services/baseUrl";
import Link from "next/link";

const getProductDetail = async (slug) => {
  try {
    const res = await fetch(`${baseUrl}/api/products/${slug}`);

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

const ProductDetailPage = async ({ params }) => {
  const { productId } = await params;
  const product = await getProductDetail(productId);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <span className="text-7xl">📦</span>
        <h1 className="mt-6 text-3xl font-black text-slate-900">
          Product Not Found
        </h1>
        <p className="mt-3 text-slate-500">
          Sorry, we couldn&apos;t find this product.
        </p>
        <Link
          href="/"
          className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          ← Back to Products
        </Link>
      </main>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-BD").format(price ?? 0);

  const isPriceUp = product.trend === "up";
  const isPriceDown = product.trend === "down";

  const specifications = [
    { label: "Processor", value: product.specs?.processor, icon: "⚡" },
    { label: "RAM", value: product.specs?.ram, icon: "💾" },
    { label: "Storage", value: product.specs?.storage, icon: "📦" },
    { label: "Display", value: product.specs?.display, icon: "🖥️" },
    { label: "Camera", value: product.specs?.camera, icon: "📷" },
    { label: "Battery", value: product.specs?.battery, icon: "🔋" },
  ].filter((spec) => spec.value);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="max-w-48 truncate font-medium text-slate-800">
                {product.name}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Product Details
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            <span>←</span> All Products
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-100/70 p-8 sm:min-h-[500px] sm:p-14">
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                {product.category || "Product"}
              </div>

              <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
              <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl" />

              <img
                src={
                  product.image ||
                  "https://placehold.co/600x600?text=Product"
                }
                alt={product.name}
                className="relative z-10 max-h-[390px] w-full object-contain drop-shadow-xl transition duration-500 hover:scale-105"
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur">
                Official Product Image
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  {product.brand || "Brand"}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                    isPriceUp
                      ? "bg-rose-50 text-rose-600"
                      : isPriceDown
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isPriceUp ? "↑" : isPriceDown ? "↓" : "→"}
                  {isPriceUp
                    ? "Price Increased"
                    : isPriceDown
                      ? "Price Decreased"
                      : "Price Unchanged"}
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {product.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                {product.description}
              </p>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5 sm:p-6">
                <p className="text-sm font-semibold text-slate-500">
                  Current Market Price
                </p>

                <div className="mt-3 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                    ৳{formatPrice(product.currentPrice)}
                  </span>

                  {product.previousPrice != null && (
                    <span className="text-lg text-slate-400 line-through">
                      ৳{formatPrice(product.previousPrice)}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-blue-100 pt-4">
                  <span
                    className={`text-sm font-bold ${
                      isPriceUp
                        ? "text-rose-600"
                        : isPriceDown
                          ? "text-emerald-600"
                          : "text-slate-500"
                    }`}
                  >
                    {isPriceUp ? "↗" : isPriceDown ? "↘" : "→"}{" "}
                    {product.trendPercent ?? 0}%{" "}
                    {isPriceUp
                      ? "price increase"
                      : isPriceDown
                        ? "price decrease"
                        : "price change"}
                  </span>

                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                    {product.unit || "per piece"}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>🏷️</span> Brand
                  </div>
                  <p className="mt-2 truncate font-bold text-slate-900">
                    {product.brand || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>📂</span> Category
                  </div>
                  <p className="mt-2 capitalize font-bold text-slate-900">
                    {product.category || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Compare Before You Buy
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Compare prices from available stores to find the right deal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {product.stores?.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Best Deals
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Compare Store Prices
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Compare the listed prices before making a purchase.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {product.stores.length} Stores
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[...product.stores]
                .sort((a, b) => a.price - b.price)
                .map((store, index) => (
                  <div
                    key={store.name}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                        🏪
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {store.name}
                          </h3>

                          {index === 0 && (
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                              Lowest Price
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          Price listed by {store.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="text-xl font-black text-slate-900">
                        ৳{formatPrice(store.price)}
                      </p>

                      <a
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        Visit Store ↗
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {product.priceHistory?.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Price Tracking
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Price History
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Historical prices available for this product.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-4 font-bold">Date</th>
                    <th className="px-4 py-4 text-right font-bold">
                      Price
                    </th>
                    <th className="px-4 py-4 text-right font-bold">
                      Change
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.priceHistory.map((item, index) => {
                    const previous = product.priceHistory[index - 1];
                    const difference = previous
                      ? item.price - previous.price
                      : null;

                    return (
                      <tr
                        key={`${item.date}-${index}`}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-slate-600">
                          {item.date}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-slate-900">
                          ৳{formatPrice(item.price)}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold">
                          {difference === null ? (
                            <span className="text-slate-400">—</span>
                          ) : (
                            <span
                              className={
                                difference > 0
                                  ? "text-rose-600"
                                  : difference < 0
                                    ? "text-emerald-600"
                                    : "text-slate-400"
                              }
                            >
                              {difference > 0 ? "+" : ""}
                              {formatPrice(difference)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {specifications.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Product Information
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Technical Specifications
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Explore the key features and technical details.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              {specifications.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-6 ${
                    index !== specifications.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  } ${index % 2 === 0 ? "bg-slate-50/80" : "bg-white"}`}
                >
                  <p className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                    <span>{spec.icon}</span>
                    {spec.label}
                  </p>

                  <p className="text-sm font-bold leading-6 text-slate-900">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:px-8">
          <div>
            <p className="font-bold text-slate-900">
              Looking for more products?
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Explore other products and compare their prices.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            Explore Products →
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
