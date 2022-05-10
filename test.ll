; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1

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

define void @printFloat(float %f) {
entry:
  %val = alloca double, i8 0, align 8
  %flt_upcast = fpext float %f to double
  store double %flt_upcast, double* %val, align 8
  %id_load_tmp = load double, double* %val, align 8
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.2, i32 0, i32 0), double %id_load_tmp)
  ret void
}

define void @print(i8* %str) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define double @circumference(double %radius) {
entry:
  %flt_multmp = fmul double 0x401921FB4D12D84A, %radius
  ret double %flt_multmp
}

define double @circumference.1(float %radius) {
entry:
  %flt_upcast = fpext float %radius to double
  %flt_multmp = fmul double 0x401921FB4D12D84A, %flt_upcast
  ret double %flt_multmp
}

define float @circumference.2(float %radius) {
entry:
  %flt_multmp = fmul float 0x401921FB40000000, %radius
  ret float %flt_multmp
}

define i32 @main() {
entry:
  %f = alloca float, i8 0, align 4
  %0 = call float @circumference.2(float 1.000000e+01)
  store float %0, float* %f, align 4
  %d = alloca double, i8 0, align 8
  %1 = call double @circumference(double 1.000000e+01)
  store double %1, double* %d, align 8
  %q = alloca double, i8 0, align 8
  %id_load_tmp = load float, float* %f, align 4
  %2 = call double @circumference.1(float %id_load_tmp)
  store double %2, double* %q, align 8
  %id_load_tmp1 = load float, float* %f, align 4
  call void @printFloat(float %id_load_tmp1)
  ret i32 0
}

