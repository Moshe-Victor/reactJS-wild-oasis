import supabase, {supabaseUrl} from "./supabase";
export async function getCabins() {
    const {data, error} = await supabase.from('cabins').
    select('*');

    if (error){
        console.error(error);
        throw new Error("Cabins could not be loaded.");
    }

    return data;
}

export async function createEditCabin(newCabin, id){

    // check if is new image or existing(checking the supabase url).
    // Also, newCabin.image might not be a string, and we won't be able to
    // call the function startsWith() so we do optional chaining.
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    //https://urlemocvfelqydgwmkch.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-04-18T15%3A26%3A58.150Z

    const imagePath = hasImagePath ? newCabin.image :
        `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //.create cabin
    let query = supabase.from("cabins");

    // const { data, error } = await supabase
    //     .from("cabins")
    //     .insert(
    //         [{...newCabin, image: imagePath}].select().single()
    //     );

    //A) CREATE
    if (!id)
        query =
            query.insert(
                [{...newCabin, image: imagePath}]);

    //B) EDIT
    if (id) {
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id);
    }

    const {data, error} = await query.select().single();

    if (error){
        console.error(error);
        throw new Error("Cabin could not be created.");
    }

    //2. upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uplaoding image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error){
        console.error(error);
        throw new Error("Cabin could not be deleted.");
    }

    return data;

}