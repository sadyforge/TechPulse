
import baseUrl from '../../Services/baseUrl';
import SingleCategoryProduct from './SingleCategoryProduct';
import AllProductsPage from './AllProducts';

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return data;
};

const HomePageProduct = async () => {
    
  const products = await getProducts();
  const downProducts = products.filter((p) => p.trend === 'down');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <span className="text-sm">↓</span>
                PRICE DROP ALERT
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Prices Going Down
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Discover products with reduced prices and find better deals.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-600">
                ↓
              </div>

              <div>
                <p className="text-xl font-extrabold text-gray-900">
                  {downProducts.length}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  Price Drops
                </p>
              </div>
            </div>
          </div>

          {downProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {downProducts.map((product) => (
                <SingleCategoryProduct
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <div className="text-4xl">📉</div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">
                No price drops right now
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Check back later for products with reduced prices.
              </p>
            </div>
          )}
        </section>

        <div className="border-t border-gray-200" />

        <div>
            <AllProductsPage products={products}/>
        </div>
      </div>
    </div>
  );
};

export default HomePageProduct;