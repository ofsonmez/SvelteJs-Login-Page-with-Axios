 <script lang="ts">
    import {navigate} from "svelte-routing";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import axios, { AxiosError } from "axios";
    import type { AuthResponse } from "./models/auth.response";
    import { userStore } from "../users/store/user-store";

    let loginResponse: AuthResponse = <AuthResponse>{};
    let errorVar = false;

    const { form, errors, state, handleChange, handleSubmit } = createForm({
      initialValues: {
        username: "",
        password: ""
      },
      validationSchema: yup.object().shape({
        username: yup.string().required().min(4),
        password: yup
          .string()
          .required()
      }),
      onSubmit: values => {
        login(values.username, values.password);
      }
    });

    async function login(username: string, password: string) {
        try {
            const response = await axios.post("http://localhost:3000/login", {
            username,
            password
            });

            loginResponse.user = response.data;
            userStore.set({...loginResponse, loggedIn: true});
            navigate("/");
            
        } catch (error) {
            const err = error as AxiosError;
            errorVar = true;
            $form.username = '';
            $form.password = '';
        }
    }

</script>

<div class="3xl:w-8/12 2xl:h-4/6 m-auto flex flex-wrap">
    <!-- use tailwind.css -->    
    <div class="w-full md:w-1/2 justify-center flex flex-col">
        {#if errorVar}
        <div role="alert" class=" w-6/12 ml-4 mt-4" >
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              <span>Error</span>
              <button style="float: right;" on:click={e => errorVar = false}>X</button>
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Opss. Something went wrong!</p>
            </div>
        </div>
        {/if}
        <div class="flex justify-center my-auto md:-mb-24">
            <a href="/" class="bg-purple-500 text-white font-bold text-xl p-4">Logo</a>
        </div>
        <div class="flex flex-col justify-center my-auto md:justify-start pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p class="text-center text-2xl">Login</p>
            <p class="text-center text-base mt-2">Please enter your username and password. <br /> SFEH Login System v2.0.1</p>
            <form class="flex flex-col pt-3 md:pt-8" on:submit={handleSubmit}>
                <div class="flex flex-col pt-4">
                    <input type="text" 
                    id="username" 
                    name="username"
                    placeholder="Username" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" 
                    on:change={handleChange} 
                    on:blur={handleChange} 
                    bind:value={$form.username}>
                    {#if $errors.username}
                        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{$errors.username}</p>
                    {/if}
                </div>
                <div class="flex flex-col pt-4">
                    <input type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" 
                    on:change={handleChange}  
                    on:blur={handleChange}
                    bind:value={$form.password}>
                    {#if $errors.password}
                        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{$errors.password}</p>
                    {/if}
                </div>
                <button type="submit" disabled='{!($form.username && $form.password)}' class:cursor-not-allowed={!($form.username && $form.password) || $form.username.length < 4} class="bg-blue-500 text-white hover:bg-blue-400 font-bold text-lg p-2 mt-5">Sign In</button>
            </form>
            
        </div>
    </div>
    <div class="w-1/2 shadow-2xl">
        <img class="object-cover w-full h-screen hidden md:block" alt="imageForExample" src="https://source.unsplash.com/random">
    </div>
</div>
