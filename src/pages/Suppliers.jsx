import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Suppliers.css";

const initialSuppliers = [
  {
    id: 1,
    name: "India Foods",
    code: "SUP-001",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "indiafoods@example.com",
    items: 18,
    status: "Active",
  },
  {
    id: 2,
    name: "Nature Fresh",
    code: "SUP-002",
    contact: "Anil Thomas",
    phone: "+91 98470 12345",
    email: "naturefresh@example.com",
    items: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Arabica Traders",
    code: "SUP-003",
    contact: "Suresh Babu",
    phone: "+91 95678 23456",
    email: "arabica@example.com",
    items: 9,
    status: "Active",
  },
  {
    id: 4,
    name: "Golden Harvest",
    code: "SUP-004",
    contact: "Manoj P",
    phone: "+91 94470 45678",
    email: "goldenharvest@example.com",
    items: 7,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Royal Foods",
    code: "SUP-005",
    contact: "Vijay Menon",
    phone: "+91 98950 67890",
    email: "royalfoods@example.com",
    items: 15,
    status: "Active",
  },
];

function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    code: "",
    contact: "",
    phone: "",
    email: "",
  });

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        supplier.name.toLowerCase().includes(searchText) ||
        supplier.code.toLowerCase().includes(searchText) ||
        supplier.contact.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, statusFilter]);

  const activeCount = suppliers.filter(
    (supplier) => supplier.status === "Active"
  ).length;

  const inactiveCount = suppliers.filter(
    (supplier) => supplier.status === "Inactive"
  ).length;

  const totalItems = suppliers.reduce(
    (total, supplier) => total + supplier.items,
    0
  );

  const handleAddSupplier = (e) => {
    e.preventDefault();

    if (!newSupplier.name.trim()) {
      return;
    }

    const supplier = {
      id: Date.now(),
      name: newSupplier.name,
      code:
        newSupplier.code ||
        `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
      contact: newSupplier.contact || "Not Provided",
      phone: newSupplier.phone || "Not Provided",
      email: newSupplier.email || "Not Provided",
      items: 0,
      status: "Active",
    };

    setSuppliers((prev) => [...prev, supplier]);

    setNewSupplier({
      name: "",
      code: "",
      contact: "",
      phone: "",
      email: "",
    });

    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === id
          ? {
              ...supplier,
              status:
                supplier.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : supplier
      )
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (confirmed) {
      setSuppliers((prev) =>
        prev.filter((supplier) => supplier.id !== id)
      );
    }
  };

  return (
    <div className="suppliers-page">

      {/* Header */}
      <header className="suppliers-header">

        <div>
          <div className="suppliers-breadcrumb">
            <Link to="/">Dashboard</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Suppliers</span>
          </div>

          <h1>Suppliers</h1>

          <p>
            Manage suppliers and their item associations.
          </p>
        </div>

        <button
          type="button"
          className="add-supplier-btn"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg"></i>
          Add Supplier
        </button>

      </header>

      {/* Summary Cards */}
      <section className="supplier-summary-grid">

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon total">
            <i className="bi bi-buildings"></i>
          </div>

          <div>
            <span>Total Suppliers</span>
            <h3>{suppliers.length}</h3>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon active">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Active Suppliers</span>
            <h3>{activeCount}</h3>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon inactive">
            <i className="bi bi-pause-circle"></i>
          </div>

          <div>
            <span>Inactive Suppliers</span>
            <h3>{inactiveCount}</h3>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon items">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>Linked Items</span>
            <h3>{totalItems}</h3>
          </div>
        </div>

      </section>

      {/* Supplier List */}
      <section className="suppliers-card">

        <div className="suppliers-toolbar">

          <div className="supplier-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="supplier-status-filter">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        <div className="suppliers-table-wrapper">

          <table className="suppliers-table">

            <thead>
              <tr>
                <th>SUPPLIER</th>
                <th>CODE</th>
                <th>CONTACT</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>ITEMS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>

                    <td>
                      <div className="supplier-name-wrapper">

                        <div className="supplier-avatar">
                          {supplier.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{supplier.name}</strong>
                          <span>Supplier</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="supplier-code">
                        {supplier.code}
                      </span>
                    </td>

                    <td>
                      <span className="supplier-contact">
                        {supplier.contact}
                      </span>
                    </td>

                    <td>
                      {supplier.phone}
                    </td>

                    <td>
                      <span className="supplier-email">
                        {supplier.email}
                      </span>
                    </td>

                    <td>
                      <strong className="supplier-items">
                        {supplier.items}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`supplier-status ${
                          supplier.status.toLowerCase()
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>

                    <td>

                      <div className="supplier-actions">

                        <button
                          type="button"
                          className="supplier-action edit"
                          title="Edit Supplier"
                          onClick={() =>
                            alert(`Edit ${supplier.name}`)
                          }
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          type="button"
                          className="supplier-action status"
                          title="Change Status"
                          onClick={() =>
                            handleToggleStatus(supplier.id)
                          }
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </button>

                        <button
                          type="button"
                          className="supplier-action delete"
                          title="Delete Supplier"
                          onClick={() =>
                            handleDelete(supplier.id)
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
                  <td colSpan="8">

                    <div className="supplier-empty-state">
                      <i className="bi bi-person-x"></i>

                      <h3>No suppliers found</h3>

                      <p>
                        Try changing your search or status filter.
                      </p>
                    </div>

                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="suppliers-footer">

          <span>
            Showing <strong>{filteredSuppliers.length}</strong>{" "}
            of <strong>{suppliers.length}</strong> suppliers
          </span>

          <span>
            Linked items: <strong>{totalItems}</strong>
          </span>

        </div>

      </section>

      {/* Add Supplier Modal */}
      {showModal && (
        <div
          className="supplier-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="supplier-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="supplier-modal-header">

              <div>
                <h2>Add Supplier</h2>
                <p>
                  Add a new supplier to your system.
                </p>
              </div>

              <button
                type="button"
                className="supplier-modal-close"
                onClick={() => setShowModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={handleAddSupplier}>

              <div className="supplier-form-group">
                <label>
                  Supplier Name <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter supplier name"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="supplier-form-row">

                <div className="supplier-form-group">
                  <label>Supplier Code</label>

                  <input
                    type="text"
                    placeholder="SUP-006"
                    value={newSupplier.code}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        code: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="supplier-form-group">
                  <label>Contact Person</label>

                  <input
                    type="text"
                    placeholder="Contact person"
                    value={newSupplier.contact}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

              <div className="supplier-form-row">

                <div className="supplier-form-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    placeholder="+91 XXXXX XXXXX"
                    value={newSupplier.phone}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="supplier-form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="supplier@example.com"
                    value={newSupplier.email}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

              <div className="supplier-modal-actions">

                <button
                  type="button"
                  className="supplier-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="supplier-save-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Supplier
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Suppliers;