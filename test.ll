; ModuleID = 'test'
source_filename = "test"

declare i8 @printf(i8*, ...)

define void @printInt(i8 %v) {
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
  %6 = call i8 (i8*, ...) @printf(i8* %5, i8 %v)
  ret void
}

define void @printDouble(i8 %v) {
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
  %6 = call i8 (i8*, ...) @printf(i8* %5, i8 %v)
  ret void
}

define void @print(i8 %v) {
entry:
  %0 = call i8 (i8*, ...) @printf(i8 %v)
  ret void
}

define i8 @circumference(i8 %radius, i8 %pi) {
entry:
  %convright = sitofp i8 %pi to float
  %fmultmp = fmul float 2.000000e+00, %convright
  %convright1 = sitofp i8 %radius to float
  %fmultmp2 = fmul float %fmultmp, %convright1
  ret float %fmultmp2
}

define i8 @main() {
entry:
  %value = alloca i8, i8 0, align 1
  %0 = call i8 @circumference(float 5.000000e+00, float 0x400920C4A0000000)
  store i8 %0, i8* %value, align 1
  %1 = alloca [4 x i8], align 1
  %2 = getelementptr [4 x i8], [4 x i8]* %1, i32 0, i32 0
  store i8 37, i8* %2, align 1
  %3 = getelementptr [4 x i8], [4 x i8]* %1, i32 0, i32 1
  store i8 102, i8* %3, align 1
  %4 = getelementptr [4 x i8], [4 x i8]* %1, i32 0, i32 2
  store i8 10, i8* %4, align 1
  %5 = getelementptr [4 x i8], [4 x i8]* %1, i32 0, i32 3
  store i8 0, i8* %5, align 1
  %6 = getelementptr [4 x i8], [4 x i8]* %1, i32 0, i32 0
  %tmp = load i8, i8* %value, align 1
  %7 = call i8 (i8*, ...) @printf(i8* %6, i8 %tmp)
  ret i32 0
}

