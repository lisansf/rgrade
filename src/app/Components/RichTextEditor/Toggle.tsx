const Toggle = ({
    pressed = false,
    onPressedChange,
    children,
}: {
    pressed?: boolean;
    onPressedChange: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button
            type="button"
            onClick={onPressedChange}
            className={`flex items-center justify-center transition-colors duration-200 focus:outline-none ${pressed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } h-10 w-10`}
        >
            {children}
        </button>
    );
};

export default Toggle;