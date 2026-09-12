import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    companyName: "ItemPro",
    companyEmail: "admin@itempro.com",
    phone: "+91 98765 43210",
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",

    emailNotification: true,
    lowStockNotification: true,
    purchaseNotification: true,
    salesNotification: true,

    darkMode: false,
    compactTable: false,
    showProductId: true,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const renderGeneral = () => (
    <div className="settings-content">

      <div className="settings-section-heading">
        <h2>General Settings</h2>
        <p>Manage your basic application and company information.</p>
      </div>

      <div className="settings-form-grid">

        <div className="settings-field">
          <label>Company / Application Name</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) =>
              handleChange("companyName", e.target.value)
            }
          />
        </div>

        <div className="settings-field">
          <label>Company Email</label>
          <input
            type="email"
            value={settings.companyEmail}
            onChange={(e) =>
              handleChange("companyEmail", e.target.value)
            }
          />
        </div>

        <div className="settings-field">
          <label>Phone Number</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
          />
        </div>

        <div className="settings-field">
          <label>Currency</label>

          <select
            value={settings.currency}
            onChange={(e) =>
              handleChange("currency", e.target.value)
            }
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>

        <div className="settings-field">
          <label>Timezone</label>

          <select
            value={settings.timezone}
            onChange={(e) =>
              handleChange("timezone", e.target.value)
            }
          >
            <option value="Asia/Kolkata">
              Asia/Kolkata (IST)
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="America/New_York">
              America/New_York
            </option>
          </select>
        </div>

        <div className="settings-field">
          <label>Date Format</label>

          <select
            value={settings.dateFormat}
            onChange={(e) =>
              handleChange("dateFormat", e.target.value)
            }
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

      </div>

      <div className="settings-divider"></div>

      <div className="settings-section-heading">
        <h2>Application Preferences</h2>
        <p>Configure how information is displayed in the system.</p>
      </div>

      <SettingToggle
        title="Show Product ID"
        description="Display product ID in item listings and details."
        checked={settings.showProductId}
        onChange={(value) =>
          handleChange("showProductId", value)
        }
      />

      <SettingToggle
        title="Compact Table"
        description="Use a smaller row height in item tables."
        checked={settings.compactTable}
        onChange={(value) =>
          handleChange("compactTable", value)
        }
      />

      <SettingToggle
        title="Dark Mode"
        description="Enable dark appearance for the application."
        checked={settings.darkMode}
        onChange={(value) =>
          handleChange("darkMode", value)
        }
      />

    </div>
  );

  const renderNotifications = () => (
    <div className="settings-content">

      <div className="settings-section-heading">
        <h2>Notification Settings</h2>
        <p>Choose which system notifications you want to receive.</p>
      </div>

      <SettingToggle
        icon="bi-envelope"
        title="Email Notifications"
        description="Receive important system notifications through email."
        checked={settings.emailNotification}
        onChange={(value) =>
          handleChange("emailNotification", value)
        }
      />

      <SettingToggle
        icon="bi-exclamation-triangle"
        title="Low Stock Alerts"
        description="Get notified when an item reaches low stock."
        checked={settings.lowStockNotification}
        onChange={(value) =>
          handleChange("lowStockNotification", value)
        }
      />

      <SettingToggle
        icon="bi-cart-plus"
        title="Purchase Notifications"
        description="Receive notifications when purchase activity occurs."
        checked={settings.purchaseNotification}
        onChange={(value) =>
          handleChange("purchaseNotification", value)
        }
      />

      <SettingToggle
        icon="bi-cart-check"
        title="Sales Notifications"
        description="Receive notifications for sales activity."
        checked={settings.salesNotification}
        onChange={(value) =>
          handleChange("salesNotification", value)
        }
      />

    </div>
  );

  const renderSecurity = () => (
    <div className="settings-content">

      <div className="settings-section-heading">
        <h2>Security</h2>
        <p>Manage your account security and access preferences.</p>
      </div>

      <div className="security-card">

        <div className="security-icon">
          <i className="bi bi-shield-lock"></i>
        </div>

        <div className="security-info">
          <h3>Password</h3>
          <p>
            Keep your account secure by using a strong password.
          </p>
        </div>

        <button type="button" className="settings-outline-btn">
          Change Password
        </button>

      </div>

      <div className="security-card">

        <div className="security-icon">
          <i className="bi bi-person-check"></i>
        </div>

        <div className="security-info">
          <h3>Two-Factor Authentication</h3>
          <p>
            Add an extra layer of security to your administrator account.
          </p>
        </div>

        <span className="security-status disabled">
          Not Enabled
        </span>

      </div>

      <div className="security-card">

        <div className="security-icon">
          <i className="bi bi-clock-history"></i>
        </div>

        <div className="security-info">
          <h3>Session Timeout</h3>
          <p>
            Automatically log out after a period of inactivity.
          </p>
        </div>

        <select className="security-select" defaultValue="30">
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">1 Hour</option>
          <option value="120">2 Hours</option>
        </select>

      </div>

    </div>
  );

  const renderSystem = () => (
    <div className="settings-content">

      <div className="settings-section-heading">
        <h2>System Information</h2>
        <p>Application and system information.</p>
      </div>

      <div className="system-info-grid">

        <div className="system-info-box">
          <span>Application</span>
          <strong>ItemPro</strong>
        </div>

        <div className="system-info-box">
          <span>Version</span>
          <strong>1.0.0</strong>
        </div>

        <div className="system-info-box">
          <span>Environment</span>
          <strong className="system-active">Production</strong>
        </div>

        <div className="system-info-box">
          <span>Database</span>
          <strong>Connected</strong>
        </div>

        <div className="system-info-box">
          <span>Last Backup</span>
          <strong>12 September 2026</strong>
        </div>

        <div className="system-info-box">
          <span>Total Items</span>
          <strong>124</strong>
        </div>

      </div>

      <div className="danger-zone">

        <div>
          <h3>Reset Application Settings</h3>
          <p>
            Reset all application preferences to their default values.
          </p>
        </div>

        <button type="button" className="danger-btn">
          Reset Settings
        </button>

      </div>

    </div>
  );

  return (
    <div className="settings-page">

      {/* HEADER */}
      <header className="settings-topbar">

        <div>

          <div className="settings-breadcrumb">
            <Link to="/">Dashboard</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Settings</span>
          </div>

          <h1>Settings</h1>

          <p>
            Manage your application preferences and configuration
          </p>

        </div>

        <Link to="/" className="settings-back-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Dashboard
        </Link>

      </header>

      {/* MAIN */}
      <main className="settings-container">

        <div className="settings-layout">

          {/* SIDEBAR */}
          <aside className="settings-sidebar">

            <div className="settings-nav-title">
              SETTINGS
            </div>

            <button
              type="button"
              className={
                activeTab === "general"
                  ? "settings-nav active"
                  : "settings-nav"
              }
              onClick={() => setActiveTab("general")}
            >
              <i className="bi bi-sliders"></i>
              <span>General</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "notifications"
                  ? "settings-nav active"
                  : "settings-nav"
              }
              onClick={() => setActiveTab("notifications")}
            >
              <i className="bi bi-bell"></i>
              <span>Notifications</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "security"
                  ? "settings-nav active"
                  : "settings-nav"
              }
              onClick={() => setActiveTab("security")}
            >
              <i className="bi bi-shield-check"></i>
              <span>Security</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "system"
                  ? "settings-nav active"
                  : "settings-nav"
              }
              onClick={() => setActiveTab("system")}
            >
              <i className="bi bi-cpu"></i>
              <span>System</span>
            </button>

          </aside>

          {/* CONTENT */}
          <section className="settings-card">

            {activeTab === "general" && renderGeneral()}

            {activeTab === "notifications" &&
              renderNotifications()}

            {activeTab === "security" &&
              renderSecurity()}

            {activeTab === "system" &&
              renderSystem()}

            {/* SAVE */}
            {activeTab !== "security" &&
              activeTab !== "system" && (
                <div className="settings-actions">

                  <button
                    type="button"
                    className="settings-cancel-btn"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="settings-save-btn"
                    onClick={handleSave}
                  >
                    <i className="bi bi-check-lg"></i>
                    Save Changes
                  </button>

                </div>
              )}

          </section>

        </div>

      </main>

      <footer className="settings-footer">
        <span>© 2026 ItemPro. All rights reserved.</span>
        <span>Item Management System</span>
      </footer>

    </div>
  );
}

function SettingToggle({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-toggle-row">

      <div className="toggle-left">

        {icon && (
          <div className="toggle-icon">
            <i className={`bi ${icon}`}></i>
          </div>
        )}

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

      </div>

      <button
        type="button"
        className={
          checked
            ? "toggle-switch checked"
            : "toggle-switch"
        }
        onClick={() => onChange(!checked)}
        aria-label={title}
      >
        <span></span>
      </button>

    </div>
  );
}

export default Settings;