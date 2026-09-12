import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditItem.css"

function EditItems() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    itemCode: "ITM-1001",
    itemName: "Premium Rice",
    itemGroup: "Food",
    brand: "India Foods",
    description:
      "Premium quality rice suitable for daily cooking and commercial use.",

    mainCategory: "Food Grains",
    itemSubgroup: "Rice",
    hsnCode: "1006",
    country: "India",

    defaultUom: "KG",
    conversion: "1 Box = 10 KG",
    piecesPerBox: "10",

    buyingPrice: "1100",
    sellingPrice: "1250",
    boxBuyingPrice: "10500",
    boxSellingPrice: "12000",
    masterBoxBuyingPrice: "50000",
    masterBoxSellingPrice: "57000",

    barcode: "8901234567890",
    nosBarcode: "8901234567891",
    boxBarcode: "8901234567892",

    trackStock: true,
    allowSales: true,
    allowPurchase: true,

    loyaltyPoints: "10",
    allowDiscount: true,
    disableItem: false,

    branchAvailability: "All Branches",
    supplierMapping: "ABC Suppliers",

    hasVariants: true,
  });

  const [variants, setVariants] = useState([
    {
      id: 1,
      itemCode: "ITM-1001-5KG",
      itemName: "Premium Rice 5KG",
      barcode: "8901234567101",
      boxBarcode: "8901234567201",
      price: "650",
      pieces: "1",
    },
    {
      id: 2,
      itemCode: "ITM-1001-10KG",
      itemName: "Premium Rice 10KG",
      barcode: "8901234567102",
      boxBarcode: "8901234567202",
      price: "1250",
      pieces: "1",
    },
  ]);

  // =========================
  // Main Form Change
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // Variant Change
  // =========================
  const handleVariantChange = (variantId, field, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      )
    );
  };

  // =========================
  // Add Variant
  // =========================
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemCode: "",
        itemName: "",
        barcode: "",
        boxBarcode: "",
        price: "",
        pieces: "",
      },
    ]);
  };

  // =========================
  // Remove Variant
  // =========================
  const removeVariant = (variantId) => {
    setVariants((prev) =>
      prev.filter((variant) => variant.id !== variantId)
    );
  };

  // =========================
  // Submit / Update
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Frontend demo update
    setTimeout(() => {
      setLoading(false);

      // After update → Home page
      navigate("/");
    }, 800);
  };

  return (
    <div className="edit-page">
      <div className="container-fluid px-3 px-md-4 py-3 py-md-4">

        {/* ================= HEADER ================= */}
        <div className="edit-header">
          <div className="header-left">

            <Link to="/items" className="back-button">
              <i className="bi bi-arrow-left"></i>
            </Link>

            <div>
              <h1>Edit Item</h1>
              <p>
                Update item information, pricing, inventory and variants.
              </p>
            </div>

          </div>

          <div className="header-actions">

            <Link
              to="/"
              className="btn btn-light cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              form="editItemForm"
              className="btn btn-primary save-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  Update Item
                </>
              )}
            </button>

          </div>
        </div>

        {/* ================= FORM ================= */}
        <form
          id="editItemForm"
          onSubmit={handleSubmit}
        >

          {/* ================= BASIC INFORMATION ================= */}
          <Section
            icon="bi-box-seam"
            title="Basic Information"
            description="General information about the item."
          >
            <div className="row g-3">

              <Input
                label="Item Code"
                name="itemCode"
                value={formData.itemCode}
                onChange={handleChange}
                readOnly
                note="Item code cannot be changed."
              />

              <Input
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

              <Select
                label="Item Group / Category"
                name="itemGroup"
                value={formData.itemGroup}
                onChange={handleChange}
                options={[
                  "Food",
                  "Grocery",
                  "Beverages",
                  "Electronics",
                  "Clothing",
                ]}
              />

              <Input
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter item description"
                />
              </div>

            </div>
          </Section>

          {/* ================= CLASSIFICATION ================= */}
          <Section
            icon="bi-tags"
            title="Item Classification"
            description="Categorize the item for inventory and reporting."
          >
            <div className="row g-3">

              <Select
                label="Main Category"
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
                options={[
                  "Food Grains",
                  "Grocery",
                  "Beverages",
                  "Personal Care",
                ]}
              />

              <Select
                label="Item Subgroup"
                name="itemSubgroup"
                value={formData.itemSubgroup}
                onChange={handleChange}
                options={[
                  "Rice",
                  "Wheat",
                  "Pulses",
                  "Oil",
                  "Spices",
                ]}
              />

              <Input
                label="HSN Code"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
              />

              <Select
                label="Country of Origin"
                name="country"
                value={formData.country}
                onChange={handleChange}
                options={[
                  "India",
                  "United Arab Emirates",
                  "China",
                  "United States",
                  "Other",
                ]}
              />

            </div>
          </Section>

          {/* ================= UNIT ================= */}
          <Section
            icon="bi-rulers"
            title="Unit & Quantity"
            description="Configure item units and quantity conversion."
          >
            <div className="row g-3">

              <Select
                label="Default UOM"
                name="defaultUom"
                value={formData.defaultUom}
                onChange={handleChange}
                options={[
                  "PCS",
                  "KG",
                  "GRAM",
                  "LITER",
                  "BOX",
                  "METER",
                ]}
              />

              <Input
                label="UOM / Conversion"
                name="conversion"
                value={formData.conversion}
                onChange={handleChange}
                placeholder="Example: 1 Box = 10 KG"
              />

              <Input
                label="Pieces per Box"
                name="piecesPerBox"
                type="number"
                value={formData.piecesPerBox}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* ================= PRICING ================= */}
          <Section
            icon="bi-currency-rupee"
            title="Pricing"
            description="Configure buying and selling prices."
          >
            <div className="row g-3">

              <PriceInput
                label="Buying Price"
                name="buyingPrice"
                value={formData.buyingPrice}
                onChange={handleChange}
              />

              <PriceInput
                label="Selling Price"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
              />

              <PriceInput
                label="Box Buying Price"
                name="boxBuyingPrice"
                value={formData.boxBuyingPrice}
                onChange={handleChange}
              />

              <PriceInput
                label="Box Selling Price"
                name="boxSellingPrice"
                value={formData.boxSellingPrice}
                onChange={handleChange}
              />

              <PriceInput
                label="Master Box Buying Price"
                name="masterBoxBuyingPrice"
                value={formData.masterBoxBuyingPrice}
                onChange={handleChange}
              />

              <PriceInput
                label="Master Box Selling Price"
                name="masterBoxSellingPrice"
                value={formData.masterBoxSellingPrice}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* ================= BARCODE ================= */}
          <Section
            icon="bi-upc-scan"
            title="Barcode"
            description="Manage barcode information for the item."
          >
            <div className="row g-3">

              <Input
                label="Barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
              />

              <Input
                label="Nos Barcode"
                name="nosBarcode"
                value={formData.nosBarcode}
                onChange={handleChange}
              />

              <Input
                label="Box Barcode"
                name="boxBarcode"
                value={formData.boxBarcode}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* ================= INVENTORY ================= */}
          <Section
            icon="bi-clipboard-check"
            title="Inventory & Sales"
            description="Control stock tracking and transaction permissions."
          >
            <div className="switch-grid">

              <Switch
                label="Track Stock"
                description="Track inventory quantity for this item."
                name="trackStock"
                checked={formData.trackStock}
                onChange={handleChange}
              />

              <Switch
                label="Allow Sales"
                description="Allow this item to be sold."
                name="allowSales"
                checked={formData.allowSales}
                onChange={handleChange}
              />

              <Switch
                label="Allow Purchase"
                description="Allow this item to be purchased."
                name="allowPurchase"
                checked={formData.allowPurchase}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* ================= LOYALTY ================= */}
          <Section
            icon="bi-star"
            title="Loyalty & Status"
            description="Configure loyalty points, discounts and item status."
          >

            <div className="row g-3 mb-3">

              <Input
                label="Loyalty Points"
                name="loyaltyPoints"
                type="number"
                value={formData.loyaltyPoints}
                onChange={handleChange}
              />

            </div>

            <div className="switch-grid">

              <Switch
                label="Allow Discount"
                description="Customers can receive discounts on this item."
                name="allowDiscount"
                checked={formData.allowDiscount}
                onChange={handleChange}
              />

              <Switch
                label="Disable Item"
                description="Disable this item from normal operations."
                name="disableItem"
                checked={formData.disableItem}
                onChange={handleChange}
                danger
              />

            </div>

          </Section>

          {/* ================= BRANCH & SUPPLIER ================= */}
          <Section
            icon="bi-building"
            title="Branch & Supplier"
            description="Manage branch availability and supplier mapping."
          >
            <div className="row g-3">

              <Select
                label="Branch Availability"
                name="branchAvailability"
                value={formData.branchAvailability}
                onChange={handleChange}
                options={[
                  "All Branches",
                  "Main Branch",
                  "Kozhikode Branch",
                  "Calicut Branch",
                ]}
              />

              <Select
                label="Supplier Mapping"
                name="supplierMapping"
                value={formData.supplierMapping}
                onChange={handleChange}
                options={[
                  "ABC Suppliers",
                  "Global Traders",
                  "India Wholesale",
                  "Local Suppliers",
                ]}
              />

            </div>
          </Section>

          {/* ================= VARIANTS ================= */}
          <Section
            icon="bi-diagram-3"
            title="Variants"
            description="Configure multiple variants for this item."
          >

            <div className="variant-toggle">

              <div>
                <strong>
                  Has Variants / Template Item
                </strong>

                <span>
                  Enable this if the item has different sizes,
                  colors or packages.
                </span>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasVariants"
                  checked={formData.hasVariants}
                  onChange={handleChange}
                />
              </div>

            </div>

            {formData.hasVariants && (
              <div className="variant-area">

                <div className="variant-header">

                  <div>
                    <h5>Variant Items</h5>
                    <p>
                      Add and manage individual item variants.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-primary add-variant-btn"
                    onClick={addVariant}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Another Variant
                  </button>

                </div>

                <div className="table-responsive">

                  <table className="table variant-table">

                    <thead>
                      <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Barcode</th>
                        <th>Box Barcode</th>
                        <th>Price</th>
                        <th>Pieces / Box</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>

                      {variants.map((variant) => (
                        <tr key={variant.id}>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={variant.itemCode}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "itemCode",
                                  e.target.value
                                )
                              }
                              placeholder="Variant code"
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={variant.itemName}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "itemName",
                                  e.target.value
                                )
                              }
                              placeholder="Variant name"
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={variant.barcode}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "barcode",
                                  e.target.value
                                )
                              }
                              placeholder="Barcode"
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={variant.boxBarcode}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "boxBarcode",
                                  e.target.value
                                )
                              }
                              placeholder="Box barcode"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={variant.price}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "price",
                                  e.target.value
                                )
                              }
                              placeholder="₹ 0"
                              min="0"
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={variant.pieces}
                              onChange={(e) =>
                                handleVariantChange(
                                  variant.id,
                                  "pieces",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              min="0"
                            />
                          </td>

                          <td>
                            <button
                              type="button"
                              className="delete-variant"
                              onClick={() =>
                                removeVariant(variant.id)
                              }
                              aria-label="Remove variant"
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>
            )}

          </Section>

          {/* ================= BOTTOM ACTIONS ================= */}
          <div className="bottom-actions">

            <Link
              to="/"
              className="btn btn-light cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="btn btn-primary save-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  Update Item
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

/* =====================================================
   SECTION COMPONENT
===================================================== */

function Section({
  icon,
  title,
  description,
  children,
}) {
  return (
    <div className="edit-card">

      <div className="section-heading">

        <div className="section-icon">
          <i className={`bi ${icon}`}></i>
        </div>

        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>

      </div>

      <div className="section-content">
        {children}
      </div>

    </div>
  );
}

/* =====================================================
   INPUT COMPONENT
===================================================== */

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  readOnly = false,
  note,
  placeholder,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-12">

      <label className="form-label">
        {label}

        {required && (
          <span className="required">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        min={type === "number" ? "0" : undefined}
        className={`form-control ${
          readOnly ? "readonly-input" : ""
        }`}
      />

      {note && (
        <small className="field-note">
          {note}
        </small>
      )}

    </div>
  );
}

/* =====================================================
   SELECT COMPONENT
===================================================== */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-12">

      <label className="form-label">
        {label}
      </label>

      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

/* =====================================================
   PRICE COMPONENT
===================================================== */

function PriceInput({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-12">

      <label className="form-label">
        {label}
      </label>

      <div className="price-input">

        <span>₹</span>

        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          min="0"
        />

      </div>

    </div>
  );
}

/* =====================================================
   SWITCH COMPONENT
===================================================== */

function Switch({
  label,
  description,
  name,
  checked,
  onChange,
  danger = false,
}) {
  return (
    <div
      className={`switch-card ${
        danger ? "danger-switch" : ""
      }`}
    >

      <div>
        <strong>{label}</strong>
        <span>{description}</span>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </div>

    </div>
  );
}

export default EditItems;
