import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemSingleView.css";

const itemsData = [
  {
    id: 1,
    code: "ITM-1001",
    name: "Premium Rice",
    category: "Food",
    brand: "India Foods",
    description:
      "Premium quality rice suitable for daily household and commercial use.",
    mainCategory: "Food",
    subgroup: "Rice",
    hsnCode: "1006",
    country: "India",

    defaultUom: "PCS",
    uomConversion: "1 PCS",
    piecesPerBox: 10,

    buyingPrice: 1000,
    sellingPrice: 1250,
    boxBuyingPrice: 9500,
    boxSellingPrice: 11500,
    masterBoxBuyingPrice: 28000,
    masterBoxSellingPrice: 33000,

    barcode: "8901234567890",
    nosBarcode: "8901234567891",
    boxBarcode: "8901234567892",

    stock: 85,
    trackStock: true,
    allowSales: true,
    allowPurchase: true,

    loyaltyPoints: 10,
    allowDiscount: true,
    disableItem: false,

    branchAvailability: ["Calicut Branch", "Kochi Branch"],
    suppliers: ["India Foods Supplier", "Kerala Wholesale"],

    hasVariants: true,
    variantTemplate: "Rice Template",
    variantAttributes: ["Weight", "Packing"],
    variantOptions: {
      Weight: ["1 KG", "5 KG", "10 KG"],
      Packing: ["Bag", "Box"],
    },

    variants: [
      {
        code: "ITM-1001-1",
        name: "Premium Rice 1 KG",
        barcode: "8901234500011",
        boxBarcode: "8901234500012",
        sellingPrice: 120,
        piecesPerBox: 20,
      },
      {
        code: "ITM-1001-5",
        name: "Premium Rice 5 KG",
        barcode: "8901234500051",
        boxBarcode: "8901234500052",
        sellingPrice: 580,
        piecesPerBox: 10,
      },
      {
        code: "ITM-1001-10",
        name: "Premium Rice 10 KG",
        barcode: "8901234500101",
        boxBarcode: "8901234500102",
        sellingPrice: 1100,
        piecesPerBox: 5,
      },
    ],

    createdAt: "12 September 2026",
    updatedAt: "12 September 2026",
    createdBy: "Admin",
  },

  {
    id: 2,
    code: "ITM-1002",
    name: "Organic Sugar",
    category: "Grocery",
    brand: "Nature Fresh",
    description: "Premium organic sugar with high quality and natural processing.",
    mainCategory: "Grocery",
    subgroup: "Sugar",
    hsnCode: "1701",
    country: "India",

    defaultUom: "KG",
    uomConversion: "1 KG",
    piecesPerBox: 10,

    buyingPrice: 700,
    sellingPrice: 850,
    boxBuyingPrice: 6500,
    boxSellingPrice: 8000,
    masterBoxBuyingPrice: 25000,
    masterBoxSellingPrice: 30000,

    barcode: "8909876543210",
    nosBarcode: "8909876543211",
    boxBarcode: "8909876543212",

    stock: 42,
    trackStock: true,
    allowSales: true,
    allowPurchase: true,

    loyaltyPoints: 8,
    allowDiscount: true,
    disableItem: false,

    branchAvailability: ["Calicut Branch"],
    suppliers: ["Nature Fresh Suppliers"],

    hasVariants: true,
    variantTemplate: "Sugar Template",
    variantAttributes: ["Weight"],
    variantOptions: {
      Weight: ["1 KG", "5 KG"],
    },

    variants: [
      {
        code: "ITM-1002-1",
        name: "Organic Sugar 1 KG",
        barcode: "8909876500011",
        boxBarcode: "8909876500012",
        sellingPrice: 90,
        piecesPerBox: 20,
      },
      {
        code: "ITM-1002-5",
        name: "Organic Sugar 5 KG",
        barcode: "8909876500051",
        boxBarcode: "8909876500052",
        sellingPrice: 420,
        piecesPerBox: 8,
      },
    ],

    createdAt: "10 September 2026",
    updatedAt: "11 September 2026",
    createdBy: "Admin",
  },
];

const defaultItem = {
  id: 1,
  code: "ITM-1001",
  name: "Premium Rice",
  category: "Food",
  brand: "India Foods",
  description: "Premium quality rice.",
  mainCategory: "Food",
  subgroup: "Rice",
  hsnCode: "1006",
  country: "India",
  defaultUom: "PCS",
  uomConversion: "1 PCS",
  piecesPerBox: 10,
  buyingPrice: 1000,
  sellingPrice: 1250,
  boxBuyingPrice: 9500,
  boxSellingPrice: 11500,
  masterBoxBuyingPrice: 28000,
  masterBoxSellingPrice: 33000,
  barcode: "8901234567890",
  nosBarcode: "8901234567891",
  boxBarcode: "8901234567892",
  stock: 85,
  trackStock: true,
  allowSales: true,
  allowPurchase: true,
  loyaltyPoints: 10,
  allowDiscount: true,
  disableItem: false,
  branchAvailability: ["Calicut Branch"],
  suppliers: ["India Foods Supplier"],
  hasVariants: true,
  variantTemplate: "Rice Template",
  variantAttributes: ["Weight"],
  variantOptions: {
    Weight: ["1 KG", "5 KG"],
  },
  variants: [],
  createdAt: "12 September 2026",
  updatedAt: "12 September 2026",
  createdBy: "Admin",
};

function InfoRow({ label, value }) {
  return (
    <div className="single-info-row">
      <span className="single-info-label">{label}</span>
      <strong className="single-info-value">
        {value || "—"}
      </strong>
    </div>
  );
}

function StatusValue({ value }) {
  return (
    <span className={value ? "single-bool yes" : "single-bool no"}>
      <i className={value ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}></i>
      {value ? "Yes" : "No"}
    </span>
  );
}

function TagList({ items = [] }) {
  return (
    <div className="single-tags">
      {items.length > 0 ? (
        items.map((item, index) => (
          <span className="single-tag" key={index}>
            {item}
          </span>
        ))
      ) : (
        <span className="single-muted">Not available</span>
      )}
    </div>
  );
}

function ItemSingleView() {
  const { id } = useParams();

  const item =
    itemsData.find((item) => item.id === Number(id)) || defaultItem;

  return (
    <div className="single-view-page">

      {/* HEADER */}
      <header className="single-view-header">

        <div>
          <div className="single-breadcrumb">
            <Link to="/">Dashboard</Link>
            <i className="bi bi-chevron-right"></i>

            <Link to="/items">Items</Link>
            <i className="bi bi-chevron-right"></i>

            <span>{item.code}</span>
          </div>

          <div className="single-title-row">

            <div className="single-product-icon">
              <i className="bi bi-box-seam"></i>
            </div>

            <div>
              <h1>{item.name}</h1>

              <div className="single-subtitle">
                <span>{item.code}</span>
                <span className="single-dot"></span>
                <span>{item.brand}</span>
              </div>
            </div>

          </div>
        </div>

        <div className="single-header-actions">

          <span className="single-active-badge">
            <span></span>
            {item.disableItem ? "Disabled" : "Active"}
          </span>

          <Link to="/items" className="single-back-btn">
            <i className="bi bi-arrow-left"></i>
            Back
          </Link>

          <Link
            to={`/edit-item/${item.id}`}
            className="single-edit-btn"
          >
            <i className="bi bi-pencil"></i>
            Edit Item
          </Link>

        </div>

      </header>

      {/* CONTENT */}
      <main className="single-view-container">

        {/* BASIC INFORMATION */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon blue">
              <i className="bi bi-box"></i>
            </div>

            <div>
              <h2>Basic Information</h2>
              <p>General information about the item</p>
            </div>
          </div>

          <div className="single-info-grid">

            <InfoRow label="Item Code" value={item.code} />
            <InfoRow label="Item Name" value={item.name} />
            <InfoRow label="Item Group / Category" value={item.category} />
            <InfoRow label="Brand" value={item.brand} />

            <div className="single-full-row">
              <span className="single-info-label">Description</span>
              <p className="single-description">
                {item.description}
              </p>
            </div>

            <div className="single-full-row">
              <span className="single-info-label">Image</span>

              <div className="single-image-placeholder">
                <i className="bi bi-image"></i>
                <span>No image uploaded</span>
              </div>
            </div>

          </div>

        </section>

        {/* CLASSIFICATION */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon purple">
              <i className="bi bi-diagram-3"></i>
            </div>

            <div>
              <h2>Classification</h2>
              <p>Category and classification details</p>
            </div>
          </div>

          <div className="single-info-grid">
            <InfoRow label="Main Category" value={item.mainCategory} />
            <InfoRow label="Item Subgroup" value={item.subgroup} />
            <InfoRow label="HSN Code" value={item.hsnCode} />
            <InfoRow label="Country of Origin" value={item.country} />
          </div>

        </section>

        {/* UNIT & QUANTITY */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon green">
              <i className="bi bi-rulers"></i>
            </div>

            <div>
              <h2>Unit & Quantity</h2>
              <p>Measurement and quantity configuration</p>
            </div>
          </div>

          <div className="single-info-grid">
            <InfoRow label="Default UOM" value={item.defaultUom} />
            <InfoRow label="UOM / Conversion" value={item.uomConversion} />
            <InfoRow label="Pieces per Box" value={item.piecesPerBox} />
            <InfoRow label="Current Stock" value={`${item.stock} pcs`} />
          </div>

        </section>

        {/* PRICING */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon orange">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <div>
              <h2>Pricing</h2>
              <p>Item pricing information</p>
            </div>
          </div>

          <div className="single-price-grid">

            <div className="single-price-box">
              <span>Buying Price</span>
              <strong>
                ₹ {item.buyingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="single-price-box highlight">
              <span>Selling Price</span>
              <strong>
                ₹ {item.sellingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="single-price-box">
              <span>Box Buying Price</span>
              <strong>
                ₹ {item.boxBuyingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="single-price-box">
              <span>Box Selling Price</span>
              <strong>
                ₹ {item.boxSellingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="single-price-box">
              <span>Master Box Buying Price</span>
              <strong>
                ₹ {item.masterBoxBuyingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="single-price-box">
              <span>Master Box Selling Price</span>
              <strong>
                ₹ {item.masterBoxSellingPrice.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </section>

        {/* BARCODES */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon blue">
              <i className="bi bi-upc-scan"></i>
            </div>

            <div>
              <h2>Barcodes</h2>
              <p>Barcode information assigned to this item</p>
            </div>
          </div>

          <div className="single-barcode-grid">

            <div className="single-barcode-box">
              <span>Barcode</span>
              <strong>{item.barcode}</strong>
              <i className="bi bi-upc"></i>
            </div>

            <div className="single-barcode-box">
              <span>Nos Barcode</span>
              <strong>{item.nosBarcode}</strong>
              <i className="bi bi-upc"></i>
            </div>

            <div className="single-barcode-box">
              <span>Box Barcode</span>
              <strong>{item.boxBarcode}</strong>
              <i className="bi bi-upc"></i>
            </div>

          </div>

        </section>

        {/* INVENTORY & SALES */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon green">
              <i className="bi bi-boxes"></i>
            </div>

            <div>
              <h2>Inventory & Sales</h2>
              <p>Inventory tracking and sales settings</p>
            </div>
          </div>

          <div className="single-info-grid">

            <div className="single-setting-row">
              <span>Track Stock</span>
              <StatusValue value={item.trackStock} />
            </div>

            <div className="single-setting-row">
              <span>Allow Sales</span>
              <StatusValue value={item.allowSales} />
            </div>

            <div className="single-setting-row">
              <span>Allow Purchase</span>
              <StatusValue value={item.allowPurchase} />
            </div>

          </div>

        </section>

        {/* LOYALTY */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon orange">
              <i className="bi bi-star"></i>
            </div>

            <div>
              <h2>Loyalty & Status</h2>
              <p>Loyalty points and item status settings</p>
            </div>
          </div>

          <div className="single-info-grid">

            <InfoRow
              label="Loyalty Points"
              value={`${item.loyaltyPoints} Points`}
            />

            <div className="single-setting-row">
              <span>Allow Discount</span>
              <StatusValue value={item.allowDiscount} />
            </div>

            <div className="single-setting-row">
              <span>Disable Item</span>
              <StatusValue value={item.disableItem} />
            </div>

          </div>

        </section>

        {/* SUPPLIER */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon purple">
              <i className="bi bi-truck"></i>
            </div>

            <div>
              <h2>Supplier Mapping</h2>
              <p>Suppliers associated with this item</p>
            </div>
          </div>

          <TagList items={item.suppliers} />

        </section>

        {/* BRANCH */}
        <section className="single-card">

          <div className="single-card-header">
            <div className="single-section-icon blue">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <h2>Branch Availability</h2>
              <p>Branches where this item is available</p>
            </div>
          </div>

          <TagList items={item.branchAvailability} />

        </section>

        {/* VARIANTS */}
        {item.hasVariants && (
          <section className="single-card">

            <div className="single-card-header">

              <div className="single-section-icon purple">
                <i className="bi bi-layers"></i>
              </div>

              <div>
                <h2>Variants & Attributes</h2>
                <p>Variant configuration and variant items</p>
              </div>

              <span className="single-variant-count">
                {item.variants.length} Variants
              </span>

            </div>

            {/* TEMPLATE */}
            <div className="single-variant-top">

              <InfoRow
                label="Has Variants"
                value="Yes"
              />

              <InfoRow
                label="Template Item"
                value={item.variantTemplate}
              />

            </div>

            {/* ATTRIBUTES */}
            <div className="single-attribute-section">

              <h3>Variant Attributes</h3>

              <TagList items={item.variantAttributes} />

            </div>

            {/* OPTIONS */}
            <div className="single-attribute-section">

              <h3>Attribute Options</h3>

              <div className="single-options-grid">

                {Object.entries(item.variantOptions).map(
                  ([attribute, options]) => (
                    <div
                      className="single-option-box"
                      key={attribute}
                    >
                      <strong>{attribute}</strong>

                      <TagList items={options} />
                    </div>
                  )
                )}

              </div>

            </div>

            {/* VARIANT TABLE */}
            <div className="single-variant-table-wrapper">

              <table className="single-variant-table">

                <thead>
                  <tr>
                    <th>VARIANT CODE</th>
                    <th>VARIANT NAME</th>
                    <th>BARCODE</th>
                    <th>BOX BARCODE</th>
                    <th>SELLING PRICE</th>
                    <th>PIECES / BOX</th>
                  </tr>
                </thead>

                <tbody>

                  {item.variants.map((variant) => (
                    <tr key={variant.code}>

                      <td>
                        <span className="variant-code">
                          {variant.code}
                        </span>
                      </td>

                      <td>
                        <strong>{variant.name}</strong>
                      </td>

                      <td>{variant.barcode}</td>

                      <td>{variant.boxBarcode}</td>

                      <td>
                        <strong className="variant-price">
                          ₹{" "}
                          {variant.sellingPrice.toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </td>

                      <td>{variant.piecesPerBox}</td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* ADDITIONAL INFORMATION */}
        <section className="single-card">

          <div className="single-card-header">

            <div className="single-section-icon blue">
              <i className="bi bi-info-circle"></i>
            </div>

            <div>
              <h2>Additional Information</h2>
              <p>Item creation and modification details</p>
            </div>

          </div>

          <div className="single-info-grid">

            <InfoRow
              label="Created Date"
              value={item.createdAt}
            />

            <InfoRow
              label="Last Updated"
              value={item.updatedAt}
            />

            <InfoRow
              label="Created By"
              value={item.createdBy}
            />

            <InfoRow
              label="Product ID"
              value={`#${item.id}`}
            />

          </div>

        </section>

        {/* BOTTOM ACTIONS */}
        <div className="single-bottom-actions">

          <Link to="/items" className="single-bottom-back">
            <i className="bi bi-arrow-left"></i>
            Back to Items
          </Link>

          <Link
            to={`/edit-item/${item.id}`}
            className="single-bottom-edit"
          >
            <i className="bi bi-pencil"></i>
            Edit Item
          </Link>

        </div>

      </main>

      <footer className="single-footer">
        <span>© 2026 ItemPro. All rights reserved.</span>
        <span>Item Management System</span>
      </footer>

    </div>
  );
}

export default ItemSingleView;