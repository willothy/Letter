; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1

declare i32 @printf(i8*, ...)

define void @printInt(i32 %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str, i32 0, i32 0), i32 %v)
  ret void
}

define void @printDouble(double %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.1, i32 0, i32 0), double %v)
  ret void
}

define double @printFloat(float %f) {
entry:
  %val = alloca double, i8 0, align 8
  %flt_upcast = fpext float %f to double
  store double %flt_upcast, double* %val, align 8
  %id_load_tmp = load double, double* %val, align 8
  ret double %id_load_tmp
}

define void @print(i8* %str) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define void @test(i32 %v) {
entry:
  call void @printInt(i32 %v)
  ret void
}

