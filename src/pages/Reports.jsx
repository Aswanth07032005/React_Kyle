import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Reports.css";

const reportData = [
  {
    id: 1,
    code: "ITM-1001",
    name: "Premium Rice",
    category: "Food",
    openingStock: 100,
    purchased: 50,
    sold: 65,
    closingStock: 85,
    sales: 81250,
  },
  {
    id: 2,
    code: "ITM-1002",
    name: "Organic Sugar",
    category: "Grocery",
    openingStock: 60,
    purchased: 30,
    sold: 48,
    closingStock: 42,
    sales: 40800,
  },
  {
    id: 3,
    code: "ITM-1003",
    name: "Premium Coffee",
    category: "Beverages",
    openingStock: 20,
    purchased: 15,
    sold: 27,
    closingStock: 8,
    sales: 17550,
  },
  {
    id: 4,
    code: "ITM-1004",
    name: "Wheat Flour",
    category: "Food",
    openingStock: 80,
    purchased: 40,
    sold: 55,
    closingStock: 65,
    sales: 26400,
  },
  {
    id: 5,
    code: "ITM-1005",
    name: "Green Tea",
    category: "Beverages",
    openingStock: 35,
    purchased: 20,
    sold: 30,
    closingStock: 25,
    sales: 11700,
  },
];

function Reports() {
  const [reportType, setReportType] = useState("Sales Report");
  const [category, setCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState("This Month");

  const filteredData = useMemo(() => {
    if (category === "All Categories") {
      return reportData;
    }

    return reportData.filter((item) => item.category === category);
  }, [category]);

  const totalSales = filteredData.reduce(
    (total, item) => total + item.sales,
    0
  );

  const totalPurchased = filteredData.reduce(
    (total, item) => total + item.purchased,
    0
  );

  const totalSold = filteredData.reduce(
    (total, item) => total + item.sold,
    0
  );

  const totalStock = filteredData.reduce(
    (total, item) => total + item.closingStock,
    0
  );

  const lowStockItems = filteredData.filter(
    (item) => item.closingStock <= 10
  ).length;

  const handleExport = () => {
    alert(`${reportType} exported successfully.`);
  };

  return (
    <div className="reports-page">

      {/* Header */}
      <header className="reports-header">
        <div>
          <div className="reports-breadcrumb">
            <Link to="/">Dashboard</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Reports</span>
          </div>

          <h1>Reports</h1>
          <p>View and analyze your inventory, sales and purchase reports.</p>
        </div>

        <div className="reports-header-actions">
          <button
            type="button"
            className="reports-export-btn"
            onClick={handleExport}
          >
            <i className="bi bi-download"></i>
            Export Report
          </button>
        </div>
      </header>

      {/* Report Filters */}
      <section className="reports-filter-card">

        <div className="report-filter-group">
          <label>Report Type</label>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option>Sales Report</option>
            <option>Purchase Report</option>
            <option>Stock Report</option>
            <option>Item Summary</option>
          </select>
        </div>

        <div className="report-filter-group">
          <label>Date Range</label>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="report-filter-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Food</option>
            <option>Grocery</option>
            <option>Beverages</option>
          </select>
        </div>

        <button
          type="button"
          className="apply-filter-btn"
          onClick={() => {}}
        >
          <i className="bi bi-funnel"></i>
          Apply Filter
        </button>
      </section>

      {/* Summary Cards */}
      <section className="reports-summary-grid">

        <div className="report-summary-card">
          <div className="report-summary-icon sales-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Sales</span>
            <h3>₹{totalSales.toLocaleString("en-IN")}</h3>
            <small>
              <i className="bi bi-arrow-up"></i>
              12.5% from last month
            </small>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon purchase-icon">
            <i className="bi bi-cart-plus"></i>
          </div>

          <div>
            <span>Total Purchased</span>
            <h3>{totalPurchased}</h3>
            <small>
              <i className="bi bi-box-seam"></i>
              Units purchased
            </small>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon sold-icon">
            <i className="bi bi-cart-check"></i>
          </div>

          <div>
            <span>Items Sold</span>
            <h3>{totalSold}</h3>
            <small>
              <i className="bi bi-graph-up"></i>
              Sales performance
            </small>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon stock-icon">
            <i className="bi bi-boxes"></i>
          </div>

          <div>
            <span>Closing Stock</span>
            <h3>{totalStock}</h3>
            <small className="low-stock-text">
              {lowStockItems} low stock item
              {lowStockItems !== 1 ? "s" : ""}
            </small>
          </div>
        </div>

      </section>

      {/* Report Table */}
      <section className="reports-table-card">

        <div className="reports-table-header">
          <div>
            <h2>{reportType}</h2>
            <p>
              Showing report for <strong>{dateRange}</strong>
            </p>
          </div>

          <button
            type="button"
            className="print-report-btn"
            onClick={() => window.print()}
          >
            <i className="bi bi-printer"></i>
            Print
          </button>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">

            <thead>
              <tr>
                <th>ITEM</th>
                <th>CODE</th>
                <th>CATEGORY</th>
                <th>OPENING</th>
                <th>PURCHASED</th>
                <th>SOLD</th>
                <th>CLOSING</th>
                <th>SALES VALUE</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <div className="report-item-name">
                        <div className="report-item-icon">
                          <i className="bi bi-box"></i>
                        </div>

                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="item-code">
                        {item.code}
                      </span>
                    </td>

                    <td>{item.category}</td>

                    <td>{item.openingStock}</td>

                    <td>
                      <span className="purchase-value">
                        +{item.purchased}
                      </span>
                    </td>

                    <td>
                      <span className="sold-value">
                        -{item.sold}
                      </span>
                    </td>

                    <td>
                      <strong>{item.closingStock}</strong>
                    </td>

                    <td>
                      <strong>
                        ₹{item.sales.toLocaleString("en-IN")}
                      </strong>
                    </td>

                    <td>
                      {item.closingStock <= 10 ? (
                        <span className="report-status low">
                          Low Stock
                        </span>
                      ) : (
                        <span className="report-status active">
                          Active
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="reports-empty-state">
                      <i className="bi bi-inbox"></i>
                      <h3>No report data found</h3>
                      <p>
                        No items match the selected category.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="reports-table-footer">
          <span>
            Showing <strong>{filteredData.length}</strong> items
          </span>

          <span>
            Last updated: Today
          </span>
        </div>

      </section>

      {/* Report Information */}
      <section className="report-info-grid">

        <div className="report-info-card">
          <div className="report-info-icon">
            <i className="bi bi-bar-chart"></i>
          </div>

          <div>
            <h3>Sales Performance</h3>
            <p>
              Monitor your item sales and identify your
              best-performing products.
            </p>
          </div>
        </div>

        <div className="report-info-card">
          <div className="report-info-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <h3>Inventory Analysis</h3>
            <p>
              Track stock movement and identify items that
              require restocking.
            </p>
          </div>
        </div>

        <div className="report-info-card">
          <div className="report-info-icon">
            <i className="bi bi-file-earmark-bar-graph"></i>
          </div>

          <div>
            <h3>Export Reports</h3>
            <p>
              Export your report data for further analysis
              and record keeping.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Reports;