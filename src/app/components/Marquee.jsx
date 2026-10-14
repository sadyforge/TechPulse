
import MarqueeText from "react-marquee-text";
import baseUrl from "../../Services/baseUrl";
import Link from "next/link";

const getProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/products`);

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const MarqueePage = async () => {
  const products = await getProducts();

  if (!products.length) return null;

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white py-3">
      <MarqueeText>
        {products.map((product) => (
          <div
            key={product._id || product.id || product.slug}
            className="mx-3 inline-flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-3 transition hover:bg-gray-50"
          >
            <span className="text-sm font-semibold text-gray-800">
              {product.name}
            </span>

            <span className="text-base font-bold text-gray-950">
              ৳{Number(product.currentPrice ?? 0).toLocaleString("en-BD")}
            </span>

            <span
              className={`text-sm font-bold ${
                product.trend === "up"
                  ? "text-red-500"
                  : product.trend === "down"
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              {product.trend === "up"
                ? `▲ ${product.trendPercent ?? 0}%`
                : product.trend === "down"
                  ? `▼ ${product.trendPercent ?? 0}%`
                  : "—"}
            </span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default MarqueePage;
