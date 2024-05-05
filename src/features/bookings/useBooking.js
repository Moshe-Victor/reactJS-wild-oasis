import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getBooking} from "../../services/apiBookings";
export function useBooking() {

    const {bookingId} = useParams();

    console.log(bookingId);

    const {isLoading, data: booking, error
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry:false,
    });
    //console.log(booking);
    return {isLoading, error, booking};
}