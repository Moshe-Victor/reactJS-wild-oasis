import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";

import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isCreating || isEditing;
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState
    } = useForm(
        {defaultValues: isEditSession ? editValues : {}}
    );

    const {errors} = formState;

    function onSubmit(data) {
        //console.log(data);
        const image = typeof data.image === 'string' ?
            data.image : data.image[0];

        if (isEditSession)
            editCabin(
                {newCabinData: {...data, image}, id: editId},
                {
                    onSuccess: (data) => {
                        //console.log(data);
                        reset(data);
                        onCloseModal?.();
                    },
                },
                );
        else
            createCabin({...data, image: image},
                {
                    onSuccess: (data) => {
                        console.log(data);
                        reset(data);
                        onCloseModal?.();
                    },
                }
            );
        //createCabin({...data});
    }

    function onError(error) {
        console.log(error);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}
        type = {onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name",
                        {
                            required: "This field is required",
                        })}/>
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
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
                    disabled={isWorking}
                    {...register("discount",
                        {
                            required: "This field is required",
                            validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price",
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
                    disabled={isWorking}
                    {...register("description",
                        {
                            required: "This field is required",
                        })}/>
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image"
                           accept="image/*"
                           {...register("image",
                               {
                                   required: isEditSession ? false : "This field is required",
                               }
                           )}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset"
                onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
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
