; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [15 x i8] c"BigFloat: %f\0A\00\00", align 1
@anon_str.3 = private unnamed_addr constant [5 x i8] c"%c\0A\00\00", align 1
@anon_str.4 = private unnamed_addr constant [18 x i8] c"Max Integer: %i\0A\00\00", align 1
@anon_str.5 = private unnamed_addr constant [33 x i8] c"Max Integer + 1 (overflow): %i\0A\00\00", align 1

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

define void @print(i8* %str) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define float @circumference(float %radius) {
entry:
  %flt_multmp = fmul float 0x401921FB40000000, %radius
  ret float %flt_multmp
}

define i32 @main() {
entry:
  %value = alloca double, i8 0, align 8
  store double 0x4492309CE5282F0E, double* %value, align 8
  %id_load_tmp = load double, double* %value, align 8
  call void @printDouble(double %id_load_tmp)
  %bigfloat = alloca float, i8 0, align 4
  store float 0x4492309CE0000000, float* %bigfloat, align 4
  %b = alloca double, i8 0, align 8
  %id_load_tmp1 = load float, float* %bigfloat, align 4
  %flt_upcast = fpext float %id_load_tmp1 to double
  store double %flt_upcast, double* %b, align 8
  %id_load_tmp2 = load double, double* %b, align 8
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([15 x i8], [15 x i8]* @anon_str.2, i32 0, i32 0), double %id_load_tmp2)
  %c = alloca i8, i8 0, align 1
  store i8 99, i8* %c, align 1
  %id_load_tmp3 = load i8, i8* %c, align 1
  %1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.3, i32 0, i32 0), i8 %id_load_tmp3)
  %max = alloca i32, i8 0, align 4
  store i32 2147483647, i32* %max, align 4
  %id_load_tmp4 = load i32, i32* %max, align 4
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([18 x i8], [18 x i8]* @anon_str.4, i32 0, i32 0), i32 %id_load_tmp4)
  %overflow = alloca i32, i8 0, align 4
  store i32 -2147483648, i32* %overflow, align 4
  %id_load_tmp5 = load i32, i32* %overflow, align 4
  %3 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([33 x i8], [33 x i8]* @anon_str.5, i32 0, i32 0), i32 %id_load_tmp5)
  ret i32 0
}

