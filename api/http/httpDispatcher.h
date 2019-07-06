#include <stdio.h>
#include <stdlib.h>
#include "../controllers/usersController.h"
#include "../controllers/groupsController.h"
#include "../base64/base64Decode.h"
#include "../controllers/examController.h"

const int bufferLength = 32;

void extractPath(char dest[], char *httpRequest, int httpMethodLength);

void extractMethod(char dest[], char *httpRequest);

int lengthBeforeNextSpace(const char *inputString);

void extractBody(char dest[], char *httpRequest);

void extractUserRole(char dest[], char *httpRequest);

void buildHttpResponse(char *body, char responseStatus[], char responseBody[]);

unsigned long long lengthBeforeEOL(const char *inputString);

void dispatchHttpRequest(char *httpRequest, char httpResponseBody[]) {
    char requestMethod[bufferLength];
    char requestPath[bufferLength];
    char requestBody[httpBufferLength];
    char userRole[httpBufferLength];

    extractMethod(requestMethod, httpRequest);
    extractPath(requestPath, httpRequest, strlen(requestMethod));
    extractBody(requestBody, httpRequest);
    extractUserRole(userRole, httpRequest);

    char responseStatus[httpBufferLength];
    char responseBody[httpBufferLength];

    memset(responseStatus, '\0', bufferLength);
    memset(responseBody, '\0', httpBufferLength);

    printf("\nIncomming request\n");
    if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/login") == 0) {
        loginController(requestBody, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "GET") == 0 && strcmp(requestPath, "/groups") == 0) {
        getGroupsController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/groups") == 0) {
        createGroupController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/groups/assignStudent") == 0) {
        assignStudentController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/groups/removeStudent") == 0) {
        removeStudentFromGroupController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "GET") == 0 && strcmp(requestPath, "/students") == 0) {
        getStudentsController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/exams") == 0) {
        createExamController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/completeExam") == 0) {
        compleExamController(requestBody, userRole, responseBody, responseStatus);
    } else if (strcmp(requestMethod, "GET") == 0 && strcmp(requestPath, "/exams") == 0) {
        getExamsController(requestBody, userRole, responseBody, responseStatus);
    } else {
        printf("Unmatched request: %s %s\n", requestMethod, requestPath);
    }

    printf("HTTP method: %s\n", requestMethod);
    printf("Path: %s\n", requestPath);
    printf("Request body: %s\n", requestBody);
    printf("User role: %s\n", userRole);
    printf("Response status: %s\n", responseStatus);
    printf("Response body: %s\n\n", responseBody);

    buildHttpResponse(httpResponseBody, responseStatus, responseBody);
}

void extractMethod(char dest[], char *httpRequest) {
    memset(dest, '\0', bufferLength);
    strncpy(dest, httpRequest, lengthBeforeNextSpace(httpRequest));
}

void extractPath(char dest[], char *httpRequest, int httpMethodLength) {
    char *strippedFromMethodRequest = httpRequest + httpMethodLength + 1;

    memset(dest, '\0', bufferLength);
    strncpy(dest, strippedFromMethodRequest, lengthBeforeNextSpace(strippedFromMethodRequest));
}

void buildHttpResponse(char *body, char responseStatus[], char responseBody[]) {
    memset(body, '\0', httpBufferLength);
    char response[httpBufferLength];
    sprintf(response,
            "HTTP/1.1 %s\nContent-Type: text/plain\nContent-Length: %lu\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With\n\n%s",
            responseStatus, strlen(responseBody), responseBody);
    strcpy(body, response);
}

void extractBody(char dest[], char *httpRequest) {
    memset(dest, '\0', httpBufferLength);
    char *stripped = strchr(httpRequest, '{');
    if (stripped == NULL) {
        strncpy(dest, "{}", httpBufferLength);
    } else {
        strncpy(dest, stripped, httpBufferLength);
    }
}

void extractUserRole(char *dest, char *httpRequest) {

    char *strippedToAuthorizationHeader = strstr(httpRequest, "Authorization: ");

    if (strippedToAuthorizationHeader == NULL) {
        strncpy(dest, "", 0);
        return;
    }

    char token[httpBufferLength];
    char *strippedAuthorizationHeaderValue = strippedToAuthorizationHeader + 15;

    memset(token, '\0', httpBufferLength);
    int tokenLength = lengthBeforeEOL(strippedAuthorizationHeaderValue);
    strncpy(token, strippedAuthorizationHeaderValue, tokenLength);

    unsigned char *tokenContents = b64_decode(token, strlen(token));

    json_error_t error;
    json_t *requestJson = json_loads((char *) tokenContents, 0, &error);
    json_t *role = json_object_get(requestJson, "role");

    memset(dest, '\0', httpBufferLength);
    const char *roleAsString = json_string_value(role);
    strncpy(dest, roleAsString, strlen(roleAsString));
}

int lengthBeforeNextSpace(const char *inputString) {
    int count = 0;
    for (int i = 0; i < strlen(inputString); i++) {
        if (inputString[i] == ' ') {
            return count;
        }
        count += 1;
    }

    return -1;
}

unsigned long long lengthBeforeEOL(const char *inputString) {
    unsigned long long count = 0;
    for (int i = 0; i < strlen(inputString); i++) {
        if (inputString[i] == '\r') {
            return count;
        }
        count += 1;
    }

    return -1;
}
