export type input = {
    type: string,
    placeholder: string,
    label?: string,
}

export type button = {
    title: string,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: 'primary' | 'secondary'
}