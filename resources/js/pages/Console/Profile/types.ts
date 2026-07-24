export interface SharedAuth {
    user?: {
        name: string;
        email: string;
    } | null;
}

export interface ProfileIndexProps {
    title: string;
}

export interface ProfileFormFields {
    name: string;
    email: string;
}

export interface PasswordFormFields {
    current_password: '';
    password: '';
    password_confirmation: '';
}
