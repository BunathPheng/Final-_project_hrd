import { MuseumDetailProps } from "@/types/museum";
import { ApiResponse } from "@/types/response";
import { TicketInfoProps } from "@/types/ticket";
import { apiRequest } from "@/utils/api";
import { convertTo12Hour, formatRiel } from "@/utils/format";
import { groupSchedule } from "@/utils/schedule";
import { Ticket2 } from "iconsax-reactjs";

export const TicketDetail: React.FC<{ payload: MuseumDetailProps | null }> = async ({ payload }) => {
    const response = await apiRequest<ApiResponse<TicketInfoProps>>(`/tickets/${payload?.museumId}`);
    const ticket = response?.payload || null;
    const schedule = groupSchedule(payload?.schedule || [], { removeDayOff: true }) || [];

    return (
        <aside className="w-full flex flex-col items-end gap-5">
            {/* Title */}
            <div className="flex items-center gap-2">
                <Ticket2 size={32} className="[&>*]:stroke-primary-700" />
                <h4 className="text-h4 text-grey-900">TICKET PRICES</h4>
            </div>
            {/* Ticket Price */}
            <div className="grid gap-5 w-full">
                {/* Local Ticket */}
                <div className="overflow-hidden flex flex-col gap-3 bg-primary-700 ml-auto w-full max-w-96 relative px-5 py-3">
                    <div className="absolute left-[7px] -top-px z-10 bg-primary-700 w-6 h-6 rounded-full"></div>
                    <div className="absolute left-[7px] -bottom-px z-10 bg-primary-700 w-6 h-6 rounded-full"></div>
                    <div className="absolute -left-3 -top-3 z-10 bg-white w-6 h-6 rounded-full"></div>
                    <div className="absolute -left-3 -bottom-3 z-10 bg-white w-6 h-6 rounded-full"></div>

                    <div className="overflow-hidden w-full h-fit flex items-center p-px bg-yellow relative">
                        <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-yellow"></div>
                        <div className="w-full h-full flex justify-end bg-primary-700 px-2 py-1">
                            <p className="text-p1 text-white">Local</p>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full h-fit flex items-center p-px bg-yellow relative">
                        <div className="absolute -left-3 -bottom-3 w-6 h-6 rounded-full bg-yellow"></div>
                        <div className="w-full h-full flex justify-end bg-primary-700 px-2 py-1">
                            <p className="text-p1 text-white">{formatRiel((ticket?.localPrice || 0) * 4000)} riels / ${(ticket?.localPrice || 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                {/* Foreign Ticket */}
                <div className="overflow-hidden flex flex-col gap-3 bg-primary-700 ml-auto w-full max-w-96 relative px-5 py-3">
                    <div className="absolute left-[7px] -top-px z-10 bg-primary-700 w-6 h-6 rounded-full"></div>
                    <div className="absolute left-[7px] -bottom-px z-10 bg-primary-700 w-6 h-6 rounded-full"></div>
                    <div className="absolute -left-3 -top-3 z-10 bg-white w-6 h-6 rounded-full"></div>
                    <div className="absolute -left-3 -bottom-3 z-10 bg-white w-6 h-6 rounded-full"></div>

                    <div className="overflow-hidden w-full h-fit flex items-center p-px bg-yellow relative">
                        <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-yellow"></div>
                        <div className="w-full h-full flex justify-end bg-primary-700 px-2 py-1">
                            <p className="text-p1 text-white">Foreigner</p>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full h-fit flex items-center p-px bg-yellow relative">
                        <div className="absolute -left-3 -bottom-3 w-6 h-6 rounded-full bg-yellow"></div>
                        <div className="w-full h-full flex justify-end bg-primary-700 px-2 py-1">
                            <p className="text-p1 text-white">{formatRiel((ticket?.foreignPrice || 0) * 4000)} riels / ${(ticket?.foreignPrice || 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            {(schedule && schedule.length > 0) && schedule.map((item, idx) => (
                <div key={idx} className="flex flex-col items-end gap-5">
                    <h6 className="text-h6 text-grey-900">Open From <span className="font-bold">{item.scheduleRange}</span></h6>
                    <h5 className="text-h5 text-primary-700">{convertTo12Hour(item.openingTime || "")} - {convertTo12Hour(item.closingTime || "")}</h5>
                </div>
            ))}


            {!schedule || schedule.length === 0 &&
                <h5 className="text-s2 text-primary-700 bg-primary-50 rounded-lg px-5 py-2">Closed</h5>
            }
        </aside>
    );
}
