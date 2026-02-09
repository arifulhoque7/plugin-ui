import {
  forwardRef,
  type ReactNode,
  useMemo,
  useState,
  useCallback,
  type KeyboardEvent,
  type HTMLAttributes,
} from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

/* ============================================
   Types: multi-label nested menu items
   ============================================ */

export interface LayoutMenuItemData {
  id: string;
  label: string;
  /** Secondary line (description, badge, etc.) */
  secondaryLabel?: string;
  href?: string;
  onClick?: () => void;
  children?: LayoutMenuItemData[];
  icon?: ReactNode;
  disabled?: boolean;
  /** Custom className for the item row */
  className?: string;
}

export interface LayoutMenuGroupData {
  id: string;
  label: string;
  /** Optional secondary label for the group header */
  secondaryLabel?: string;
  items: LayoutMenuItemData[];
  className?: string;
}

/* ============================================
   Filter nested items by search query
   ============================================ */

function matchesSearch(item: LayoutMenuItemData, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const label = item.label.toLowerCase();
  const secondary = (item.secondaryLabel ?? "").toLowerCase();
  if (label.includes(q) || secondary.includes(q)) return true;
  if (item.children?.some((c) => matchesSearch(c, q))) return true;
  return false;
}

function filterMenuItems(
  items: LayoutMenuItemData[],
  query: string
): LayoutMenuItemData[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items
    .map((item) => {
      const childMatch = item.children?.length
        ? filterMenuItems(item.children, query)
        : [];
      const selfMatch = matchesSearch(item, query);
      if (selfMatch) return item;
      if (childMatch.length > 0)
        return { ...item, children: childMatch };
      return null;
    })
    .filter(Boolean) as LayoutMenuItemData[];
}

function filterGroups(
  groups: LayoutMenuGroupData[],
  query: string
): LayoutMenuGroupData[] {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((grp) => ({
      ...grp,
      items: filterMenuItems(grp.items, query),
    }))
    .filter((grp) => grp.items.length > 0);
}

/* ============================================
   LayoutMenuSearch
   ============================================ */

export interface LayoutMenuSearchProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export const LayoutMenuSearch = forwardRef<HTMLDivElement, LayoutMenuSearchProps>(
  (
    {
      value,
      onChange,
      placeholder = "Search menu…",
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="layout-menu-search"
        className={cn("shrink-0 p-2", className)}
        {...props}
      >
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            type="search"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={cn("h-8 pl-8", inputClassName)}
            aria-label="Search menu"
          />
        </div>
      </div>
    );
  }
);

LayoutMenuSearch.displayName = "LayoutMenuSearch";

/* ============================================
   LayoutMenu (search + list container)
   ============================================ */

export interface LayoutMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Flat list of items (no groups) */
  items?: LayoutMenuItemData[];
  /** Grouped items (sections with labels); takes precedence over items */
  groups?: LayoutMenuGroupData[];
  /** Search is shown when searchable is true */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Called when any menu item row is clicked (parent or leaf). Parent click still toggles expand. */
  onItemClick?: (item: LayoutMenuItemData) => void;
  /** Custom render for each item */
  renderItem?: (item: LayoutMenuItemData, depth: number) => ReactNode;
  /** Custom render for group header */
  renderGroupLabel?: (group: LayoutMenuGroupData) => ReactNode;
  className?: string;
}

export const LayoutMenu = forwardRef<HTMLDivElement, LayoutMenuProps>(
  (
    {
      items = [],
      groups,
      searchable = true,
      searchPlaceholder,
      onItemClick,
      renderItem,
      renderGroupLabel,
      className,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(
      () => (items ? filterMenuItems(items, search) : []),
      [items, search]
    );
    const filteredGroups = useMemo(
      () => (groups ? filterGroups(groups, search) : []),
      [groups, search]
    );

    return (
      <div
        ref={ref}
        data-slot="layout-menu"
        className={cn("flex flex-1 flex-col overflow-hidden", className)}
        {...props}
      >
        {searchable && (
          <LayoutMenuSearch
            value={search}
            onChange={setSearch}
            placeholder={searchPlaceholder}
          />
        )}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {filteredGroups.length > 0
            ? filteredGroups.map((group) => (
                <LayoutMenuGroup
                  key={group.id}
                  group={group}
                  onItemClick={onItemClick}
                  renderItem={renderItem}
                  renderGroupLabel={renderGroupLabel}
                />
              ))
            : filteredItems.length > 0 && (
                <LayoutMenuItemList
                  items={filteredItems}
                  depth={0}
                  onItemClick={onItemClick}
                  renderItem={renderItem}
                />
              )}
          {filteredGroups.length === 0 &&
            filteredItems.length === 0 &&
            search.trim() && (
              <div className="text-muted-foreground px-3 py-6 text-center text-sm">
                No results for &quot;{search}&quot;
              </div>
            )}
        </div>
      </div>
    );
  }
);

LayoutMenu.displayName = "LayoutMenu";

/* ============================================
   LayoutMenuGroup
   ============================================ */

interface LayoutMenuGroupInternalProps {
  group: LayoutMenuGroupData;
  onItemClick?: (item: LayoutMenuItemData) => void;
  renderItem?: (item: LayoutMenuItemData, depth: number) => ReactNode;
  renderGroupLabel?: (group: LayoutMenuGroupData) => ReactNode;
}

function LayoutMenuGroup({
  group,
  onItemClick,
  renderItem,
  renderGroupLabel,
}: LayoutMenuGroupInternalProps) {
  return (
    <div
      data-slot="layout-menu-group"
      className={cn("py-1", group.className)}
    >
      <div
        data-slot="layout-menu-group-label"
        className="text-muted-foreground flex flex-col gap-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
      >
        {renderGroupLabel ? (
          renderGroupLabel(group)
        ) : (
          <>
            <span>{group.label}</span>
            {group.secondaryLabel && (
              <span className="text-muted-foreground/80 text-[10px] font-normal normal-case">
                {group.secondaryLabel}
              </span>
            )}
          </>
        )}
      </div>
      <LayoutMenuItemList
        items={group.items}
        depth={0}
        onItemClick={onItemClick}
        renderItem={renderItem}
      />
    </div>
  );
}

/* ============================================
   LayoutMenuItemList (recursive)
   ============================================ */

interface LayoutMenuItemListProps {
  items: LayoutMenuItemData[];
  depth: number;
  onItemClick?: (item: LayoutMenuItemData) => void;
  renderItem?: (item: LayoutMenuItemData, depth: number) => ReactNode;
}

function LayoutMenuItemList({
  items,
  depth,
  onItemClick,
  renderItem,
}: LayoutMenuItemListProps) {
  return (
    <ul className="list-none px-1 py-0.5" role="list">
      {items.map((item) => (
        <LayoutMenuItemNode
          key={item.id}
          item={item}
          depth={depth}
          onItemClick={onItemClick}
          renderItem={renderItem}
        />
      ))}
    </ul>
  );
}

/* ============================================
   LayoutMenuItemNode (single item or expandable parent)
   ============================================ */

interface LayoutMenuItemNodeProps {
  item: LayoutMenuItemData;
  depth: number;
  onItemClick?: (item: LayoutMenuItemData) => void;
  renderItem?: (item: LayoutMenuItemData, depth: number) => ReactNode;
}

function LayoutMenuItemNode({
  item,
  depth,
  onItemClick,
  renderItem,
}: LayoutMenuItemNodeProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (hasChildren) {
          setOpen((o) => !o);
          onItemClick?.(item);
        } else {
          item.onClick?.();
          onItemClick?.(item);
        }
      }
      if (e.key === "ArrowRight" && hasChildren && !open) setOpen(true);
      if (e.key === "ArrowLeft" && hasChildren && open) setOpen(false);
    },
    [hasChildren, open, item, onItemClick]
  );

  const content = renderItem ? (
    renderItem(item, depth)
  ) : (
    <LayoutMenuItemRow
      item={item}
      depth={depth}
      hasChildren={hasChildren}
      open={open}
      onToggle={handleToggle}
      onItemClick={onItemClick}
      onKeyDown={handleKeyDown}
    />
  );

  return (
    <li
      data-slot="layout-menu-item"
      data-depth={depth}
      className="rounded-md"
      role="none"
    >
      {content}
      {hasChildren && open && (
        <LayoutMenuItemList
          items={item.children!}
          depth={depth + 1}
          onItemClick={onItemClick}
          renderItem={renderItem}
        />
      )}
    </li>
  );
}

/* ============================================
   LayoutMenuItemRow (default row: icon, labels, chevron)
   ============================================ */

interface LayoutMenuItemRowProps {
  item: LayoutMenuItemData;
  depth: number;
  hasChildren: boolean;
  open: boolean;
  onToggle: () => void;
  onItemClick?: (item: LayoutMenuItemData) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

function LayoutMenuItemRow({
  item,
  depth,
  hasChildren,
  open,
  onToggle,
  onItemClick,
  onKeyDown,
}: LayoutMenuItemRowProps) {
  const paddingLeft = 12 + depth * 12;

  const handleRowClick = useCallback(() => {
    if (hasChildren) {
      onToggle();
    } else {
      item.onClick?.();
    }
    onItemClick?.(item);
  }, [hasChildren, onToggle, item, onItemClick]);

  const Comp = item.href && !hasChildren ? "a" : "button";
  const compProps =
    item.href && !hasChildren
      ? {
          href: item.href,
          onClick: () => onItemClick?.(item),
        }
      : {
          type: "button" as const,
          onClick: handleRowClick,
        };

  return (
    <Comp
      role="menuitem"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "hover:bg-accent focus:bg-accent focus:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
        item.className
      )}
      style={{ paddingLeft: `${paddingLeft}px` }}
      disabled={item.disabled}
      {...compProps}
    >
      {item.icon && (
        <span className="flex shrink-0 [&_svg]:size-4">{item.icon}</span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate">{item.label}</span>
        {item.secondaryLabel && (
          <span className="text-muted-foreground block truncate text-xs">
            {item.secondaryLabel}
          </span>
        )}
      </span>
      {hasChildren && (
        <span
          className="shrink-0 [&_svg]:size-4"
          aria-expanded={open}
        >
          {open ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </span>
      )}
    </Comp>
  );
}
