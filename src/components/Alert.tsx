// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';
import { SimpleAlert } from '@getdokan/dokan-ui';
import type { SimpleAlertProps } from '@getdokan/dokan-ui/dist/components/SimpleAlert';

export type AlertVariant = 'info' | 'warning' | 'success' | 'danger';

export interface DokanAlertProps extends Partial< SimpleAlertProps > {
    variant?: AlertVariant;
    label: string;
    className?: string;
    children?: React.ReactNode;
}

const variantConfig = {
    info: {
        color: 'blue',
        type: 'info',
        className: 'alert-info',
    },
    warning: {
        color: 'yellow',
        type: 'warning',
        className: 'alert-warning',
    },
    success: {
        color: 'green',
        type: 'success',
        className: 'alert-success',
    },
    danger: {
        color: 'red',
        type: 'danger',
        className: 'alert-danger',
    },
} as const;

const DokanAlert = ( {
    label,
    children,
    className = '',
    variant = 'info',
    ...props
}: DokanAlertProps ) => {
    const config = variantConfig[ variant ];

    return (
        <SimpleAlert
            label={ label }
            color={ config.color }
            type={ config.type }
            className={ `ring-1 ring-inset ${ config.className } ${ className }` }
            { ...props }
        >
            { children }
        </SimpleAlert>
    );
};

export default DokanAlert;
