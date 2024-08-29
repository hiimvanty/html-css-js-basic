"use strict"
/**REGION 1 */

const gREQUEST_STATUS_OK = 200;
const gREQUEST_CREATE_OK = 201; // status 201 là tạo mới thành công
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gCONTENT_TYPE = "application/json;charset=UTF-8";

const gBASE_URL = "https://pucci-mart.onrender.com/api/";
var vBASE_URL_PETS = gBASE_URL + "pets/";

var gPetId = 0;
var vNumberical = 1;

var vLIST_PET_COL = ["id", "type", "name", "description",
    "imageUrl", "price", "promotionPrice", "discount",
    "createdAt", "updatedAt", "action"];

const gLIST_NUMBERIAL_COL = 0;
const gLIST_TYPE_COL = 1;
const gLIST_NAME_COL = 2;
const gLIST_DESCRIPTION_COL = 3;
const gLIST_COVER_IMG_COL = 4;
const gLIST_PRICE_COL = 5;
const gLIST_PROMOTION_PRICE_COL = 6;
const gLIST_DISCOUNT_COL = 7;
const gLIST_TIME_CREATE_COL = 8;
const gLIST_TIME_UPDATE_COL = 9;
const gLIST_ACTION_COL = 10;

//Khai bao DataTable % mapping columns
var vListPetsTable = $("#list-pets-table").DataTable({

    columns: [
        { data: vLIST_PET_COL[gLIST_NUMBERIAL_COL] },
        { data: vLIST_PET_COL[gLIST_TYPE_COL] },
        { data: vLIST_PET_COL[gLIST_NAME_COL] },
        { data: vLIST_PET_COL[gLIST_DESCRIPTION_COL] },
        { data: vLIST_PET_COL[gLIST_COVER_IMG_COL] },
        { data: vLIST_PET_COL[gLIST_PRICE_COL] },
        { data: vLIST_PET_COL[gLIST_PROMOTION_PRICE_COL] },
        { data: vLIST_PET_COL[gLIST_DISCOUNT_COL] },
        { data: vLIST_PET_COL[gLIST_TIME_CREATE_COL] },
        { data: vLIST_PET_COL[gLIST_TIME_UPDATE_COL] },
        { data: vLIST_PET_COL[gLIST_ACTION_COL] },
    ],

    columnDefs: [

        {
            targets: gLIST_NUMBERIAL_COL,
            render: function () {
                return vNumberical++;
            }
        },

        {
            targets: gLIST_ACTION_COL,
            defaultContent: `
            <div class="action-btn">
                <button class="icon-button col-11 bg-success edit-pet">
                    <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="icon-button col-11 bg-danger delete-pet">
                    <i class="far fa-trash-can"></i>
                </button>
            </div>
         `
        },

        {
            targets: gLIST_COVER_IMG_COL,
            render: function (data, type, row, meta) {
                return `<div class="text-center">
                             <img src=" ${data} " style="width: 100%;">
                     </div>`;
            },
        },

    ],
});

/**REGION 2 */

$(document).ready(function () {
    onPageLoading();
});


//gan su kien create 1 pet
$("#btn-add-pet").on("click", function () {
    onBtnAddNewPetClick(this);
    console.log("Nut them pet")
});

//gan su kien create pet tren modal
$("#btn-create-newPet").on('click', function () {
    console.log("Create Pew Now")
    onBtnCreatePewNowOnModalClick();
});


//Gan su kien Update Pet
$("#list-pets-table").on("click", ".edit-pet", function () {
    onBtnEditPetClick(this);
});
//Gan su kien update course MODAL
$("#btn-update-pet").on("click", function () {
    onBtnUpdatePetModalClick();
});


//Gan su kien Delete Pet
$("#list-pets-table").on("click", ".delete-pet", function () {
    onBtnDeletePetClick(this);
});
//gan su kien confirm delete
$("#btn-confirm-delete-course").on("click", function () {
    onBtnConfirmDeleteModal();
})

/**REGION 3 */

//Ham onPageLoading
function onPageLoading() {
    getAllPets();
}


//Ham xu ly su kien khi nhan nut create 1 pet
function onBtnAddNewPetClick() {
    $("#create-listPet-modal").modal("show");
}

//Ham xu ly su kien khi nut create New Pet duoc an
function onBtnCreatePewNowOnModalClick() {
    var vNewPetObject = {
        id: "",
        name: "",
        type: "",
        description: "",
        imageUrl: "",
        price: "",
        promotionPrice: "",
        discount: "",
    };
    //B1: Thu thap du lieu
    getCreateNewPetOnModal(vNewPetObject);
    // B2: Validate data
    var vIsValiableData = validateDataPet(vNewPetObject);
    if (vIsValiableData) {
        $.ajax({
            url: vBASE_URL_PETS,
            type: 'POST',
            contentType: gCONTENT_TYPE,
            dataType: 'JSON',
            data: JSON.stringify(vNewPetObject),
            success: postPetDataSuccess,
            error: postPetDataFailed,
        });
    }
}


//Ham xu ly su kien khu an nut sua
function onBtnEditPetClick(paramBtnEdit) {
    gPetId = getPetIdFromButton(paramBtnEdit);

    getPetById(gPetId);
}


//Ham xu ly su kien khi nhan nut Update
function onBtnUpdatePetModalClick() {
    var vUpdatePetObject = {
        name: "",
        type: "",
        description: "",
        imageUrl: "",
        price: "",
        promotionPrice: "",
        discount: "",
    };
    //B1: Thu thap du lieu
    getUpdatePetModal(vUpdatePetObject);

    var vIsValiableData = validateDataPet(vUpdatePetObject);
    if (vIsValiableData) {
        $.ajax({
            url: vBASE_URL_PETS + gPetId,
            type: "PUT",
            contentType: gCONTENT_TYPE,
            dataType: "JSON",
            data: JSON.stringify(vUpdatePetObject),
            success: function (paramResponse) {
                handleUpdatePetSuccess();
            },
            error: function (paramErr) {
                console.log(paramErr.status);
            }
        })
    }
}

//Ham xu ly su kien khi nhan nut xoa
function onBtnDeletePetClick(paramBtnDelete) {
    gPetId = getPetIdFromButton(paramBtnDelete);

    $("#delete-confirm-modal").modal("show");
}


//Ham xu ly su kien khi nhan nut Xoa tren modal
function onBtnConfirmDeleteModal() {
    $.ajax({
        url: vBASE_URL_PETS + gPetId,
        type: "DELETE",
        success: function (paramRes) {
            handleDeletePetSuccess();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}


function postPetDataSuccess(paramCreatePetRes) {
    handleAddNewPetSuccess();
}
function postPetDataFailed(paramError) {
    console.log(paramError.Status);
}



/**REGION 4 */

//Ham get All pet

function getAllPets() {
    $.ajax({
        type: 'get',
        url: vBASE_URL_PETS,
        dataType: 'json',
        success: getAllPetsSuccess,
        error: getAllPetsFailed,
    });
}
//Ham getAllPetsSuccess
function getAllPetsSuccess(paramPetRes) {
    console.log(`Get all pet success
--------------------------------------
${paramPetRes}
`);
    var vPerRows = paramPetRes.rows
    console.log(vPerRows);
    loadAllPetsDataToTable(vPerRows);
}
//Ham getAllPetsFailes
function getAllPetsFailed(paramError) {
    console.log(paramError.Status);
}


//Ham loadAllPetsDataToTable
function loadAllPetsDataToTable(paramRowsPet) {
    vListPetsTable.clear();
    vListPetsTable.rows.add(paramRowsPet);
    vListPetsTable.draw();
}

//Ham thu thap du lieu de tao pet moi 
function getCreateNewPetOnModal(paramPetObject) {
    paramPetObject.name = $("#input-create-name").val().trim();
    paramPetObject.description = $("#input-create-description").val().trim();
    paramPetObject.imageUrl = $("#input-create-imageUrl").val().trim();
    paramPetObject.price = $("#input-create-price").val().trim();
    paramPetObject.promotionPrice = $("#input-create-promotionPrice").val().trim();
    paramPetObject.discount = $("#input-create-discount").val().trim();
    paramPetObject.type = $("#select-create-type").val().trim();
}

//Ham thu thap du lieu de sua pet
function getUpdatePetModal(paramPetUpdateObj) {
    paramPetUpdateObj.name = $("#input-update-name").val().trim();
    paramPetUpdateObj.description = $("#input-update-description").val().trim();
    paramPetUpdateObj.imageUrl = $("#input-update-imageUrl").val().trim();
    paramPetUpdateObj.price = $("#input-update-price").val().trim();
    paramPetUpdateObj.promotionPrice = $("#input-update-promotionPrice").val().trim();
    paramPetUpdateObj.discount = $("#input-update-discount").val().trim();
    paramPetUpdateObj.type = $("#select-update-type").val().trim();
}

//Ham validate du lieu tai pet
function validateDataPet(paramPetObject) {
    if (paramPetObject.name === "") {
        alert("Ten can nhap");
        return false;
    }
    if (paramPetObject.description === "") {
        alert("description can nhap");
        return false;
    }
    if (paramPetObject.imageUrl === "") {
        alert("imageUrl can nhap");
        return false;
    }
    if (paramPetObject.price === "") {
        alert("price can nhap");
        return false;
    }
    if (isNaN(paramPetObject.price) || isNaN(paramPetObject.promotionPrice) || isNaN(paramPetObject.discount)) {
        alert("Price, promotionPrice, discount must be NUMBEERRRRR");
        return false;
    }
    if (paramPetObject.promotionPrice === "") {
        alert("promotionPrice can nhap");
        return false;
    }
    if (paramPetObject.discount === "") {
        alert("discount can nhap");
        return false;
    }
    return true;
}

//Ham xu ly sau khi post success
function handleAddNewPetSuccess() {
    alert("Create New Pew Successfully");
    getAllPets();
    resertCreatePetForm();
    $("#create-listPet-modal").modal("hide");
}

//ham resertCreatePetForm
function resertCreatePetForm() {
    $("#input-create-name").val('');
    $("#input-create-description").val('');
    $("#input-create-imageUrl").val('');
    $("#input-create-price").val('');
    $("#input-create-promotionPrice").val('');
    $("#input-create-discount").val('');
    // $("#select-create-type").val('');
}

//Ham get ID by click
function getPetIdFromButton(paramBtn) {
    var vTableRow = $(paramBtn).parents("tr");
    var vPetRowData = vListPetsTable.row(vTableRow).data();
    console.log(vPetRowData.id);
    return vPetRowData.id;
}


function handleDeletePetSuccess() {
    alert("Xoa thanh cong");
    getAllPets();
    $("#delete-confirm-modal").modal("hide");
}

//Ham get Pet by ID
function getPetById(paramPetId) {
    $.ajax({
        url: vBASE_URL_PETS + paramPetId,
        type: "GET",
        success: function (paramResponse) {
            showPetDataToUpdateModal(paramResponse);
        },
        error: function (paramError) {
            console.log(paramError.status);
        }
    });
    $("#update-listPet-modal").modal("show");
}

function showPetDataToUpdateModal(paramPetId) {
    $("#input-update-name").val(paramPetId.name);
    $("#input-update-description").val(paramPetId.description);
    $("#input-update-imageUrl").val(paramPetId.imageUrl);
    $(".img-cover-old").html(`<img style="max-width: 108px;" src="${paramPetId.imageUrl}">`);
    $("#input-update-price").val(paramPetId.price);
    $("#input-update-promotionPrice").val(paramPetId.promotionPrice);
    $("#input-update-discount").val(paramPetId.discount);
    $("#select-update-type").val(paramPetId.type);
}


function handleUpdatePetSuccess() {
    alert("Update successfully");
    getAllPets();
    resertUpdateForm();
    $("#update-listPet-modal").modal("hide");
}

function resertUpdateForm() {
    $("#input-update-name").val('');
    $("#input-update-description").val('');
    $("#input-update-imageUrl").val('');
    $("#input-update-price").val('');
    $("#input-update-promotionPrice").val('');
    $("#input-update-discount").val('');
}



//PHAN FILTER


$("#btn-filter").on("click", function () {
    onBtnFilterClick(this)
});


function onBtnFilterClick() {
    $.ajax({
        type: 'get',
        url: vBASE_URL_PETS,
        dataType: 'json',
        success: function (paramRes) {
            var highestPrice = -Infinity;
            var highestPricePet = null;

            paramRes.rows.forEach(function (row) {
                if (row.price > highestPrice) {
                    highestPrice = row.price;
                    highestPricePet = row;
                }
            });

            var lowestPrice = Infinity;
            var lowestPricePet = null;

            paramRes.rows.forEach(function (row) {
                if (row.price < lowestPrice) {
                    lowestPrice = row.price;
                    lowestPricePet = row;
                }
            });

            if ($("#select-filter").val() === "max" && highestPricePet !== null) {
                var petData = {
                    id: highestPricePet.id,
                    type: highestPricePet.type,
                    name: highestPricePet.name,
                    description: highestPricePet.description,
                    imageUrl: highestPricePet.imageUrl,
                    price: highestPricePet.price,
                    promotionPrice: highestPricePet.promotionPrice,
                    discount: highestPricePet.discount,
                    createdAt: highestPricePet.createdAt,
                    updatedAt: highestPricePet.updatedAt,
                    action: '<button class="btn btn-primary btn-back-back-back-back-back">Back</button>'
                };

                vListPetsTable.clear();
                vListPetsTable.row.add(petData);
                vListPetsTable.draw();
            }
            if ($("#select-filter").val() === "min" && lowestPricePet !== null) {
                var petData = {
                    id: lowestPricePet.id,
                    type: lowestPricePet.type,
                    name: lowestPricePet.name,
                    description: lowestPricePet.description,
                    imageUrl: lowestPricePet.imageUrl,
                    price: lowestPricePet.price,
                    promotionPrice: lowestPricePet.promotionPrice,
                    discount: lowestPricePet.discount,
                    createdAt: lowestPricePet.createdAt,
                    updatedAt: lowestPricePet.updatedAt,
                    action: '<button class="btn btn-primary btn-back-back-back-back-back">Back</button>'
                };

                vListPetsTable.clear();
                vListPetsTable.row.add(petData);
                vListPetsTable.draw();
            }
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    });
}


$(document).on('click', ".btn-back-back-back-back-back", function () {
    onBtnBackBackBackBackClick(this);
    console.log("Ban vua nhan nut back")
})

function onBtnBackBackBackBackClick() {
    console.log("ban vua nhan nut back");
    location.reload();
}


