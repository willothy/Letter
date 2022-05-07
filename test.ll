; ModuleID = 'working'
source_filename = "working"

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

define i32 @main() {
entry:
  %radius = alloca i32, i8 0, align 4
  store i32 5, i32* %radius, align 4
  %circumference = alloca float, i8 0, align 4
  %tmp = load i32, i32* %radius, align 4
  %convright = sitofp i32 %tmp to float
  %fmultmp = fmul float 0x401921FB40000000, %convright
  store float %fmultmp, float* %circumference, align 4
  %c = alloca double, i8 0, align 8
  %tmp1 = load float, float* %circumference, align 4
  %flt_upcast = fpext float %tmp1 to double
  store double %flt_upcast, double* %c, align 8
  store double 5.000000e+01, double* %c, align 8
  %c2 = load double, double* %c, align 8
  %tmp3 = load double, double* %c, align 8
  call void @printDouble(double %tmp3)
  ret i32 0
}

