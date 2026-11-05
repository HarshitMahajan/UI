import { Inbox } from "lucide-react";
import {
  Badge,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Page,
  PageHeader,
  Section,
  Stat,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@harshitmahajan/ui";

const orders = [
  { id: "SO-1042", customer: "Aarav Textiles", total: "₹1,24,500", status: "Paid", tone: "success" },
  { id: "SO-1043", customer: "Kiran Foods", total: "₹48,200", status: "Pending", tone: "warning" },
  { id: "SO-1044", customer: "Delhi Hardware Co.", total: "₹2,10,000", status: "Overdue", tone: "danger" },
  { id: "SO-1045", customer: "Nova Packaging", total: "₹76,900", status: "In progress", tone: "accent" },
] as const;

export default function HomePage() {
  return (
    <Page width="wide">
      <PageHeader title="Home" description="A composed example page: stats, table, empty state." />

      <Section>
        <div className="grid grid-cols-4 gap-4">
          <Stat label="Open orders" value="128" hint="12 new today" />
          <Stat label="Revenue (MTD)" value="₹18.4L" hint="+8% vs last month" />
          <Stat label="Overdue invoices" value="9" hint="₹3.2L outstanding" />
          <Stat label="Stock alerts" value="4" hint="Below reorder level" />
        </div>
      </Section>

      <Section title="Recent orders">
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell align="right">{order.total}</TableCell>
                <TableCell>
                  <Badge tone={order.tone} dot>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Approvals</CardTitle>
                <CardDescription>Things waiting on you</CardDescription>
              </div>
            </CardHeader>
            <CardBody>
              <EmptyState icon={<Inbox />} title="Nothing to approve" description="New requests will show up here." />
            </CardBody>
          </Card>
        </div>
      </Section>
    </Page>
  );
}
