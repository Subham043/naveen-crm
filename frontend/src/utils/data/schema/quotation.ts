import * as yup from "yup";

import { PhoneNumberUtil } from 'google-libphonenumber';

export const quotationPublicCreateSchema = yup
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
            .typeError("Part must contain characters only")
            .required("Part is required"),
        part_description: yup
            .string()
            .typeError("Part Description must contain characters only")
            .required("Part Description is required"),
        captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
    })
    .required();

export type QuotationPublicCreateFormValuesType = yup.InferType<typeof quotationPublicCreateSchema>;

export const quotationApprovalSchema = yup
    .object({
        quotation_status: yup
            .number()
            .typeError("Quotation Status must be a number")
            .oneOf([1, 2], "Quotation Status must be 1 or 2")
            .required(),
    })
    .required();

export type QuotationApprovalFormValuesType = yup.InferType<typeof quotationApprovalSchema>;

export const quotationUpdateSchema = yup
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
        quotation_sent: yup
            .number()
            .typeError("Quotation Sent must be a number")
            .oneOf([0, 1], "Quotation Sent must be 0 or 1")
            .required(),
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
        billing_address: yup
            .string()
            .typeError("Billing Address must contain characters only")
            .required("Billing Address is required"),
        shipping_address: yup
            .string()
            .typeError("Shipping Address must contain characters only")
            .required("Shipping Address is required"),
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
            .typeError("Part must contain characters only")
            .required("Part is required"),
        part_number: yup
            .string()
            .typeError("Part# must contain characters only")
            .required("Part# is required"),
        part_warranty: yup
            .number()
            .typeError("Part Warranty must be a number")
            .min(0, "Part Warranty must be greater than 0")
            .max(12, "Part Warranty must be less than 12")
            .required("Part Warranty is required"),
        part_description: yup
            .string()
            .typeError("Part Description must contain characters only")
            .required("Part Description is required"),
        sale_price: yup
            .number()
            .typeError("Sale Price must be a number")
            .required("Sale Price is required"),
        cost_price: yup
            .number()
            .typeError("Cost Price must be a number")
            .required("Cost Price is required"),
        shipping_cost: yup
            .number()
            .typeError("Shipping Cost must be a number")
            .required("Shipping Cost is required"),
    })
    .required();

export type QuotationUpdateFormValuesType = yup.InferType<typeof quotationUpdateSchema>;