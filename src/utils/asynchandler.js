// This function wraps a route/controller function.
// It accepts a handler and returns another function used as Express middleware.
const asyncHandler = (requestHandler) => {
    // This returned function receives req, res, and next from Express.
    (req, res, next) => {
        // Resolve the handler result and catch any rejected promise.
        // Then pass the error to Express error middleware using next(error).
        Promise.resolve(requestHandler(req, res, next)).catch(error => next(error));
    }
};

// Export the async handler so it can be reused in controllers/routes.
export { asyncHandler };

// Example of a minimal handler wrapper with no logic inside.
// const asyncHandler = () => {}

// Example of a function that returns a new function for middleware usage.
// const asyncHandler = (fun) => () => {}

// Example of a wrapper that returns an async function.
// const asyncHandler = (fun) => async () => {}





// A more complete version with try/catch and a custom JSON error response.
// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };