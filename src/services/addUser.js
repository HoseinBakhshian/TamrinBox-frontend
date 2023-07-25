import { mainAxios } from "./baseAxios";
import swal from "sweetalert";

export const addUser = async (data) => {
    try {
        const x = await mainAxios.post("/users", data);
        swal({
            text: "کاربر جدید با موفقیت اضافه شد",
            icon: "success",
        });
    } catch (error) {
        swal({
            text: "کاربر جدید اضافه نشد",
            icon: "error",
        });
    }
};