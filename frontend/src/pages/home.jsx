import { IoIosCart, IoIosChatbubbles } from "react-icons/io";

// Dummy product data with uploader info
const suggestedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99",
    image: "Wireless Headphones",
    uploader: { name: "Alice", avatar: "" },
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image: "Smart Watch",
    uploader: { name: "Bob", avatar: "" },
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$49",
    image: "Gaming Mouse",
    uploader: { name: "Charlie", avatar: "" },
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$89",
    image: "Mechanical Keyboard",
    uploader: { name: "Dana", avatar: "" },
  },
];

export default function Home() {
  return (
    <div className="p-6">

      {/* Banner */}
      <div className="relative w-full bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg p-10 mb-8">
        <div className="absolute top-4 right-4 opacity-20 text-6xl rotate-12 text-green-500">
          <IoIosCart />
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-500">
            Welcome to ShopHub!
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300">
            Your one-stop mall for all your needs. Discover amazing products, explore deals, and shop with ease.
          </p>
          <button className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 hover:scale-105 transition-all duration-300">
            Start Shopping
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-700 rounded-full opacity-30 -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Suggested Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-green-500">Latest Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-black rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            >
              {/* Hover overlay glow */}
              <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl z-10"></div>

              {/* Placeholder image / text */}
              <div className="h-48 flex items-center justify-center text-gray-400 text-xl font-bold relative z-20">
                {product.image}
              </div>

              {/* Product info overlay (YouTube-style) */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
                <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-green-500 font-bold">{product.price}</p>

                {/* Uploader info + actions */}
                <div className="flex items-center mt-3 justify-between">
                  {/* Avatar + name */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-bold">
                      {product.uploader.avatar
                        ? <img src={product.uploader.avatar} alt={product.uploader.name} className="w-full h-full rounded-full object-cover"/>
                        : product.uploader.name[0]}
                    </div>
                    <span className="ml-2 text-white text-sm">{product.uploader.name}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-500 transition-all">
                      Add to Cart
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-red-600 p-2 rounded-full transition-all">
                      <IoIosChatbubbles />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
