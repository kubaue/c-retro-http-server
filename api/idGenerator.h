#include <stdlib.h>
#include<time.h>

#ifndef ID_GENERATOR
#define ID_GENERATOR 1

#define idLength 5
#define rangeUpper 90000
#define rangeLower 10000

void initGenerator() {
    srand(time(0));
}

int generateId() {
    int num = (rand() %(rangeUpper - rangeLower + 1)) + rangeLower;
    return num;
}

#endif