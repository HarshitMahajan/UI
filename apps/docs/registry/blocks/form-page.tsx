import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CheckboxField,
  FormField,
  Input,
  Page,
  PageHeader,
  Section,
  Select,
  Textarea,
} from "@1126labs/ui";

const terms = [
  { value: "net15", label: "Net 15" },
  { value: "net30", label: "Net 30" },
  { value: "net60", label: "Net 60" },
];

/**
 * FORM PAGE: sectioned form in cards, two-column grid, sticky-style footer
 * actions. Every input sits in a FormField. Pass `error` to show validation.
 */
export function FormPage() {
  return (
    <Page>
      <PageHeader title="New customer" description="Create a customer record." />

      <Section>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Basic details</CardTitle>
              <CardDescription>Shown on invoices and delivery notes.</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="grid grid-cols-2 gap-5">
            <FormField label="Company name" required>
              <Input placeholder="Aarav Textiles Pvt. Ltd." />
            </FormField>
            <FormField label="GSTIN" description="15-character GST number">
              <Input placeholder="07AAAAA0000A1Z5" />
            </FormField>
            <FormField label="Payment terms">
              <Select options={terms} defaultValue="net30" />
            </FormField>
            <FormField label="Contact email" required>
              <Input type="email" placeholder="accounts@example.com" />
            </FormField>
            <FormField label="Billing address" className="col-span-2">
              <Textarea placeholder="Street, city, state, PIN" />
            </FormField>
            <CheckboxField label="Shipping address is the same as billing" defaultChecked className="col-span-2" />
          </CardBody>
          <CardFooter>
            <Button variant="ghost">Cancel</Button>
            <Button>Save customer</Button>
          </CardFooter>
        </Card>
      </Section>
    </Page>
  );
}
