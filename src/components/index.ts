/**
 * @wedevs/plugin-ui Components
 *
 * Reusable UI components for WordPress plugins.
 */

// Basic Inputs
export { default as Checkbox } from './Checkbox';
export { default as CheckboxGroup } from './CheckboxGroup';
export { default as CustomizeRadio } from './CustomizeRadio';
export { default as List } from './List';
export { default as ListItem } from './List/ListItem';
export { default as NumberField } from './NumberField';
export { default as PasswordField } from './PasswordField';
export { default as Radio } from './Radio';
export { default as RadioCapsule } from './RadioCapsule';
export { default as Select } from './Select';
export { default as ShowHideField } from './ShowHideField';
export { default as SocialButton } from './SocialButton';
export { default as Switch } from './Switch';
export { default as TextArea } from './TextArea';
export { default as TextField } from './TextField';

// Display
export { default as Alert } from './Alert';
export { default as AsyncSelect } from './AsyncSelect';
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as FieldLabel } from './FieldLabel';
export { default as Filter } from './Filter';
export { default as InfoBox } from './InfoBox';
export { default as Modal } from './Modal';
export { default as Tooltip } from './Tooltip';
// Icons
export { default as ChevronDownIcon } from './Icons/ChevronDownIcon';
export { default as ChevronUpIcon } from './Icons/ChevronUpIcon';
export { default as CopyIcon } from './Icons/CopyIcon';
export { default as EyeIcon } from './Icons/EyeIcon';
export { default as EyeOffIcon } from './Icons/EyeOffIcon';
export { default as GoogleIcon } from './Icons/GoogleIcon';
export { default as InfoIcon } from './Icons/InfoIcon';
export { default as LucideIcon } from './Icons/LucideIcon';
export { default as Plus } from './Icons/Plus';
export { default as RefreshIcon } from './Icons/RefreshIcon';
export { default as SquareMinus } from './Icons/SquareMinus';
export { default as SquarePlus } from './Icons/SquarePlus';

// Re-export common icons from lucide-react for convenience
export {
    AlertCircle,
    AlertTriangle,
    Calendar,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Info,
    Loader2,
    Search,
    X
} from 'lucide-react';

// Generic Components
export { default as DebouncedInput } from './DebouncedInput';
export { default as Link } from './Link';
export { default as MediaUploader } from './MediaUploader';
export { default as Popover } from './Popover';
export { default as RichText } from './RichText';
export { default as SearchInput } from './SearchInput';

// Re-export types
export {
    type CheckboxGroupProps,
    type CheckboxProps,
    type CopyFieldProps,
    type CustomizeRadioProps,
    type ListItemProps,
    type ListProps,
    type RadioCapsuleProps,
    type RadioProps,
    type SelectProps,
    type ShowHideFieldProps,
    type SocialButtonProps,
    type TextAreaProps,
    type TextFieldProps,
    type TimePickerProps
} from '../types';
export type { SwitchProps } from '../types';
export type { DokanAlertProps as AlertProps, AlertVariant } from './Alert';
export type { DokanBadgeProps as BadgeProps, BadgeVariant } from './Badge';
export type { DokanButtonProps as ButtonProps, ButtonVariant } from './Button';
export type { ColorPickerProps } from './ColorPicker';
export type { InfoBoxProps } from './InfoBox';
export type { LinkProps } from './Link';
export type { NumberFieldProps } from './NumberField';
export type { PasswordFieldProps } from './PasswordField';
export type { RichTextProps } from './RichText';

