import { HeartTick, ShopAdd, Warning2 } from "iconsax-reactjs";

type NotificationProps = {
    id: number;
    name: string;
    text: string;
    time: string;
    type: string;
    isRead: boolean;
}

export const VisitorNotification: React.FC<{ items: NotificationProps[] }> = ({ items }) => {

    return (
        <div className="grid w-full px-5 gap-1 max-h-screen overflow-auto hidden-scroll">
            {items && items.map(item => (
                <div key={item.id} className={`px-6 py-4 rounded border-b border-b-grey-100 relative ${!item.isRead ? "bg-grey-50" : ""}`}>
                    {!item.isRead && <div className="absolute top-0 left-0 w-1 h-full rounded-tl rounded-bl bg-primary-700"></div>}
                    {!item.isRead && <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary-700"></div>}
                    <div className="flex items-center gap-5">
                        {item.type == "register" && (<ShopAdd size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        {item.type == "warning" && (<Warning2 size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        {item.type == "event" && (<HeartTick size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        <div className="flex flex-col gap-3">
                            <div className="inline text-grey-900">
                                <span className="text-s2">{item.name}</span>
                                {item.type == "register" && (<span className="text-p1"> was registered in </span>)}
                                {item.type == "warning" && (<span className="text-p1"> visit is due in </span>)}
                                {item.type == "event" && (<span className="text-p1"> has hosted a </span>)}
                                <span className="text-s2">{item.text}</span>
                            </div>
                            <span className="text-c2 text-grey-500">{item.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
