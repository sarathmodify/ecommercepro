interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'accent';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
    return (
        <button onClick={onClick} className={`btn-${variant}`}>
            {children}
        </button>
    );
}
