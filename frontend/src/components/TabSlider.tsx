import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./TabSlider.css";

export type TabSliderOption<TValue extends string = string> = {
    value: TValue;
    label: ReactNode;
    disabled?: boolean;
};

type TabSliderProps<TValue extends string = string> = {
    options: TabSliderOption<TValue>[];
    value: TValue;
    onChange?: (value: TValue) => void;
    className?: string;
};

export function TabSlider<TValue extends string = string>({
    options,
    value,
    onChange,
    className = "",
}: TabSliderProps<TValue>) {
    if (options.length === 0) {
        return null;
    }

    const activeIndex = Math.max(
        options.findIndex((option) => option.value === value),
        0,
    );

    const sliderStyle = {
        "--tab-count": options.length,
        "--active-tab-index": activeIndex,
    } as CSSProperties;

    return (
        <div className={`tab-slider ${className}`.trim()} style={sliderStyle}>
            <div className="tab-slider__pill" />

            {options.map((option) => {
                const isActive = option.value === value;
                const itemClassName = `tab-slider__item ${
                    isActive
                        ? "tab-slider__item--active"
                        : "tab-slider__item--inactive"
                }`;

                return (
                    <Link
                        key={option.value}
                        to={option.value}
                        className={itemClassName}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onChange?.(option.value)}
                    >
                        {option.label}
                    </Link>
                );

                // return (
                //     <button
                //         key={option.value}
                //         type="button"
                //         className={itemClassName}
                //         disabled={option.disabled}
                //         aria-pressed={isActive}
                //         onClick={() => onChange?.(option.value)}
                //     >
                //         {option.label}
                //     </button>
                // );
            })}
        </div>
    );
}
