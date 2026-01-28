import React from 'react';

export interface RadioButtonProps {
    checked: boolean;
    disabled?: boolean;
}

/**
 * RadioButton component for custom selection states.
 *
 * @param {Object}  props            Component props
 * @param {boolean} props.checked    Whether the radio button is checked
 * @param {boolean} [props.disabled] Whether the radio button is disabled
 */
const RadioButton: React.FC< RadioButtonProps > = ( {
    checked,
    disabled = false,
} ) => {
    // Determine stroke color using CSS custom properties
    let strokeColor = 'var(--plugin-ui-gray-200, #E5E7EB)';
    if ( checked ) {
        strokeColor = 'var(--plugin-ui-primary, #7047EB)';
    } else if ( disabled ) {
        strokeColor = 'var(--plugin-ui-gray-300, #D1D5DB)';
    }

    const fillColor = checked
        ? 'var(--plugin-ui-primary, #7047EB)'
        : 'transparent';

    return (
        <div
            className="relative min-w-[18px] min-h-[18px] w-[18px] h-[18px]"
            role="presentation"
            aria-hidden="true"
        >
            <svg
                className="block w-full h-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 18 18"
                aria-hidden="true"
            >
                <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    stroke={ strokeColor }
                    strokeWidth="1"
                    fill="none"
                />
            </svg>
            { checked && (
                <div className="absolute inset-[22.222%]">
                    <svg
                        className="block w-full h-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                    >
                        <circle cx="5" cy="5" fill={ fillColor } r="5" />
                    </svg>
                </div>
            ) }
        </div>
    );
};

export default RadioButton;
