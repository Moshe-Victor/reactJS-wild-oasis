
import {useMutation, useQueryClient} from "@tanstack/react-query";import Input from "../../ui/Input";import Form from "../../ui/Form";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {createCabin} from "../../services/apiCabins.js";

import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState
    } = useForm();

    const {errors} = formState;

    const queryClient = useQueryClient();

    const {mutate, isLoading: isCreating} = useMutation({
            mutationFn: createCabin,
            onSuccess: () => {
                toast.success("New cabin successfully created");
                queryClient.invalidateQueries({queryKey: ["cabins"]})
                reset();
            },
            onError: (err) => toast.error(err.message),
        }
    );

    function onSubmit(data) {
        //console.log(data);
        mutate({...data, image: data.image[0]});
    }

    function onError(error) {
        console.log(error);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name",
                        {
                            required: "This field is required",
                        })}/>
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity",
                        {
                            required: "This field is required",
                            min: {value: 1, message: "Capacity must be at least 1"}
                        })}/>
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice",
                        {
                            required: "This field is required",
                        })}/>
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isCreating}
                    {...register("discount",
                        {
                            required: "This field is required",
                            validate: (value) => value < getValues().regularPrice || "Discount should be less than regular price",
                        })}/>
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="text"
                    id="description"
                    defaultValue=""
                    disabled={isCreating}
                    {...register("description",
                        {
                            required: "This field is required",
                        })}/>
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image"
                           accept="image/*"
                           type="file"
                           {...register("image",
                               {
                                   required: "This field is required",
                               })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>

            {/*<FormRow>*/}
            {/*    <Label htmlFor="name">Cabin name</Label>*/}
            {/*    <Input type="text" id="name" {...register("name", {required: "This field is required",})}/>*/}
            {/*    {errors?.name?.message && errors.name.message}*/}
            {/*</FormRow>*/}

            {/*<FormRow>*/}
            {/*    <Label htmlFor="maxCapacity">Maximum capacity</Label>*/}
            {/*    <Input type="number" id="maxCapacity" {...register("maxCapacity", {*/}
            {/*        required: "This field is required",*/}
            {/*        min: {value: 1, message: "Capacity must be at least 1"}*/}
            {/*    })}/>*/}
            {/*</FormRow>*/}

            {/*<FormRow>*/}
            {/*    <Label htmlFor="regularPrice">Regular price</Label>*/}
            {/*    <Input type="number"*/}
            {/*           id="regularPrice" {...register("regularPrice", {required: "This field is required",})}/>*/}
            {/*</FormRow>*/}

            {/*<FormRow>*/}
            {/*    <Label htmlFor="discount">Discount</Label>*/}
            {/*    <Input type="number" id="discount"*/}
            {/*           defaultValue={0} {...register("discount", {*/}
            {/*        required: "This field is required",*/}
            {/*        validate: (value) => value < getValues().regularPrice || "Discount should be less than regular price"*/}

            {/*    })}/>*/}
            {/*</FormRow>*/}

            {/*<FormRow>*/}
            {/*    <Label htmlFor="description">Description for website</Label>*/}
            {/*    <Textarea type="number" id="description"*/}
            {/*              defaultValue="" {...register("description", {*/}
            {/*        required: "This field is required",*/}
            {/*    })}/>*/}
            {/*</FormRow>*/}

            {/*<FormRow >*/}
            {/*    <Label htmlFor="image">Cabin photo</Label>*/}
            {/*    <FileInput id="image" accept="image/*"/>*/}
            {/*</FormRow>*/}

            {/*<FormRow>*/}
            {/*    /!* type is an HTML attribute! *!/*/}
            {/*    <Button variation="secondary" type="reset">*/}
            {/*        Cancel*/}
            {/*    </Button>*/}
            {/*    <Button disabled={isCreating}>Add cabin</Button>*/}
            {/*</FormRow>*/}
        </Form>
    );
}

export default CreateCabinForm;
