; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%f\\n\00", align 1

declare i8 @printf(i8*, ...)

declare i8 @pow(double, double, ...)

define i32 @test(i32 %e) {
entry:
  %r = alloca i32, i8 0, align 4
  store i32 %e, i32* %r, align 4
  ret i32 0
}

define i32 @main() {
entry:
  %circumference = alloca float, i8 0, align 4
  store float 2.000000e+00, float* %circumference, align 4
  %c = alloca double, i8 0, align 8
  %tmp = load float, float* %circumference, align 4
  %flt_upcast = fpext float %tmp to double
  store double %flt_upcast, double* %c, align 8
  %tmp1 = load double, double* %c, align 8
  %printf_call = call i8 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str, i32 0, i32 0), double %tmp1)
  ret i32 0
}

