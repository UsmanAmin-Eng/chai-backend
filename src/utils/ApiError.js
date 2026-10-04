// Define a custom error class that extends JavaScript's built-in Error.
class ApiError extends Error {
    // Constructor receives an HTTP status code, a message, an error array, and an optional stack string.
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        statck = ""
    ) {
        // Call the parent Error constructor with the message.
        super(message);

        // Store the HTTP status code for the client response.
        this.statusCode = statusCode;

        // Default data value is null until additional information is attached.
        this.data = null;

        // Set the error message on the instance.
        this.message = message;

        // Mark the request as unsuccessful by default.
        this.success = false;

        // Keep the actual error details or validation messages.
        this.error = error;

        // If a custom stack is provided, use it; otherwise capture the stack trace for this constructor.
        if (statck) {
            this.stack = statck;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the custom error class so it can be used throughout the app.
export { ApiError };