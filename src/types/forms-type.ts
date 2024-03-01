export interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}

export type button = {
    title: string,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: 'primary' | 'secondary',
    size: 'full' | 'default',
    disabled?: true | false,
}