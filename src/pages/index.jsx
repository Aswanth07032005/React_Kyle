import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

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
];

function Index() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return itemsData.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.code.toLowerCase().includes(searchText) ||
        item.brand.toLowerCase().includes(searchText);

      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="dashboard-page">

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon" aria-hidden="true">
            <i className="bi bi-box-seam"></i>
          </div>

          <div className="logo-content">
            <h4>ItemPro</h4>
            <span>Management System</span>
          </div>

          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <nav className="sidebar-section" aria-label="Main">
          <span className="sidebar-title">Menu</span>

          <Link to="/" className="sidebar-link active" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-grid-1x2" aria-hidden="true"></i>
            <span>Dashboard</span>
          </Link>

          <Link to="/items" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-box-seam" aria-hidden="true"></i>
            <span>Items</span>
            <span className="menu-count">124</span>
          </Link>

          <Link to="/create-item" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-plus-square " aria-hidden="true"></i>
            <span >Create Item</span>
          </Link>

          <Link to="/categories" className="sidebar-link sidebar-button">
  <i className="bi bi-tags" aria-hidden="true"></i>
  <span>Categories</span>
</Link>

<Link to="/suppliers" className="sidebar-link sidebar-button">
  <i className="bi bi-truck" aria-hidden="true"></i>
  <span>Suppliers</span>
</Link>
        </nav>

        <nav className="sidebar-section" aria-label="Management">
          <span className="sidebar-title">Management</span>

          <Link to="/reports" className="sidebar-link">
  <i className="bi bi-bar-chart" aria-hidden="true"></i>
  <span>Reports</span>
</Link>

          <Link to="/Settings" className="sidebar-link">
  <i className="bi bi-gear" aria-hidden="true"></i>
  <span>Settings</span>
</Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-box">
            <div className="profile-avatar" aria-hidden="true">A</div>

            <div className="profile-info">
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>

            <button type="button" className="profile-menu" aria-label="Profile options">
              <i className="bi bi-three-dots" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <i className="bi bi-list" aria-hidden="true"></i>
            </button>

            <div>
              <div className="mobile-brand">
                <div className="logo-icon" aria-hidden="true">
                  <i className="bi bi-box-seam"></i>
                </div>
                <strong>ItemPro</strong>
              </div>

              <span className="welcome-text">Welcome back, Admin</span>
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Notifications">
              <i className="bi bi-bell" aria-hidden="true"></i>
              <span className="notification-dot" aria-hidden="true"></span>
            </button>

            <Link to="/create-item" className="top-create-btn">
              <i className="bi bi-plus-lg" aria-hidden="true"></i>
              <span>Create Item</span>
            </Link>
          </div>
        </header>

        {/* ================= OVERVIEW ================= */}
        <section className="dashboard-section">
          <div className="section-title-row">
            <div>
              <h2>Overview</h2>
              <p>Quick summary of your inventory</p>
            </div>

            <span className="date-badge">
              <i className="bi bi-calendar3" aria-hidden="true"></i>
              Today
            </span>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon blue" aria-hidden="true">
                  <i className="bi bi-box-seam"></i>
                </div>
                <span className="trend positive">
                  <i className="bi bi-arrow-up" aria-hidden="true"></i>
                  8.2%
                </span>
              </div>
              <span className="stat-label">Total Items</span>
              <h3>124</h3>
              <p>Compared to last month</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon green" aria-hidden="true">
                  <i className="bi bi-check-circle"></i>
                </div>
                <span className="trend positive">
                  <i className="bi bi-arrow-up" aria-hidden="true"></i>
                  4.5%
                </span>
              </div>
              <span className="stat-label">Active Items</span>
              <h3>118</h3>
              <p>95.2% of total items</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon orange" aria-hidden="true">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <span className="trend warning">Needs attention</span>
              </div>
              <span className="stat-label">Low Stock</span>
              <h3>06</h3>
              <p>Items below stock limit</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon purple" aria-hidden="true">
                  <i className="bi bi-layers"></i>
                </div>
                <span className="trend neutral">Total</span>
              </div>
              <span className="stat-label">Variants</span>
              <h3>38</h3>
              <p>Across all items</p>
            </div>
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="quick-actions">
          <div className="quick-action-title">
            <div>
              <h2>Quick Actions</h2>
              <p>Common inventory operations</p>
            </div>
          </div>

          <div className="quick-action-grid">
            <Link to="/create-item" className="quick-card">
              <div className="quick-icon blue" aria-hidden="true">
                <i className="bi bi-plus-lg"></i>
              </div>
              <div className="quick-card-content">
                <strong>Create New Item</strong>
                <span>Add a new product to inventory</span>
              </div>
              <i className="bi bi-arrow-right quick-arrow" aria-hidden="true"></i>
            </Link>

            <Link to="/" className="quick-card">
              <div className="quick-icon green" aria-hidden="true">
                <i className="bi bi-boxes"></i>
              </div>
              <div className="quick-card-content">
                <strong>Manage Items</strong>
                <span>View and update inventory</span>
              </div>
              <i className="bi bi-arrow-right quick-arrow" aria-hidden="true"></i>
            </Link>

            <button type="button" className="quick-card">
              <div className="quick-icon purple" aria-hidden="true">
                <i className="bi bi-bar-chart-line"></i>
              </div>
              <div className="quick-card-content">
                <strong>View Reports</strong>
                <span>Check inventory reports</span>
              </div>
              <i className="bi bi-arrow-right quick-arrow" aria-hidden="true"></i>
            </button>
          </div>
        </section>

        {/* ================= ITEMS ================= */}
        <section className="items-card">
          <div className="items-header">
            <div>
              <h2>Recent Items</h2>
              <p>Manage your latest inventory items</p>
            </div>

            <Link to="/" className="view-all-btn">
              View All
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="filter-section">
            <div className="search-box">
              <i className="bi bi-search" aria-hidden="true"></i>

              <label htmlFor="item-search" className="visually-hidden">
                Search items
              </label>
              <input
                id="item-search"
                type="text"
                placeholder="Search item name, code or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x" aria-hidden="true"></i>
                </button>
              )}
            </div>

            <label htmlFor="item-category" className="visually-hidden">
              Filter by category
            </label>
            <select
              id="item-category"
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Beverages">Beverages</option>
            </select>

            <button type="button" className="filter-btn" onClick={clearFilters}>
              <i className="bi bi-funnel" aria-hidden="true"></i>
              Filters
            </button>

            <button type="button" className="export-btn">
              <i className="bi bi-download" aria-hidden="true"></i>
              Export
            </button>
          </div>

          {(search || category !== "All") && (
            <div className="filter-result">
              <span>
                <i className="bi bi-info-circle" aria-hidden="true"></i>
                Showing {filteredItems.length} matching item
                {filteredItems.length !== 1 ? "s" : ""}
              </span>

              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          <div className="table-responsive">
            <table className="item-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Code</th>
                  <th scope="col">Category</th>
                  <th scope="col">Selling price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Variants</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="item-info">
                          <div className="item-image" aria-hidden="true">
                            <i className="bi bi-box"></i>
                          </div>
                          <div className="item-details">
                            <strong>{item.name}</strong>
                            <span>{item.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="item-code">{item.code}</span>
                      </td>

                      <td>
                        <span className="category-badge">{item.category}</span>
                      </td>

                      <td>
                        <strong className="price">
                          ₹ {item.price.toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <div className={item.stock <= 10 ? "stock-value low" : "stock-value"}>
                          <strong>{item.stock}</strong>
                          <span>pcs</span>
                        </div>
                      </td>

                      <td>
                        <span className="variant-count">{item.variants}</span>
                      </td>

                      <td>
                        <span className={item.status === "Active" ? "status active" : "status low"}>
                          <span aria-hidden="true"></span>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/view-item/${item.id}`}
                            className="table-action view"
                            title="View item"
                            aria-label={`View ${item.name}`}
                          >
                            <i className="bi bi-eye" aria-hidden="true"></i>
                          </Link>

                          <Link
                            to={`/edit-item/${item.id}`}
                            className="table-action edit"
                            title="Edit item"
                            aria-label={`Edit ${item.name}`}
                          >
                            <i className="bi bi-pencil" aria-hidden="true"></i>
                          </Link>

                          <button
                            type="button"
                            className="table-action"
                            title="More"
                            aria-label={`More options for ${item.name}`}
                          >
                            <i className="bi bi-three-dots" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        <div className="empty-icon" aria-hidden="true">
                          <i className="bi bi-search"></i>
                        </div>
                        <h4>No items found</h4>
                        <p>Try changing your search or category filter.</p>
                        <button type="button" onClick={clearFilters}>
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing <strong>{filteredItems.length}</strong> of{" "}
              <strong>{itemsData.length}</strong> items
            </span>

            <nav className="pagination" aria-label="Pagination">
              <button type="button" disabled aria-label="Previous page">
                <i className="bi bi-chevron-left" aria-hidden="true"></i>
              </button>

              <button type="button" className="active" aria-current="page" aria-label="Page 1">
                1
              </button>

              <button type="button" aria-label="Page 2">2</button>
              <button type="button" aria-label="Page 3">3</button>

              <button type="button" aria-label="Next page">
                <i className="bi bi-chevron-right" aria-hidden="true"></i>
              </button>
            </nav>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>© 2026 ItemPro. All rights reserved.</span>
          <span>Item Management System</span>
        </footer>

      </main>
    </div>
  );
}

export default Index;