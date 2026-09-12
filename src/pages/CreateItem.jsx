import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./createitem.css";

const emptyAttribute = () => ({ id: crypto.randomUUID(), name: "", options: "" });

function SectionIcon({ icon }) {
  return (
    <span className="section-icon" aria-hidden="true">
      <i className={`bi ${icon}`}></i>
    </span>
  );
}

function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <label className="toggle-row">
      <div>
        <strong>{label}</strong>
        {hint && <span>{hint}</span>}
      </div>
      <span className={`toggle ${checked ? "on" : ""}`} role="switch" aria-checked={checked}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="visually-hidden"
        />
        <span className="toggle-thumb"></span>
      </span>
    </label>
  );
}

function Field({ label, required, children, span }) {
  return (
    <div className={`field ${span ? "field-full" : ""}`}>
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
    </div>
  );
}

function CreateItem() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [basic, setBasic] = useState({
    itemCode: "",
    itemName: "",
    itemGroup: "",
    brand: "",
    description: "",
  });

  const [classification, setClassification] = useState({
    mainCategory: "",
    itemSubgroup: "",
    hsnCode: "",
    countryOfOrigin: "",
  });

  const [unit, setUnit] = useState({
    defaultUOM: "Piece",
    uomConversion: "",
    piecesPerBox: "",
  });

  const [pricing, setPricing] = useState({
    buyingPrice: "",
    sellingPrice: "",
    boxBuyingPrice: "",
    boxSellingPrice: "",
    masterBoxBuyingPrice: "",
    masterBoxSellingPrice: "",
  });

  const [barcode, setBarcode] = useState({
    barcode: "",
    nosBarcode: "",
    boxBarcode: "",
  });

  const [flags, setFlags] = useState({
    trackStock: true,
    allowSales: true,
    allowPurchase: true,
    allowDiscount: false,
    disableItem: false,
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState("");

  const [branches, setBranches] = useState([
    { id: "main", name: "Main Branch", checked: true },
    { id: "north", name: "North Outlet", checked: false },
    { id: "south", name: "South Outlet", checked: false },
    { id: "online", name: "Online Store", checked: false },
  ]);

  const [supplier, setSupplier] = useState("");

  const [hasVariants, setHasVariants] = useState(false);
  const [attributes, setAttributes] = useState([emptyAttribute()]);
  const [variantRows, setVariantRows] = useState([]);

  const updateField = (setter) => (key, value) =>
    setter((prev) => ({ ...prev, [key]: value }));

  const updateBasic = updateField(setBasic);
  const updateClassification = updateField(setClassification);
  const updateUnit = updateField(setUnit);
  const updatePricing = updateField(setPricing);
  const updateBarcode = updateField(setBarcode);

  const toggleFlag = (key, value) =>
    setFlags((prev) => ({ ...prev, [key]: value }));

  const toggleBranch = (id) =>
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, checked: !b.checked } : b))
    );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const addAttribute = () =>
    setAttributes((prev) => [...prev, emptyAttribute()]);

  const removeAttribute = (id) =>
    setAttributes((prev) => (prev.length > 1 ? prev.filter((a) => a.id !== id) : prev));

  const updateAttribute = (id, key, value) =>
    setAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [key]: value } : a))
    );

  const readyAttributes = useMemo(
    () =>
      attributes
        .filter((a) => a.name.trim() && a.options.trim())
        .map((a) => ({
          name: a.name.trim(),
          options: a.options
            .split(",")
            .map((o) => o.trim())
            .filter(Boolean),
        })),
    [attributes]
  );

  const generateVariants = () => {
    if (readyAttributes.length === 0) {
      setVariantRows([]);
      return;
    }

    const combos = readyAttributes.reduce(
      (acc, attr) =>
        acc.flatMap((combo) => attr.options.map((opt) => [...combo, { attr: attr.name, value: opt }])),
      [[]]
    );

    setVariantRows((prevRows) =>
      combos.map((combo) => {
        const label = combo.map((c) => c.value).join(" / ");
        const existing = prevRows.find((r) => r.label === label);
        return (
          existing || {
            id: crypto.randomUUID(),
            label,
            code: "",
            name: "",
            barcode: "",
            boxBarcode: "",
            buyingPrice: "",
            sellingPrice: "",
            piecesPerBox: "",
          }
        );
      })
    );
  };

  const updateVariantRow = (id, key, value) =>
    setVariantRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );

  return (
    <div className="create-item-page">
      <div className="create-container">

        {/* ================= HEADER ================= */}
        <div className="create-header">
          <div>
            <Link to="/" className="back-link">
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
              Back to items
            </Link>
            <h1>Create Item</h1>
            <p>Add a new product to your inventory catalog.</p>
          </div>

          <div className="header-actions">
            <button type="button" className="btn btn-ghost">Save as Draft</button>
            <button type="button" className="btn btn-primary">
              <i className="bi bi-check-lg" aria-hidden="true"></i>
              Save Item
            </button>
          </div>
        </div>

        {/* ================= BASIC INFORMATION ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-box-seam" />
            <div>
              <h2>Basic Information</h2>
              <p>The core identity of this item.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field label="Item Code" required>
              <input
                type="text"
                placeholder="ITM-1005"
                value={basic.itemCode}
                onChange={(e) => updateBasic("itemCode", e.target.value)}
              />
            </Field>

            <Field label="Item Name" required>
              <input
                type="text"
                placeholder="Premium Basmati Rice"
                value={basic.itemName}
                onChange={(e) => updateBasic("itemName", e.target.value)}
              />
            </Field>

            <Field label="Item Group / Category" required>
              <select
                value={basic.itemGroup}
                onChange={(e) => updateBasic("itemGroup", e.target.value)}
              >
                <option value="">Select category</option>
                <option>Food</option>
                <option>Grocery</option>
                <option>Beverages</option>
              </select>
            </Field>

            <Field label="Brand">
              <input
                type="text"
                placeholder="India Foods"
                value={basic.brand}
                onChange={(e) => updateBasic("brand", e.target.value)}
              />
            </Field>

            <Field label="Description" span>
              <textarea
                rows={3}
                placeholder="Short description shown to customers and staff"
                value={basic.description}
                onChange={(e) => updateBasic("description", e.target.value)}
              />
            </Field>

            <Field label="Image Upload" span>
              <div className="image-upload">
                {imagePreview ? (
                  <img src={imagePreview} alt="Item preview" className="image-preview" />
                ) : (
                  <div className="image-placeholder" aria-hidden="true">
                    <i className="bi bi-image"></i>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="bi bi-upload" aria-hidden="true"></i>
                    {imagePreview ? "Replace image" : "Upload image"}
                  </button>
                  <p className="hint">PNG or JPG, up to 5MB.</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="visually-hidden"
                />
              </div>
            </Field>
          </div>
        </section>

        {/* ================= ITEM CLASSIFICATION ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-tags" />
            <div>
              <h2>Item Classification</h2>
              <p>How this item is grouped and taxed.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field label="Main Category">
              <input
                type="text"
                placeholder="e.g. Staples"
                value={classification.mainCategory}
                onChange={(e) => updateClassification("mainCategory", e.target.value)}
              />
            </Field>

            <Field label="Item Subgroup">
              <input
                type="text"
                placeholder="e.g. Rice & Grains"
                value={classification.itemSubgroup}
                onChange={(e) => updateClassification("itemSubgroup", e.target.value)}
              />
            </Field>

            <Field label="HSN Code">
              <input
                type="text"
                placeholder="1006"
                value={classification.hsnCode}
                onChange={(e) => updateClassification("hsnCode", e.target.value)}
              />
            </Field>

            <Field label="Country of Origin">
              <input
                type="text"
                placeholder="India"
                value={classification.countryOfOrigin}
                onChange={(e) => updateClassification("countryOfOrigin", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ================= UNIT & QUANTITY ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-rulers" />
            <div>
              <h2>Unit &amp; Quantity</h2>
              <p>How this item is measured and packed.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field label="Default UOM" required>
              <select
                value={unit.defaultUOM}
                onChange={(e) => updateUnit("defaultUOM", e.target.value)}
              >
                <option>Piece</option>
                <option>Kilogram</option>
                <option>Litre</option>
                <option>Box</option>
              </select>
            </Field>

            <Field label="UOM / Conversion">
              <input
                type="text"
                placeholder="1 Box = 12 Pieces"
                value={unit.uomConversion}
                onChange={(e) => updateUnit("uomConversion", e.target.value)}
              />
            </Field>

            <Field label="Pieces per Box">
              <input
                type="number"
                min="0"
                placeholder="12"
                value={unit.piecesPerBox}
                onChange={(e) => updateUnit("piecesPerBox", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-currency-rupee" />
            <div>
              <h2>Pricing</h2>
              <p>Buying and selling prices at each pack level.</p>
            </div>
          </div>

          <div className="pricing-tiers">
            <div className="pricing-tier">
              <span className="tier-label">Piece</span>
              <div className="form-grid form-grid-2">
                <Field label="Buying Price">
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.buyingPrice}
                      onChange={(e) => updatePricing("buyingPrice", e.target.value)}
                    />
                  </div>
                </Field>

                <Field label="Selling Price" required>
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.sellingPrice}
                      onChange={(e) => updatePricing("sellingPrice", e.target.value)}
                    />
                  </div>
                </Field>
              </div>
            </div>

            <div className="pricing-tier">
              <span className="tier-label">Box</span>
              <div className="form-grid form-grid-2">
                <Field label="Box Buying Price">
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.boxBuyingPrice}
                      onChange={(e) => updatePricing("boxBuyingPrice", e.target.value)}
                    />
                  </div>
                </Field>

                <Field label="Box Selling Price">
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.boxSellingPrice}
                      onChange={(e) => updatePricing("boxSellingPrice", e.target.value)}
                    />
                  </div>
                </Field>
              </div>
            </div>

            <div className="pricing-tier">
              <span className="tier-label">Master Box</span>
              <div className="form-grid form-grid-2">
                <Field label="Master Box Buying Price">
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.masterBoxBuyingPrice}
                      onChange={(e) => updatePricing("masterBoxBuyingPrice", e.target.value)}
                    />
                  </div>
                </Field>

                <Field label="Master Box Selling Price">
                  <div className="prefixed-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={pricing.masterBoxSellingPrice}
                      onChange={(e) => updatePricing("masterBoxSellingPrice", e.target.value)}
                    />
                  </div>
                </Field>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BARCODE ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-upc-scan" />
            <div>
              <h2>Barcode</h2>
              <p>Scan codes for the item and its pack levels.</p>
            </div>
          </div>

          <div className="form-grid form-grid-3">
            <Field label="Barcode">
              <input
                type="text"
                placeholder="Scan or enter code"
                value={barcode.barcode}
                onChange={(e) => updateBarcode("barcode", e.target.value)}
              />
            </Field>

            <Field label="Nos Barcode">
              <input
                type="text"
                placeholder="Scan or enter code"
                value={barcode.nosBarcode}
                onChange={(e) => updateBarcode("nosBarcode", e.target.value)}
              />
            </Field>

            <Field label="Box Barcode">
              <input
                type="text"
                placeholder="Scan or enter code"
                value={barcode.boxBarcode}
                onChange={(e) => updateBarcode("boxBarcode", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ================= INVENTORY & SALES / LOYALTY & STATUS ================= */}
        <div className="two-col">
          <section className="form-card">
            <div className="form-card-header">
              <SectionIcon icon="bi-boxes" />
              <div>
                <h2>Inventory &amp; Sales</h2>
                <p>Control how this item moves through stock.</p>
              </div>
            </div>

            <div className="toggle-list">
              <ToggleRow
                label="Track Stock"
                hint="Keep a running stock count for this item."
                checked={flags.trackStock}
                onChange={(v) => toggleFlag("trackStock", v)}
              />
              <ToggleRow
                label="Allow Sales"
                hint="This item can be added to sale invoices."
                checked={flags.allowSales}
                onChange={(v) => toggleFlag("allowSales", v)}
              />
              <ToggleRow
                label="Allow Purchase"
                hint="This item can be added to purchase orders."
                checked={flags.allowPurchase}
                onChange={(v) => toggleFlag("allowPurchase", v)}
              />
            </div>
          </section>

          <section className="form-card">
            <div className="form-card-header">
              <SectionIcon icon="bi-gift" />
              <div>
                <h2>Loyalty &amp; Status</h2>
                <p>Rewards and item visibility.</p>
              </div>
            </div>

            <div className="form-grid">
              <Field label="Loyalty Points" span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={loyaltyPoints}
                  onChange={(e) => setLoyaltyPoints(e.target.value)}
                />
              </Field>
            </div>

            <div className="toggle-list">
              <ToggleRow
                label="Allow Discount"
                hint="Discounts can be applied to this item."
                checked={flags.allowDiscount}
                onChange={(v) => toggleFlag("allowDiscount", v)}
              />
              <ToggleRow
                label="Disable Item"
                hint="Hide this item from sales and purchases."
                checked={flags.disableItem}
                onChange={(v) => toggleFlag("disableItem", v)}
              />
            </div>
          </section>
        </div>

        {/* ================= BRANCH & SUPPLIER ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-shop" />
            <div>
              <h2>Branch &amp; Supplier</h2>
              <p>Where this item is available and who supplies it.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field label="Branch Availability" span>
              <div className="branch-list">
                {branches.map((b) => (
                  <label key={b.id} className="branch-chip">
                    <input
                      type="checkbox"
                      checked={b.checked}
                      onChange={() => toggleBranch(b.id)}
                    />
                    {b.name}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Supplier Mapping" span>
              <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                <option value="">Select a supplier</option>
                <option>India Foods Pvt Ltd</option>
                <option>Nature Fresh Distributors</option>
                <option>Golden Harvest Traders</option>
              </select>
            </Field>
          </div>
        </section>

        {/* ================= VARIANTS ================= */}
        <section className="form-card">
          <div className="form-card-header">
            <SectionIcon icon="bi-shuffle" />
            <div>
              <h2>Variants</h2>
              <p>Sell this item in multiple options like size or color.</p>
            </div>
          </div>

          <ToggleRow
            label="Has Variants / Template Item"
            hint="Turn this on to define attributes and generate variant rows."
            checked={hasVariants}
            onChange={setHasVariants}
          />

          {hasVariants && (
            <div className="variants-body">

              <div className="attribute-list">
                {attributes.map((attr) => (
                  <div className="attribute-row" key={attr.id}>
                    <input
                      type="text"
                      placeholder="Attribute, e.g. Color"
                      value={attr.name}
                      onChange={(e) => updateAttribute(attr.id, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Options, comma separated, e.g. Red, Blue, Green"
                      value={attr.options}
                      onChange={(e) => updateAttribute(attr.id, "options", e.target.value)}
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => removeAttribute(attr.id)}
                      aria-label="Remove attribute"
                    >
                      <i className="bi bi-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                ))}

                <div className="attribute-actions">
                  <button type="button" className="btn btn-ghost" onClick={addAttribute}>
                    <i className="bi bi-plus-lg" aria-hidden="true"></i>
                    Add attribute
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={generateVariants}
                    disabled={readyAttributes.length === 0}
                  >
                    Generate variants
                  </button>
                </div>
              </div>

              {variantRows.length > 0 && (
                <div className="variant-table-wrap">
                  <table className="variant-table">
                    <thead>
                      <tr>
                        <th scope="col">Variant</th>
                        <th scope="col">Item code</th>
                        <th scope="col">Item name</th>
                        <th scope="col">Barcode</th>
                        <th scope="col">Box barcode</th>
                        <th scope="col">Buying price</th>
                        <th scope="col">Selling price</th>
                        <th scope="col">Pieces per box</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantRows.map((row) => (
                        <tr key={row.id}>
                          <td data-label="Variant">
                            <span className="variant-label">{row.label}</span>
                          </td>
                          <td data-label="Item code">
                            <input
                              type="text"
                              value={row.code}
                              onChange={(e) => updateVariantRow(row.id, "code", e.target.value)}
                            />
                          </td>
                          <td data-label="Item name">
                            <input
                              type="text"
                              value={row.name}
                              onChange={(e) => updateVariantRow(row.id, "name", e.target.value)}
                            />
                          </td>
                          <td data-label="Barcode">
                            <input
                              type="text"
                              value={row.barcode}
                              onChange={(e) => updateVariantRow(row.id, "barcode", e.target.value)}
                            />
                          </td>
                          <td data-label="Box barcode">
                            <input
                              type="text"
                              value={row.boxBarcode}
                              onChange={(e) => updateVariantRow(row.id, "boxBarcode", e.target.value)}
                            />
                          </td>
                          <td data-label="Buying price">
                            <input
                              type="number"
                              min="0"
                              value={row.buyingPrice}
                              onChange={(e) => updateVariantRow(row.id, "buyingPrice", e.target.value)}
                            />
                          </td>
                          <td data-label="Selling price">
                            <input
                              type="number"
                              min="0"
                              value={row.sellingPrice}
                              onChange={(e) => updateVariantRow(row.id, "sellingPrice", e.target.value)}
                            />
                          </td>
                          <td data-label="Pieces per box">
                            <input
                              type="number"
                              min="0"
                              value={row.piecesPerBox}
                              onChange={(e) => updateVariantRow(row.id, "piecesPerBox", e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================= STICKY FOOTER ================= */}
        <div className="create-footer">
          <Link to="/" className="btn btn-ghost">Cancel</Link>
          <div className="footer-right">
            <button type="button" className="btn btn-ghost">Save as Draft</button>
            <button type="button" className="btn btn-primary">
              <i className="bi bi-check-lg" aria-hidden="true"></i>
              Save Item
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CreateItem;