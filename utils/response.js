module.exports = {
    ok(res, data, message) {
        res.status(200).json({
            data,
            status: "SUCCESS",
            message
        })
    },
    success(res, message) {
        res.status(200).json({
            status: "SUCCESS",
            message
        })
    },
    created(res, data) {
        res.status(201).json({
            data,
            status: "SUCCESS",
            message: 'CREATED SUCCESSFUllY'
        })
    },
    deleted(res, data) {
        res.status(200).json({
            data,
            status: 'SUCCESS',
            message: 'Deleted Sucessfully'

        });
    },

    modified(res, data) {
        res.status(200).json({
            data,
            status: 'SUCCESS',
            message: 'Updated Sucessfully'

        });
    },
    error(res, err) {

        if (err.message.includes("Validation failed")) {
            // err.message = "Invalid data provided"
            err.status = 400
        }
        // logger.error(err.stack)
        err.code = err.code == 11000 ? 500 : err.code //chec for mongo error
        res.status((+err.status) || (+err.code) || 500).send({
            code: err.code == 11000 ? 500 : err.code,
            message: err.message,
            stack: err.stack || ""
            // status: 'FAIL'
        });
    }
}