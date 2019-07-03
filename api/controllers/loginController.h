#include <string.h>
#include "../base64.h"
#include "../idGenerator.h"

void loginController(char *body, char responseDest[]) {
    char *response = "{\"token\": \"eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiQWRtaW4ifQ\"}";
    strncpy(responseDest, response, strlen(responseDest));
}
