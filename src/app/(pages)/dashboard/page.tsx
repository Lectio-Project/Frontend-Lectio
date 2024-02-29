'use client'
import Input from "@/app/components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaEdit, editFormProps } from "@/app/schemas/schemaEdit";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Dashboard(){

    const { handleSubmit,register, formState:{ errors } } = useForm<editFormProps>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaEdit)
    });

    const handleData:SubmitHandler<editFormProps> = (data) => {
        console.log('submit', data);
        console.log(errors)
    }



    return(
        <main>
            <form onSubmit={handleSubmit(handleData)}>
            
            <Input 
            register={register('name', {required: 'campo obrigatório'})}  
            placeholder="digite seu teste" type="text" label="Name" errorMessage={errors.name && errors.name.message}/>
            

            <Input 
            register={register('UserName', {required: 'campo obrigatório'})}  
            placeholder="digite seu userName" type="password" label="Password" errorMessage={errors.UserName && errors.UserName.message}
            />
            

            
            
            <button type="submit"> Teste </button>
            

            </form>

        </main>
    )
}