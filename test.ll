; ModuleID = 'test'
source_filename = "test"

declare i8 @printf(i8*, ...)

define i32 @main() {
entry:
  %test = alloca i32, i8 0, align 4
  store i32 15, i32* %test, align 4
  %0 = alloca [4 x i8], align 1
  %1 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 0
  store i8 37, i8* %1, align 1
  %2 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 1
  store i8 100, i8* %2, align 1
  %3 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 2
  store i8 10, i8* %3, align 1
  %4 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 3
  store i8 0, i8* %4, align 1
  %5 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 0
  %id_load_tmp = load i32, i32* %test, align 4
  %6 = call i8 (i8*, ...) @printf(i8* %5, i32 %id_load_tmp)
  ret i32 0
}

