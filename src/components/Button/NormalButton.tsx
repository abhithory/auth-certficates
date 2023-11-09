import React from 'react'
import { SimpleSpinner } from '../Spinner/SimpleSpinner';

interface IProps extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
    children?: React.ReactNode;
    loading?: boolean;
    icon?: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
}

export function NormalButton({ className, children, loading = false, icon, ...rest }: IProps) {
    return (
        <button className={`${className ? className : "btn_primary_1"}`} disabled={loading} {...rest}>
            {loading ? (
                <SimpleSpinner className='w-5 h-5 text-primary' />
            ) : (
                icon && icon
            )}
            {children}
        </button>
    );
}