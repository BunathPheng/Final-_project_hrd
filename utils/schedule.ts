type DayOfWeek =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

interface ScheduleEntry {
    scheduleId: string;
    dayOfWeek: DayOfWeek;
    openingTime: string;
    closingTime: string;
    dayOff: boolean;
    createdAt: string;
    updatedAt: string | null;
}

interface ScheduleGroup {
    scheduleRange: string;
    dayOff: boolean;
    openingTime?: string;
    closingTime?: string;
}

// Mapping for correct weekday order
const dayOrder: Record<DayOfWeek, number> = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
};

interface GroupOptions {
    removeDayOff?: boolean;
}

export const groupSchedule = (
    schedule: ScheduleEntry[],
    options: GroupOptions = {}
): ScheduleGroup[] => {
    const result: ScheduleGroup[] = [];

    if (schedule.length === 0) return [];

    // Sort schedule by day of week
    const sorted = [...schedule].sort(
        (a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]
    );

    let currentGroup: ScheduleGroup & {
        startDay?: DayOfWeek;
        endDay?: DayOfWeek;
    } = {
        dayOff: sorted[0]?.dayOff ?? true,
        scheduleRange: "",
        openingTime: sorted[0]?.openingTime,
        closingTime: sorted[0]?.closingTime,
    };

    for (const entry of sorted) {
        if (entry.dayOff !== currentGroup.dayOff) {
            // Finalize current group
            if (currentGroup.dayOff === false) {
                if (currentGroup.startDay === currentGroup.endDay) {
                    currentGroup.scheduleRange = currentGroup.startDay!;
                } else {
                    currentGroup.scheduleRange = `${currentGroup.startDay} - ${currentGroup.endDay}`;
                }
            } else {
                currentGroup.scheduleRange = "";
            }

            result.push(currentGroup as ScheduleGroup);

            // Start new group
            currentGroup = {
                dayOff: entry.dayOff,
                scheduleRange: "",
                openingTime: entry.dayOff ? undefined : entry.openingTime,
                closingTime: entry.dayOff ? undefined : entry.closingTime,
                startDay: entry.dayOfWeek,
                endDay: entry.dayOfWeek,
            };
        } else {
            if (
                !currentGroup.startDay ||
                !currentGroup.endDay ||
                dayOrder[entry.dayOfWeek] > dayOrder[currentGroup.endDay]
            ) {
                currentGroup.startDay =
                    currentGroup.startDay || entry.dayOfWeek;
                currentGroup.endDay = entry.dayOfWeek;
            }
        }
    }

    // Push the last group
    if (currentGroup.dayOff === false) {
        if (currentGroup.startDay === currentGroup.endDay) {
            currentGroup.scheduleRange = currentGroup.startDay!;
        } else {
            currentGroup.scheduleRange = `${currentGroup.startDay} - ${currentGroup.endDay}`;
        }
    } else {
        currentGroup.scheduleRange = "";
    }

    result.push(currentGroup as ScheduleGroup);

    // 🛠️ Optional filtering based on config
    if (options.removeDayOff) {
        return result.filter((group) => !group.dayOff);
    }

    return result;
};
