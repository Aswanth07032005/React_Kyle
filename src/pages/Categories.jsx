import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const initialCategories = [
  {
    id: 1,
    name: "Food",
    code: "CAT-001",
    description: "Rice, flour and other food products",
    items: 42,
    status: "Active",
  },
  {
    id: 2,
    name: "Grocery",
    code: "CAT-002",
    description: "Daily grocery and household products",
    items: 28,
    status: "Active",
  },
  {
    id: 3,
    name: "Beverages",
    code: "CAT-003",
    description: "Tea, coffee, juices and other beverages",
    items: 24,
    status: "Active",
  },
  {
    id: 4,
    name: "Personal Care",
    code: "CAT-004",
    description: "Personal hygiene and care products",
    items: 16,
    status: "Active",
  },
  {
    id: 5,
    name: "Household",
    code: "CAT-005",
    description: "Cleaning and household products",
    items: 9,
    status: "Inactive",
  },
];

function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    code: "",
    description: "",
  });

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.code.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const activeCount = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const inactiveCount = categories.filter(
    (category) => category.status === "Inactive"
  ).length;

  const totalItems = categories.reduce(
    (total, category) => total + category.items,
    0
  );

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!newCategory.name.trim()) {
      return;
    }

    const category = {
      id: Date.now(),
      name: newCategory.name,
      code: newCategory.code || `CAT-${String(categories.length + 1).padStart(3, "0")}`,
      description:
        newCategory.description || "No description available",
      items: 0,
      status: "Active",
    };

    setCategories((prev) => [...prev, category]);

    setNewCategory({
      name: "",
      code: "",
      description: "",
    });

    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status:
                category.status === "Active" ? "Inactive" : "Active",
            }
          : category
      )
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmed) {
      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );
    }
  };

  return (
    <div className="categories-page">

      {/* Header */}
      <header className="categories-header">

        <div>
          <div className="categories-breadcrumb">
            <Link to="/">Dashboard</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Categories</span>
          </div>

          <h1>Categories</h1>

          <p>
            Manage item categories and organize your products.
          </p>
        </div>

        <button
          type="button"
          className="add-category-btn"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg"></i>
          Add Category
        </button>

      </header>

      {/* Summary Cards */}
      <section className="category-summary-grid">

        <div className="category-summary-card">
          <div className="category-summary-icon total">
            <i className="bi bi-grid"></i>
          </div>

          <div>
            <span>Total Categories</span>
            <h3>{categories.length}</h3>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-icon active">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Active Categories</span>
            <h3>{activeCount}</h3>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-icon inactive">
            <i className="bi bi-pause-circle"></i>
          </div>

          <div>
            <span>Inactive Categories</span>
            <h3>{inactiveCount}</h3>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-icon items">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>Total Items</span>
            <h3>{totalItems}</h3>
          </div>
        </div>

      </section>

      {/* Category List */}
      <section className="categories-card">

        <div className="categories-toolbar">

          <div className="category-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-status-filter">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        <div className="categories-table-wrapper">

          <table className="categories-table">

            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>CODE</th>
                <th>DESCRIPTION</th>
                <th>ITEMS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id}>

                    <td>
                      <div className="category-name-wrapper">

                        <div className="category-icon">
                          <i className="bi bi-folder2"></i>
                        </div>

                        <div>
                          <strong>{category.name}</strong>
                          <span>
                            Created category
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="category-code">
                        {category.code}
                      </span>
                    </td>

                    <td>
                      <span className="category-description">
                        {category.description}
                      </span>
                    </td>

                    <td>
                      <strong className="category-items">
                        {category.items}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`category-status ${
                          category.status.toLowerCase()
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>

                    <td>

                      <div className="category-actions">

                        <button
                          type="button"
                          className="category-action edit"
                          title="Edit Category"
                          onClick={() =>
                            alert(`Edit ${category.name}`)
                          }
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          type="button"
                          className="category-action status"
                          title="Change Status"
                          onClick={() =>
                            handleToggleStatus(category.id)
                          }
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </button>

                        <button
                          type="button"
                          className="category-action delete"
                          title="Delete Category"
                          onClick={() =>
                            handleDelete(category.id)
                          }
                        >
                          <i className="bi bi-trash3"></i>
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">

                    <div className="category-empty-state">
                      <i className="bi bi-folder-x"></i>

                      <h3>No categories found</h3>

                      <p>
                        Try changing your search or filter.
                      </p>
                    </div>

                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="categories-footer">

          <span>
            Showing <strong>{filteredCategories.length}</strong>{" "}
            of <strong>{categories.length}</strong> categories
          </span>

          <span>
            Total items: <strong>{totalItems}</strong>
          </span>

        </div>

      </section>

      {/* Add Category Modal */}
      {showModal && (
        <div
          className="category-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="category-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="category-modal-header">

              <div>
                <h2>Add Category</h2>
                <p>Create a new item category.</p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={handleAddCategory}>

              <div className="category-form-group">
                <label>
                  Category Name <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="category-form-group">
                <label>Category Code</label>

                <input
                  type="text"
                  placeholder="Example: CAT-006"
                  value={newCategory.code}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      code: e.target.value,
                    })
                  }
                />
              </div>

              <div className="category-form-group">
                <label>Description</label>

                <textarea
                  rows="4"
                  placeholder="Enter category description"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="category-modal-actions">

                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Category
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Categories;