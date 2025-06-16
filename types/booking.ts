// Updated types - Fix the prop structure
export type BookingHistoryDetailsProps = {
    bookingId: string;
    bookingType: string;
    bookingDate: string;
    createAt: string;
    museumName:string | "";
    qrCodeData: {
        base64Image : string;
        dataUrl:string;
    }
    ticketType?: string;
    ticketPrice?: string | "0"; 
    ticketStatus?: string;
    slotAmount?: string;
    qrCode?: string;
    totalPrice?:string;
}

// This should be the component props type, not the API response type
export type BookingDetailsComponentProps = {
    bookingData?: BookingHistoryDetailsProps;
}

// This is your API response type
export type BookingDetailsResponseProps = {
    payload?: BookingHistoryDetailsProps;
}