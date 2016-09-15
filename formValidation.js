//creted by Jerom

var ERROR_BORDER = 'solid 1px #f00';
var DEFAULT_BORDER = 'solid 1px #b7bbbb';
var formvalidation = angular.module('formValidation', []);
/*Service for onFocused,onBlured, and returning border style*/
formvalidation.factory('FormValidation', [function() {
        var root = {};
        root.onFocusedValidation = function(ctrl) {
            ctrl.isFocused = true;
            ctrl.currentBorderCol = ctrl.borderCol;
            ctrl.borderCol = DEFAULT_BORDER;
        };
        root.onBluredValidation = function(ctrl) {
            ctrl.isFocused = false;
            ctrl.borderCol = ctrl.currentBorderCol;
        };
        root.borderCol = function(ctrl) {
            return ctrl.borderCol;
        };
        return root;
    }]);
formvalidation.factory('setErrorText', ['$compile', function($compile) {
        var setErrorText = {};
        setErrorText.setError = function(elm, text, show, scope, attrs) {

            var contentTr = angular.element('<div class="error-validation"'
                    + 'ng-show="' + show.$$parentForm.$name + '.showvalidation"'
                    + '>' +
                    '<i class="icon-validation-error">' +
                    '</i><span>' + text + '</span></div>');
//            var contentTr = angular.element('<div class="error-validation"'
//                    + 'ng-show="' + show.$$parentForm.$name + '.showvalidation"'
//                    + '>' +
//                    '<i class="icon-validation-error">' +
//                    '</i></div><h6 class="error-text"' + 'ng-show="' + show.$$parentForm.$name + '.showvalidation"' + '>' + text + '</h6>');
//            if ((attrs.kendoTimePicker === '') || (attrs.kendoTimePicker) || (attrs.kendoDatePicker) || (attrs.kendoDatePicker === '') || (attrs.kendoDateTimePicker === '') || (attrs.kendoDateTimePicker)) {
//                setErrorText.removeErrorText(elm, attrs);
//                contentTr.insertAfter(elm.offsetParent().offsetParent());
//                $compile(contentTr)(scope);
//            } else if ((attrs.kendoComboBox === '') || (attrs.kendoComboBox)) {
//                setErrorText.removeErrorText(elm, attrs);
//                contentTr.insertAfter(elm.parent());
//                $compile(contentTr)(scope);
//            }else {
                setErrorText.removeErrorText(elm, attrs);
                contentTr.insertAfter(elm);
                $compile(contentTr)(scope);
//            }


        };
        setErrorText.removeErrorText = function(elm, attrs) {

//            if ((attrs.kendoTimePicker === '') || (attrs.kendoTimePicker) || (attrs.kendoDatePicker) || (attrs.kendoDatePicker === '') || (attrs.kendoDateTimePicker === '') || (attrs.kendoDateTimePicker)) {
//                if (elm[0].parentNode.parentNode && elm[0].parentNode.parentNode.nextSibling && elm[0].parentNode.parentNode.nextSibling.className && elm[0].parentNode.parentNode.nextSibling.className.indexOf('error-validation') >= 0) {
//                    elm[0].parentNode.parentNode.parentNode.removeChild(elm[0].parentNode.parentNode.nextSibling);
//                }
//                if (elm[0].parentNode.parentNode && elm[0].parentNode.parentNode.nextSibling && elm[0].parentNode.parentNode.nextSibling.className && elm[0].parentNode.parentNode.nextSibling.className.indexOf('error-text') >= 0) {
//                    elm[0].parentNode.parentNode.parentNode.removeChild(elm[0].parentNode.parentNode.nextSibling);
//                }
//            } else if ((attrs.kendoComboBox === '') || (attrs.kendoComboBox)) {
//                if (elm[0].parentNode && elm[0].parentNode.nextSibling && elm[0].parentNode.nextSibling.className && elm[0].parentNode.nextSibling.className.indexOf('error-validation') >= 0) {
//                    elm[0].parentNode.parentNode.removeChild(elm[0].parentNode.nextSibling);
//                }
//                if (elm[0].parentNode && elm[0].parentNode.nextSibling && elm[0].parentNode.nextSibling.className && elm[0].parentNode.nextSibling.className.indexOf('error-text') >= 0) {
//                    elm[0].parentNode.parentNode.removeChild(elm[0].parentNode.nextSibling);
//                }
//            } else {

                if (elm[0] && elm[0].nextSibling && elm[0].nextSibling.className && elm[0].nextSibling.className.indexOf('error-validation') >= 0) {
                    elm[0].parentNode.removeChild(elm[0].nextSibling);
                }
                if (elm[0] && elm[0].nextSibling && elm[0].nextSibling.className && elm[0].nextSibling.className.indexOf('error-text') >= 0) {
                    elm[0].parentNode.removeChild(elm[0].nextSibling);
                }
//            }
        };
        return setErrorText;
    }]);
//First name , Last name, Name Validation
var NAME_REGEXP = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
formvalidation.directive('validationName', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {


                ctrl.$validators.validationName = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationName) ? attrs.validationName : '';
                    if (ctrl.$isEmpty(modelValue)) {
                        if (allowEmpty !== 'allow-empty') {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                        else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (NAME_REGEXP.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notName;
                        setErrorText.setError(elm, ErrorConstants.notName, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
// Validates 10 digit phone number
var YEAR_REGEXP = /^\d{4}$/;
formvalidation.directive('validationYear', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function(inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if ((inputValue == undefined) || (!inputValue))
                        return ''
                    var transformedInput = parseInt(inputValue.replace(/[^0-9]/g, ''));
                    if (!transformedInput) {
                        transformedInput = '';
                    }
                    transformedInput = transformedInput.toString();
                    if (transformedInput != inputValue) {
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();
                    }

                    return transformedInput;
                });
                ctrl.$validators.validationYear = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }

                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }


                        return false;
                    }

                    if (YEAR_REGEXP.test(viewValue) && (parseInt(viewValue) > 999)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }

                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidYear;
                        setErrorText.setError(elm, ErrorConstants.notValidYear, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
// Validates 10 digit phone number
var PHONE_REGEXP = /^\d{10}$/;
formvalidation.directive('validationPhone', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {



                ctrl.$validators.validationPhone = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationPhone) ? attrs.validationPhone : '';
                    if (ctrl.$isEmpty(modelValue)) {
                        if (allowEmpty !== 'allow-empty') {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }

                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }


                            return false;
                        }
                        else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (PHONE_REGEXP.test(viewValue.replace(/[- )(]/g, ''))) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }

                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.phoneNumberNotValid;
                        setErrorText.setError(elm, ErrorConstants.phoneNumberNotValid, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
var PHONE_REGEXP = /^\d{10}$/;
formvalidation.directive('validationOfficePhone', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$parsers.push(function(inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if ((inputValue === undefined) || (!inputValue))
                        return ''
                    var transformedInput;
                    try {
                        transformedInput = inputValue;
                        if (inputValue.indexOf('(___)') > -1 && inputValue.replace('(___)', '').indexOf('_')) {
                            transformedInput = inputValue.replace('(___)', '(001)');
                        }

                    }
                    catch (err) {
                        transformedInput = inputValue;
                    }
                    transformedInput = transformedInput.toString();
                    if (transformedInput !== inputValue) {
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();
                    }

                    return transformedInput;
                });

                ctrl.$validators.validationPhone = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationPhone) ? attrs.validationPhone : '';
                    var value = (modelValue) ? modelValue : ''
                    if (ctrl.$isEmpty(value.replace(/[- )(]/g, ''))) {
                        if (allowEmpty !== 'allow-empty') {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }

                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }


                            return false;
                        }
                        else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (PHONE_REGEXP.test(viewValue.replace(/[- )(]/g, ''))) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }

                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.phoneNumberNotValid;
                        setErrorText.setError(elm, ErrorConstants.phoneNumberNotValid, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
var RATE_REGEXP = /^\d{1,}$/;
formvalidation.directive('validationRate', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function(inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if ((inputValue === undefined) || (!inputValue))
                        return ''
                    var transformedInput;
                    try {
                        transformedInput = parseInt(inputValue.replace(/[^0-9]/g, ''));
                        if (isNaN(transformedInput)) {
                            transformedInput = '';
                        }
                    }
                    catch (err) {
                        transformedInput = '';
                    }
                    transformedInput = transformedInput.toString();
                    if (transformedInput !== inputValue) {
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();
                    }

                    return transformedInput;
                });
                ctrl.$validators.validationRate = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }

                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }


                        return false;
                    }

                    if (RATE_REGEXP.test(viewValue) && (parseInt(viewValue) > 0)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }

                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.cannotBeZero;
                        setErrorText.setError(elm, ErrorConstants.cannotBeZero, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
var RATE_DECIMAL_REGEXP = /^[0-9]+(\.)?([0-9][0-9]?)?/;
formvalidation.directive('validationRateDecimal', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function(inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if ((inputValue === undefined) || (!inputValue))
                        return ''
                    var transformedInput = inputValue.toString().match(/^[0-9]+(\.)?([0-9][0-9]?)?/);
                    if ((!transformedInput) || (transformedInput.length === 0) || (!transformedInput[0])) {
                        transformedInput = [];
                        transformedInput[0] = '';
                    }
                    if (transformedInput[0] !== inputValue) {
                        ctrl.$setViewValue(transformedInput[0]);
                        ctrl.$render();
                    }

                    return transformedInput[0];
                });
                ctrl.$validators.validationRate = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }

                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }


                        return false;
                    }

                    if (RATE_DECIMAL_REGEXP.test(viewValue) && (parseFloat(viewValue) > 0)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }

                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.cannotBeZero;
                        setErrorText.setError(elm, ErrorConstants.cannotBeZero, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
//Only allows to type numbers

formvalidation.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined)
                    return ''
                var transformedInput = inputValue.toString().replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
formvalidation.directive('onlyDecimals', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue === undefined)
                    return '';
//                var transformedInput = inputValue.toString().replace(/^[0-9]+(\.[0-9][0-9]?)?$/g, '');
                var transformedInput = inputValue.toString().match(/^[0-9]+(\.)?([0-9][0-9]?)?/);
                if ((!transformedInput) || (transformedInput.length === 0) || (!transformedInput[0])) {
                    transformedInput = [];
                    transformedInput[0] = '';
                }
                if (transformedInput[0] !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput[0]);
                    modelCtrl.$render();
                }

                return transformedInput[0];
            });
        }
    };
});
formvalidation.directive('multipleDecimals', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue === undefined)
                    return '';
//                var transformedInput = inputValue.toString().replace(/^[0-9]+(\.[0-9][0-9]?)?$/g, '');
                var transformedInput = inputValue.toString().match(/^[0-9]+((\.)?([0-9][0-9]?)?)+/);
                if ((!transformedInput) || (transformedInput.length === 0) || (!transformedInput[0])) {
                    transformedInput = [];
                    transformedInput[0] = '';
                }
                if (transformedInput[0] !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput[0]);
                    modelCtrl.$render();
                }

                return transformedInput[0];
            });
        }
    };
});
formvalidation.directive('onlyDecimalsAllowNegative', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue === undefined)
                    return '';
                var transformedInput = inputValue.toString().match(/^-?([0-9]+(\.)?([0-9][0-9]?)?)?/);
//                var transformedInput = inputValue.toString().match(/^-?([0-9]+(\.)?([0-9][0-9]?)?)?|(^[0-9]+(\.)?([0-9]+))/);
                if ((!transformedInput) || (transformedInput.length === 0) || (!transformedInput[0])) {
                    transformedInput = [];
                    transformedInput[0] = '';
                }
                if (transformedInput[0] !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput[0]);
                    modelCtrl.$render();
                }

                return transformedInput[0];
            });
        }
    };
});
var DIGIT_REGEXP = /\d{0,}$/;
formvalidation.directive('validationDigitsWithMaxAndMin', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$validators.validationDigits = function(modelValue, viewValue) {
                    
                    var allowEmpty = (attrs.validationDigitsWithMaxAndMin) ? attrs.validationDigitsWithMaxAndMin : '';
                    var max;
                    if (attrs.maxvalue && attrs.maxvalue != '') {
                        max = parseInt(attrs.maxvalue);
                    }
                    var min;
                    if (attrs.minvalue && attrs.maxvalue != '') {
                        min = parseInt(attrs.minvalue);
                    }
                    
                    //allow empty
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        //var allowEmpty = (attrs.validationEmail) ? attrs.validationEmail : '';
                        if (allowEmpty !== 'allow-empty') {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope);
                            }
                            return false;
                        } else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm);
                            }
                            return true;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;

                    }


                    if (DIGIT_REGEXP.test(viewValue)) {
                        if (max) {
                            if (parseInt(viewValue) > max) {
                                if (ctrl.isFocused) {
                                    ctrl.currentBorderCol = ERROR_BORDER;
                                } else {
                                    ctrl.borderCol = ERROR_BORDER;
                                }
                                if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                    ctrl.$invalidtext = ErrorConstants.lessThan + ' ' + max;
                                    setErrorText.setError(elm, ErrorConstants.lessThan + ' ' + max, ctrl, scope, attrs);
                                }
                                return false;
                            }
                        }
                        if (min) {
                            if (parseInt(viewValue) < min) {
                                if (ctrl.isFocused) {
                                    ctrl.currentBorderCol = ERROR_BORDER;
                                } else {
                                    ctrl.borderCol = ERROR_BORDER;
                                }
                                if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                    ctrl.$invalidtext = ErrorConstants.greaterThan + ' ' + min;
                                    setErrorText.setError(elm, ErrorConstants.greaterThan + ' ' + min, ctrl, scope, attrs);
                                }
                                return false;
                            }
                        }
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidNumber;
                        setErrorText.setError(elm, ErrorConstants.notValidNumber, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
var DECIMALINT_REGEXP = /^[0-9]+(\.[0-9][0-9]?)?$/;
formvalidation.directive('validationDecimalsWithMaxAndMin', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$validators.validationDecimals = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationDecimalsWithMaxAndMin) ? attrs.validationDecimalsWithMaxAndMin : '';
                    var max;
                    if (attrs.maxvalue && attrs.maxvalue != '') {
                        max = parseFloat(attrs.maxvalue);
                    }
                    var min;
                    if (attrs.minvalue && attrs.minvalue != '') {
                        min = parseFloat(attrs.minvalue);
                    }
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        //var allowEmpty = (attrs.validationEmail) ? attrs.validationEmail : '';
                        if (allowEmpty !== 'allow-empty') {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope);
                            }
                            return false;
                        } else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm);
                            }
                            return true;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;

                    }


                    if (DECIMALINT_REGEXP.test(viewValue)) {
                        if (max) {
                            if (parseFloat(viewValue) > max) {
                                if (ctrl.isFocused) {
                                    ctrl.currentBorderCol = ERROR_BORDER;
                                } else {
                                    ctrl.borderCol = ERROR_BORDER;
                                }
                                if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                    ctrl.$invalidtext = ErrorConstants.lessThan + ' ' + max;
                                    setErrorText.setError(elm, ErrorConstants.lessThan + ' ' + max, ctrl, scope, attrs);
                                }

                                return false;
                            }
                        }
                        if (min) {
                            if (parseFloat(viewValue) < min) {
                                if (ctrl.isFocused) {
                                    ctrl.currentBorderCol = ERROR_BORDER;
                                } else {
                                    ctrl.borderCol = ERROR_BORDER;
                                }
                                if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                    ctrl.$invalidtext = ErrorConstants.greaterThan + ' ' + min;
                                    setErrorText.setError(elm, ErrorConstants.greaterThan + ' ' + min, ctrl, scope, attrs);
                                }

                                return false;
                            }
                        }
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidNumber;
                        setErrorText.setError(elm, ErrorConstants.notValidNumber, ctrl, scope, attrs);
                    }

                    return false;
                };
            }
        };
    }]);
var DECIMAL_REGEXP = /^[0-9]+(\.[0-9][0-9]?)?$/;
formvalidation.directive('validationDecimals', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$validators.validationDecimals = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    if (DECIMAL_REGEXP.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidNumber;
                        setErrorText.setError(elm, ErrorConstants.notValidNumber, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
//Email validation
var EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
formvalidation.directive('validationEmail', ['ErrorConstants', 'setErrorText', 'commonFunctions', function(ErrorConstants, setErrorText, commonFunctions) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationEmail = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationEmail) ? attrs.validationEmail : '';
                    var duplicateModel = '';
                    var duplicateValue;
                    if (attrs.checkDuplicate) {
                        duplicateModel = attrs.checkDuplicate;
                        duplicateValue = commonFunctions.objectsbyString(scope, duplicateModel)
                    }
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        //var allowEmpty = (attrs.validationEmail) ? attrs.validationEmail : '';
                        if (allowEmpty !== 'allow-empty') {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        } else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (duplicateModel !== '') {
                        if (!duplicateValue) {
                            duplicateValue = '';
                        }
                        if ((duplicateValue.toLowerCase().trim()) === (viewValue.toLowerCase().trim())) {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.notValidEmail;
                                setErrorText.setError(elm, ErrorConstants.notValidEmailsMatch, ctrl, scope, attrs);
                            }
                            return false;
                        }


                        if (EMAIL_REGEX.test(viewValue) && ((duplicateValue.toLowerCase().trim()) !== (viewValue.toLowerCase().trim()))) {
                            // it is valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }
                    if (EMAIL_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }
                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidEmail;
                        setErrorText.setError(elm, ErrorConstants.notValidEmail, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
//decimal validation
var DECIMAL_REGEX = /^[0-9]+(\.[0-9][0-9]?)?$/

formvalidation.directive('validationDecimal', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationDecimal = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    if (DECIMAL_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidNumber;
                        setErrorText.setError(elm, ErrorConstants.notValidNumber, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
//validation-date-time
var DATETIME_REGEX = /^(((0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):([0-9]|0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)[\/\.-]((19|[2-9]\d)\d{2})\s([0-9]|0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](0[1-9]|1\d|2[0-8])[\/\.-]((19|[2-9]\d)\d{2})\s([0-9]|0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](29)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s([0-9]|0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/;
formvalidation.directive('validationDateTime', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationDateTime = function(modelValue, viewValue) {
                    if (attrs.validationDateTime !== 'allow-empty') {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (!parseCustomDate(viewValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = parseCustomDateMessage(viewValue);
                            setErrorText.setError(elm, parseCustomDateMessage(viewValue), ctrl, scope, attrs);
                        }
                        return false;
                    }

                    var timeArray = viewValue.split(' ');
                    var time = ((timeArray[1]) ? timeArray[1] : '') + ' ' + ((timeArray[2]) ? timeArray[2] : '');
                    if (TIME_REGEX.test(time)) {

                        if (!parseCustomTime(viewValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.notValidTime;
                                setErrorText.setError(elm, ErrorConstants.notValidTime, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {

                        // it is invalid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.notValidDateTime;
                            setErrorText.setError(elm, ErrorConstants.notValidTime, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // consider empty models to be not  valid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;

                };
            }
        };
    }]);
//validation-date
var DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
formvalidation.directive('validationDate', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationDateTime = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }

                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    if (DATE_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }

                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidDateTime;
                        setErrorText.setError(elm, ErrorConstants.notValidDateTime, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
//Five digit us zipcode validation
var ZIPCODE_REGEX = /^\d{5}$/;
formvalidation.directive('validationZipcode', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationZipcode = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    if (ZIPCODE_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidZipCode;
                        setErrorText.setError(elm, ErrorConstants.notValidZipCode, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
// for numbers
var NUMBER_REGEX = /^[0-9]{,50}$/;
formvalidation.directive('validationNum', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationNum = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    if (NUMBER_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                        // it is invalid
                    }
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidNumber;
                        setErrorText.setError(elm, ErrorConstants.notValidNumber, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
////=====
//Max,min  length validation 
var MAXLEN50_REGEX = /^[.]{,50}$/;
var MINLEN5_REGEX = /^[.]{5,}$/;
var MINMAX2TO50_REGEX = /^[a-zA-Z0-9\s]{1,50}$/;
formvalidation.directive('validationAlphaNum', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationAlphaNum = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    if (MINMAX2TO50_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidAlphaNum;
                        setErrorText.setError(elm, ErrorConstants.notValidAlphaNum, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
// Validation for select 
formvalidation.directive('validationDropdown', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationDropdown = function(modelValue, viewValue) {

                    if ((viewValue === null) || (!viewValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.notValidDropDown;
                            setErrorText.setError(elm, ErrorConstants.notValidDropDown, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is valid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);
formvalidation.directive('validationNotEmpty', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationNotEmpty = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.emptyfield;
                            setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);
formvalidation.directive('emergencyContactNotEmpty', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.emergencyContactNotEmpty = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.requireContact;
                            setErrorText.setError(elm, ErrorConstants.requireContact, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);

var isDate = function(x) {
    return x instanceof Date;
};
formvalidation.directive('validationDateUsingKendo', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$validators.validationNotDate = function(modelValue, viewValue) {
                    if (attrs.validationDateUsingKendo !== 'allow-empty') {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (!parseCustomDate(viewValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = parseCustomDateMessage(viewValue);
                            setErrorText.setError(elm, parseCustomDateMessage(viewValue), ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);
var TIME_REGEX = /^ *(1[0-2]|[1-9]):[0-5][0-9] (a|p|A|P)(m|M) *$/;
formvalidation.directive('validationTimeUsingKendo', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationNotDate = function(modelValue, viewValue) {
                    if (attrs.validationTimeUsingKendo !== 'allow-empty') {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (TIME_REGEX.test(viewValue)) {

                        if (!parseCustomTime(viewValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.notValidTime;
                                setErrorText.setError(elm, ErrorConstants.notValidTime, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {

                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.notValidTime;
                            setErrorText.setError(elm, ErrorConstants.notValidTime, ctrl, scope, attrs);
                        }
                        return false;
                    }
                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);
var MINMAX_ALPHA_NUM_SPECIAL2TO50_REGEX = /^[a-zA-Z0-9\s,\'!@#\$%\^\&*\)\(+=._-]{1,}$/;
formvalidation.directive('validationAlphaNumSpecial', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationAlphaNumSpecial = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationAlphaNumSpecial) ? attrs.validationAlphaNumSpecial : '';
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (allowEmpty !== 'allow-empty') {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        } else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

//                    if (MINMAX_ALPHA_NUM_SPECIAL2TO50_REGEX.test(viewValue)) {
                    // it is valid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
//                    }

                    // it is invalid
//                    if (ctrl.isFocused) {
//                        ctrl.currentBorderCol = ERROR_BORDER;
//                    } else {
//                        ctrl.borderCol = ERROR_BORDER;
//                    }
//                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
//                        ctrl.$invalidtext = ErrorConstants.notValidAlphaNumspecial;
//                        setErrorText.setError(elm, ErrorConstants.notValidAlphaNumspecial, ctrl, scope);
//                    }
//                    return false;
                };
            }
        };
    }]);
var SP_NAME_REGEX = /^[a-zA-Z\s,\.]{0,50}$/;
//var SP_NAME_REGEX = /^[a-zA-Z,\.]{0,50}$/;
formvalidation.directive('validationSpName', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationSpName = function(modelValue, viewValue) {
                    var allowEmpty = (attrs.validationSpName) ? attrs.validationSpName : '';
                    if (ctrl.$isEmpty(modelValue)) {
                        if (allowEmpty !== 'allow-empty') {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                        else {
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (SP_NAME_REGEX.test(viewValue)) {
                        // it is valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = DEFAULT_BORDER;
                        } else {
                            ctrl.borderCol = DEFAULT_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            setErrorText.removeErrorText(elm, attrs);
                        }
                        return true;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = ERROR_BORDER;
                    } else {
                        ctrl.borderCol = ERROR_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        ctrl.$invalidtext = ErrorConstants.notValidAlphaNum;
                        setErrorText.setError(elm, ErrorConstants.notValidName, ctrl, scope, attrs);
                    }
                    return false;
                };
            }
        };
    }]);
formvalidation.directive('validationSpBithdayUsingKendo', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$validators.validationSpBithdayUsingKendo = function(modelValue, viewValue) {
                    if (attrs.validationSpBithdayUsingKendo !== 'allow-empty') {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = ERROR_BORDER;
                            } else {
                                ctrl.borderCol = ERROR_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                ctrl.$invalidtext = ErrorConstants.emptyfield;
                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
                            }
                            return false;
                        }
                    }
                    else {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be not  valid
                            if (ctrl.isFocused) {
                                ctrl.currentBorderCol = DEFAULT_BORDER;
                            } else {
                                ctrl.borderCol = DEFAULT_BORDER;
                            }
                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                                setErrorText.removeErrorText(elm, attrs);
                            }
                            return true;
                        }
                    }

                    if (!parseCustomBirthDate(viewValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = parseCustomBirthDateMessage(viewValue);
                            setErrorText.setError(elm, parseCustomBirthDateMessage(viewValue), ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);

formvalidation.directive('validationSpSsn', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.validationSpSsn = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be not  valid
                        if (ctrl.isFocused) {
                            ctrl.currentBorderCol = ERROR_BORDER;
                        } else {
                            ctrl.borderCol = ERROR_BORDER;
                        }
                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                            ctrl.$invalidtext = ErrorConstants.notValidSSN;
                            setErrorText.setError(elm, ErrorConstants.notValidSSN, ctrl, scope, attrs);
                        }
                        return false;
                    }

                    // it is invalid
                    if (ctrl.isFocused) {
                        ctrl.currentBorderCol = DEFAULT_BORDER;
                    } else {
                        ctrl.borderCol = DEFAULT_BORDER;
                    }
                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
                        setErrorText.removeErrorText(elm, attrs);
                    }
                    return true;
                };
            }
        };
    }]);
//var SP_SSN_REGEX = /^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;
//formvalidation.directive('validationSpSsn', ['ErrorConstants', 'setErrorText', function(ErrorConstants, setErrorText) {
//        return {
//            require: 'ngModel',
//            link: function(scope, elm, attrs, ctrl) {
//                ctrl.$validators.validationSpSsn = function(modelValue, viewValue) {
//                    var allowEmpty = (attrs.validationSpSsn) ? attrs.validationSpSsn : '';
//                    if (ctrl.$isEmpty(modelValue)) {
//                        if (allowEmpty !== 'allow-empty') {
//                            // consider empty models to be not  valid
//                            if (ctrl.isFocused) {
//                                ctrl.currentBorderCol = ERROR_BORDER;
//                            } else {
//                                ctrl.borderCol = ERROR_BORDER;
//                            }
//                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
//                                ctrl.$invalidtext = ErrorConstants.emptyfield;
//                                setErrorText.setError(elm, ErrorConstants.emptyfield, ctrl, scope, attrs);
//                            }
//                            return false;
//                        }
//                        else {
//                            if (ctrl.isFocused) {
//                                ctrl.currentBorderCol = DEFAULT_BORDER;
//                            } else {
//                                ctrl.borderCol = DEFAULT_BORDER;
//                            }
//                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
//                                setErrorText.removeErrorText(elm, attrs);
//                            }
//                            return true;
//                        }
//                    }
//
//                    if (SP_SSN_REGEX.test(viewValue)) {
////                        var arr = viewValue.split('-');
////                        if (parseInt(arr[0]) === 0 || parseInt(arr[0]) === 666 || ((parseInt(arr[0]) >= 900) && (parseInt(arr[0]) <= 999))) {
////                            if (ctrl.isFocused) {
////                                ctrl.currentBorderCol = ERROR_BORDER;
////                            } else {
////                                ctrl.borderCol = ERROR_BORDER;
////                            }
////                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
////                                ctrl.$invalidtext = ErrorConstants.notValidSSN;
////                                setErrorText.setError(elm, ErrorConstants.notValidSSN, ctrl, scope, attrs);
////                            }
////                            return false;
////                        }
////                        if (parseInt(arr[1]) === 0 || parseInt(arr[2]) === 0) {
////                            if (ctrl.isFocused) {
////                                ctrl.currentBorderCol = ERROR_BORDER;
////                            } else {
////                                ctrl.borderCol = ERROR_BORDER;
////                            }
////                            if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
////                                ctrl.$invalidtext = ErrorConstants.notValidSSN;
////                                setErrorText.setError(elm, ErrorConstants.notValidSSN, ctrl, scope, attrs);
////                            }
////                            return false;
////                        }
//                        // it is valid
//                        if (ctrl.isFocused) {
//                            ctrl.currentBorderCol = DEFAULT_BORDER;
//                        } else {
//                            ctrl.borderCol = DEFAULT_BORDER;
//                        }
//                        if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
//                            setErrorText.removeErrorText(elm, attrs);
//                        }
//                        return true;
//                    }
//
//                    // it is invalid
//                    if (ctrl.isFocused) {
//                        ctrl.currentBorderCol = ERROR_BORDER;
//                    } else {
//                        ctrl.borderCol = ERROR_BORDER;
//                    }
//                    if (attrs.validationErrorText === 'true' || attrs.validationErrorText === 'false' || attrs.validationErrorText === '') {
//                        ctrl.$invalidtext = ErrorConstants.notValidSSN;
//                        setErrorText.setError(elm, ErrorConstants.notValidSSN, ctrl, scope, attrs);
//                    }
//                    return false;
//                };
//            }
//        };
//
//    }]);