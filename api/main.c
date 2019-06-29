#include <stdio.h>
#include <ulfius.h>

#include "http/httpServer.h"

int main(void) {
    printf("Booting up\n");
    runHttpServer();
    printf("Server stopped\n");
    return 0;
}