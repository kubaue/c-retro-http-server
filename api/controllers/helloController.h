#include <ulfius.h>

int helloController(const struct _u_request *request, struct _u_response *response, void *user_data) {
    ulfius_set_string_body_response(response, 200, "Hello");
    return U_CALLBACK_CONTINUE;
}