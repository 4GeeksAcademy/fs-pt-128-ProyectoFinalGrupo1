// export const checkToken = async () => {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         const data = await response.json();
//         if (!response.ok) {
//             localStorage.removeItem("token")
//             return false;
//         }
//         return data;
//     }