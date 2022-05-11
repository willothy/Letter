#include "stdio.h"
#include "stdbool.h"

int main() {
	bool b = (1 == 1.0);
	printf("%d\n", b);
	return 0;
}
