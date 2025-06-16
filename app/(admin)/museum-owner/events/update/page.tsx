import Innercard from "@/components/feature/card/inner-card";
import Maincard from "@/components/feature/card/main-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/upload-file";
import Link from "next/link";
import { JSX } from "react";

const defaultImages = [
    {
        url: "https://image-tc.galaxy.tf/wijpeg-87c83dri3kglj836kubeiybcf/the-national-museum-3.jpg",
        name: "Museum 1",
        size: "543 KB"
    },
    {
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/71/83/bc/photo1jpg.jpg?w=900&h=500&s=1",
        name: "Museum 2",
        size: "788 KB"
    },
];

export default function UpdateEventPage(): JSX.Element {
    const breadcrumbs = ["Home", "Events", "Update"];

    const eventData = {
        title: "International Museum Day",
        subtitle: "A Global Celebration of Museums and Their Impact",
        startDate: "2025-06-12",
        endDate: "2025-06-13",
        content:
            "International Museum Day (IMD) is an annual event held on May 18 , organized by the International Council of Museums (ICOM) in cooperation with UNESCO. This special day unites museums, cultural institutions, and communities around the world to highlight the essential role that museums play in preserving heritage, promoting education, fostering intercultural dialogue, and driving sustainable development.",
        accessibilityNote:
            "♿ Wheelchair Access All entrances, galleries, elevators, and restrooms are wheelchair accessible. Ramps and wide doorways ensure smooth navigation throughout the museum.",
    };

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <div className="px-3">
                        <h2 className="text-s1 font-bold text-primary-700 border-b-[2px] pb-3 mb-7">
                            Update Event
                        </h2>
                        <div className="grid grid-cols-2 gap-x-15 gap-y-7 mb-7">
                            <div>
                                <Label className="mb-3 ">Title</Label>
                                <Input
                                    placeholder="Name"
                                    value={eventData.title}
                                />
                            </div>
                            <div>
                                <Label className="mb-3">Subtitle</Label>
                                <Input
                                    placeholder="Subtitle"
                                    value={eventData.title}
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label className="mb-3">Start Date</Label>
                                <DatePicker value={eventData.startDate} />
                            </div>
                            <div className="flex flex-col">
                                <Label className="mb-3">End Date</Label>
                                <DatePicker value={eventData.endDate} />
                            </div>
                            <div>
                                <Label className="mb-3 ">Content</Label>
                                <Textarea
                                    placeholder="Write your Content"
                                    className="h-27 border-grey-400"
                                    value={eventData.content}
                                />
                            </div>
                            <div>
                                <Label className="mb-3 ">
                                    Accessibility Note
                                </Label>
                                <Textarea
                                    placeholder="Write your Accessibility Note"
                                    className="h-27 border-grey-400 text-p1"
                                    value={eventData.accessibilityNote}
                                />
                            </div>
                        </div>
                        <div className="mb-7">
                            <FileUpload multiple={true} maxFiles={10} defaultImages={defaultImages} />
                        </div>
                        <div className="mb-3 border-t-[2px] pt-3">
                            <div className="flex gap-5 justify-end">
                                <Link href="/museum-owner/events">
                                    <Button
                                        size={"md"}
                                        variant="outline"
                                        className="border-red-700 text-red-700"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Link href="/museum-owner/events">
                                    <Button size={"md"}>Save</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Innercard>
            </Maincard>
        </>
    );
}
