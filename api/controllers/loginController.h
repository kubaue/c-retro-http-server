#include <string.h>
#include <jansson.h>
#include "../base64/base64.h"
#include "../idGenerator.h"
#include "../http/httpResposeStatus.h"
#include "../repositories/userRepository.h"
#include "../http/http.h"

void processSuccessfulLogin(json_t *user, char status[], char responseBody[]);

void loginController(char *requestBody, char responseBody[], char responseStatus[]) {

    json_error_t error;
    json_t *requestJson = json_loads(requestBody, 0, &error);
    json_t *login = json_object_get(requestJson, "login");

    json_t *user = findUserByLogin(json_string_value(login));

    char status[statusBufferLength];
    json_t *requestPassword = json_object_get(requestJson, "password");
    json_t *userPassword = json_object_get(user, "password");
    if (user && json_equal(requestPassword, userPassword)) {
        processSuccessfulLogin(requestJson, user, status, responseBody);
    } else {
        strcpy(status, responseStatusBadRequest);
    }
    strncpy(responseStatus, status, strlen(status));
}

void processSuccessfulLogin(json_t *user, char status[], char responseBody[]) {
    json_t *userId = json_object_get(user, "id");
    json_t *userName = json_object_get(user, "name");
    json_t *userRole = json_object_get(user, "role");

    char tokenContents[httpBufferLength];
    sprintf(tokenContents, "{\"id\": \"%s\", \"name\": \"%s\", \"role\": \"%s\"}", json_string_value(userId), json_string_value(userName), json_string_value(userRole));

    char *token = b64_encode((const unsigned char *) tokenContents, strlen(tokenContents));

    strcpy(status, responseStatusOK);
    char response[httpBufferLength];
    sprintf(response, "{\"token\": \"%s\"}", token);
    strncpy(responseBody, response, strlen(response));
}
