import { SmartImage } from '@/components/feature/fallback/smart-image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format';
import { ArrowRight, Clock, Location } from 'iconsax-reactjs';
import Link from 'next/link';
import React from 'react';

type MuseumEventsProps = {
    eventId: string;
    museum: {
        name: string;
        address: string;
    };
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks?: { images: Array<string> };
}

const MuseumEvent: React.FC<MuseumEventsProps> = ({ ...item }) => {

    return (
        <div className="flex flex-col lg:flex-row gap-10 justify-between">
            <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-10 rounded-md bg-primary-50 gap-6">
                <div className="relative overflow-hidden border-4 border-white rounded-md">
                    <div className="absolute left-0 top-0 z-10 rounded-ee-md rounded-ss-md bg-primary-700">
                        <h4 className="text-s2 text-white px-5 py-1">{item?.museum?.name}</h4>
                    </div>
                    {item?.imageLinks?.images?.filter((_, idx) => idx === 0).map((img, idx) => (
                        <div key={idx} className={`rounded-md ${item?.imageLinks?.images.length != 1 ? "h-44" : "h-full"}`}>
                            <SmartImage
                                src={img}
                                className={`w-full h-full object-cover rounded-md`}
                                width={550}
                                height={180}
                                alt="Event"
                            />
                        </div>
                    ))}
                </div>

                {item?.imageLinks?.images && item?.imageLinks?.images.length > 1 &&
                    <div className="flex flex-col sm:flex-row gap-6">
                        {item?.imageLinks?.images?.filter((_, idx) => (idx > 0 && idx <= 2)).map((img, idx) => (
                            <div key={idx} className={`rounded-md ${item?.imageLinks?.images.length == 2 ? "w-full" : "w-full md:max-w-1/2"}`}>
                                <SmartImage
                                    key={idx}
                                    src={img}
                                    className={`h-44 w-full border-4 border-white object-cover rounded-md`}
                                    width={250}
                                    height={180}
                                    alt="Event"
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>

            <article className="w-full lg:w-1/2 pt-6 md:pt-10 flex flex-col gap-5">
                <h3 className="text-h3 text-grey-900 line-clamp-2">{item?.title}</h3>
                <h5 className="text-h5 text-grey-900 line-clamp-2">{item?.subTitle}</h5>
                <p className="text-p1 text-grey-800 line-clamp-4">{item?.content}</p>
                <div className="w-full">
                    <div className="flex items-start gap-2 border-b pb-5">
                        <Clock size={20} className="[&>*]:stroke-primary-700" />
                        <p className="text-p1">{formatDate(item?.startDate)} - {formatDate(item?.endDate)}</p>
                    </div>
                    <div className="flex items-start gap-2 pt-5">
                        <Location size={20} className="[&>*]:stroke-primary-700" />
                        <p className="text-p1">{item?.museum?.address}</p>
                    </div>
                </div>
                <Link href={`/events/${item?.eventId}`} className="mt-3">
                    <Button size="md">
                        Read more
                        <ArrowRight size={24} className="stroke-white" />
                    </Button>
                </Link>
            </article>
        </div >
    );
};

export default MuseumEvent;
