import ToggleCheckbox from "@/components/feature/button/toggle-checkbox";

export function TimePicker() {
    const dayOfWeek = [
        { id: 1, day: "Monday" },
        { id: 2, day: "Tuesday" },
        { id: 3, day: "Wednesday" },
        { id: 4, day: "Thursday" },
        { id: 5, day: "Friday" },
        { id: 6, day: "Saturday" },
        { id: 7, day: "Sunday" },
    ];

    return (
        <>
            {dayOfWeek && dayOfWeek.map(item => (
                <div key={item.id} className="border border-grey-400 rounded-md px-5 py-3 space-y-3">
                    <div className="flex gap-3 items-center justify-between">
                        <h6 className="text-s1 text-grey-900">{item.day}</h6>
                        <ToggleCheckbox />
                    </div>
                    <div className="bg-slate-light rounded-md w-full grid p-3 gap-3">
                        <dl className="flex w-full gap-2 justify-between items-center">
                            <dt className="text-p1 text-grey-900">Opening Hour</dt>
                            <dd className="bg-white rounded-md p-1">
                                <input type="time" name="" id="" className="outline-0" />
                            </dd>
                        </dl>
                        <dl className="flex w-full gap-2 justify-between items-center">
                            <dt className="text-p1 text-grey-900">Closing Hour</dt>
                            <dd className="bg-white rounded-md p-1">
                                <input type="time" name="" id="" className="outline-0" />
                            </dd>
                        </dl>
                    </div>
                </div>
            ))}
        </>
    );
}
