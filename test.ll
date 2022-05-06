; ModuleID = 'working'
source_filename = "working"

@anon_str = private unnamed_addr constant [4 x i8] c"%d\0A\00", align 1
@anon_str.1 = private unnamed_addr constant [4 x i8] c"%f\0A\00", align 1

declare i8 @printf(i8*, ...)

define void @printInt(i32 %v) {
entry:
  %0 = call i8 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @anon_str, i32 0, i32 0), i32 %v)
  ret void
}

define void @printDouble(double %v) {
entry:
  %0 = call i8 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @anon_str.1, i32 0, i32 0), double %v)
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
  %tmp2 = load double, double* %c, align 8
  call void @printDouble(double %tmp2)
  ret i32 0
}

