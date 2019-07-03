#include <string.h>
#include <jansson.h>
#include "../base64.h"
#include "../idGenerator.h"
#include "../http/httpResposeStatus.h"

void loginController(char *requestBody, char responseBody[], char responseStatus[]) {

    json_error_t error;
    json_t *root = json_loads(requestBody, 0, &error);
    json_t *login = json_object_get(root, "login");
    json_t *password = json_object_get(root, "password");

    printf("received login %s, password %s\n", json_string_value(login), json_string_value(password));

    char *response = "{\"token\": \"eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiQWRtaW4ifQ\"}";
    strncpy(responseBody, response, strlen(response));

    char status[statusBufferLength];
    strcpy(status, responseStatusOK);
    strncpy(responseStatus, status, strlen(status));
}
