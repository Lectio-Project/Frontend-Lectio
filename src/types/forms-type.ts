export interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}

export type button = {
    title: string,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: 'primary' | 'secondary' | 'disabled' | 'active',
    size: 'full' | 'default',
    disabled?: 'disabled' | 'active' | '' | undefined
}