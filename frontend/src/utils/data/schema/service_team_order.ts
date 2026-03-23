import { PhoneNumberUtil } from "google-libphonenumber";
import * as yup from "yup";

export const serviceTeamOrderSchema = yup
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
        phone: yup
            .string()
            .typeError("Phone must contain characters only")
            .matches(/^[0-9]+$/, "Phone must contain numbers only")
            .required("Phone is required"),
        country_code: yup
            .string()
            .typeError("Country Code must contain characters only")
            .required("Country Code is required"),
        phone_number: yup
            .string()
            .typeError("Phone Number must contain characters only")
            .test("phone-number", "Phone Number is invalid", function (_) {
                const { country_code, phone } = this.parent;
                if (!country_code || !phone) return true;
                try {
                    const phoneUtil = PhoneNumberUtil.getInstance();
                    const phoneNumber = phoneUtil.parse(`${country_code}${phone}`);
                    return phoneUtil.isValidNumber(phoneNumber);
                } catch (error) {
                    return false;
                }
            })
            .required("Phone Number is required"),
        part_year: yup
            .number()
            .typeError("Part Year must be a number")
            .min(1900, "Part Year must be greater than 1900")
            .max(3000, "Part Year must be less than 3000")
            .required("Part Year is required"),
        part_model: yup
            .string()
            .typeError("Part Model must contain characters only")
            .required("Part Model is required"),
        part_make: yup
            .string()
            .typeError("Part Make must contain characters only")
            .required("Part Make is required"),
        part_name: yup
            .string()
            .typeError("Part Name must contain characters only")
            .required("Part Name is required"),
        part_number: yup
            .string()
            .typeError("Part Number must contain characters only")
            .required("Part Number is required"),
        part_description: yup
            .string()
            .typeError("Part Description must contain characters only")
            .required("Part Description is required"),
        billing_address: yup
            .string()
            .typeError("Billing Address must contain characters only")
            .required("Billing Address is required"),
        shipping_address: yup
            .string()
            .typeError("Shipping Address must contain characters only")
            .required("Shipping Address is required"),
        sale_price: yup
            .number()
            .typeError("Total Price must be a number")
            .required("Total Price is required"),
        cost_price: yup
            .number()
            .typeError("Cost Price must be a number")
            .required("Cost Price is required"),
        shipping_cost: yup
            .number()
            .typeError("Shipping Cost must be a number")
            .required("Shipping Cost is required"),
        tracking_details: yup
            .string()
            .typeError("Tracking Details must contain characters only")
            .optional(),
        tracking_status: yup
            .number()
            .typeError("Tracking Status must be a number")
            .oneOf([0, 1], "Tracking Status must be 0 or 1")
            .required("Tracking Status is required"),
        payment_status: yup
            .number()
            .typeError("Payment Status must be a number")
            .oneOf([0, 1, 2], "Payment Status must be 0 or 1 or 2")
            .required("Payment Status is required"),
        payment_card_type: yup
            .number()
            .typeError("Payment Card Type must be a number")
            .when("payment_status", {
                is: (val: number | undefined) => val === 1 || val === 2,
                then: (schema) => schema.oneOf([1, 2, 3, 4], "Payment Card Type must be 1 or 2 or 3 or 4").required("Payment Card Type is required"),
                otherwise: (schema) => schema.optional(),
            }),
        payment_gateway: yup
            .number()
            .typeError("Payment Gateway must be a number")
            .when("payment_status", {
                is: (val: number | undefined) => val === 1 || val === 2,
                then: (schema) => schema.oneOf([1, 2, 3], "Payment Gateway must be 1 or 2 or 3").required("Payment Gateway is required"),
                otherwise: (schema) => schema.optional(),
            }),
        transaction_id: yup
            .string()
            .typeError("Transaction ID must contain characters only")
            .when("payment_status", {
                is: (val: number | undefined) => val === 1 || val === 2,
                then: (schema) => schema.required("Transaction ID is required"),
                otherwise: (schema) => schema.optional(),
            }),
        invoice_status: yup
            .number()
            .typeError("Invoice Status must be a number")
            .oneOf([0, 1, 2], "Invoice Status must be 0 or 1 or 2")
            .required("Invoice Status is required"),
        po_status: yup
            .number()
            .typeError("PO Status must be a number")
            .oneOf([1, 2], "PO Status must be 1 or 2")
            .required("PO Status is required"),
        order_status: yup
            .number()
            .typeError("Order Status must be a number")
            .oneOf([0, 1, 2, 3, 4, 5, 6, 7], "Order Status must be 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7")
            .required("Order Status is required"),
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
        additional_comment_required: yup
            .number()
            .typeError("Additional Comment Required must be a number")
            .oneOf([0, 1], "Additional Comment Required must be 0 or 1")
            .required(),
        additional_comment: yup
            .string()
            .typeError("Additional Comment must contain characters only")
            .when("additional_comment_required", {
                is: (val: number | undefined) => val === 1,
                then: (schema) => schema.required("Additional Comment is required"),
                otherwise: (schema) => schema.optional(),
            }),
    })
    .required();

export type ServiceTeamOrderFormValuesType = yup.InferType<typeof serviceTeamOrderSchema>;