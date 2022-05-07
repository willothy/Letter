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

define float @circumference(float %radius) {
entry:
  %fmultmp = fmul float 0x401921FB40000000, %radius
  ret float %fmultmp
}

define i32 @main() {
entry:
  %value = alloca double, i8 0, align 8
  %0 = call float @circumference(float 5.000000e+00)
  %flt_upcast = fpext float %0 to double
  store double %flt_upcast, double* %value, align 8
  %tmp = load double, double* %value, align 8
  call void @printDouble(double %tmp)
  ret i32 0
}

