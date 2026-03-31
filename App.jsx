import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Product Explorer</h1>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* ⏳ Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* ❌ Error */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* 📦 Products */}
      {!loading && !error && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {filteredProducts.map((item) => (
            <div key={item.id} style={{
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <img src={item.image} alt={item.title} width="100" />
              <h3>{item.title}</h3>
              <p>₹ {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;