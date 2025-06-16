import { ArchiveAdd, TickCircle, Ticket } from "iconsax-reactjs";

type NotificationProps = {
    id: number;
    title: string;
    description: string;
    time: string;
    type: string;
    isRead: boolean;
}

const notificationData: NotificationProps[] = [
    {
        id: 1,
        title: "New Booking",
        description: "A new visitor has booked ticket.",
        time: "Just now",
        type: "new",
        isRead: false
    },
    {
        id: 2,
        title: "New Request Tour",
        description: "A new visitor has requested for tour.",
        time: "Just now",
        type: "request",
        isRead: true
    },
    {
        id: 3,
        title: "Paid Tour",
        description: "Visitor has been paid successfully for tour.",
        time: "Just now",
        type: "paid",
        isRead: false
    },
    {
        id: 4,
        title: "New Booking",
        description: "A new visitor has booked ticket.",
        time: "Just now",
        type: "new",
        isRead: true
    },
    {
        id: 5,
        title: "New Request Tour",
        description: "A new visitor has requested for tour.",
        time: "Just now",
        type: "request",
        isRead: true
    },
    {
        id: 6,
        title: "Paid Tour",
        description: "Visitor has been paid successfully for tour.",
        time: "Just now",
        type: "paid",
        isRead: false
    },
    {
        id: 7,
        title: "New Request Tour",
        description: "A new visitor has requested for tour.",
        time: "Just now",
        type: "request",
        isRead: true
    },
    {
        id: 8,
        title: "Paid Tour",
        description: "Visitor has been paid successfully for tour.",
        time: "Just now",
        type: "paid",
        isRead: false
    },
];

export const OwnerNotification: React.FC<{ mark: boolean }> = ({ mark }) => {

    const items: NotificationProps[] = [];
    Array.from(notificationData).forEach(item => {
        if (mark) {
            item.isRead = true;
            items.push(item);
        } else {
            items.push(item);
        }
    })

    return (
        <div className="grid w-full px-5 gap-1 max-h-screen overflow-auto hidden-scroll">
            {items && items.map(item => (
                <div key={item.id} className={`px-6 py-4 rounded border-b border-b-grey-100 relative ${!item.isRead ? "bg-grey-50" : ""}`}>
                    {!item.isRead && <div className="absolute top-0 left-0 w-1 rounded-tl rounded-bl h-full bg-primary-700"></div>}
                    {!item.isRead && <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary-700"></div>}
                    <div className="flex items-center w-full gap-5">
                        {item.type == "new" && (<Ticket size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        {item.type == "request" && (<ArchiveAdd size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        {item.type == "paid" && (<TickCircle size={22} className="[&>*]:stroke-primary-700 shrink-0" />)}
                        <div className="flex flex-col gap-1">
                            <p className="text-p2 line-clamp-1">{item.title}</p>
                            <p className="text-p3 text-grey-900 line-clamp-2">{item.description}</p>
                            <p className="text-c2 text-grey-500">{item.time}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
