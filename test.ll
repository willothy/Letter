; ModuleID = 'test'
source_filename = "test"

@0 = private unnamed_addr constant [4 x i8] c"%f\0A\00", align 1

define i32 @test() {
entry:
  %radius = alloca i32, i8 0, align 4
  store i32 5, i32* %radius, align 4
  %circumference = alloca float, i8 0, align 4
  store float 2.000000e+00, float* %circumference, align 4
  %tmp = load float, float* %circumference, align 4
  %tmp1 = fpext float %tmp to double
  %printCall = call i8 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @0, i32 0, i32 0), double %tmp1)
  ret i32 0
}

declare i8 @printf(i8*, ...)

declare i8 @pow(double, double, ...)

