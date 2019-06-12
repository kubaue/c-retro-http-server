cmake_minimum_required(VERSION 3.14)
project(test_exam C)

set(CMAKE_C_STANDARD 11)

find_package (libmongoc-1.0 1.14 REQUIRED)

message ("--   mongoc found version \"${MONGOC_VERSION}\"")
message ("--   mongoc include path \"${MONGOC_INCLUDE_DIRS}\"")
message ("--   mongoc libraries \"${MONGOC_LIBRARIES}\"")
add_executable(test_exam main.c)

target_include_directories (test_exam PRIVATE "${MONGOC_INCLUDE_DIRS}")
target_link_libraries (test_exam PRIVATE "${MONGOC_LIBRARIES}")
target_compile_definitions (test_exam PRIVATE "${MONGOC_DEFINITIONS}")