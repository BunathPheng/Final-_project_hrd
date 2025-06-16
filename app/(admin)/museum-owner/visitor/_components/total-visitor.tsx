import { JSX } from "react";
import { VisitorChart } from "./visitor-chart";
import { Profile2User } from "iconsax-reactjs";
import { SearchTable } from "@/components/feature/input/search-table";
import Pagination from "@/components/feature/lib/pagination";
import { Showing } from "@/components/feature/lib/showing";
import Image from "next/image";

export default function TotalVisitor(): JSX.Element {
    return (
        <>
            <VisitorChart />
            <div className="mb-5 flex items-center justify-between mt-7">
                <div className="flex gap-2">
                    <Profile2User
                        size={20}
                        className="[&>*]:stroke-primary-700"
                    />
                    <h6 className="text-s2 text-grey-900">Visitor</h6>
                </div>
                <SearchTable />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="text-left">NO</th>
                        <th className="text-left">VISITOR NAME</th>
                        <th>EMAIL</th>
                        <th>GENDER</th>
                        <th>CONTACT NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }, (_, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="inline-flex h-full items-center gap-2">
                                <Image
                                    src={"/profile/man.webp"}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-grey-100"
                                    width={25}
                                    height={25}
                                    alt="Picture"
                                />
                                <span className="text-p1">Pheng Bunath</span>
                            </td>
                            <td className="text-center">
                                pheng.bunath{index + 1}@gmail.com
                            </td>
                            <td className="text-center">Female</td>
                            <td className="text-center">088 711 5088</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex w-full justify-between items-center gap-5 pt-5 border-t border-grey-100">
                <Pagination />
                <Showing />
            </div>
        </>
    );
}
