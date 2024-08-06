<script setup lang="ts">
    import type { Contact_Form_Blocks } from "@/graphql/generated/graphql";
    import { useCreate_Contact_FormMutation } from "@/graphql/generated/graphql";
    import * as zod from "zod";
    import { toTypedSchema } from "@vee-validate/zod";

    // Translate zod errors to danish.
    const danishErrorMap: zod.ZodErrorMap = (issue, ctx) =>
    {
        if (issue.code === zod.ZodIssueCode.too_small)
            if (issue.type === "string")
                return { message: "Skal minimum have en længe på " + issue.minimum + " karakterer", };
            else if (issue.type === "number")
                return { message: "Skal være lig med eller større end " + issue.minimum, };

        if (issue.code === zod.ZodIssueCode.too_big)
            if (issue.type === "string")
                return { message: "Må maximum have en længe på " + issue.maximum + " karakterer", };
            else if (issue.type === "number")
                return { message: "Skal være lig med eller mindre end " + issue.maximum, };

        if (issue.code === zod.ZodIssueCode.invalid_type)
        {
            if (issue.received === "undefined") return { message: "Skal udfyldes", };
            if (issue.expected === "string") return { message: "Må kun indeholde bogstaver" };
            if (issue.expected === "number") return { message: "Må kun indeholde tal" };
        }

        return { message: ctx.defaultError };
    };
    zod.setErrorMap(danishErrorMap);

    // Properties.
    interface Properties
    {
        data: Contact_Form_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_vertical_padding, has_horizontal_padding, background_color, title, description } = toRefs(props.data);
    const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: toTypedSchema(zod.object({
        name: zod.string().min(1).max(50),
        company: zod.string().min(1).max(50),
        email: zod.string().email(),
        phone: zod.string().regex(/^([+](\d{1,3})\s?)?((\(\d{3,5}\)|\d{3,5})(\s)?)\d{3,8}$/, { message: "Skal være et gyldigt telefon nr." }),
        message: zod.string().min(0).max(500).optional(),
    })) });
    const { value: name, errorMessage: nameErorMessage } = useField<string>("name");
    const { value: company, errorMessage: companyErrorMessage } = useField<string>("company");
    const { value: email, errorMessage: emailErrorMessage } = useField<string>("email");
    const { value: phone, errorMessage: phoneErrorMessage } = useField<string>("phone");
    const { value: message, errorMessage: messageErrorMessage } = useField<string|undefined>("message");
    const { executeMutation: createContactForm, error } = useCreate_Contact_FormMutation();
    const showCheckmark = ref(false);

    // Methods.
    const onSubmit = handleSubmit(async data =>
    {
        var result = await createContactForm({ data });
        if (!result.data?.create_contact_forms_item) return;

        resetForm();
        showCheckmark.value = true;
    });

    const checkMarkAnimationFinished = () => setTimeout(() => showCheckmark.value = false, 1500);
</script>

<template>
    <template v-if="__typename === 'contact_form_blocks'">
        <section id="contact-form-section" :class="[ has_vertical_padding ? 'py-12 mt-8' : '', 'flex justify-center items-center w-full xl:px-12' ]">
            <div :class="[ has_vertical_padding ? 'py-10' : '', has_horizontal_padding ? '' : '', 'flex justify-center items-center w-full' ]">
                <div :class="[ width?.class,
                               width?.class === 'max-w-7xl xl:max-w-8xl 4xl:max-w-10xl' ? 'grid-cols-1 lg:grid-cols-[1.2fr,0.2fr,1.5fr] 4xl:grid-cols-[1.2fr,0.5fr,1.2fr]' : 'grid-cols-1 lg:grid-cols-[1.2fr,0.5fr,1.4fr] 4xl:grid-cols-[1.2fr,0.5fr,1.5fr]',
                               has_horizontal_padding ? 'lg:px-6' : '',
                               'grid w-full' ]">

                    <!-- Description -->
                    <div class="prose px-6 lg:px-0">
                        <h2>{{ title }}</h2>
                        <div class="mt-5" v-html="description" />

                        <dl class="mt-12 flex flex-col gap-5">
                            <div class="inline-flex space-x-5 items-center">
                                <dt >
                                    <Icon name="tabler:phone" class="h-5 w-5 text-gray-900" aria-hidden="true" role="presentation" />
                                    <span class="sr-only">Telefon</span>
                                </dt>
                                <dd>
                                    <a href="tel:+4520136133" class="text-gray-700 !font-normal !no-underline hover:underline">+45 20 13 61 33</a>
                                </dd>
                            </div>
                            
                            <div class="inline-flex space-x-5 items-center">
                                <dt >
                                    <Icon name="tabler:mail" class="h-5 w-5 text-gray-900" aria-hidden="true" role="presentation" />
                                    <span class="sr-only">E-mail</span>
                                </dt>
                                <dd>
                                    <a href="mailto:info@formula-micro.dk" class="text-gray-700 !font-normal !no-underline hover:underline">info@formula-micro.dk</a>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div class="h-12 2xl:h-0" />

                    <!-- Form -->
                    <form id="contact-form" method="POST" @submit.prevent="onSubmit" :class="[ background_color?.class, 'relative grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 text-white lg:rounded-xl px-6 xl:px-12 py-24' ]">
                        <div>
                            <Icon name="tabler:send" class="absolute top-0 left-0 mt-9 ml-9 h-10 w-10" />
                        </div>

                        <!-- Name -->
                        <div class="col-span-2">
                            <div class="relative z-0">
                                <input id="name" type="text" v-model="name" class="block pt-4 pb-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder="">
                                <label for="name" class="absolute text-lg text-white duration-300 transform -translate-y-6 scale-95 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6">Navn</label>
                            </div>
                            <p v-if="nameErorMessage" class="mt-1 text-sm text-white">{{ nameErorMessage }}</p>
                            <p v-if="!nameErorMessage" class="mt-1 text-sm select-none">&nbsp;</p>
                        </div>

                        <!-- Company -->
                        <div class="col-span-2">
                            <div class="relative z-0">
                                <input id="company" type="text" v-model="company" class="block pt-4 pb-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder="">
                                <label for="company" class="-ml-0.5 absolute text-lg text-white duration-300 transform -translate-y-6 scale-95 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6">Virksomhed</label>
                            </div>
                            <p v-if="companyErrorMessage" class="mt-1 text-sm text-white">{{ companyErrorMessage }}</p>
                            <p v-if="!companyErrorMessage" class="mt-1 text-sm select-none">&nbsp;</p>
                        </div>

                        <!-- E-mail address -->
                        <div class="col-span-1">
                            <div class="relative z-0">
                                <input id="email" type="email" v-model="email" class="block pt-4 pb-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder="">
                                <label for="email" class="absolute text-lg text-white duration-300 transform -translate-y-6 scale-95 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6">E-mail</label>
                            </div>
                            <p v-if="emailErrorMessage" class="mt-1 text-sm text-white">{{ emailErrorMessage }}</p>
                            <p v-if="!emailErrorMessage" class="mt-1 text-sm select-none">&nbsp;</p>
                        </div>

                        <!-- Phone -->
                        <div class="col-span-1">
                            <div class="relative z-0">
                                <input id="phone" type="text" v-model="phone" class="block pt-4 pb-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder="">
                                <label for="phone" class="absolute text-lg text-white duration-300 transform -translate-y-6 scale-95 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6">Telefon nr.</label>
                            </div>
                            <p v-if="phoneErrorMessage" class="mt-1 text-sm text-white">{{ phoneErrorMessage }}</p>
                            <p v-if="!phoneErrorMessage" class="mt-1 text-sm select-none">&nbsp;</p>
                        </div>

                        <!-- Message -->
                        <div class="col-span-2">
                            <div class="relative z-0">
                                <textarea id="message" rows="5" v-model="message" class="block pt-4 pb-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder="" />
                                <label for="message" class="absolute text-lg text-white duration-300 transform -translate-y-6 scale-95 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6">Besked</label>
                            </div>
                            <p v-if="messageErrorMessage" class="mt-1 text-sm text-white">{{ messageErrorMessage }}</p>
                            <p v-if="!messageErrorMessage" class="mt-1 text-sm select-none">&nbsp;</p>
                        </div>

                        <!-- Art. 13 GDPR: Information to be provided where personal data are collected from the data subject -->
                        <div class="col-span-2 prose leading-relaxed text-white">
                            <p>Dine oplysninger, som du indtaster i vores kontaktformular, bruges til at besvare din henvendelse.</p>
                            <p>I vores <a href="#" class="text-white !font-normal hover:underline">persondatapolitik</a> kan du læse mere om, hvordan vi behandler dine persondata, samt hvilke rettigheder du har.</p>
                        </div>

                        <!-- When we're unable to submit the contact form, show the error -->
                        <div v-if="error" class="col-span-2 flex justify-between items-center text-red-600 bg-white px-3 py-2 rounded-xl">
                            <div>
                                <p class="font-bold tracking-wide">Fejl</p>
                                <p class="mt-1">{{ error }}</p>
                            </div>

                            <button type="button" @click="error = undefined" class="font-semibold text-gray-900 px-3 py-2 hover:bg-gray-200/95 rounded-xl transition transform duration-150">Skjul</button>
                        </div>

                        <!-- Submit button -->
                        <button type="submit" :disabled="isSubmitting" :class="[ 'hover:' + background_color?.class?.replace('bg', 'text'), 'border-2 border-white hover:bg-white/90 transition transform duration-150 rounded-full px-5 py-3' ]">Send</button>

                        <!-- Lottie checkmark animation -->
                        <HeadlessTransitionRoot
                            appear
                            :show="showCheckmark"
                            as="template"
                            enter="transform transition duration-700"
                            enter-from="opacity-20"
                            enter-to="opacity-100"
                            leave="transform transition duration-700"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div :class="[ background_color?.class, 'absolute inset-0 flex justify-center items-center bg-opacity-70 lg:rounded-xl' ]">
                                <ClientOnly>
                                    <Lottie animation-link="/checkmark_animation.json" :height="200" :width="200" :speed="0.75" :loop="1" @on-complete="checkMarkAnimationFinished" />
                                </ClientOnly>
                            </div>
                        </HeadlessTransitionRoot>
                    </form>
                </div>
            </div>
        </section>
    </template>
</template>

<style scoped>
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active {
        -webkit-background-clip: text;
        -webkit-text-fill-color: #ffffff;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>