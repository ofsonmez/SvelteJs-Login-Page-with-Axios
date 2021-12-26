import { number, object, string } from 'yup'
import { Field }                  from 'svelte-forms-validation'


export class Role {
    @Field(string().required().oneOf(['admin', 'test'])) name: string
}

export class User {
    @Field(number().optional()) id?: number
    @Field(string().required()) username: string
    @Field(string().required()) password: string
    @Field(string().required()) firstName: string
    @Field(string().required()) lastName: string
    @Field(object()) role: Role
}
