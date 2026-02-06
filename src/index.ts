// Styles - Import this in your plugin's entry point
import "./styles.css";

// ============================================
// Providers
// ============================================
export {
    ThemeProvider,
    useTheme,
    useThemeOptional, type ThemeMode, type ThemeProviderProps,
    type ThemeTokens
} from "./providers";

// ============================================
// UI Components (ShadCN-style, pure React)
// ============================================
export {
    // Alert
    Alert, AlertDescription, AlertTitle, AlertAction,
    // Avatar
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarBadge,
    // Thumbnail
    Thumbnail, type ThumbnailProps, type ThumbnailSize, type ThumbnailAspect,
    // Badge
    Badge,
    // Breadcrumb
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
    // Button
    Button,
    // Card
    Card, CardContent, CardDescription, CardFooter, CardHeader,
    CardTitle,
    // Design system (Figma Design-System-for-Plugin)
    ComponentPreview, DesignSystemSection,
    // Currency input (uses InputGroup)
    CurrencyInput,
    // Input
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    // Input OTP
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    // Label
    Label,
    // Modal
    Modal, ModalClose, ModalContent, ModalDescription,
    ModalFooter, ModalHeader, ModalOverlay, ModalTitle,
    // Notice
    Notice, NoticeTitle, NoticeAction,
    // Separator
    Separator,
    // Spinner
    Spinner,
    // Switch
    Switch,
    // Textarea
    Textarea,
    // Tooltip
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Toggle,
    ToggleGroup,
    ToggleGroupItem,
    // Tabs
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    // Selection Type
    SelectionType,
    SelectionItem,
    // Types
    type BadgeProps,
    type BadgeVariant,
    type CardContentProps,
    type CardDescriptionProps,
    type CardFooterProps,
    type CardHeaderProps,
    type CardProps,
    type CardTitleProps,
    type ComponentPreviewProps,
    type CurrencyInputProps,
    type CurrencyOption,
    type DesignSystemSectionProps,
    type LabelProps, type ModalProps, type SeparatorProps,
    type SwitchProps
} from "./components/ui";

// ============================================
// Theme Presets
// ============================================
export {
    amberDarkTheme, amberTheme, blueDarkTheme, blueTheme, createDarkTheme, createTheme, defaultDarkTheme, defaultTheme, dokanDarkTheme, dokanTheme, greenDarkTheme, greenTheme, slateDarkTheme, slateTheme
} from "./themes";

// ============================================
// Utilities
// ============================================
export { cn } from "@/lib/utils";
export { twMerge } from "tailwind-merge";
