import * as yup from "yup";

export const serviceTeamOrderSchema = yup
    .object({
        total_price: yup
            .number()
            .typeError("Total Price must be a number")
            .optional(),
        cost_price: yup
            .number()
            .typeError("Cost Price must be a number")
            .optional(),
        shipping_cost: yup
            .number()
            .typeError("Shipping Cost must be a number")
            .optional(),
        tracking_details: yup
            .string()
            .typeError("Tracking Details must contain characters only")
            .optional(),
        payment_status: yup
            .number()
            .typeError("Payment Status must be a number")
            .oneOf([0, 1, 2], "Payment Status must be 0 or 1 or 2")
            .required("Payment Status is required"),
        invoice_status: yup
            .number()
            .typeError("Invoice Status must be a number")
            .oneOf([0, 1, 2], "Invoice Status must be 0 or 1 or 2")
            .required("Invoice Status is required"),
        shipment_status: yup
            .number()
            .typeError("Shipment Status must be a number")
            .oneOf([1, 2, 3, 4, 5], "Shipment Status must be 1 or 2 or 3 or 4 or 5")
            .required("Shipment Status is required"),
        yard_located: yup
            .number()
            .typeError("Yard Located must be a number")
            .oneOf([0, 1], "Yard Located must be 0 or 1")
            .required("Yard Located is required"),
        yards: yup
            .array()
            .typeError("Yard must be an array")
            .when("yard_located", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.of(yup.object({
                    yard: yup.string().typeError("Yard must contain characters only").required("Yard is required"),
                    id: yup.number().typeError("Yard ID must be a number").optional(),
                })).min(1, "Yard is required").required("Yard is required"),
                otherwise: (schema) => schema.optional(),
            }),
        comment: yup
            .string()
            .typeError("Comment must contain characters only")
            .required(),
    })
    .required();

export type ServiceTeamOrderFormValuesType = yup.InferType<typeof serviceTeamOrderSchema>;