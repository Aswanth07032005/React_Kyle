import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

const itemsData = [
  {
    id: 1,
    code: "ITM-1001",
    name: "Premium Rice",
    category: "Food",
    brand: "India Foods",
    price: 1250,
    stock: 85,
    variants: 3,
    status: "Active",
  },
  {
    id: 2,
    code: "ITM-1002",
    name: "Organic Sugar",
    category: "Grocery",
    brand: "Nature Fresh",
    price: 850,
    stock: 42,
    variants: 2,
    status: "Active",
  },
  {
    id: 3,
    code: "ITM-1003",
    name: "Premium Coffee",
    category: "Beverages",
    brand: "Arabica",
    price: 650,
    stock: 8,
    variants: 4,
    status: "Low Stock",
  },
  {
    id: 4,
    code: "ITM-1004",
    name: "Wheat Flour",
    category: "Food",
    brand: "Golden Harvest",
    price: 480,
    stock: 65,
    variants: 0,
    status: "Active",
  },
  {
    id: 5,
    code: "ITM-1005",
    name: "Green Tea",
    category: "Beverages",
    brand: "Tea House",
    price: 390,
    stock: 25,
    variants: 2,
    status: "Active",
  },
  {
    id: 6,
    code: "ITM-1006",
    name: "Basmati Rice",
    category: "Food",
    brand: "Royal Foods",
    price: 1450,
    stock: 6,
    variants: 3,
    status: "Low Stock",
  },
];

function Items() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredItems = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return itemsData.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.code.toLowerCase().includes(searchText) ||
        item.brand.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesStatus =
        status === "All" || item.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, status]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  return (
    <div className="items-page">

      {/* ================= HEADER ================= */}

      <header className="items-topbar">

        <div className="items-title-area">

          <div className="items-breadcrumb">
            <Link to="/">Dashboard</Link>

            <i className="bi bi-chevron-right"></i>

            <span>Items</span>
          </div>

          <h1>Items</h1>

          <p>
            Manage all your inventory items
          </p>

        </div>

        <div className="items-header-actions">

          <button
            type="button"
            className="items-icon-btn"
          >
            <i className="bi bi-download"></i>
            <span>Export</span>
          </button>

          <Link
            to="/create-item"
            className="items-create-btn"
          >
            <i className="bi bi-plus-lg"></i>
            Create Item
          </Link>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="items-container">

        {/* ================= SUMMARY CARDS ================= */}

        <section className="items-summary">

          <div className="summary-card">

            <div className="summary-icon blue">
              <i className="bi bi-box-seam"></i>
            </div>

            <div>
              <span>Total Items</span>
              <strong>124</strong>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon green">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Active Items</span>
              <strong>118</strong>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon orange">
              <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
              <span>Low Stock</span>
              <strong>06</strong>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon purple">
              <i className="bi bi-layers"></i>
            </div>

            <div>
              <span>Total Variants</span>
              <strong>38</strong>
            </div>

          </div>

        </section>

        {/* ================= ITEMS CARD ================= */}

        <section className="items-main-card">

          {/* CARD HEADER */}

          <div className="items-card-header">

            <div>
              <h2>All Items</h2>

              <p>
                Browse, search and manage your inventory
              </p>
            </div>

            <span className="items-count">
              {filteredItems.length} Items
            </span>

          </div>

          {/* ================= FILTERS ================= */}

          <div className="items-filters">

            <div className="items-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search by item name, code or brand..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}

            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="All">
                All Categories
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Grocery">
                Grocery
              </option>

              <option value="Beverages">
                Beverages
              </option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Low Stock">
                Low Stock
              </option>
            </select>

            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Reset
            </button>

          </div>

          {/* ================= FILTER RESULT ================= */}

          {(search ||
            category !== "All" ||
            status !== "All") && (

            <div className="filter-info">

              <span>
                <i className="bi bi-info-circle"></i>

                {filteredItems.length} matching item
                {filteredItems.length !== 1
                  ? "s"
                  : ""}
              </span>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>

            </div>
          )}

          {/* ================= TABLE ================= */}

          <div className="items-table-wrapper">

            <table className="items-table">

              <thead>

                <tr>
                  <th>ITEM</th>
                  <th>ITEM CODE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>SELLING PRICE</th>
                  <th>STOCK</th>
                  <th>VARIANTS</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>

              </thead>

              <tbody>

                {filteredItems.length > 0 ? (

                  filteredItems.map((item) => (

                    <tr key={item.id}>

                      {/* ITEM */}

                      <td>

                        <div className="items-product">

                          <div className="items-product-icon">
                            <i className="bi bi-box"></i>
                          </div>

                          <div>

                            <strong>
                              {item.name}
                            </strong>

                            <span>
                              Product ID #{item.id}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* ITEM CODE */}

                      <td>

                        <span className="items-code">
                          {item.code}
                        </span>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="items-category">
                          {item.category}
                        </span>

                      </td>

                      {/* BRAND */}

                      <td>

                        <span className="items-brand">
                          {item.brand}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td>

                        <strong className="items-price">
                          ₹{" "}
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>

                      {/* STOCK */}

                      <td>

                        <div
                          className={
                            item.stock <= 10
                              ? "items-stock low"
                              : "items-stock"
                          }
                        >

                          <strong>
                            {item.stock}
                          </strong>

                          <span>pcs</span>

                        </div>

                      </td>

                      {/* VARIANTS */}

                      <td>

                        <span className="items-variant">
                          {item.variants}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            item.status === "Active"
                              ? "items-status active"
                              : "items-status low"
                          }
                        >

                          <span></span>

                          {item.status}

                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="items-actions">

                          {/* VIEW */}

                          <Link
                            to={"/items-single-view"}
                            className="items-action view"
                            title="View Item"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          {/* EDIT */}

                          <Link
                            to={"/EditItems"}
                            className="items-edit-btn"
                            title="Edit Item"
                          >
                            <i className="bi bi-pencil"></i>
                            <span>Edit</span>
                          </Link>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="9">

                      <div className="items-empty">

                        <div className="items-empty-icon">
                          <i className="bi bi-search"></i>
                        </div>

                        <h3>
                          No items found
                        </h3>

                        <p>
                          Try changing your search
                          or filters.
                        </p>

                        <button
                          type="button"
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </button>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* ================= FOOTER ================= */}

         

              

          

        </section>

        {/* ================= FOOTER ================= */}

        <footer className="items-footer">

          <span>
            © 2026 ItemPro. All rights reserved.
          </span>

          <span>
            Item Management System
          </span>

        </footer>

      </main>

    </div>
  );
}

export default Items;