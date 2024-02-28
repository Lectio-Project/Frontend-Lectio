'use client'
import Input from "@/app/components/input/input";
import { useForm } from "react-hook-form";


export default function Dashboard(){

    const { handleSubmit,register } = useForm({
        mode: 'onSubmit'
    });

    function handleSubmitData(data:any){
        console.log('submit', data);
        
    }



    return(
        <main>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            
            <Input {...register('teste')}  placeholder="digite seu teste" type="text"  />
            
            <button type="submit">Teste </button>

            </form>

        </main>
    )
}