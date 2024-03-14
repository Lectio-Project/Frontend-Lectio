export interface buttonGender {
    title: string;
    className: 'button-default-gender' | 'button-selected-gender';
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface headerOnboarding {
    title: string;
}