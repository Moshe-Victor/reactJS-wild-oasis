import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDelete() {

    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: ()=> {
            toast.success("cabin deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return {
        isDeleting, deleteCabin
    }
}