import { Activity, BadgeCheck, CircleDot, MousePointerClick, PanelLeft, PanelLeftDashed, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { ButtonAsLink } from "@/registry/examples/button-as-link";
import { Component as ButtonDemo } from "@/registry/examples/button-demo";
import { ButtonDisabled } from "@/registry/examples/button-disabled";
import { ButtonLoading } from "@/registry/examples/button-loading";
import { ButtonSizes } from "@/registry/examples/button-sizes";
import { ButtonVariants } from "@/registry/examples/button-variants";
import { ButtonWithIcon } from "@/registry/examples/button-with-icon";
import { Sidebar1Demo } from "@/registry/examples/sidebar-1-demo";
import { Sidebar1Links } from "@/registry/examples/sidebar-1-links";
import { Sidebar1Nested } from "@/registry/examples/sidebar-1-nested";
import { Sidebar1Rail } from "@/registry/examples/sidebar-1-rail";
import { Sidebar2Demo } from "@/registry/examples/sidebar-2-demo";
import { Sidebar2Initials } from "@/registry/examples/sidebar-2-initials";
import { Sidebar2Navigation } from "@/registry/examples/sidebar-2-navigation";
import { StatusBadge1Demo } from "@/registry/examples/status-badge-1-demo";
import { StatusBadge1LabelOnly } from "@/registry/examples/status-badge-1-label-only";
import { StatusBadge1Link } from "@/registry/examples/status-badge-1-link";
import { StatusBadge1Sizes } from "@/registry/examples/status-badge-1-sizes";
import { StatusBadge1Still } from "@/registry/examples/status-badge-1-still";
import { StatusBadge2Demo } from "@/registry/examples/status-badge-2-demo";
import { StatusBadge2Single } from "@/registry/examples/status-badge-2-single";
import { StatusBadge2Sizes } from "@/registry/examples/status-badge-2-sizes";
import { SystemStatusAllClear } from "@/registry/examples/system-status-all-clear";
import { SystemStatusCollapsed } from "@/registry/examples/system-status-collapsed";
import { SystemStatusDemo } from "@/registry/examples/system-status-demo";
import { SystemStatusLongHistory } from "@/registry/examples/system-status-long-history";

export interface Example {
  /** The example's file name in registry/examples. */
  name: string;
  title: string;
  description?: string;
  Preview: ComponentType;
  /** Fills the stage edge to edge, for layouts like sidebars. */
  flush?: boolean;
}

export interface ApiProp {
  name: string;
  type: string;
  fallback?: string;
  description: string;
}

export interface ApiPart {
  part: string;
  description: string;
  props?: ApiProp[];
}

export interface ComponentDoc {
  title: string;
  group: "Components" | "Blocks";
  icon: LucideIcon;
  description: string;
  /** Shown first on the page and in the gallery. */
  hero: Example;
  /** Shrinks the gallery preview, for components too big for a tile. */
  scaleInGallery?: boolean;
  /** Longer introduction under the preview. */
  intro: string;
  imports: string;
  usage: string;
  composition: string;
  features: string[];
  examples: Example[];
  accessibility: { title: string; body: string; code?: string }[];
  api: ApiPart[];
}

const classNameProp = (what: string): ApiProp => ({ name: "className", type: "string", description: `Additional classes for the ${what}.` });
const renderProp = (what: string): ApiProp => ({
  name: "render",
  type: "ReactElement | function",
  description: `Render ${what} as another element, such as a link or your router's Link.`,
});

/** Add a component here and its sidebar item, gallery tile and page appear on their own. */
export const docs: Record<string, ComponentDoc> = {
  button: {
    title: "Button",
    group: "Components",
    icon: MousePointerClick,
    description: "Starts an action. Six styles, four sizes, and it can render as a link.",
    hero: { name: "button-demo", title: "Animated menu button", Preview: ButtonDemo },
    intro:
      "Built on Base UI Button. It handles keyboard focus and disabled behavior for you, and it can take the form of a link without losing its styles.",
    imports: `import { Button } from "@/components/kit/button"`,
    usage: `<Button variant="outline">Export</Button>`,
    composition: `Button`,
    features: [
      "Six styles: default, secondary, outline, ghost, link and destructive",
      "Four sizes, including a square one for icons",
      "A focus ring that appears for keyboard users only",
      "Renders as a link or your router's Link through the render prop",
      "Exported ButtonProps, ButtonVariant and ButtonSize types",
    ],
    examples: [
      { name: "button-variants", title: "Styles", description: "Set variant to change how much attention the button draws.", Preview: ButtonVariants },
      { name: "button-sizes", title: "Sizes", description: "Use size for the height and padding. An icon button also needs an aria-label.", Preview: ButtonSizes },
      { name: "button-with-icon", title: "With an icon", description: "Place an icon before or after the text. Icons never shrink and never catch clicks.", Preview: ButtonWithIcon },
      { name: "button-loading", title: "Loading", description: "Disable the button and show a spinning icon while work is in progress.", Preview: ButtonLoading },
      { name: "button-disabled", title: "Disabled", description: "Disabled buttons drop to half opacity and ignore the pointer.", Preview: ButtonDisabled },
      { name: "button-as-link", title: "As a link", description: "Pass render with nativeButton={false} to get a real link with button styles.", Preview: ButtonAsLink },
    ],
    accessibility: [
      {
        title: "Label icon-only buttons",
        body: "A button with only an icon has no text to announce, so give it an aria-label that says what it does.",
        code: `<Button size="icon" aria-label="Add item">\n  <Plus aria-hidden="true" />\n</Button>`,
      },
      {
        title: "Use a link for navigation",
        body: "If clicking takes people to another page, render a link so they can open it in a new tab and screen readers announce it correctly.",
      },
    ],
    api: [
      {
        part: "Button",
        description: "Accepts everything Base UI Button accepts.",
        props: [
          { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "link" | "destructive"', fallback: '"default"', description: "The visual style." },
          { name: "size", type: '"default" | "sm" | "lg" | "icon"', fallback: '"default"', description: "The height and padding." },
          renderProp("the button"),
          { name: "nativeButton", type: "boolean", fallback: "true", description: "Set to false when render is not a button element." },
          { name: "disabled", type: "boolean", fallback: "false", description: "Stops the button from being used." },
          { name: "focusableWhenDisabled", type: "boolean", fallback: "false", description: "Keeps a disabled button reachable by keyboard, such as while it loads." },
          classNameProp("button"),
        ],
      },
    ],
  },
  "status-badge-1": {
    title: "Status badge 1",
    group: "Components",
    icon: CircleDot,
    description: "Shows a state with a colored label and a pulsing dot.",
    hero: { name: "status-badge-1-demo", title: "All states", Preview: StatusBadge1Demo },
    scaleInGallery: true,
    intro: "Use it for anything with a state, such as a service, a person or a job. Each part is separate, so you can leave out the dot or stop it from pulsing.",
    imports: `import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1"`,
    usage: `<Status variant="success">\n  <StatusIndicator />\n  <StatusLabel>Online</StatusLabel>\n</Status>`,
    composition: `Status\n├── StatusIndicator\n└── StatusLabel`,
    features: [
      "Five states: default, success, error, warning and info",
      "Three sizes",
      "A pulsing dot for live states, or a still one for settled states",
      "Colors come from the success, danger, warning and info tokens",
      "Renders as a link through the render prop",
    ],
    examples: [
      { name: "status-badge-1-sizes", title: "Sizes", description: "Use size to fit a dense table or a page header.", Preview: StatusBadge1Sizes },
      { name: "status-badge-1-still", title: "Still dot", description: "Set pulse={false} for states that aren't live, such as an invoice status.", Preview: StatusBadge1Still },
      { name: "status-badge-1-label-only", title: "Label only", description: "Leave out StatusIndicator for a plain tag.", Preview: StatusBadge1LabelOnly },
      { name: "status-badge-1-link", title: "As a link", description: "Pass render to make the badge open the page behind the state.", Preview: StatusBadge1Link },
    ],
    accessibility: [
      {
        title: "Meaning beyond color",
        body: "Always keep a StatusLabel. The dot's color alone doesn't tell everyone what the state is.",
      },
      {
        title: "Reduced motion",
        body: "The pulse stops for people who ask their device to reduce motion. The dot stays visible.",
      },
    ],
    api: [
      {
        part: "Status",
        description: "The badge itself.",
        props: [
          { name: "variant", type: '"default" | "success" | "error" | "warning" | "info"', fallback: '"default"', description: "The state to show." },
          { name: "size", type: '"default" | "sm" | "lg"', fallback: '"default"', description: "The badge size." },
          renderProp("the badge"),
          classNameProp("badge"),
        ],
      },
      {
        part: "StatusIndicator",
        description: "The dot. It takes its color from the Status variant.",
        props: [
          { name: "pulse", type: "boolean", fallback: "true", description: "Whether the ring pulses outward." },
          classNameProp("dot"),
        ],
      },
      { part: "StatusLabel", description: "The text.", props: [classNameProp("label")] },
    ],
  },
  "status-badge-2": {
    title: "Status badge 2",
    group: "Components",
    icon: BadgeCheck,
    description: "Puts a main state next to a quieter second one, split by a line.",
    hero: { name: "status-badge-2-demo", title: "Paired states", Preview: StatusBadge2Demo },
    intro: "Use it when two facts belong together, such as what's on and what isn't. You choose each icon and its color.",
    imports: `import { StatusBadge2, StatusBadge2Primary, StatusBadge2Secondary } from "@/components/kit/status-badge-2"`,
    usage: `<StatusBadge2>\n  <StatusBadge2Primary>\n    <ShieldCheck className="text-success" aria-hidden="true" />\n    Protection\n  </StatusBadge2Primary>\n  <StatusBadge2Secondary>\n    <CircleX aria-hidden="true" />\n    SSO login\n  </StatusBadge2Secondary>\n</StatusBadge2>`,
    composition: `StatusBadge2\n├── StatusBadge2Primary\n└── StatusBadge2Secondary`,
    features: [
      "A strong main state and a muted second one",
      "Two sizes, with icons sized for you",
      "Works with one state or two",
      "Icon colors come from tokens you choose",
    ],
    examples: [
      { name: "status-badge-2-sizes", title: "Sizes", description: "Use size to change the height, text and icons together.", Preview: StatusBadge2Sizes },
      { name: "status-badge-2-single", title: "One state", description: "Leave out StatusBadge2Secondary to show just the main state.", Preview: StatusBadge2Single },
    ],
    accessibility: [
      {
        title: "Hide decorative icons",
        body: "The text already says the state, so mark icons with aria-hidden to avoid announcing them twice.",
      },
    ],
    api: [
      {
        part: "StatusBadge2",
        description: "The outer frame.",
        props: [
          { name: "size", type: '"default" | "sm"', fallback: '"default"', description: "The badge size." },
          classNameProp("frame"),
        ],
      },
      { part: "StatusBadge2Primary", description: "The main state: an icon and its text.", props: [classNameProp("main state")] },
      { part: "StatusBadge2Secondary", description: "The second state, muted and after the divider.", props: [classNameProp("second state")] },
    ],
  },
  "system-status": {
    title: "System status",
    group: "Blocks",
    icon: Activity,
    description: "Shows each service's state, its recent history and past incidents.",
    hero: { name: "system-status-demo", title: "Four services", Preview: SystemStatusDemo },
    scaleInGallery: true,
    intro: "Pass your services and incidents as data, and it draws the rest. TypeScript checks the shape of that data, so a misspelled state is caught before it ships.",
    imports: `import { SystemStatus } from "@/components/kit/system-status"`,
    usage: `<SystemStatus\n  services={[\n    { name: "API", state: "operational", lastIncident: "2024-05-01", history: [true, true, false, true] },\n  ]}\n  incidents={[\n    { service: "API", date: "2024-05-01", summary: "Minor outage. Resolved in 30m." },\n  ]}\n/>`,
    composition: `SystemStatus`,
    features: [
      "Three states: operational, degraded and down",
      "One bar per day, for any number of days",
      "Incident history that collapses with Base UI Collapsible",
      "Exported SystemStatusProps, SystemStatusService and SystemStatusIncident types",
    ],
    examples: [
      { name: "system-status-collapsed", title: "Starts hidden", description: "Set defaultOpen={false} to keep the incident history closed until someone asks for it.", Preview: SystemStatusCollapsed },
      { name: "system-status-all-clear", title: "No incidents", description: "Leave out incidents, and the history and its Hide button don't appear.", Preview: SystemStatusAllClear },
      { name: "system-status-long-history", title: "Longer history", description: "Pass as many days as you like. The bars narrow to fit.", Preview: SystemStatusLongHistory },
    ],
    accessibility: [
      {
        title: "History as a summary",
        body: "Each row of bars is announced as one sentence, such as: API, up 29 of the last 30 days.",
      },
      {
        title: "Hidden means hidden",
        body: "While collapsed, the incident list can't be reached by keyboard or screen readers.",
      },
    ],
    api: [
      {
        part: "SystemStatus",
        description: "The whole block.",
        props: [
          { name: "services", type: "SystemStatusService[]", description: "The services to list." },
          { name: "incidents", type: "SystemStatusIncident[]", fallback: "[]", description: "Past incidents, in the order you pass them." },
          { name: "defaultOpen", type: "boolean", fallback: "true", description: "Whether the incident history starts open." },
          { name: "title", type: "string", fallback: '"System Status"', description: "The heading." },
          classNameProp("block"),
        ],
      },
      {
        part: "SystemStatusService",
        description: "One entry in services.",
        props: [
          { name: "name", type: "string", description: "The service's name." },
          { name: "state", type: '"operational" | "degraded" | "down"', description: "The current state." },
          { name: "lastIncident", type: "string", description: "A date shown on the right." },
          { name: "history", type: "boolean[]", description: "One entry per day, oldest first. true means it was up." },
        ],
      },
      {
        part: "SystemStatusIncident",
        description: "One entry in incidents.",
        props: [
          { name: "service", type: "string", description: "The affected service." },
          { name: "date", type: "string", description: "When it happened." },
          { name: "summary", type: "string", description: "What happened." },
        ],
      },
    ],
  },
  "sidebar-1": {
    title: "Sidebar 1",
    group: "Blocks",
    icon: PanelLeft,
    description: "App navigation with groups, nested items and a collapsed icon rail. This website uses it.",
    hero: { name: "sidebar-1-demo", title: "Full app layout", Preview: Sidebar1Demo, flush: true },
    scaleInGallery: true,
    intro: "Build your navigation from small parts. You hold the collapsed state, so you can save it or change it from anywhere.",
    imports: `import {\n  Sidebar1,\n  Sidebar1Brand,\n  Sidebar1Collapsible,\n  Sidebar1Content,\n  Sidebar1Footer,\n  Sidebar1Group,\n  Sidebar1Header,\n  Sidebar1Item,\n  Sidebar1Search,\n  Sidebar1Toggle,\n} from "@/components/kit/sidebar-1"`,
    usage: `<Sidebar1 collapsed={collapsed}>\n  <Sidebar1Header>\n    <Sidebar1Brand logo="A" title="Acme Corp" subtitle="Pro Plan" />\n  </Sidebar1Header>\n  <Sidebar1Content aria-label="Main">\n    <Sidebar1Search />\n    <Sidebar1Item icon={<LayoutGrid />} active>Home</Sidebar1Item>\n    <Sidebar1Group label="Workspace">\n      <Sidebar1Collapsible icon={<Users />} label="Team">\n        <Sidebar1Item>Members</Sidebar1Item>\n      </Sidebar1Collapsible>\n    </Sidebar1Group>\n  </Sidebar1Content>\n  <Sidebar1Footer>\n    <Sidebar1Item icon={<Settings />}>Settings</Sidebar1Item>\n  </Sidebar1Footer>\n</Sidebar1>`,
    composition: `Sidebar1\n├── Sidebar1Header\n│   └── Sidebar1Brand\n├── Sidebar1Content\n│   ├── Sidebar1Search\n│   ├── Sidebar1Item\n│   └── Sidebar1Group\n│       ├── Sidebar1Item\n│       └── Sidebar1Collapsible\n│           └── Sidebar1Item\n└── Sidebar1Footer\n    └── Sidebar1Item\n\nSidebar1Toggle (usually in your page header)`,
    features: [
      "Collapses to a 60px icon rail over 200ms",
      "Groups, nested rows and count badges",
      "Items render as buttons or as links through the render prop",
      "Nested rows use Base UI Collapsible, and search uses Base UI Input",
    ],
    examples: [
      { name: "sidebar-1-rail", title: "Icon rail", description: "Set collapsed to show only icons. Give each item an aria-label, since its text is out of view.", Preview: Sidebar1Rail, flush: true },
      { name: "sidebar-1-nested", title: "Nested items", description: "Use Sidebar1Collapsible for sections with sub-items, and defaultOpen to start one open.", Preview: Sidebar1Nested, flush: true },
      { name: "sidebar-1-links", title: "With links", description: "Pass render to make items real links. In Next.js, pass your Link component.", Preview: Sidebar1Links, flush: true },
    ],
    accessibility: [
      {
        title: "Name the navigation",
        body: "Sidebar1Content renders a nav element. Give it an aria-label so people can tell navigation areas apart.",
      },
      {
        title: "The current page",
        body: "Set active on the current item. It's marked with aria-current, so screen readers announce it too.",
      },
    ],
    api: [
      {
        part: "Sidebar1",
        description: "The frame.",
        props: [
          { name: "collapsed", type: "boolean", fallback: "false", description: "Switches to the icon rail." },
          classNameProp("frame"),
        ],
      },
      {
        part: "Sidebar1Toggle",
        description: "The collapse button. Accepts all Button props.",
        props: [{ name: "collapsed", type: "boolean", description: "The current state, which sets its icon and label." }],
      },
      {
        part: "Sidebar1Brand",
        description: "Your logo and name.",
        props: [
          { name: "logo", type: "ReactNode", description: "A letter or an image." },
          { name: "title", type: "string", description: "The name." },
          { name: "subtitle", type: "string", description: "A line under the name." },
          { name: "onClick", type: "() => void", description: "Makes it a button with a chevron, such as a workspace switcher." },
        ],
      },
      {
        part: "Sidebar1Item",
        description: "One row.",
        props: [
          { name: "icon", type: "ReactNode", description: "The row's icon." },
          { name: "active", type: "boolean", fallback: "false", description: "Marks the current page." },
          { name: "badge", type: "ReactNode", description: "A short count on the right. Hidden on the rail." },
          renderProp("the row"),
        ],
      },
      {
        part: "Sidebar1Collapsible",
        description: "A row that opens to show sub-items. It closes on the rail.",
        props: [
          { name: "label", type: "string", description: "The row's text." },
          { name: "icon", type: "ReactNode", description: "The row's icon." },
          { name: "defaultOpen", type: "boolean", fallback: "false", description: "Whether it starts open." },
        ],
      },
      {
        part: "Sidebar1Group",
        description: "A labeled set of rows.",
        props: [{ name: "label", type: "string", description: "The group's name. It fades on the rail." }],
      },
      { part: "Sidebar1Search", description: "A filter field styled as a row. Accepts all Base UI Input props." },
      { part: "Sidebar1Header", description: "The top area." },
      { part: "Sidebar1Content", description: "The scrolling middle. Renders a nav element." },
      { part: "Sidebar1Footer", description: "The bottom area, above a line." },
    ],
  },
  "sidebar-2": {
    title: "Sidebar 2",
    group: "Blocks",
    icon: PanelLeftDashed,
    description: "Simple navigation with your team below it and the signed-in person at the bottom.",
    hero: { name: "sidebar-2-demo", title: "With a team list", Preview: Sidebar2Demo, flush: true },
    scaleInGallery: true,
    intro: "A simpler sidebar for smaller apps. It has no collapse or nesting, and it adds people to the navigation.",
    imports: `import {\n  Sidebar2,\n  Sidebar2Brand,\n  Sidebar2Item,\n  Sidebar2Person,\n  Sidebar2Section,\n  Sidebar2User,\n} from "@/components/kit/sidebar-2"`,
    usage: `<Sidebar2 aria-label="Main">\n  <Sidebar2Brand logo={<ShoppingCart aria-hidden="true" />} title="Acme Store" />\n  <Sidebar2Item icon={<House />} active>Dashboard</Sidebar2Item>\n  <Sidebar2Section label="Your team">\n    <Sidebar2Person name="Sarah Kim" role="Design" online />\n  </Sidebar2Section>\n  <Sidebar2User name="Jordan Diaz" email="jordan@example.com" />\n</Sidebar2>`,
    composition: `Sidebar2\n├── Sidebar2Brand\n├── Sidebar2Item\n├── Sidebar2Section\n│   └── Sidebar2Person\n└── Sidebar2User`,
    features: [
      "Pictures with a green online dot",
      "The person's first letter when there's no picture",
      "The signed-in person stays pinned to the bottom",
      "Items render as buttons or as links through the render prop",
    ],
    examples: [
      { name: "sidebar-2-navigation", title: "Navigation only", description: "Leave out the team section for plain navigation.", Preview: Sidebar2Navigation, flush: true },
      { name: "sidebar-2-initials", title: "Without pictures", description: "Leave out avatar to show the person's first letter instead.", Preview: Sidebar2Initials, flush: true },
    ],
    accessibility: [
      {
        title: "Online state",
        body: "The green dot includes hidden text saying Online, so the state isn't conveyed by color alone.",
      },
    ],
    api: [
      { part: "Sidebar2", description: "The frame. Renders an aside element.", props: [classNameProp("frame")] },
      {
        part: "Sidebar2Brand",
        description: "Your logo and name.",
        props: [
          { name: "logo", type: "ReactNode", description: "An icon or a letter." },
          { name: "title", type: "string", description: "The name." },
        ],
      },
      {
        part: "Sidebar2Item",
        description: "One row.",
        props: [
          { name: "icon", type: "ReactNode", description: "The row's icon." },
          { name: "active", type: "boolean", fallback: "false", description: "Marks the current page." },
          renderProp("the row"),
        ],
      },
      { part: "Sidebar2Section", description: "A labeled set of rows.", props: [{ name: "label", type: "string", description: "The section's name." }] },
      {
        part: "Sidebar2Person",
        description: "A teammate.",
        props: [
          { name: "name", type: "string", description: "Their name." },
          { name: "role", type: "string", description: "Shown on the right." },
          { name: "avatar", type: "string", description: "The picture's URL." },
          { name: "online", type: "boolean", fallback: "false", description: "Shows the green dot." },
        ],
      },
      {
        part: "Sidebar2User",
        description: "The signed-in person, pinned to the bottom.",
        props: [
          { name: "name", type: "string", description: "Their name." },
          { name: "email", type: "string", description: "A line under the name." },
          { name: "avatar", type: "string", description: "The picture's URL." },
        ],
      },
    ],
  },
};
