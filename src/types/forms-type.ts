export interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}

export type button = {
    onClick ?: () => void;
    title: string,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: 'primary' | 'secondary'
}