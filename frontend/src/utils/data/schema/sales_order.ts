import * as yup from "yup";

export const salesOrderSchema = yup
    .object({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
        email: yup
            .string()
            .typeError("Email must contain characters only")
            .email("Please enter a valid email")
            .required("Email is required"),
        is_active: yup
            .number()
            .typeError("Is Active must be a number")
            .oneOf([0, 1], "Is Active must be 0 or 1")
            .required(),
        phone: yup
            .string()
            .typeError("Phone must contain characters only")
            .when("is_active", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.matches(/^[0-9]+$/, "Phone must contain numbers only").length(10, "Phone must contain exactly 10 digits").required("Phone is required"),
                otherwise: (schema) => schema.optional(),
            }),
        country_code: yup
            .string()
            .typeError("Country Code must contain characters only")
            .when("is_active", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.required("Country Code is required"),
                otherwise: (schema) => schema.optional(),
            }),
        billing_address: yup
            .string()
            .typeError("Billing Address must contain characters only")
            .when("is_active", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.required("Billing Address is required"),
                otherwise: (schema) => schema.optional(),
            }),
        part_name: yup
            .string()
            .typeError("Part Name must contain characters only")
            .when("is_active", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.required("Part Name is required"),
                otherwise: (schema) => schema.optional(),
            }),
        part_description: yup
            .string()
            .typeError("Part Description must contain characters only")
            .when("is_active", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.required("Part Description is required"),
                otherwise: (schema) => schema.optional(),
            }),
        lead_source: yup
            .number()
            .typeError("Lead Source must be a number")
            .oneOf([2, 3], "Lead Source must be 2 or 3")
            .required(),
    })
    .required();

export type SalesOrderFormValuesType = yup.InferType<typeof salesOrderSchema>;