export declare const createReservation: (data: {
    customerName: string;
    phone: string;
    adults: number;
    children: number;
    bookingDate: string | Date;
    occasion?: string;
    notes?: string;
}) => Promise<{
    id: number;
    customerName: string;
    phone: string;
    status: string;
    adults: number;
    children: number;
    bookingDate: Date;
    occasion: string | null;
    notes: string | null;
}>;
export declare const getReservations: () => Promise<{
    id: number;
    customerName: string;
    phone: string;
    status: string;
    adults: number;
    children: number;
    bookingDate: Date;
    occasion: string | null;
    notes: string | null;
}[]>;
export declare const updateReservationStatus: (id: number, status: string) => Promise<{
    id: number;
    customerName: string;
    phone: string;
    status: string;
    adults: number;
    children: number;
    bookingDate: Date;
    occasion: string | null;
    notes: string | null;
}>;
export declare const deleteReservation: (id: number) => Promise<{
    id: number;
    customerName: string;
    phone: string;
    status: string;
    adults: number;
    children: number;
    bookingDate: Date;
    occasion: string | null;
    notes: string | null;
}>;
//# sourceMappingURL=reservationService.d.ts.map