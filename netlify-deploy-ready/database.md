# DATABASE.md — Database Schema & Data Models

## 1. Document Purpose
This document specifies the database structure, tables, fields, data types, and relationships required to manage client inquiries, secure admin login, and store advisory trade performance data.

---

## 2. Table Schemas

### 2.1 Table: `leads`
Stores all client inquiry form submissions received from the landing page.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PRIMARY KEY, AUTO | Unique identifier for each lead |
| `full_name` | VARCHAR(100) | NOT NULL | Visitor's full name |
| `phone_number` | VARCHAR(15) | NOT NULL | Mobile/WhatsApp number |
| `email` | VARCHAR(100) | NULLABLE | Email address |
| `occupation` | VARCHAR(50) | NULLABLE | Client profession |
| `trading_segment`| VARCHAR(50) | NOT NULL | Equity, F&O, Commodity, etc. |
| `investment_capital`| VARCHAR(50)| NOT NULL | Capital size band |
| `status` | VARCHAR(20) | DEFAULT 'New' | 'New', 'Contacted', 'Converted' |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Inquiry submission timestamp |

---

### 2.2 Table: `admin_users`
Stores login credentials for the `/admin` portal.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PRIMARY KEY, AUTO | Unique Admin ID |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Admin login username (`admin`) |
| `password_hash` | TEXT | NOT NULL | Encrypted/Hashed password |
| `last_login` | TIMESTAMP | NULLABLE | Timestamp of last admin login |

---

### 2.3 Table: `performance_records`
Stores advisory trade performance data parsed from uploaded admin Excel files.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PRIMARY KEY, AUTO | Record ID |
| `trade_date` | DATE | NOT NULL | Date trade was recommended |
| `symbol` | VARCHAR(50) | NOT NULL | Stock or Option Strike (e.g. NIFTY 22000 CE) |
| `segment` | VARCHAR(20) | NOT NULL | F&O / Equity / Commodity |
| `buy_price` | DECIMAL(10,2)| NOT NULL | Entry price |
| `target_price` | DECIMAL(10,2)| NOT NULL | Target price |
| `stop_loss` | DECIMAL(10,2)| NOT NULL | Stop-loss price |
| `exit_price` | DECIMAL(10,2)| NULLABLE | Realized exit price |
| `status` | VARCHAR(20) | NOT NULL | 'Target Hit', 'SL Hit', 'Booked' |
| `pnl_percentage` | DECIMAL(5,2) | NULLABLE | Calculated Return % |

---

## 3. Data Export & Backup Specifications
- **Excel Lead Export:** Query `SELECT * FROM leads ORDER BY created_at DESC` converted into `.xlsx` buffer.
- **Excel Upload Parser:** Uploaded `.xlsx` mapped directly to insertion into `performance_records`.