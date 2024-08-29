"use strict"
//REGION 1//

const gREQUEST_STATUS_OK = 200;
const gREQUEST_CREATE_OK = 201; // status 201 là tạo mới thành công
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;

var vBASE_URL_COURSES = "https://630890e4722029d9ddd245bc.mockapi.io/api/v1/courses";

var gCoursesDB = {
    description: "This DB includes all courses in system",
    courses: [
        {
            id: 1,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily create a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 5,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 6,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 8,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 9,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Intermediate",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 10,
            courseCode: "FE_UIUX_COURSE_211",
            courseName: "Thinkful UX/UI Design Bootcamp",
            price: 950,
            discountPrice: 700,
            duration: "5h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-uiux.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: false,
            isTrending: false
        },
        {
            id: 11,
            courseCode: "FE_WEB_REACRJS_210",
            courseName: "Front-End Web Development with ReactJs",
            price: 1100,
            discountPrice: 850,
            duration: "6h 20m",
            level: "Advanced",
            coverImage: "images/courses/course-reactjs.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 12,
            courseCode: "FE_WEB_BOOTSTRAP_101",
            courseName: "Bootstrap 4 Crash Course | Website Build & Deploy",
            price: 750,
            discountPrice: 600,
            duration: "3h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-bootstrap.png",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 14,
            courseCode: "FE_WEB_RUBYONRAILS_310",
            courseName: "The Complete Ruby on Rails Developer Course",
            price: 2050,
            discountPrice: 1450,
            duration: "8h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-rubyonrails.png",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        }
    ],
    mostPopular: [
        {
            id: 1,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 3,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Intermediate",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 4,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },

    ],
    trending: [
        {
            id: 1,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily create a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 3,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 4,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
    ]
}

//REGION 2//

$(document).ready(function () {
    // showRecommended(gCoursesDB.courses);
    // showMostPopular(gCoursesDB.mostPopular);
    // showTrending(gCoursesDB.trending);
    onPageLoading();
});

/**REGION 3 */

function onPageLoading() {
    loadAllCoursesData();
}


/**REGION 4 */

function loadAllCoursesData() {
    $.ajax({
        url: vBASE_URL_COURSES,
        type: "GET",
        success: getCoursesApiSuccess,
        error: getCoursesApiFailed,
    });
}

function getCoursesApiSuccess(paramResponse) {
    showRecommendedCourse(paramResponse);
    showMostPopularCourse(paramResponse);
    showTrendingCourses(paramResponse);

}
function getCoursesApiFailed(paramError) {
    console.log(paramError);
}


function showRecommendedCourse(paramCourse) {
    var vRecommendedDiv = $("#recommended-course");
    for (var i = 0; i < 4; i++) {
        var vRecommended = paramCourse[i];

        console.log(vRecommended);

        var vCard = $("<div>")
            .addClass("card")
            .css("width", "18rem");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vRecommended.coverImage)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vTitle = $("<h5>")
            .addClass("card-title")
            .text(vRecommended.courseName);

        var vDuration = $("<div>")
            .addClass("card-duration")
            .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vRecommended.duration);


        var vLevel = $("<div>")
            .addClass("card-level")
            .text(vRecommended.level);

        var vTimeAndLevel = $("<div>")
            .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vRecommended.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vRecommended.discountPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");

        var vTeacherImg = $("<img>")
            .addClass("card-img-top teacher-img")
            .attr("src", vRecommended.teacherPhoto);

        var vTeacherName = $("<div>")
            .addClass("teacher-name")
            .text(vRecommended.teacherName);

        var vBookmarkIcon = $("<i>")
            .addClass("far fa-bookmark ml-auto");

        var vCardFooter = $("<div>")
            .addClass("card-footer d-inline-flex align-items-center");

        vCardBody.append(vTitle);
        vTimeAndLevel.append(vDuration, vLevel);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
        vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
        vRecommendedDiv.append(vCard);
    }
}


function showMostPopularCourse(paramCourse) {
    console.log("----------Popular Course----------");
    var vMostPopularDiv = $("#most-popular-course");
    var vMostPopularCourses = paramCourse.filter(paramCourse => paramCourse.isPopular);
    var vCount = 0;
    for (var i = 0; i < vMostPopularCourses.length; i++) {
        if (vCount < 4) {
            var vMostPopular = vMostPopularCourses[i];

            console.log(vMostPopular);

            var vCard = $("<div>")
                .addClass("card")
                .css("width", "18rem");

            var vImg = $("<img>")
                .addClass("card-img-top")
                .attr("src", vMostPopular.coverImage)
                .attr("alt", "Card image cap");

            var vCardBody = $("<div>")
                .addClass("card-body");

            var vTitle = $("<h5>")
                .addClass("card-title")
                .text(vMostPopular.courseName);

            var vDuration = $("<div>")
                .addClass("card-duration")
                .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vMostPopular.duration);


            var vLevel = $("<div>")
                .addClass("card-level")
                .text(vMostPopular.level);

            var vTimeAndLevel = $("<div>")
                .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

            var vPrice = $("<div>")
                .addClass("price-card")
                .text("$" + vMostPopular.price);

            var vDiscountPrice = $("<div>")
                .addClass("discount-price")
                .text("$" + vMostPopular.discountPrice);

            var vCardPriceAndDiscount = $("<div>")
                .addClass("card-deal d-inline-flex card-body");

            var vTeacherImg = $("<img>")
                .addClass("card-img-top teacher-img")
                .attr("src", vMostPopular.teacherPhoto);

            var vTeacherName = $("<div>")
                .addClass("teacher-name")
                .text(vMostPopular.teacherName);

            var vBookmarkIcon = $("<i>")
                .addClass("far fa-bookmark ml-auto");

            var vCardFooter = $("<div>")
                .addClass("card-footer d-inline-flex align-items-center");

            vCardBody.append(vTitle);
            vTimeAndLevel.append(vDuration, vLevel);
            vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
            vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
            vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
            vMostPopularDiv.append(vCard);
            vCount++;
        }

    }
}


function showTrendingCourses(paramCourse) {
    console.log("--------------Trending----------------");
    var vTrendingDiv = $("#trending-course");
    var vTrendingCourses = paramCourse.filter(paramCourse => paramCourse.isTrending);
    var vCount = 0;

    for (var i = 0; i < vTrendingCourses.length && vCount < 4; i++) {
        var vTrending = vTrendingCourses[i];

        console.log(vTrending);

        var vCard = $("<div>")
            .addClass("card")
            .css("width", "18rem");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vTrending.coverImage)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vTitle = $("<h5>")
            .addClass("card-title")
            .text(vTrending.courseName);

        var vDuration = $("<div>")
            .addClass("card-duration")
            .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vTrending.duration);


        var vLevel = $("<div>")
            .addClass("card-level")
            .text(vTrending.level);

        var vTimeAndLevel = $("<div>")
            .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vTrending.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vTrending.discountPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");

        var vTeacherImg = $("<img>")
            .addClass("card-img-top teacher-img")
            .attr("src", vTrending.teacherPhoto);

        var vTeacherName = $("<div>")
            .addClass("teacher-name")
            .text(vTrending.teacherName);

        var vBookmarkIcon = $("<i>")
            .addClass("far fa-bookmark ml-auto");

        var vCardFooter = $("<div>")
            .addClass("card-footer d-inline-flex align-items-center");

        vCardBody.append(vTitle);
        vTimeAndLevel.append(vDuration, vLevel);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
        vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
        vTrendingDiv.append(vCard);
        vCount++;
    }
}







function showRecommended(paramCourse) {
    var vRecommendedDiv = $("#recommended-course");
    for (var i = 0; i < 4; i++) {
        var vRecommended = paramCourse[i];

        console.log(vRecommended);

        var vCard = $("<div>")
            .addClass("card")
            .css("width", "18rem");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vRecommended.coverImage)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vTitle = $("<h5>")
            .addClass("card-title")
            .text(vRecommended.courseName);

        var vDuration = $("<div>")
            .addClass("card-duration")
            .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vRecommended.duration);


        var vLevel = $("<div>")
            .addClass("card-level")
            .text(vRecommended.level);

        var vTimeAndLevel = $("<div>")
            .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vRecommended.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vRecommended.discountPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");

        var vTeacherImg = $("<img>")
            .addClass("card-img-top teacher-img")
            .attr("src", vRecommended.teacherPhoto);

        var vTeacherName = $("<div>")
            .addClass("teacher-name")
            .text(vRecommended.teacherName);

        var vBookmarkIcon = $("<i>")
            .addClass("far fa-bookmark ml-auto");

        var vCardFooter = $("<div>")
            .addClass("card-footer d-inline-flex align-items-center");

        vCardBody.append(vTitle);
        vTimeAndLevel.append(vDuration, vLevel);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
        vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
        vRecommendedDiv.append(vCard);
    }
}

function showMostPopular(paramCourse) {
    var vRecommendedDiv = $("#most-popular-course");

    for (var i = 0; i < 4; i++) {
        var vRecommended = paramCourse[i];

        console.log(vRecommended);

        var vCard = $("<div>")
            .addClass("card")
            .css("width", "18rem");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vRecommended.coverImage)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vTitle = $("<h5>")
            .addClass("card-title")
            .text(vRecommended.courseName);

        var vDuration = $("<div>")
            .addClass("card-duration")
            .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vRecommended.duration);


        var vLevel = $("<div>")
            .addClass("card-level")
            .text(vRecommended.level);

        var vTimeAndLevel = $("<div>")
            .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vRecommended.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vRecommended.discountPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");

        var vTeacherImg = $("<img>")
            .addClass("card-img-top teacher-img")
            .attr("src", vRecommended.teacherPhoto);

        var vTeacherName = $("<div>")
            .addClass("teacher-name")
            .text(vRecommended.teacherName);

        var vBookmarkIcon = $("<i>")
            .addClass("far fa-bookmark ml-auto");

        var vCardFooter = $("<div>")
            .addClass("card-footer d-inline-flex align-items-center");

        vCardBody.append(vTitle);
        vTimeAndLevel.append(vDuration, vLevel);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
        vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
        vRecommendedDiv.append(vCard);
    }
}

function showTrending(paramCourse) {
    var vRecommendedDiv = $("#trending-course");
    for (var i = 0; i < 4; i++) {
        var vRecommended = paramCourse[i];

        console.log(vRecommended);

        var vCard = $("<div>")
            .addClass("card")
            .css("width", "18rem");

        var vImg = $("<img>")
            .addClass("card-img-top")
            .attr("src", vRecommended.coverImage)
            .attr("alt", "Card image cap");

        var vCardBody = $("<div>")
            .addClass("card-body");

        var vTitle = $("<h5>")
            .addClass("card-title")
            .text(vRecommended.courseName);

        var vDuration = $("<div>")
            .addClass("card-duration")
            .html('<i class="fa-regular fa-clock" style="margin-right:5px"></i>' + vRecommended.duration);


        var vLevel = $("<div>")
            .addClass("card-level")
            .text(vRecommended.level);

        var vTimeAndLevel = $("<div>")
            .addClass("list-group-flush d-inline-flex card-body justify-content-between card-time-level");

        var vPrice = $("<div>")
            .addClass("price-card")
            .text("$" + vRecommended.price);

        var vDiscountPrice = $("<div>")
            .addClass("discount-price")
            .text("$" + vRecommended.discountPrice);

        var vCardPriceAndDiscount = $("<div>")
            .addClass("card-deal d-inline-flex card-body");

        var vTeacherImg = $("<img>")
            .addClass("card-img-top teacher-img")
            .attr("src", vRecommended.teacherPhoto);

        var vTeacherName = $("<div>")
            .addClass("teacher-name")
            .text(vRecommended.teacherName);

        var vBookmarkIcon = $("<i>")
            .addClass("far fa-bookmark ml-auto");

        var vCardFooter = $("<div>")
            .addClass("card-footer d-inline-flex align-items-center");

        vCardBody.append(vTitle);
        vTimeAndLevel.append(vDuration, vLevel);
        vCardPriceAndDiscount.append(vDiscountPrice, vPrice);
        vCardFooter.append(vTeacherImg, vTeacherName, vBookmarkIcon);
        vCard.append(vImg, vCardBody, vTimeAndLevel, vCardPriceAndDiscount, vCardFooter);
        vRecommendedDiv.append(vCard);
    }
}



