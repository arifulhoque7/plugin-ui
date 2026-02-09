import type { Meta, StoryObj } from "@storybook/react";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Home,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "./button";
import {
  Layout,
  LayoutBody,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutMenu,
  LayoutSidebar,
  type LayoutMenuGroupData,
  type LayoutMenuItemData,
} from "./index";

const menuDataStructureCode = `// Menu item (supports nested children)
interface LayoutMenuItemData {
  id: string;
  label: string;
  secondaryLabel?: string;   // Optional second line
  href?: string;             // Link URL (use <a>)
  onClick?: () => void;      // Click handler for leaf items
  children?: LayoutMenuItemData[];  // Nested submenu
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

// Group (section with label + items)
interface LayoutMenuGroupData {
  id: string;
  label: string;
  secondaryLabel?: string;
  items: LayoutMenuItemData[];
  className?: string;
}

// Usage: pass items (flat) or groups (sections)
<LayoutMenu
  groups={groups}
  searchable
  onItemClick={(item) => console.log('Clicked', item.id)}
/>`;

const meta = {
  title: "UI/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Responsive app layout with optional header, footer, and left/right sidebar. " +
          "Sidebar can contain a searchable, multi-label nested menu. " +
          "See the **Menu data structure** story for `LayoutMenuItemData` and `LayoutMenuGroupData` types.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleNestedItems: LayoutMenuItemData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    secondaryLabel: "Overview",
    icon: <Home className="size-4" />,
    onClick: () => {},
  },
  {
    id: "reports",
    label: "Reports",
    secondaryLabel: "Analytics & exports",
    icon: <BarChart3 className="size-4" />,
    children: [
      {
        id: "sales",
        label: "Sales",
        secondaryLabel: "By period",
        icon: <FileText className="size-4" />,
        onClick: () => {},
      },
      {
        id: "products",
        label: "Products",
        secondaryLabel: "Inventory",
        icon: <Package className="size-4" />,
        children: [
          {
            id: "categories",
            label: "Categories",
            icon: <FolderOpen className="size-4" />,
            onClick: () => {},
          },
        ],
      },
    ],
  },
  {
    id: "users",
    label: "Users",
    secondaryLabel: "Manage accounts",
    icon: <Users className="size-4" />,
    onClick: () => {},
  },
  {
    id: "settings",
    label: "Settings",
    secondaryLabel: "App configuration",
    icon: <Settings className="size-4" />,
    onClick: () => {},
  },
];

const sampleGroups: LayoutMenuGroupData[] = [
  {
    id: "main",
    label: "Main",
    secondaryLabel: "Primary navigation",
    items: sampleNestedItems,
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      {
        id: "import",
        label: "Import",
        secondaryLabel: "Bulk import data",
        onClick: () => {},
      },
      {
        id: "export",
        label: "Export",
        secondaryLabel: "Download reports",
        onClick: () => {},
      },
    ],
  },
];

export const FullLayout: Story = {
  render: () => {
    const sampleNestedItems: LayoutMenuItemData[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        secondaryLabel: "Overview",
        icon: <Home className="size-4" />,
        onClick: () => {},
      },
      {
        id: "reports",
        label: "Reports",
        secondaryLabel: "Analytics & exports",
        icon: <BarChart3 className="size-4" />,
        children: [
          {
            id: "sales",
            label: "Sales",
            secondaryLabel: "By period",
            icon: <FileText className="size-4" />,
            onClick: () => {},
          },
          {
            id: "products",
            label: "Products",
            secondaryLabel: "Inventory",
            icon: <Package className="size-4" />,
            children: [
              {
                id: "categories",
                label: "Categories",
                icon: <FolderOpen className="size-4" />,
                onClick: () => {},
              },
            ],
          },
        ],
      },
      {
        id: "users",
        label: "Users",
        secondaryLabel: "Manage accounts",
        icon: <Users className="size-4" />,
        onClick: () => {},
      },
      {
        id: "settings",
        label: "Settings",
        secondaryLabel: "App configuration",
        icon: <Settings className="size-4" />,
        onClick: () => {},
      },
    ];

    const sampleGroups: LayoutMenuGroupData[] = [
      {
        id: "main",
        label: "Main",
        secondaryLabel: "Primary navigation",
        items: sampleNestedItems,
      },
      {
        id: "tools",
        label: "Tools",
        items: [
          {
            id: "import",
            label: "Import",
            secondaryLabel: "Bulk import data",
            onClick: () => {},
          },
          {
            id: "export",
            label: "Export",
            secondaryLabel: "Download reports",
            onClick: () => {},
          },
        ],
      },
    ];
    return (
      <Layout className="bg-background" sidebarPosition="right">
        <LayoutHeader className="gap-4">
          <span className="font-semibold">App Title</span>
          <Button variant="outline" size="sm">
            Sign out
          </Button>
        </LayoutHeader>
        <LayoutBody>
          <LayoutMain>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Main content</h1>
              <p className="text-muted-foreground">
                This is the main content area. The menu bar is on the right and
                is searchable with multi-label nested items. Resize the window
                to see the responsive behavior: on small screens the sidebar
                becomes a drawer.
              </p>
            </div>
          </LayoutMain>
          <LayoutSidebar className="w-64 lg:w-72">
            <LayoutMenu
              groups={sampleGroups}
              searchable
              searchPlaceholder="Search menu…"
              onItemClick={(item) => {
                // Callback: parent items expand on click; leaf items run item.onClick
                console.log("Menu item clicked:", item.id, item.label);
              }}
            />
          </LayoutSidebar>
        </LayoutBody>
        <LayoutFooter>
          <span className="text-muted-foreground text-sm">
            © 2025 Example. Footer is optional (nullable).
          </span>
        </LayoutFooter>
      </Layout>
    );
  },
};

export const LeftSidebar: Story = {
  render: () => (
    <Layout className="bg-background" sidebarPosition="left">
      <LayoutHeader className="gap-4">
        <span className="font-semibold">Sidebar on left</span>
        <Button variant="outline" size="sm">
          Sign out
        </Button>
      </LayoutHeader>
      <LayoutBody>
        <LayoutSidebar className="w-64 lg:w-72">
          <LayoutMenu
            groups={sampleGroups}
            searchable
            searchPlaceholder="Search menu…"
          />
        </LayoutSidebar>
        <LayoutMain>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Main content</h1>
            <p className="text-muted-foreground">
              Sidebar is on the left. Put LayoutSidebar before LayoutMain in
              LayoutBody for left position.
            </p>
          </div>
        </LayoutMain>
      </LayoutBody>
      <LayoutFooter>
        <span className="text-muted-foreground text-sm">© 2025</span>
      </LayoutFooter>
    </Layout>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <Layout className="bg-background" sidebarPosition={null}>
      <LayoutHeader>
        <span className="font-semibold">No sidebar</span>
        <Button variant="outline" size="sm">
          Sign out
        </Button>
      </LayoutHeader>
      <LayoutBody>
        <LayoutMain>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Main content only</h1>
            <p className="text-muted-foreground">
              Use sidebarPosition=&#123;null&#125; for no sidebar. The header
              toggle is hidden and LayoutSidebar would render nothing if used.
            </p>
          </div>
        </LayoutMain>
      </LayoutBody>
      <LayoutFooter>
        <span className="text-muted-foreground text-sm">© 2025</span>
      </LayoutFooter>
    </Layout>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Layout sidebarPosition="right">
      <LayoutHeader>
        <span className="font-semibold">No footer</span>
      </LayoutHeader>
      <LayoutBody>
        <LayoutMain>
          <p className="text-muted-foreground">
            When you don’t pass a footer (or pass null), no footer is rendered.
          </p>
        </LayoutMain>
        <LayoutSidebar>
          <LayoutMenu items={sampleNestedItems} searchable />
        </LayoutSidebar>
      </LayoutBody>
    </Layout>
  ),
};

export const FlatMenu: Story = {
  render: () => (
    <Layout sidebarPosition="right">
      <LayoutHeader>
        <span className="font-semibold">Flat menu (no groups)</span>
      </LayoutHeader>
      <LayoutBody>
        <LayoutMain>
          <p className="text-muted-foreground">
            Menu can be a flat list of items instead of groups.
          </p>
        </LayoutMain>
        <LayoutSidebar>
          <LayoutMenu items={sampleNestedItems} searchable />
        </LayoutSidebar>
      </LayoutBody>
    </Layout>
  ),
};

/** Menu data types for `items` and `groups` props. Use with `LayoutMenu`. */
export const MenuDataStructure: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "TypeScript interfaces for menu items and groups. Pass `items` (flat array) or `groups` (array of sections) to `LayoutMenu`. Use `onItemClick` for a single callback when any item is clicked (expand still happens on parent click).",
      },
    },
  },
  render: () => (
    <div className="rounded-lg border border-border bg-muted/20 p-4">
      <pre className="text-muted-foreground overflow-x-auto text-xs">
        <code>{menuDataStructureCode}</code>
      </pre>
    </div>
  ),
};
