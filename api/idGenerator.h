#include <stdlib.h>

int rangeUpper = 100000;
int rangeLower = 1;

int generateId() {
    int num = (rand() %(rangeUpper - rangeLower + 1)) + rangeLower;
}
