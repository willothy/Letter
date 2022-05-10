; ModuleID = 'helloworld'
source_filename = "helloworld"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [14 x i8] c"Hello World\0A\00\00", align 1

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

define i32 @main() {
entry:
  %str = alloca i8*, i8 0, align 8
  store i8* getelementptr inbounds ([14 x i8], [14 x i8]* @anon_str.2, i32 0, i32 0), i8** %str, align 8
  %id_load_tmp = load i8*, i8** %str, align 8
  call void @print(i8* %id_load_tmp)
  ret i32 0
}

