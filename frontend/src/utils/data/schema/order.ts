import * as yup from "yup";

export const orderApprovalSchema = yup
    .object({
        order_status: yup
            .number()
            .typeError("Order Status must be a number")
            .oneOf([1, 2], "Order Status must be 1 or 2")
            .required(),
    })
    .required();

export type OrderApprovalFormValuesType = yup.InferType<typeof orderApprovalSchema>;