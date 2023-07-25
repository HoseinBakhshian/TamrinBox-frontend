import { mainAxios } from "./baseAxios";
import swal from "sweetalert";


export const updateUser = async (data, id) => {
    try {
        const x = await mainAxios.put(`/users/${id}`, data);

        swal({
            text: "ویرایش با موفقیت انجام شد",
            icon: "success",
        });
    } catch (error) {
        swal({
            text: "ویرایش با خطا مواجه شد",
            icon: "error",
        });
    }
};