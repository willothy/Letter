; ModuleID = 'test'
source_filename = "test"

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

define void @test(i32 %v) {
entry:
  call void @printInt(i32 %v)
  ret void
}

