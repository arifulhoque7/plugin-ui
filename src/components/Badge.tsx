import { Badge } from '@getdokan/dokan-ui';
import type { BadgeProps } from '@getdokan/dokan-ui/dist/components/Badge';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'success'
    | 'danger';

export interface DokanBadgeProps extends Partial< BadgeProps > {
    variant?: BadgeVariant;
    label: string;
}

const variantConfig = {
    primary: {
        color: 'blue',
        className: 'badge-primary',
    },
    secondary: {
        color: 'gray',
        className: 'badge-secondary',
    },
    info: {
        color: 'blue',
        className: 'badge-info',
    },
    warning: {
        color: 'yellow',
        className: 'badge-warning',
    },
    success: {
        color: 'green',
        className: 'badge-success',
    },
    danger: {
        color: 'red',
        className: 'badge-danger',
    },
} as const;

const DokanBadge = ( {
    label,
    variant = 'info',
    ...props
}: DokanBadgeProps ) => {
    const config = variantConfig[ variant ];

    return (
        <Badge
            className={ config.className }
            color={ config.color }
            label={ label }
            { ...props }
        />
    );
};

export default DokanBadge;
