import React from "react";
import Image from "next/image";
import Link from "next/link";
export interface MemberCardProps {
    id: number;
    name: string;
    roles: string[];
    image: string;
    description: string;
}
const MemberCard = ({ name, roles, image, description }: MemberCardProps) => {
    return (
        <div className="bg-gray-50 shadow-md min-h-[435px] rounded-2xl flex flex-col items-center justify-center relative">
            <div>
                <Image
                    src={`/images/${image}`}
                    alt="profile"
                    width={200}
                    height={150}
                    className="rounded-full object-contain p-2"
                    style={{ width: "200px", height: "150px" }}
                />
            </div>

            <h1 className="text-grey-900 text-h5 mt-5 ">{name}</h1>

            <div className="flex gap-2 mt-5">

                {roles.map((role, index) => {
                    return (
                        <h1
                            className={`${role === "Project Leader" ||
                                    role === "Leader-Fronted" ||
                                    role === "Frontend"
                                    ? "text-red-700 text-p4 bg-primary-50 px-2"
                                    : role.includes("Backend")
                                        ? "text-blue-700 text-p4 bg-light-blue px-2"
                                        : "text-green-700 text-p4 bg-light-green px-2"
                                }  p-1 rounded-lg`}
                            key={index}
                        // className={`text-${role.includes("Frontend") ? "blue" : role.includes("Backend") ? "green" : "red"}-700 bg-${role.includes("Frontend") ? "blue" : role.includes("Backend") ? "green" : "red"}-200 p-1 rounded-lg`}
                        >
                            {role}
                        </h1>
                    );
                })}
            </div>

            <h1 className="text-grey-800 justify-center px-25 mt-5 text-p1 text-center">
                {description}
            </h1>

            <div className="flex gap-5 mt-5">
                <Link
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/736x/5b/b0/f7/5bb0f73a7b3e0f976acad614a42e5040.jpg')",
                    }}
                ></Link>
                <Link
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/736x/ec/3a/60/ec3a60c8c6539a07eb70b52f6737ea6e.jpg')",
                    }}
                ></Link>
                <Link
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 transition-colors bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/736x/91/aa/f5/91aaf51ae3b6b52f73b2407383620bff.jpg')",
                    }}
                ></Link>
            </div>
        </div>
    );
};

export default MemberCard;
