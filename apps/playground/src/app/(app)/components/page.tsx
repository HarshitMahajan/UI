import { Plus, Settings, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxField,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  EmptyState,
  FormField,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Page,
  PageHeader,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioField,
  RadioGroup,
  Section,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  Tooltip,
} from "@1126labs/ui";

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
];

export default function ComponentsPage() {
  return (
    <Page>
      <PageHeader
        title="Components"
        description="Every component in its states. Toggle density in the top bar."
        actions={<Breadcrumb items={[{ label: "System" }, { label: "Components" }]} />}
      />

      <Section title="Button">
        <Card>
          <CardBody className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
            <Separator orientation="vertical" className="h-6" />
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Tooltip content="Settings">
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="size-4" />
              </Button>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </CardBody>
        </Card>
      </Section>

      <Section title="Form controls">
        <Card>
          <CardBody className="grid grid-cols-2 gap-5">
            <FormField label="Customer" required description="Legal name as on the invoice">
              <Input placeholder="Aarav Textiles" />
            </FormField>
            <FormField label="Order number" error="This number is already used">
              <Input defaultValue="SO-1042" />
            </FormField>
            <FormField label="Status">
              <Select options={statuses} defaultValue="draft" />
            </FormField>
            <FormField label="Disabled">
              <Input disabled placeholder="Not editable" />
            </FormField>
            <FormField label="Notes" className="col-span-2">
              <Textarea placeholder="Internal notes" />
            </FormField>
            <div className="flex flex-col gap-3">
              <CheckboxField label="Send confirmation email" defaultChecked />
              <CheckboxField label="Mark as urgent" />
              <div className="flex items-center gap-2 text-base">
                <Checkbox aria-label="Disabled" disabled />
                Disabled
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <RadioGroup defaultValue="standard">
                <RadioField value="standard" label="Standard delivery" />
                <RadioField value="express" label="Express delivery" />
              </RadioGroup>
              <label className="inline-flex items-center gap-2 text-base">
                <Switch defaultChecked />
                Auto-reserve stock
              </label>
            </div>
            <FormField label="Discount range (%)">
              <Slider defaultValue={[10, 40]} min={0} max={100} />
            </FormField>
            <div className="flex flex-col gap-3 pt-6">
              <Progress value={64} />
              <Progress value={30} tone="warning" />
              <Progress value={null} tone="accent" />
            </div>
          </CardBody>
        </Card>
      </Section>

      <Section title="Badges and feedback">
        <Card>
          <CardBody className="flex flex-wrap items-center gap-3">
            <Badge>Draft</Badge>
            <Badge tone="accent" dot>In progress</Badge>
            <Badge tone="success" dot>Paid</Badge>
            <Badge tone="warning" dot>Pending</Badge>
            <Badge tone="danger" dot>Overdue</Badge>
            <Badge tone="info">Info</Badge>
            <Separator orientation="vertical" className="h-6" />
            <Avatar name="Harshit Mahajan" size="sm" />
            <Avatar name="Harshit Mahajan" />
            <Avatar name="Delhi HQ" size="lg" />
            <Separator orientation="vertical" className="h-6" />
            <Spinner />
            <Skeleton className="h-4 w-40" />
          </CardBody>
        </Card>
      </Section>

      <Section title="Tabs and accordion">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardBody>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTab value="overview">Overview</TabsTab>
                  <TabsTab value="items">Items</TabsTab>
                  <TabsTab value="history">History</TabsTab>
                </TabsList>
                <TabsPanel value="overview">Order summary goes here.</TabsPanel>
                <TabsPanel value="items">Line items go here.</TabsPanel>
                <TabsPanel value="history">Audit trail goes here.</TabsPanel>
              </Tabs>
            </CardBody>
          </Card>
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping" title="Shipping">
              Dispatch within 2 working days.
            </AccordionItem>
            <AccordionItem value="payment" title="Payment terms">
              Net 30 from invoice date.
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Overlays">
        <Card>
          <CardBody className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger render={<Button variant="secondary" />}>Open dialog</DialogTrigger>
              <DialogContent title="Delete order" description="SO-1042 will be removed. This cannot be undone.">
                <DialogFooter>
                  <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                  <Button variant="danger">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger render={<Button variant="secondary" />}>Filters</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Filter orders</PopoverTitle>
                <div className="mt-3 flex flex-col gap-3">
                  <Select options={statuses} placeholder="Status" />
                  <Button size="sm">Apply</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Menu>
              <MenuTrigger render={<Button variant="secondary" />}>Actions</MenuTrigger>
              <MenuContent>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Export PDF</MenuItem>
                <MenuSeparator />
                <MenuItem tone="danger">
                  <Trash2 className="size-4" />
                  Delete
                </MenuItem>
              </MenuContent>
            </Menu>

            <Tooltip content="Create a new order">
              <Button variant="ghost" size="icon" aria-label="New">
                <Plus className="size-4" />
              </Button>
            </Tooltip>
          </CardBody>
        </Card>
      </Section>

      <Section title="Card and empty state">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card with footer</CardTitle>
            </CardHeader>
            <CardBody className="text-fg-muted">Header, body and footer compose into one container.</CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
          <EmptyState title="No upcoming events" description="Scheduled deliveries will appear here." />
        </div>
      </Section>
    </Page>
  );
}
