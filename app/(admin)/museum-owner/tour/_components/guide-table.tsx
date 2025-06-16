import { UserTag } from "iconsax-reactjs";
import { FC } from "react";

type GuideProps = {
    id: number;
    name: string;
    contactNumber: string;
}

const guideData: GuideProps[] = [
    { id: 1, name: "Danith", contactNumber: "097 234 3256" },
    { id: 2, name: "Lolita", contactNumber: "023 255 7656" },
    { id: 3, name: "Rona", contactNumber: "012 546 653" },
    { id: 4, name: "Thireach", contactNumber: "088 982 1289" },
];

export const GuideTable: FC = () => {

    return (
        <div className="grid gap-5 w-full">
            <div className="flex gap-2 items-center">
                <UserTag size={24} className="[&>*]:stroke-primary-700" />
                <h4 className="text-s1 text-grey-900">Guides</h4>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th className="text-left">NAME</th>
                        <th>CONTACT NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    {guideData && guideData.map((item, idx) => (
                        <tr key={item.id}>
                            <td className="text-center">{idx + 1}</td>
                            <td>{item.name}</td>
                            <td className="text-center">{item.contactNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
