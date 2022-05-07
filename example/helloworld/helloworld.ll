; ModuleID = 'helloworld'
source_filename = "helloworld"

declare i8 @printf(i8*, ...)

define void @printInt(i32 %v) {
entry:
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
  %6 = call i8 (i8*, ...) @printf(i8* %5, i32 %v)
  ret void
}

define void @printDouble(double %v) {
entry:
  %0 = alloca [4 x i8], align 1
  %1 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 0
  store i8 37, i8* %1, align 1
  %2 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 1
  store i8 102, i8* %2, align 1
  %3 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 2
  store i8 10, i8* %3, align 1
  %4 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 3
  store i8 0, i8* %4, align 1
  %5 = getelementptr [4 x i8], [4 x i8]* %0, i32 0, i32 0
  %6 = call i8 (i8*, ...) @printf(i8* %5, double %v)
  ret void
}

define void @print(i8* %v) {
entry:
  %0 = call i8 (i8*, ...) @printf(i8* %v)
  ret void
}

define i32 @main() {
entry:
  %str = alloca i8*, i8 0, align 8
  %0 = alloca [13 x i8], align 1
  %1 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 0
  store i8 72, i8* %1, align 1
  %2 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 1
  store i8 101, i8* %2, align 1
  %3 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 2
  store i8 108, i8* %3, align 1
  %4 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 3
  store i8 108, i8* %4, align 1
  %5 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 4
  store i8 111, i8* %5, align 1
  %6 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 5
  store i8 32, i8* %6, align 1
  %7 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 6
  store i8 87, i8* %7, align 1
  %8 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 7
  store i8 111, i8* %8, align 1
  %9 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 8
  store i8 114, i8* %9, align 1
  %10 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 9
  store i8 108, i8* %10, align 1
  %11 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 10
  store i8 100, i8* %11, align 1
  %12 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 11
  store i8 10, i8* %12, align 1
  %13 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 12
  store i8 0, i8* %13, align 1
  %14 = getelementptr [13 x i8], [13 x i8]* %0, i32 0, i32 0
  store i8* %14, i8** %str, align 8
  %tmp = load i8*, i8** %str, align 8
  call void @print(i8* %tmp)
  ret i32 0
}

