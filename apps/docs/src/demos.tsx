import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  EmptyState,
  FormField,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioField,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  Tooltip,
} from "@harshitmahajan/ui";

export interface Demo {
  title: string;
  description: string;
  preview: ReactNode;
  usage: string;
}

const row = (children: ReactNode) => <div className="flex flex-wrap items-center gap-3">{children}</div>;
const statuses = [
  { value: "draft", label: "Draft" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
];

export const demos: Record<string, Demo> = {
  accordion: {
    title: "Accordion",
    description: "Stacked sections that expand one or several at a time.",
    preview: (
      <Accordion defaultValue={["shipping"]} className="w-full max-w-md">
        <AccordionItem value="shipping" title="Shipping">Dispatch within 2 working days.</AccordionItem>
        <AccordionItem value="payment" title="Payment terms">Net 30 from invoice date.</AccordionItem>
      </Accordion>
    ),
    usage: `<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping" title="Shipping">...</AccordionItem>
</Accordion>`,
  },
  "app-shell": {
    title: "App shell",
    description:
      "Sidebar + top bar + scrolling content. This site is rendered inside it. Includes SidebarSection, SidebarItem, Page, PageHeader and Section.",
    preview: <p className="text-base text-fg-muted">You are looking at it: the sidebar, top bar and page area of this site.</p>,
    usage: `<AppShell sidebar={<Nav />} topbar={<Button size="sm">New</Button>}>
  <Page>
    <PageHeader title="Orders" />
    <Section title="Recent">...</Section>
  </Page>
</AppShell>

// links: pass your router's Link
<SidebarItem render={<Link href="/orders" />} active={pathname === "/orders"} icon={<FileText />}>Orders</SidebarItem>`,
  },
  avatar: {
    title: "Avatar",
    description: "Image with an initials fallback.",
    preview: row(<><Avatar name="Harshit Mahajan" size="sm" /><Avatar name="Harshit Mahajan" /><Avatar name="Delhi HQ" size="lg" /></>),
    usage: `<Avatar name="Harshit Mahajan" src="/me.jpg" size="md" />`,
  },
  badge: {
    title: "Badge",
    description: "Status chip. The tone carries meaning: neutral=draft, accent=in progress, success=done, warning=needs attention, danger=failed.",
    preview: row(<><Badge>Draft</Badge><Badge tone="accent" dot>In progress</Badge><Badge tone="success" dot>Paid</Badge><Badge tone="warning" dot>Pending</Badge><Badge tone="danger" dot>Overdue</Badge><Badge tone="info">Info</Badge></>),
    usage: `<Badge tone="success" dot>Paid</Badge>`,
  },
  breadcrumb: {
    title: "Breadcrumb",
    description: "Trail of ancestors. The last item is the current page.",
    preview: <Breadcrumb items={[{ label: "Orders", href: "#" }, { label: "SO-1042" }]} />,
    usage: `<Breadcrumb items={[{ label: "Orders", render: <Link href="/orders" /> }, { label: "SO-1042" }]} />`,
  },
  button: {
    title: "Button",
    description: "Pill button. One primary per view. Hover shifts one step, press scales to 0.98, loading keeps the width.",
    preview: row(
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button loading>Saving</Button>
        <Button disabled>Disabled</Button>
      </>,
    ),
    usage: `<Button variant="secondary" size="sm" onClick={save}>Save</Button>
<Button loading>Saving</Button>
<Button size="icon" variant="ghost" aria-label="Add"><Plus className="size-4" /></Button>`,
  },
  card: {
    title: "Card",
    description: "The one container: large radius, hairline border. Compose header, body and footer. Stat is a big-number tile.",
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader><div><CardTitle>Card title</CardTitle><CardDescription>Supporting line</CardDescription></div></CardHeader>
        <CardBody className="text-fg-muted">Body content goes here.</CardBody>
        <CardFooter><Button variant="ghost" size="sm">Cancel</Button><Button size="sm">Save</Button></CardFooter>
      </Card>
    ),
    usage: `<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardBody>...</CardBody>
  <CardFooter><Button>Save</Button></CardFooter>
</Card>
<Card variant="dashed" />   // empty placeholder
<Stat label="Open orders" value="128" hint="12 new today" />`,
  },
  checkbox: {
    title: "Checkbox and Switch",
    description: "Checkbox for choices in a form, Switch for instant on/off settings.",
    preview: row(<><CheckboxField label="Send confirmation email" defaultChecked /><CheckboxField label="Mark as urgent" /><Checkbox aria-label="Disabled" disabled /><label className="inline-flex items-center gap-2"><Switch defaultChecked />Auto-reserve</label></>),
    usage: `<CheckboxField label="Mark as urgent" checked={v} onCheckedChange={setV} />
<Switch checked={on} onCheckedChange={setOn} />`,
  },
  dialog: {
    title: "Dialog",
    description: "Modal with a required title. Focus is trapped, Esc and backdrop click close it.",
    preview: (
      <Dialog>
        <DialogTrigger render={<Button variant="secondary" />}>Open dialog</DialogTrigger>
        <DialogContent title="Delete order" description="SO-1042 will be removed. This cannot be undone.">
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button variant="danger">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    usage: `<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogContent title="Delete order" description="This cannot be undone.">
    <DialogFooter>...</DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  "empty-state": {
    title: "Empty state",
    description: "Dashed border, centered icon and one line of text. Every list or panel that can be empty must render one.",
    preview: <EmptyState icon={<Plus />} title="No orders yet" description="Create your first order to see it here." action={<Button size="sm">New order</Button>} className="w-full max-w-md" />,
    usage: `<EmptyState icon={<Inbox />} title="Nothing to approve" description="New requests show up here." />`,
  },
  "form-field": {
    title: "Form field",
    description: "Label, control, hint and error wired together for accessibility. Wrap every input in it.",
    preview: (
      <div className="grid w-full max-w-md gap-4">
        <FormField label="Customer" required description="Legal name as on the invoice"><Input placeholder="Aarav Textiles" /></FormField>
        <FormField label="Order number" error="This number is already used"><Input defaultValue="SO-1042" /></FormField>
      </div>
    ),
    usage: `<FormField label="Customer" required error={errors.customer}>
  <Input name="customer" />
</FormField>`,
  },
  input: {
    title: "Input and Textarea",
    description: "Text fields. Hover darkens the border, focus shows an accent ring, invalid shows a danger border.",
    preview: (
      <div className="grid w-full max-w-md gap-3">
        <Input placeholder="Text input" />
        <Input disabled placeholder="Disabled" />
        <Textarea placeholder="Textarea" />
      </div>
    ),
    usage: `<Input type="email" placeholder="name@company.com" />
<Textarea rows={4} />`,
  },
  menu: {
    title: "Menu",
    description: "Dropdown of actions with keyboard navigation and type-ahead.",
    preview: (
      <Menu>
        <MenuTrigger render={<Button variant="secondary" />}>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem>Duplicate</MenuItem>
          <MenuItem>Export PDF</MenuItem>
          <MenuSeparator />
          <MenuItem tone="danger"><Trash2 className="size-4" />Delete</MenuItem>
        </MenuContent>
      </Menu>
    ),
    usage: `<Menu>
  <MenuTrigger render={<Button variant="secondary" />}>Actions</MenuTrigger>
  <MenuContent>
    <MenuItem onClick={duplicate}>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem tone="danger">Delete</MenuItem>
  </MenuContent>
</Menu>`,
  },
  popover: {
    title: "Popover",
    description: "Floating panel anchored to a trigger. Use for filters and small forms; use Menu for plain action lists.",
    preview: (
      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>Filters</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Filter orders</PopoverTitle>
          <div className="mt-3 flex flex-col gap-3"><Select options={statuses} placeholder="Status" /><Button size="sm">Apply</Button></div>
        </PopoverContent>
      </Popover>
    ),
    usage: `<Popover>
  <PopoverTrigger render={<Button />}>Filters</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`,
  },
  progress: {
    title: "Progress",
    description: "Linear progress. Pass value={null} for indeterminate.",
    preview: <div className="flex w-full max-w-md flex-col gap-3"><Progress value={64} /><Progress value={30} tone="warning" /><Progress value={null} tone="accent" /></div>,
    usage: `<Progress value={64} tone="success" />`,
  },
  radio: {
    title: "Radio group",
    description: "Pick exactly one option.",
    preview: (
      <RadioGroup defaultValue="standard">
        <RadioField value="standard" label="Standard delivery" />
        <RadioField value="express" label="Express delivery" />
      </RadioGroup>
    ),
    usage: `<RadioGroup value={v} onValueChange={setV}>
  <RadioField value="standard" label="Standard" />
  <RadioField value="express" label="Express" />
</RadioGroup>`,
  },
  select: {
    title: "Select",
    description: "Dropdown picker. Looks and focuses like Input; arrows, type-ahead and Enter work.",
    preview: <div className="w-full max-w-xs"><Select options={statuses} defaultValue="draft" /></div>,
    usage: `<Select options={[{ value: "draft", label: "Draft" }]} value={v} onValueChange={setV} />`,
  },
  separator: {
    title: "Separator",
    description: "Hairline divider, horizontal or vertical.",
    preview: row(<><span>Orders</span><Separator orientation="vertical" className="h-5" /><span>Invoices</span><Separator orientation="vertical" className="h-5" /><span>Returns</span></>),
    usage: `<Separator />
<Separator orientation="vertical" className="h-5" />`,
  },
  skeleton: {
    title: "Skeleton",
    description: "Loading placeholder for content. Size it with layout classes.",
    preview: <div className="flex w-full max-w-sm flex-col gap-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-1/2" /></div>,
    usage: `<Skeleton className="h-4 w-40" />`,
  },
  slider: {
    title: "Slider",
    description: "One thumb for a value, two for a range (pass an array).",
    preview: <div className="w-full max-w-sm"><Slider defaultValue={[10, 40]} min={0} max={100} /></div>,
    usage: `<Slider defaultValue={[10, 40]} min={0} max={100} onValueChange={setRange} />`,
  },
  spinner: {
    title: "Spinner",
    description: "Inline loading indicator for actions. For content loading use Skeleton.",
    preview: row(<><Spinner /><Spinner className="size-6" /></>),
    usage: `<Spinner />`,
  },
  table: {
    title: "Table",
    description: "Static table. Row height follows density; header is a quiet band. Sorting, filtering and pagination come with the upcoming DataTable.",
    preview: (
      <div className="w-full">
        <Table>
          <TableHead><TableRow><TableHeaderCell>Order</TableHeaderCell><TableHeaderCell align="right">Total</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell></TableRow></TableHead>
          <TableBody>
            <TableRow><TableCell className="font-medium">SO-1042</TableCell><TableCell align="right">₹1,24,500</TableCell><TableCell><Badge tone="success" dot>Paid</Badge></TableCell></TableRow>
            <TableRow><TableCell className="font-medium">SO-1043</TableCell><TableCell align="right">₹48,200</TableCell><TableCell><Badge tone="warning" dot>Pending</Badge></TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    ),
    usage: `<Table>
  <TableHead><TableRow><TableHeaderCell>Order</TableHeaderCell></TableRow></TableHead>
  <TableBody><TableRow><TableCell>SO-1042</TableCell></TableRow></TableBody>
</Table>`,
  },
  tabs: {
    title: "Tabs",
    description: "Underline tabs with a sliding indicator and arrow-key navigation.",
    preview: (
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList><TabsTab value="overview">Overview</TabsTab><TabsTab value="items">Items</TabsTab><TabsTab value="history">History</TabsTab></TabsList>
        <TabsPanel value="overview">Order summary.</TabsPanel>
        <TabsPanel value="items">Line items.</TabsPanel>
        <TabsPanel value="history">Audit trail.</TabsPanel>
      </Tabs>
    ),
    usage: `<Tabs defaultValue="overview">
  <TabsList><TabsTab value="overview">Overview</TabsTab></TabsList>
  <TabsPanel value="overview">...</TabsPanel>
</Tabs>`,
  },
  tooltip: {
    title: "Tooltip",
    description: "Short hint for icon-only buttons. Needs <TooltipProvider> once at the root.",
    preview: <Tooltip content="Create a new order"><Button variant="ghost" size="icon" aria-label="New"><Plus className="size-4" /></Button></Tooltip>,
    usage: `<Tooltip content="Create a new order">
  <Button size="icon" variant="ghost" aria-label="New"><Plus className="size-4" /></Button>
</Tooltip>`,
  },
};
