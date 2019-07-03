#include <stdio.h>

#include "http/httpServer.h"

int main(void) {
    printf("Booting up\n");
    initGenerator();
    runHttpServer();
    printf("Server stopped\n");
    return 0;
}