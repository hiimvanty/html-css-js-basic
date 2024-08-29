"use strict"
/** REGION 1*/
const gREQUEST_STATUS_OK = 200;
const gREQUEST_CREATE_OK = 201; // status 201 là tạo mới thành công
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;

var gBASE_URL = "https://pucci-mart.onrender.com/api";

/**REGION 2 */

$(document).ready(function () {
    onPageLoading();
});

$("#btn-to-page-one").on("click", function () {
    console.log("Nhan nut 1")
    $("#list-pet-phantrang").empty();
    loadListPetDataPageOne();
});

$("#btn-to-page-two").on("click", function () {
    console.log("Nhan nut 1")
    $("#list-pet-phantrang").empty();
    loadListPetDataPageTwo();
});

$("#btn-to-page-three").on("click", function () {
    console.log("Nhan nut 1")
    $("#list-pet-phantrang").empty();
    loadListPetDataPageThree();
});

$("#btn-to-page-four").on("click", function () {
    console.log("Nhan nut 1")
    $("#list-pet-phantrang").empty();
    loadListPetDataPageFour();
});

$("#btn-to-page-five").on("click", function () {
    console.log("Nhan nut 1")
    $("#list-pet-phantrang").empty();
    loadListPetDataPageFive();
});
/**REGION 3 */

function onPageLoading() {
    loadListPetData();
}


/**REGION 4 */

function loadListPetData() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 0
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}

function loadListPetDataPageOne() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 1
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}

function loadListPetDataPageTwo() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 2
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}
function loadListPetDataPageThree() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 3
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}
function loadListPetDataPageFour() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 4
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}
function loadListPetDataPageFive() {
    const vQueryParams = new URLSearchParams({
        "_limit": 8,
        "_page": 5
    });

    $.ajax({
        type: 'get',
        url: gBASE_URL + '/pets?' + vQueryParams.toString(),
        dataType: 'json',
        success: getApiListPetSuccess,
        error: getApiListPetFaild,
    });
}

function getApiListPetSuccess(paramResponse) {
    console.log(paramResponse);
    showListPetToDiv(paramResponse);
}

function getApiListPetFaild(paramError) {
    console.log(paramError.Status);
}

function showListPetToDiv(paramListPet) {

    var vListPetDiv = $("#list-pet-phantrang");
    var vList = paramListPet.rows;
    console.log(vList)
    for (let i = 0; i < vList.length; i++) {
        var vListI = vList[i];
        var vCard = $("<div>")
            .addClass("card")
            .css("width", "16rem")
            .css("height", "420px");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vListI.imageUrl)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vName = $("<h5>")
            .addClass("card-title text-center")
            .text(vListI.name);

        var vDescription = $("<div>")
            .addClass("card-description")
            .html(vListI.description);


        var vDescriptionDiv = $("<div>")
            .addClass("list-group-flush d-inline-flex description-div");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vListI.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vListI.promotionPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");



        vCardBody.append(vName);
        vDescriptionDiv.append(vDescription);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCard.append(vImg, vCardBody, vDescriptionDiv, vCardPriceAndDiscount);
        vListPetDiv.append(vCard);
    }
}
