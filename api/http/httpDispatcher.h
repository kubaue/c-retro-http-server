#include <stdio.h>
#include <stdlib.h>
#include "../controllers/loginController.h"

#define BUFFER_LENGTH 16
#define HTTP_BODY_LENGTH 1024

void extractPath(char dest[], char *httpRequest, int httpMethodLength);

void extractMethod(char dest[], char *httpRequest);

int lengthBeforeNextSpace(const char *inputString);

void extractBody(char dest[], char *httpRequest);

void dispatchHttpRequest(char *httpRequest) {
    char method[BUFFER_LENGTH];
    char path[BUFFER_LENGTH];
    char body[HTTP_BODY_LENGTH];

    extractMethod(method, httpRequest);
    extractPath(path, httpRequest, strlen(method));
    extractBody(body, httpRequest);
//
//    if(strcmp(method, "GET") == 0 && strcmp(path, "/login") == 0) {
//        // loginController(body);
//        printf("matched\n");
//    } else {
//        printf("Unmatched request: %s %s\n", method, path);
//    }

    printf("\nIncomming request\n");
    printf("Method %s\n", method);
    printf("Path %s\n", path);
    printf("Body %s\n\n", body);
}

void extractMethod(char dest[], char *httpRequest) {
    memset(dest, '\0', BUFFER_LENGTH);
    strncpy(dest, httpRequest, lengthBeforeNextSpace(httpRequest));
}

void extractPath(char dest[], char *httpRequest, int httpMethodLength) {
    char *strippedFromMethodRequest = httpRequest + httpMethodLength + 1;

    memset(dest, '\0', BUFFER_LENGTH);
    strncpy(dest, strippedFromMethodRequest, lengthBeforeNextSpace(strippedFromMethodRequest));
}

void extractBody(char dest[], char *httpRequest) {
    memset(dest, '\0', HTTP_BODY_LENGTH);
    char *stripped = strchr(httpRequest, '{');
    if (stripped == NULL) {
        strncpy(dest, "{}", HTTP_BODY_LENGTH);
    } else {
        strncpy(dest, stripped, HTTP_BODY_LENGTH);
    }
}

int lengthBeforeNextSpace(const char *inputString) {
    int count = 0;
    for (int i = 0; i < sizeof(inputString); i++) {
        if (inputString[i] == ' ') {
            return count;
        }
        count += 1;
    }

    return -1;
}
