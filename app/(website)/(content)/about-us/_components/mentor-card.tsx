export interface MentorCardProps {
    id: number;
    name: string;
    position: string;
    image: string;
    description: string;
}
const MentorCard = ({
    name,
    position,
    image,
    description,
}: MentorCardProps) => {
    return (
        <>
            <div >
                {/* Card Container */}
                <div className=" bg-white rounded-xl overflow-hidden shadow-sm"
                //  style={{
                //     boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                // }}
                >
                    {/* Card Header with Gradient Background */}
                    <div className="h-2 bg-gradient-to-r from-red-700 to-red-500" />
                    {/* Card Content */}
                    <div className="p-8">
                        {/* Profile Section */}
                        <div className="flex ">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center w-40 h-40 bg-blue-100 rounded-md bg-no-repeat bg-center bg-contain"
                                    style={{
                                        backgroundImage: `url('${image}')`,
                                    }}
                                >
                                    {/* <span className="text-2xl font-bold text-blue-600">MD</span> */}
                                </div>
                            </div>
                            {/* Name and Title */}
                            <div className="ml-4 mt-2">
                                <h2 className="text-h5 text-gray-900">
                                    {name}
                                </h2>
                                <p className="text-red-700 text-s1 mt-2">
                                    {position}
                                </p>
                                <p className="mt-5 text-p1 text-grey-800">{description}</p>
                                <div>
                                    <div className="flex space-x-4 mt-5">
                                        <a
                                            href="#"
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                                            style={{
                                                backgroundImage:
                                                    "url('https://i.pinimg.com/736x/5b/b0/f7/5bb0f73a7b3e0f976acad614a42e5040.jpg')",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></a>
                                        <a
                                            href="#"
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                                            style={{
                                                backgroundImage:
                                                    "url('https://i.pinimg.com/736x/ec/3a/60/ec3a60c8c6539a07eb70b52f6737ea6e.jpg')",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></a>
                                        <a
                                            href="#"
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                                            style={{
                                                backgroundImage:
                                                    "url('https://i.pinimg.com/736x/91/aa/f5/91aaf51ae3b6b52f73b2407383620bff.jpg')",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MentorCard;
