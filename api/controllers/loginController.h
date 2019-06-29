#include <ulfius.h>
#include <string.h>
#include "../base64.h"
#include "../idGenerator.h"

int loginController(const struct _u_request *request, struct _u_response *response, void *user_data) {

    char *message = "Hello from login";

    const unsigned char *input = (unsigned char *) message;
    size_t inputSize = strlen(message);
    size_t *outputSize;

    char *body = base64_encode(input, inputSize, outputSize);

    ulfius_set_string_body_response(response, 200, body);

    return U_CALLBACK_CONTINUE;
}
