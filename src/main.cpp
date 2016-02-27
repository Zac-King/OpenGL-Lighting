 
#include "LightingOBJApplication.h"
#include "LightingSphereApplication.h" 
#include <iostream>

int main() {
	
	// change startup application
	BaseApplication* app = new LightingSphereApplication();
	if (app->startup())
		app->run();
		//system("pause");
	app->shutdown();

	return 0;
}