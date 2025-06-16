export const TextValidation: React.FC<{ text: string | null }> = ({ text }) => {
    return (
        <>
            {text &&
                <span className="text-primary-500 text-sm">
                    {text || ""}
                </span>
            }
        </>
    );
}
