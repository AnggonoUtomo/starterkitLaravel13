export interface SharedAuthUser {
    id?: number;
    name: string;
    email: string;
}

export interface SharedAuth {
    user?: SharedAuthUser | null;
}

export interface ProfileProps {
    title: string;
}

export interface ProfileForm {
    name: string;
    email: string;
}

export interface PasswordForm {
    current_password: string;
    password: string;
    password_confirmation: string;
}
