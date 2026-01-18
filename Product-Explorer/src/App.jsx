import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
     

      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  const filteredProducts = products.filter(product =>
    product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLow") {
      return a.price - b.price;
    }

    if (sortOption === "priceHigh") {
      return b.price - a.price;
    }

    if (sortOption === "nameAsc") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
  function handleProductClick(product) {
    setSelectedProduct(product);
  }
  
  function closeModal() {
    setSelectedProduct(null);
  }
  

  if (loading) {
    return (
      <div className="app-container">
        <h1>Product Explorer</h1>

        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <h2>Error: {error}</h2>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

 
  return (
    <div className="app-container">
      <h1>Product Explorer</h1>

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ marginBottom: "16px", padding: "8px" }}
      >
        <option value="none">Sort By</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="nameAsc">Name: A → Z</option>
      </select>

      <p>
        Showing {sortedProducts.length} products
      </p>

      {sortedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <ProductList
            products={sortedProducts}
            onProductClick={handleProductClick}
          />
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
          />
        </>
      )}
    </div>
  );
}

export default App;
