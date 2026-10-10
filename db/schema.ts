import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const auditColumns = {
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
};

export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(),
  name: text("name").notNull(), description: text("description"),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false), ...auditColumns,
});

export const permissions = sqliteTable("permissions", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(),
  name: text("name").notNull(), module: text("module").notNull(),
});

export const rolePermissions = sqliteTable("role_permissions", {
  roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  permissionId: text("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("uq_role_permissions").on(table.roleId, table.permissionId)]);

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), email: text("email").notNull(), username: text("username"),
  fullName: text("full_name").notNull(), phone: text("phone"),
  passwordHash: text("password_hash").notNull(), passwordSalt: text("password_salt").notNull(),
  roleId: text("role_id").notNull().references(() => roles.id),
  status: text("status", { enum: ["ACTIVE", "LOCKED"] }).notNull().default("ACTIVE"),
  lastLoginAt: text("last_login_at"), ...auditColumns,
}, (table) => [
  uniqueIndex("uq_users_email").on(table.email), uniqueIndex("uq_users_username").on(table.username),
  index("idx_users_role_status").on(table.roleId, table.status),
]);

export const userSessions = sqliteTable("user_sessions", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(), expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  lastSeenAt: text("last_seen_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_user_sessions_user_expires").on(table.userId, table.expiresAt)]);

export const invitations = sqliteTable("invitations", {
  id: text("id").primaryKey(), codeHash: text("code_hash").notNull().unique(), email: text("email"),
  roleId: text("role_id").notNull().references(() => roles.id), expiresAt: text("expires_at").notNull(),
  usedAt: text("used_at"), createdBy: text("created_by").notNull().references(() => users.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_invitations_expiry").on(table.expiresAt, table.usedAt)]);

export const areas = sqliteTable("areas", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  description: text("description"), sortOrder: integer("sort_order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
});

export const tableTypes = sqliteTable("table_types", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  description: text("description"), baseHourlyRate: integer("base_hourly_rate").notNull().default(0),
  color: text("color").notNull().default("#16a085"),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [check("ck_table_types_rate", sql`${table.baseHourlyRate} >= 0`)]);

export const billiardTables = sqliteTable("billiard_tables", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  areaId: text("area_id").notNull().references(() => areas.id),
  tableTypeId: text("table_type_id").notNull().references(() => tableTypes.id),
  status: text("status", { enum: ["AVAILABLE", "PLAYING", "RESERVED", "MAINTENANCE"] }).notNull().default("AVAILABLE"),
  notes: text("notes"), sortOrder: integer("sort_order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [index("idx_billiard_tables_area_status").on(table.areaId, table.status)]);

export const priceRules = sqliteTable("price_rules", {
  id: text("id").primaryKey(), tableTypeId: text("table_type_id").notNull().references(() => tableTypes.id, { onDelete: "cascade" }),
  name: text("name").notNull(), daysMask: integer("days_mask").notNull().default(127),
  startMinute: integer("start_minute").notNull().default(0), endMinute: integer("end_minute").notNull().default(1440),
  hourlyRate: integer("hourly_rate").notNull(), priority: integer("priority").notNull().default(0),
  effectiveFrom: text("effective_from"), effectiveTo: text("effective_to"),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [
  index("idx_price_rules_type_active").on(table.tableTypeId, table.active, table.priority),
  check("ck_price_rules_minutes", sql`${table.startMinute} >= 0 AND ${table.endMinute} <= 1440 AND ${table.startMinute} < ${table.endMinute}`),
  check("ck_price_rules_rate", sql`${table.hourlyRate} >= 0`),
]);

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), fullName: text("full_name").notNull(),
  phone: text("phone"), email: text("email"), dateOfBirth: text("date_of_birth"), notes: text("notes"),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [uniqueIndex("uq_customers_phone").on(table.phone)]);

export const reservations = sqliteTable("reservations", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), customerId: text("customer_id").references(() => customers.id),
  customerName: text("customer_name").notNull(), customerPhone: text("customer_phone").notNull(),
  tableId: text("table_id").notNull().references(() => billiardTables.id), startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(), guestCount: integer("guest_count").notNull().default(1),
  status: text("status", { enum: ["PENDING", "CONFIRMED", "SEATED", "CANCELLED", "NO_SHOW"] }).notNull().default("PENDING"),
  notes: text("notes"), createdBy: text("created_by").notNull().references(() => users.id), ...auditColumns,
}, (table) => [
  index("idx_reservations_table_time").on(table.tableId, table.startsAt, table.endsAt),
  index("idx_reservations_status_start").on(table.status, table.startsAt),
  check("ck_reservations_period", sql`${table.startsAt} < ${table.endsAt}`),
]);

export const playSessions = sqliteTable("play_sessions", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(),
  tableId: text("table_id").notNull().references(() => billiardTables.id), customerId: text("customer_id").references(() => customers.id),
  reservationId: text("reservation_id").references(() => reservations.id), startedAt: text("started_at").notNull(),
  endedAt: text("ended_at"), status: text("status", { enum: ["ACTIVE", "PAUSED", "CLOSED"] }).notNull().default("ACTIVE"),
  tableAmount: integer("table_amount").notNull().default(0), openedBy: text("opened_by").notNull().references(() => users.id),
  closedBy: text("closed_by").references(() => users.id), notes: text("notes"), ...auditColumns,
}, (table) => [
  index("idx_play_sessions_table_status").on(table.tableId, table.status),
  uniqueIndex("uq_play_sessions_one_open_per_table").on(table.tableId).where(sql`${table.status} IN ('ACTIVE','PAUSED')`),
]);

export const sessionSegments = sqliteTable("session_segments", {
  id: text("id").primaryKey(), sessionId: text("session_id").notNull().references(() => playSessions.id, { onDelete: "cascade" }),
  tableId: text("table_id").notNull().references(() => billiardTables.id), startedAt: text("started_at").notNull(),
  endedAt: text("ended_at"), hourlyRate: integer("hourly_rate").notNull(), amount: integer("amount").notNull().default(0),
}, (table) => [index("idx_session_segments_session").on(table.sessionId, table.startedAt)]);

export const sessionPauses = sqliteTable("session_pauses", {
  id: text("id").primaryKey(), sessionId: text("session_id").notNull().references(() => playSessions.id, { onDelete: "cascade" }),
  segmentId: text("segment_id").notNull().references(() => sessionSegments.id, { onDelete: "cascade" }),
  startedAt: text("started_at").notNull(), endedAt: text("ended_at"), reason: text("reason"),
  createdBy: text("created_by").notNull().references(() => users.id),
});

export const tableTransfers = sqliteTable("table_transfers", {
  id: text("id").primaryKey(), sessionId: text("session_id").notNull().references(() => playSessions.id, { onDelete: "cascade" }),
  fromTableId: text("from_table_id").notNull().references(() => billiardTables.id),
  toTableId: text("to_table_id").notNull().references(() => billiardTables.id), transferredAt: text("transferred_at").notNull(),
  transferredBy: text("transferred_by").notNull().references(() => users.id), reason: text("reason"),
});

export const productCategories = sqliteTable("product_categories", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0), active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  categoryId: text("category_id").references(() => productCategories.id), kind: text("kind", { enum: ["PRODUCT", "SERVICE"] }).notNull().default("PRODUCT"),
  unit: text("unit").notNull().default("phần"), salePrice: integer("sale_price").notNull(), costPrice: integer("cost_price").notNull().default(0),
  stockQuantity: real("stock_quantity").notNull().default(0), minStock: real("min_stock").notNull().default(0),
  trackStock: integer("track_stock", { mode: "boolean" }).notNull().default(true), active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [
  index("idx_products_category_active").on(table.categoryId, table.active),
  check("ck_products_prices", sql`${table.salePrice} >= 0 AND ${table.costPrice} >= 0`),
  check("ck_products_stock", sql`${table.stockQuantity} >= 0 AND ${table.minStock} >= 0`),
]);

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), sessionId: text("session_id").notNull().references(() => playSessions.id),
  status: text("status", { enum: ["OPEN", "COMPLETED", "CANCELLED"] }).notNull().default("OPEN"), notes: text("notes"),
  createdBy: text("created_by").notNull().references(() => users.id), ...auditColumns,
}, (table) => [index("idx_orders_session_status").on(table.sessionId, table.status)]);

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(), orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id), productName: text("product_name").notNull(),
  quantity: real("quantity").notNull(), unitPrice: integer("unit_price").notNull(),
  status: text("status", { enum: ["PENDING", "PREPARING", "SERVED", "CANCELLED"] }).notNull().default("PENDING"),
  notes: text("notes"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_order_items_order_status").on(table.orderId, table.status), check("ck_order_items_quantity", sql`${table.quantity} > 0`)]);

export const membershipTiers = sqliteTable("membership_tiers", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), name: text("name").notNull(),
  minPoints: integer("min_points").notNull().default(0), discountPercent: real("discount_percent").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
}, (table) => [check("ck_membership_tiers_discount", sql`${table.discountPercent} >= 0 AND ${table.discountPercent} <= 100`)]);

export const memberships = sqliteTable("memberships", {
  id: text("id").primaryKey(), customerId: text("customer_id").notNull().unique().references(() => customers.id, { onDelete: "cascade" }),
  tierId: text("tier_id").notNull().references(() => membershipTiers.id), points: integer("points").notNull().default(0),
  joinedAt: text("joined_at").notNull().default(sql`CURRENT_TIMESTAMP`), active: integer("active", { mode: "boolean" }).notNull().default(true), ...auditColumns,
});

export const loyaltyTransactions = sqliteTable("loyalty_transactions", {
  id: text("id").primaryKey(), membershipId: text("membership_id").notNull().references(() => memberships.id, { onDelete: "cascade" }),
  points: integer("points").notNull(), reason: text("reason").notNull(), referenceType: text("reference_type"), referenceId: text("reference_id"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), sessionId: text("session_id").references(() => playSessions.id),
  customerId: text("customer_id").references(() => customers.id), status: text("status", { enum: ["DRAFT", "ISSUED", "PAID", "CANCELLED"] }).notNull().default("DRAFT"),
  tableAmount: integer("table_amount").notNull().default(0), serviceAmount: integer("service_amount").notNull().default(0),
  discountAmount: integer("discount_amount").notNull().default(0), surchargeAmount: integer("surcharge_amount").notNull().default(0),
  totalAmount: integer("total_amount").notNull().default(0), issuedAt: text("issued_at"), paidAt: text("paid_at"), cancelledAt: text("cancelled_at"),
  cancelReason: text("cancel_reason"), createdBy: text("created_by").notNull().references(() => users.id), ...auditColumns,
}, (table) => [index("idx_invoices_status_created").on(table.status, table.createdAt)]);

export const invoiceItems = sqliteTable("invoice_items", {
  id: text("id").primaryKey(), invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  sourceType: text("source_type", { enum: ["TABLE", "PRODUCT", "SERVICE"] }).notNull(), sourceId: text("source_id"),
  description: text("description").notNull(), quantity: real("quantity").notNull(), unitPrice: integer("unit_price").notNull(), amount: integer("amount").notNull(),
});

export const invoiceAdjustments = sqliteTable("invoice_adjustments", {
  id: text("id").primaryKey(), invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["DISCOUNT", "SURCHARGE", "MEMBER_BENEFIT"] }).notNull(), description: text("description").notNull(),
  amount: integer("amount").notNull(), approvedBy: text("approved_by").references(() => users.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(), invoiceId: text("invoice_id").notNull().references(() => invoices.id),
  method: text("method", { enum: ["CASH", "BANK_TRANSFER", "CARD", "EWALLET"] }).notNull(), amount: integer("amount").notNull(),
  reference: text("reference"), receivedBy: text("received_by").notNull().references(() => users.id), paidAt: text("paid_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [check("ck_payments_amount", sql`${table.amount} > 0`)]);

export const inventoryTransactions = sqliteTable("inventory_transactions", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), productId: text("product_id").notNull().references(() => products.id),
  type: text("type", { enum: ["IN", "OUT", "SALE", "ADJUST"] }).notNull(), quantity: real("quantity").notNull(),
  beforeQuantity: real("before_quantity").notNull(), afterQuantity: real("after_quantity").notNull(), unitCost: integer("unit_cost"),
  referenceType: text("reference_type"), referenceId: text("reference_id"), reason: text("reason").notNull(),
  createdBy: text("created_by").notNull().references(() => users.id), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_inventory_transactions_product_time").on(table.productId, table.createdAt)]);

export const stockCounts = sqliteTable("stock_counts", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(),
  status: text("status", { enum: ["DRAFT", "COMPLETED", "CANCELLED"] }).notNull().default("DRAFT"), notes: text("notes"),
  countedBy: text("counted_by").notNull().references(() => users.id), approvedBy: text("approved_by").references(() => users.id),
  countedAt: text("counted_at").notNull().default(sql`CURRENT_TIMESTAMP`), completedAt: text("completed_at"),
});

export const stockCountItems = sqliteTable("stock_count_items", {
  id: text("id").primaryKey(), stockCountId: text("stock_count_id").notNull().references(() => stockCounts.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id), systemQuantity: real("system_quantity").notNull(),
  actualQuantity: real("actual_quantity").notNull(), difference: real("difference").notNull(), notes: text("notes"),
});

export const workShifts = sqliteTable("work_shifts", {
  id: text("id").primaryKey(), code: text("code").notNull().unique(), cashierId: text("cashier_id").notNull().references(() => users.id),
  status: text("status", { enum: ["OPEN", "CLOSED"] }).notNull().default("OPEN"), openedAt: text("opened_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  closedAt: text("closed_at"), openingCash: integer("opening_cash").notNull().default(0), expectedCash: integer("expected_cash"),
  actualCash: integer("actual_cash"), difference: integer("difference"), notes: text("notes"), closedBy: text("closed_by").references(() => users.id),
}, (table) => [
  index("idx_work_shifts_cashier_status").on(table.cashierId, table.status),
  uniqueIndex("uq_work_shifts_one_open_per_cashier").on(table.cashierId).where(sql`${table.status} = 'OPEN'`),
]);

export const shiftCashMovements = sqliteTable("shift_cash_movements", {
  id: text("id").primaryKey(), shiftId: text("shift_id").notNull().references(() => workShifts.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["OPENING", "PAYMENT", "CASH_IN", "CASH_OUT", "CLOSING"] }).notNull(), amount: integer("amount").notNull(),
  referenceType: text("reference_type"), referenceId: text("reference_id"), notes: text("notes"),
  createdBy: text("created_by").notNull().references(() => users.id), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(), actorId: text("actor_id").references(() => users.id), action: text("action").notNull(),
  entityType: text("entity_type").notNull(), entityId: text("entity_id"), summary: text("summary").notNull(),
  metadataJson: text("metadata_json"), ipAddress: text("ip_address"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_audit_logs_time_action").on(table.createdAt, table.action)]);

export const appSettings = sqliteTable("app_settings", {
  key: text("key").primaryKey(), value: text("value").notNull(), updatedBy: text("updated_by").references(() => users.id),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
