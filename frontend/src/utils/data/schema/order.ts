import * as yup from "yup";

import { PhoneNumberUtil } from 'google-libphonenumber';

export const orderPublicCreateSchema = yup
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
        part_name: yup
            .string()
            .typeError("Part Name must contain characters only")
            .required("Part Name is required"),
        part_description: yup
            .string()
            .typeError("Part Description must contain characters only")
            .required("Part Description is required"),
        captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
    })
    .required();

export type OrderPublicCreateFormValuesType = yup.InferType<typeof orderPublicCreateSchema>;

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