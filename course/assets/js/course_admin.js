"use strict"
/**REGION 1 */
const gREQUEST_STATUS_OK = 200;
const gREQUEST_CREATE_OK = 201; // status 201 là tạo mới thành công
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gCONTENT_TYPE = "application/json;charset=UTF-8";

const gBASE_URL = "https://624abe0dfd7e30c51c110ac6.mockapi.io/api/v1/";
var vBASE_URL_COURSES = gBASE_URL + "courses/";

var gCourseId = 0;
var vNumberical = 1;
var vLevelList = [];

var vCOURSE_COL = ["id", "courseCode", "courseName", "price",
    "discountPrice", "duration", "level", "coverImage",
    "teacherPhoto", "teacherName", "isPopular", "isTrending", "action"];

const gCOURSE_NUMBERIAL_COL = 0;
const gCOURSE_CODE_COL = 1;
const gCOURSE_NAME_COL = 2;
const gCOURSE_PRICE_COL = 3;
const gCOURSE_DISCOUNT_PRICE_COL = 4;
const gCOURSE_DURATION_COL = 5;
const gCOURSE_LEVEL_COL = 6;
const gCOURSE_COVER_IMG_COL = 7;
const gCOURSE_TEACHER_PHOTO_COL = 8;
const gCOURSE_TEACHER_NAME_COL = 9;
const gCOURSE_IS_POPULAR_COL = 10;
const gCOURSE_IS_TRENDING_COL = 11;
const gCOURSE_ACTION_COL = 12;

//Khai bao DataTable % mapping columns

var vCoursesTable = $("#courses-table").DataTable({

    columns: [
        { data: vCOURSE_COL[gCOURSE_NUMBERIAL_COL] },
        { data: vCOURSE_COL[gCOURSE_CODE_COL] },
        { data: vCOURSE_COL[gCOURSE_NAME_COL] },
        { data: vCOURSE_COL[gCOURSE_PRICE_COL] },
        { data: vCOURSE_COL[gCOURSE_DISCOUNT_PRICE_COL] },
        { data: vCOURSE_COL[gCOURSE_DURATION_COL] },
        { data: vCOURSE_COL[gCOURSE_LEVEL_COL] },
        { data: vCOURSE_COL[gCOURSE_COVER_IMG_COL] },
        { data: vCOURSE_COL[gCOURSE_TEACHER_PHOTO_COL] },
        { data: vCOURSE_COL[gCOURSE_TEACHER_NAME_COL] },
        { data: vCOURSE_COL[gCOURSE_IS_POPULAR_COL] },
        { data: vCOURSE_COL[gCOURSE_IS_TRENDING_COL] },
        { data: vCOURSE_COL[gCOURSE_ACTION_COL] },
    ],

    columnDefs: [

        {
            targets: gCOURSE_NUMBERIAL_COL,
            render: function () {
                return vNumberical++;
            }
        },

        {
            targets: gCOURSE_ACTION_COL,
            defaultContent: `
            <div class="action-btn">
                <button class="icon-button col-11 bg-success edit-course">
                    <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="icon-button col-11 bg-danger delete-course">
                    <i class="far fa-trash-can"></i>
                </button>
            </div>
         `
        },

        {
            targets: gCOURSE_COVER_IMG_COL,
            render: function (data, type, row, meta) {
                return `<div class="text-center">
                             <img src=" ${data} " style="width: 100%;">
                     </div>`;
            },
        },

        {
            targets: gCOURSE_TEACHER_PHOTO_COL,
            render: function (data, type, row, meta) {
                return `<div class="text-center">
                             <img src=" ${data} " style="width: 70%;">
                     </div>`;
            },
        }
    ],
});


/**REGION 2 */
$(document).ready(function () {
    onPageLoading();
});


//Gan su kien create 1 course
$("#btn-add-course").on("click", function () {
    onBtnAddNewCourseClick(this);
    console.log("nut them")
});
//Gan su kien create new course MODAL
$("#btn-create-newCourse").on("click", function () {
    onBtnCreateNewCourseModalClick();
});


//Gan su kien Update Course
$("#courses-table").on("click", ".edit-course", function () {
    onBtnEditCourseClick(this);
});
//Gan su kien update course MODAL
$("#btn-update-course").on("click", function () {
    onBtnUpdateCourseModalClick();
});


//Gan su kien Delete course
$("#courses-table").on("click", ".delete-course", function () {
    onBtnDeleteCourseClick(this);
});
//gan su kien confirm delete
$("#btn-confirm-delete-course").on("click", function () {
    onBtnConfirmDeleteModal();
});
/**REGION 3 */


function onPageLoading() {
    getAllCourses();
}


//Ham xu ly su kien khi nhan nut New Course
function onBtnAddNewCourseClick(paramCreate) {
    $("#create-course-modal").modal("show");
}

//Ham xu ly su kien Add New Course MoDal
function onBtnCreateNewCourseModalClick() {
    console.log("Them Course");
    //Khai bao doi tuong chua  course
    var vNewCourseObject = {
        id: "",
        courseCode: "",
        courseName: "",
        price: "",
        discountPrice: "",
        duration: "",
        level: "",
        coverImage: "",
        teacherPhoto: "",
        teacherName: "",
        isPopular: "",
        isTrending: "",
    };
    //B1 Thu thap du lieu
    getCreateNewCourseModal(vNewCourseObject);
    //B2 Validate
    var vIsValiableData = validateDataProduct(vNewCourseObject);
    if (vIsValiableData) {
        console.log(vNewCourseObject);
        $.ajax({
            url: vBASE_URL_COURSES,
            type: "POST",
            contentType: gCONTENT_TYPE,
            data: JSON.stringify(vNewCourseObject),
            success: function (paramResponse) {
                handleAddNewwCourseSuccess();
            },
            error: function (paramError) {
                console.log(paramError.status);
            }
        });
    }
}


//Ham xu ly su kien nhan vao nut Edit 
function onBtnEditCourseClick(paramBtnEdit) {
    gCourseId = getCourseIdFromButton(paramBtnEdit);

    getCourseById(gCourseId);
}

//Ham xu ly su kien update click tren modal 
function onBtnUpdateCourseModalClick() {
    var vNewCourseObject = {
        id: "",
        courseCode: "",
        courseName: "",
        price: "",
        discountPrice: "",
        duration: "",
        level: "",
        coverImage: "",
        teacherPhoto: "",
        teacherName: "",
        isPopular: "",
        isTrending: "",
    };
    //B1: Thu thap du lieu
    getUpdateCourseModal(vNewCourseObject);
    var vIsValiableData = validateDataProduct(vNewCourseObject);
    if (vIsValiableData) {
        $.ajax({
            url: vBASE_URL_COURSES + gCourseId,
            type: "PUT",
            contentType: gCONTENT_TYPE,
            data: JSON.stringify(vNewCourseObject),
            success: function (paramResponse) {
                handleUpdateCourseSuccess();
            },
            error: function (paramErr) {
                console.log(paramErr.status);
            }
        })
    }
}


//Ham xu ly su kine nhan vao nut xoa tren bang 
function onBtnDeleteCourseClick(paramBtnDelete) {
    gCourseId = getCourseIdFromButton(paramBtnDelete);

    $("#delete-confirm-modal").modal("show");
}
//Ham xu ly su kine nhan vao nut confirm
function onBtnConfirmDeleteModal() {
    $.ajax({
        url: vBASE_URL_COURSES + gCourseId,
        type: "DELETE",
        success: function (paramRes) {
            handleDeleteCourseSuccess();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}



/**REGION 4 */


function getAllCourses() {
    $.ajax({
        url: vBASE_URL_COURSES,
        type: "GET",
        success: function (paramCourses) {
            loadDataCoursesToTable(paramCourses);
        },
        error: function (paramError) {
            console.log(paramError.status);
        },
    });
}
function loadDataCoursesToTable(paramCourses) {
    vCoursesTable.clear();
    vCoursesTable.rows.add(paramCourses);
    vCoursesTable.draw();
}



//Ham thu thap du lieu create Data Modal
function getCreateNewCourseModal(paramCourses) {
    paramCourses.courseCode = $("#input-create-courseCode").val().trim();
    paramCourses.courseName = $("#input-create-courseName").val().trim();
    paramCourses.price = $("#input-create-coursePrice").val().trim();
    paramCourses.discountPrice = $("#input-create-courseDiscount").val().trim();
    paramCourses.duration = $("#input-create-duration").val().trim();

    paramCourses.coverImage = $("#input-create-courseImg").val().trim();
    paramCourses.teacherPhoto = $("#input-create-teacherPhoto").val().trim();
    paramCourses.teacherName = $("#input-create-teacherName").val().trim();
    paramCourses.level = $("#select-create-level").val().trim();
    paramCourses.isPopular = $("#select-create-popular").val().trim();
    paramCourses.isTrending = $("#select-create-trending").val().trim();

}
//Ham validate Data
function validateDataProduct(paramCourses) {
    if (paramCourses.courseCode === "") {
        alert("courseCode can nhap");
        return false;
    }
    if (paramCourses.courseName === "") {
        alert("courseName can nhap");
        return false;
    }
    if (paramCourses.price === "") {
        alert("price can nhap");
        return false;
    }
    if (paramCourses.discountPrice === "") {
        alert("discountPrice can nhap");
        return false;
    }
    if (paramCourses.duration === "") {
        alert("duration can nhap");
        return false;
    }
    if (paramCourses.coverImage === "") {
        alert("coverImage can nhap");
        return false;
    }
    if (paramCourses.teacherPhoto === "") {
        alert("teacherPhoto can nhap");
        return false;
    }
    if (paramCourses.teacherName === "") {
        alert("teacherName can nhap");
        return false;
    }
    return true;
}
//Ham them course Thanh Cong MODAL
function handleAddNewwCourseSuccess() {
    alert("Create New Course Successfully");
    getAllCourses();
    resertCreateCourseForm();
    $("#create-course-modal").modal("hide");
}
function resertCreateCourseForm() {
    $("#input-create-courseCode").val('');
    $("#input-create-courseName").val('');
    $("#input-create-coursePrice").val('');
    $("#input-create-courseDiscount").val('');
    $("#input-create-duration").val('');
    $("#input-create-courseImg").val('');
    $("#input-create-teacherPhoto").val('');
    $("#input-create-teacherName").val('');
    $("#select-create-level").val('');
    $("#select-create-popular").val('');
    $("#select-create-trending").val('');
}



function getCourseIdFromButton(paramBtn) {
    var vTableRow = $(paramBtn).parents("tr");
    var vCourseRowData = vCoursesTable.row(vTableRow).data();
    console.log(vCourseRowData.id);
    return vCourseRowData.id;
}
function getCourseById(paramCourseId) {
    $.ajax({
        url: vBASE_URL_COURSES + paramCourseId,
        type: "GET",
        success: function (paramResponse) {
            showCourseDataToModal(paramResponse);
        },
        error: function (paramError) {
            console.log(paramError.status);
        }
    });
    $("#update-course-modal").modal("show");
}
function showCourseDataToModal(paramIdCourse) {
    $("#input-update-courseCode").val(paramIdCourse.courseCode);
    $("#input-update-courseName").val(paramIdCourse.courseName);
    $("#input-update-coursePrice").val(paramIdCourse.price);
    $("#input-update-courseDiscount").val(paramIdCourse.discountPrice);
    $("#input-update-duration").val(paramIdCourse.duration);
    $("#input-update-courseImg").val(paramIdCourse.coverImage);
    $(".img-cover-old").html(`<img style="max-width: 108px;" src="${paramIdCourse.coverImage}">`);
    $("#input-update-teacherPhoto").val(paramIdCourse.teacherPhoto);
    $("#input-update-teacherName").val(paramIdCourse.teacherName);
    $("#select-update-level").val(paramIdCourse.level);
    $("#select-update-popular").val(paramIdCourse.isPopular);
    $("#select-update-trending").val(paramIdCourse.isTrending);
}
//Ham thu thap du lieu Update
function getUpdateCourseModal(paramCourses) {
    paramCourses.courseCode = $("#input-update-courseCode").val().trim();
    paramCourses.courseName = $("#input-update-courseName").val().trim();
    paramCourses.price = $("#input-update-coursePrice").val().trim();
    paramCourses.discountPrice = $("#input-update-courseDiscount").val().trim();
    paramCourses.duration = $("#input-update-duration").val().trim();

    paramCourses.coverImage = $("#input-update-courseImg").val().trim();
    paramCourses.teacherPhoto = $("#input-update-teacherPhoto").val().trim();
    paramCourses.teacherName = $("#input-update-teacherName").val().trim();
    paramCourses.level = $("#select-update-level").val().trim();
    paramCourses.isPopular = $("#select-update-popular").val().trim();
    paramCourses.isTrending = $("#select-update-trending").val().trim();
}
//HAm xu ly sau khi update xong
function handleUpdateCourseSuccess() {
    alert("Update successfully");
    getAllCourses();
    resertUpdateForm();
    $("#update-course-modal").modal("hide");
}
function resertUpdateForm() {
    $("#input-update-courseCode").val('');
    $("#input-update-courseName").val('');
    $("#input-update-coursePrice").val('');
    $("#input-update-courseDiscount").val('');
    $("#input-update-duration").val('');
    $("#input-update-courseImg").val('');
    $("#input-update-teacherPhoto").val('');
    $("#input-update-teacherName").val('');
    $("#select-update-level").val('');
    $("#select-update-popular").val('');
    $("#select-update-trending").val('');
}

function handleDeleteCourseSuccess() {
    alert("Xoa thanh cong");
    getAllCourses();
    $("#delete-confirm-modal").modal("hide");
}
