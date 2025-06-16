export const convertTo12Hour = (time24: string): string => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const minuteString =
        minutes === 0 ? "" : `:${minutes.toString().padStart(2, "0")}`;

    return `${hour12}${minuteString}${period}`;
};

export const formatDate = (isoDateTime: string | number | Date): string => {
    try {
        const date = new Date(isoDateTime);

        if (isNaN(date.getTime())) {
            return "Invalid date";
        }

        const day = date.getDate().toString().padStart(2, "0");
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    } catch (error) {
        console.error("Error converting date:", error);
        return "Invalid date";
    }
};

export const formatRiel = (value: number): string => {
    const amount: number = isNaN(value) ? 0 : value;
    const formatted: string = new Intl.NumberFormat("en-US").format(amount);
    return formatted;
};

export const formatDateRange = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const sameYear = startDate.getFullYear() === endDate.getFullYear();
    const sameMonth = startDate.getMonth() === endDate.getMonth();

    const startFormat = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        ...(sameYear ? {} : { year: 'numeric' }),
    });

    const endFormat = endDate.toLocaleDateString('en-US', {
        ...(sameMonth ? {} : { month: 'long' }),
        day: 'numeric',
        year: 'numeric',
    });

    return `${startFormat} – ${endFormat}`;
};
