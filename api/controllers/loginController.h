#include <string.h>
#include <jansson.h>
#include "../base64.h"
#include "../idGenerator.h"
#include "../http/httpResposeStatus.h"
#include "../repositories/userRepository.h"

void loginController(char *requestBody, char responseBody[], char responseStatus[]) {

    json_error_t error;
    json_t *root = json_loads(requestBody, 0, &error);
    json_t *login = json_object_get(root, "login");
    json_t *requestPassword = json_object_get(root, "password");

    json_t *user = findUserByLogin(json_string_value(login));

    json_t *userPassword = json_object_get(user, "password");


    char status[statusBufferLength];
    if (user && json_equal(requestPassword, userPassword)) {
        strcpy(status, responseStatusOK);
        char *response = "{\"token\": \"eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiQWRtaW4ifQ\"}";
        strncpy(responseBody, response, strlen(response));
    } else {
        strcpy(status, responseStatusBadRequest);
    }
    strncpy(responseStatus, status, strlen(status));
}
