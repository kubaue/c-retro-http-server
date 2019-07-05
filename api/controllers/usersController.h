#include <string.h>
#include <jansson.h>
#include "../idGenerator.h"
#include "../http/httpResposeStatus.h"
#include "../repositories/userRepository.h"
#include "../http/http.h"
#include "../base64/base64Encode.h"

void processSuccessfulLogin(json_t *user, char status[], char responseBody[]);

void unauthorizedForGettingStudents(char *responseStatus);

void getStudentsController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "admin") == 0 || strcmp(userRole, "examiner") == 0) {
        char allStudentsJson[httpBufferLength];

        findAllStudents(allStudentsJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
        strncpy(responseBody, allStudentsJson, strlen(allStudentsJson));
    } else {
        unauthorizedForGettingStudents(responseStatus);
    }
}

void loginController(char *requestBody, char responseBody[], char responseStatus[]) {

    json_error_t error;
    json_t *requestJson = json_loads(requestBody, 0, &error);
    json_t *login = json_object_get(requestJson, "login");

    json_t *user = findUserByLogin(json_string_value(login));

    char status[statusBufferLength];
    json_t *requestPassword = json_object_get(requestJson, "password");
    json_t *userPassword = json_object_get(user, "password");
    if (user && json_equal(requestPassword, userPassword)) {
        processSuccessfulLogin(user, status, responseBody);
    } else {
        strcpy(status, responseStatusBadRequest);
    }
    strncpy(responseStatus, status, strlen(status));
}

void unauthorizedForGettingStudents(char *responseStatus) {
    char status[statusBufferLength];
    memset(status, '\0', statusBufferLength);
    strcpy(status, responseStatusUnauthorized);
    memset(responseStatus, '\0', httpBufferLength);
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
