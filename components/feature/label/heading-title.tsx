import React from 'react';

type HeadingTitleProps = {
    title?: string;
    highlight?: string | null;
    className?: string;
    first?: boolean;
}

const HeadingTitle: React.FC<HeadingTitleProps> = ({
    title,
    highlight,
    className = "",
    first = true,
}) => {

    return (
        <h1 className={`text-h4 ${className}`}>
            {first && (
                <>
                    <span className="text-grey-900">{title} </span>{' '}
                    {highlight &&
                        <span className="text-primary-700 underline underline-offset-4">{highlight}</span>
                    }
                </>
            )}
            {!first && (
                <>
                    {highlight &&
                        <>
                            <span className="text-primary-700 underline underline-offset-4">{highlight}</span>{' '}
                        </>
                    }
                    <span className="text-grey-900">{title}</span>
                </>
            )}
        </h1>
    );
};

export default HeadingTitle;
