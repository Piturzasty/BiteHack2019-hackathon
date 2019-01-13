webpackJsonp([9],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dataService__ = __webpack_require__(339);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__dataService__["a" /* DataService */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__dataService__["a" /* DataService */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__dataService__["a" /* DataService */]
            ]
        })
    ], SearchPageModule);
    return SearchPageModule;
}());

//# sourceMappingURL=dataService.module.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_location_accuracy__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataService = /** @class */ (function () {
    function DataService(http, platform, geo, diagnostic, locationAccuracy) {
        this.http = http;
        this.platform = platform;
        this.geo = geo;
        this.diagnostic = diagnostic;
        this.locationAccuracy = locationAccuracy;
    }
    DataService.prototype.getUserPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var HIGH_ACCURACY = 'high_accuracy';
            if (_this.platform.is('cordova')) {
                _this.platform.ready().then(function () {
                    _this.diagnostic.isLocationEnabled().then(function (enabled) {
                        if (enabled) {
                            if (_this.platform.is('android')) {
                                _this.diagnostic.getLocationMode().then(function (locationMode) {
                                    if (locationMode === HIGH_ACCURACY) {
                                        _this.geo.getCurrentPosition({ timeout: 30000, maximumAge: 0, enableHighAccuracy: true }).then(function (pos) {
                                            resolve({
                                                coords: {
                                                    latitude: pos.coords.latitude,
                                                    longitude: pos.coords.longitude
                                                }
                                            });
                                        }).catch(function (error) { return resolve(error); });
                                    }
                                    else {
                                        _this.askForHighAccuracy().then(function (available) {
                                            if (available) {
                                                _this.getUserPosition().then(function (a) { return resolve(a); }, function (e) { return resolve(e); });
                                            }
                                        }, function (error) { return resolve(error); });
                                    }
                                });
                            }
                            else {
                                _this.geo.getCurrentPosition({ timeout: 30000, maximumAge: 0, enableHighAccuracy: true }).then(function (pos) {
                                    resolve({
                                        coords: {
                                            latitude: pos.coords.latitude,
                                            longitude: pos.coords.longitude
                                        }
                                    });
                                }).catch(function (error) { return resolve(error); });
                            }
                        }
                        else {
                            _this.locationAccuracy.request(1).then(function (result) {
                                if (result) {
                                    _this.getUserPosition().then(function (result) { return resolve(result); }, function (error) { return resolve(error); });
                                }
                            }, function (error) {
                                resolve(error);
                            });
                        }
                    }, function (error) {
                        resolve(error);
                    });
                });
            }
            else {
                resolve('Cordova is not available');
            }
        });
    };
    DataService.prototype.askForHighAccuracy = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.locationAccuracy
                .request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                _this.geo.getCurrentPosition({ timeout: 30000 }).then(function (position) {
                    resolve(position);
                }, function (error) { return resolve(error); });
            }, function (error) { return resolve(error); });
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dataService',template:/*ion-inline-start:"C:\Users\Mateusz Pitura\Hackathon\myApp5\src\pages\dataService\dataService.html"*/''/*ion-inline-end:"C:\Users\Mateusz Pitura\Hackathon\myApp5\src\pages\dataService\dataService.html"*/,
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_location_accuracy__["a" /* LocationAccuracy */]
            ]
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_location_accuracy__["a" /* LocationAccuracy */]])
    ], DataService);
    return DataService;
}());

//# sourceMappingURL=dataService.js.map

/***/ })

});
//# sourceMappingURL=9.js.map