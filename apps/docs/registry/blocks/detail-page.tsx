import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Page,
  PageHeader,
  Section,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@1126labs/ui";

const fields = [
  ["Customer", "Aarav Textiles"],
  ["Order date", "04 Nov 2026"],
  ["Payment terms", "Net 30"],
  ["Ship to", "Plot 14, Okhla Phase II, Delhi"],
];

/**
 * DETAIL PAGE: breadcrumb, title with status, actions, tabs, details card and
 * a summary card. Copy and adapt the fields, tabs and actions.
 */
export function DetailPage() {
  return (
    <Page>
      <Breadcrumb items={[{ label: "Orders", href: "/orders" }, { label: "SO-1042" }]} className="pb-3" />
      <PageHeader
        title="SO-1042"
        description="Aarav Textiles"
        actions={
          <>
            <Badge tone="success" dot>
              Paid
            </Badge>
            <Button variant="secondary">Duplicate</Button>
            <Button>Edit order</Button>
          </>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="items">Items</TabsTab>
          <TabsTab value="history">History</TabsTab>
        </TabsList>
        <TabsPanel value="overview">
          <Section>
            <div className="grid grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Order details</CardTitle>
                </CardHeader>
                <CardBody>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {fields.map(([label, value]) => (
                      <div key={label}>
                        <dt className="type-label">{label}</dt>
                        <dd className="mt-0.5 text-base">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 text-base">
                  <div className="flex justify-between text-fg-muted">
                    <span>Subtotal</span>
                    <span>₹1,05,508</span>
                  </div>
                  <div className="flex justify-between text-fg-muted">
                    <span>GST (18%)</span>
                    <span>₹18,992</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-medium">
                    <span>Total</span>
                    <span>₹1,24,500</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Section>
        </TabsPanel>
        <TabsPanel value="items">Line items table goes here.</TabsPanel>
        <TabsPanel value="history">Audit trail goes here.</TabsPanel>
      </Tabs>
    </Page>
  );
}
