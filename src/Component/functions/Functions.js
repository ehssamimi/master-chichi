// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes
import * as Const from "../../constants/ServerConst";
import axios from "axios";

// Convert a Base64-encoded string to a File object
export function base64StringtoFile (base64String, filename, type) {
    var arr = base64String.split(','),
        // , mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: type})
}

// Download a Base64-encoded file

export function downloadBase64File (base64Data, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64 (base64Data) {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}
export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef (canvasRef, image64, pixelCrop) {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
}

export function gregorian_to_jalali(g_y, g_m, g_d) {
    function div(a, b) {
        return parseInt((a / b));
    }

    var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    var jalali = [];
    var gy = g_y - 1600;
    var gm = g_m - 1;
    var gd = g_d - 1;

    var g_day_no = 365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);

    for (var i = 0; i < gm; ++i)
        g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
    /* leap and after Feb */
        g_day_no++;
    g_day_no += gd;

    var j_day_no = g_day_no - 79;

    var j_np = div(j_day_no, 12053);
    /* 12053 = 365*33 + 32/4 */
    j_day_no = j_day_no % 12053;

    var jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
    /* 1461 = 365*4 + 4/4 */

    j_day_no %= 1461;

    if (j_day_no >= 366) {
        jy += div(j_day_no - 1, 365);
        j_day_no = (j_day_no - 1) % 365;
    }
    for (  i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i)
        j_day_no -= j_days_in_month[i];
    var jm = i + 1;
    var jd = j_day_no + 1;
    jalali[0] = jy;
    jalali[1] = jm;
    jalali[2] = jd;
    return jalali;
    //return jalali[0] + "_" + jalali[1] + "_" + jalali[2];
    //return jy + "/" + jm + "/" + jd;
}

export async  function  sendImg(file,permission){
    // let data = new FormData();
    // data.append("PermissionLevel",permission);
    // data.append("file",file);
    //
    // let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    //
    // xhr.open("POST", `${Const.Download_Server_URL}upload/data-form`);
    // xhr.setRequestHeader("Id",  Const.ID );
    // xhr.setRequestHeader("Token", Const.Token);
    //
    // xhr.send(data);
    //
    // await xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         let response=JSON.parse(this.responseText);
    //         let {UploadId} = response;
    //         console.log(UploadId);
    //         return UploadId;
    //      }
    // });
    let formData = new FormData();
    formData.append("PermissionLevel", 'Public');
    formData.append("file", file);

    // formData.append("Name",'Public1');
    // let  data= {"Name": "adsfasfasgf"}
    //  let BODY={"Name": "adsfasfasgf"};
    //
    let headers = {
        'Token': Const.Token,
        'Id': Const.ID,
        // 'Content-Type':'application/x-www-form-urlencoded'
    };

    let res = await axios.post(`${Const.Download_Server_URL}upload/data-form`,formData, {headers: headers});
    let { UploadId } = res.data ;
    let { status } = res ;
    // console.log(res);
    if (status===200) {
        return UploadId
    }else {
        return ""
    }
    // console.log(UploadId);
    // console.log(status);

    // //
    // await axios.post(`${Const.Download_Server_URL}upload/data-form`,formData, {headers: headers}).then(response => {
    //     console.log(response);
    //     console.log(response.data);
    //     console.log(response.status);
    //     if (response.status===200) {
    //                 let {UploadId} = response.data;
    //                 console.log(UploadId);
    //         return UploadId
    //     }


    //
    // }).catch(error => {
    //     console.log(error)
    //  });

}



