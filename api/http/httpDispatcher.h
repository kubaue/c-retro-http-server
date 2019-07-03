#include <stdio.h>
#include <stdlib.h>
#include "../controllers/loginController.h"

const int bufferLength = 16;
const int httpBufferLength = 1024;

void extractPath(char dest[], char *httpRequest, int httpMethodLength);

void extractMethod(char dest[], char *httpRequest);

int lengthBeforeNextSpace(const char *inputString);

void extractBody(char dest[], char *httpRequest);

void dispatchHttpRequest(char *httpRequest, char httpResponseBody[]) {
    char requestMethod[bufferLength];
    char requestPath[bufferLength];
    char requestBody[httpBufferLength];

    extractMethod(requestMethod, httpRequest);
    extractPath(requestPath, httpRequest, strlen(requestMethod));
    extractBody(requestBody, httpRequest);

    char responseBody[httpBufferLength];

    if (strcmp(requestMethod, "POST") == 0 && strcmp(requestPath, "/login") == 0) {
        loginController(requestBody, responseBody);
    } else {
        printf("Unmatched request: %s %s\n", requestMethod, requestPath);
    }

    printf("\nIncomming request\n");
    printf("Method %s\n", requestMethod);
    printf("Path %s\n", requestPath);
    printf("Request body %s\n\n", requestBody);
    printf("Response body %s\n\n", responseBody);

    memset(httpResponseBody, '\0', httpBufferLength);
    strcpy(httpResponseBody,  );
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

void extractBody(char dest[], char *httpRequest) {
    memset(dest, '\0', httpBufferLength);
    char *stripped = strchr(httpRequest, '{');
    if (stripped == NULL) {
        strncpy(dest, "{}", httpBufferLength);
    } else {
        strncpy(dest, stripped, httpBufferLength);
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
