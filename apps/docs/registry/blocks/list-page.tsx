import { Plus, Search } from "lucide-react";
import {
  Badge,
  Button,
  EmptyState,
  Input,
  Page,
  PageHeader,
  Section,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@1126labs/ui";

const statuses = [
  { value: "all", label: "All statuses" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

interface OrderRow {
  id: string;
  customer: string;
  total: string;
  status: string;
  tone: "success" | "warning" | "danger";
}

const rows: OrderRow[] = [
  { id: "SO-1042", customer: "Aarav Textiles", total: "₹1,24,500", status: "Paid", tone: "success" },
  { id: "SO-1043", customer: "Kiran Foods", total: "₹48,200", status: "Pending", tone: "warning" },
  { id: "SO-1044", customer: "Delhi Hardware Co.", total: "₹2,10,000", status: "Overdue", tone: "danger" },
];

/**
 * LIST PAGE: title + primary action, a filter row, a table, an empty state.
 * Copy this file, then replace the sample rows and columns with your data.
 * Keep using library components and token classes only.
 */
export function ListPage() {
  return (
    <Page width="wide">
      <PageHeader
        title="Orders"
        description="All sales orders across customers."
        actions={
          <Button>
            <Plus className="size-4" />
            New order
          </Button>
        }
      />

      <Section>
        <div className="mb-4 flex items-center gap-3">
          <div className="relative w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
            <Input placeholder="Search orders" className="pl-9" />
          </div>
          <Select options={statuses} defaultValue="all" className="w-44" />
        </div>

        {rows.length === 0 ? (
          <EmptyState title="No orders yet" description="Create your first order to see it here." />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Order</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell align="right">Total</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell>
                    <Badge tone={row.tone} dot>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Section>
    </Page>
  );
}
