Parallx.namespace("Parallx.Exceptions");

Parallx.Exceptions = (function () {
    'use strict'

    function InvalidParamsError(message) {
        this.name = 'InvalidParamsError'
        this.message = message || 'Unknown'
        this.stack = (new Error()).stack;
    }
    InvalidParamsError.prototype = Object.create(Error.prototype)
    InvalidParamsError.prototype.constructor = InvalidParamsError

    return {
        InvalidParamsError: InvalidParamsError
    }
})();
