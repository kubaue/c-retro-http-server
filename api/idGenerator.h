#include <stdlib.h>
#include<time.h>
#define idLength 5

int rangeUpper = 90000;
int rangeLower = 10000;

void initGenerator() {
    srand(time(0));
}

int generateId() {
    int num = (rand() %(rangeUpper - rangeLower + 1)) + rangeLower;
}
