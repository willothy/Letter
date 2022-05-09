; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1

declare i32 @printf(i8*, ...)

define void @printInt-1834710495(i32 %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str, i32 0, i32 0), i32 %v)
  ret void
}

define void @printDouble-27409351(double %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.1, i32 0, i32 0), double %v)
  ret void
}

define void @print-480568278(i8* %str) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define double @circumference660507067(double %radius) {
entry:
  %flt_multmp = fmul double 0x401921FB4D12D84A, %radius
  ret double %flt_multmp
}

define float @circumference-737820466(float %radius) {
entry:
  %flt_multmp = fmul float 0x401921FB40000000, %radius
  ret float %flt_multmp
}

define void @printf1202312982(double %f) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.2, i32 0, i32 0), double %f)
  ret void
}

define i32 @main() {
entry:
  %value = alloca float, i8 0, align 4
  %0 = call float @circumference-737820466(float 1.000000e+01)
  store float %0, float* %value, align 4
  %v = alloca double, i8 0, align 8
  %id_load_tmp = load float, float* %value, align 4
  %flt_upcast = fpext float %id_load_tmp to double
  store double %flt_upcast, double* %v, align 8
  %d = alloca double, i8 0, align 8
  %1 = call double @circumference660507067(double 1.000000e+01)
  store double %1, double* %d, align 8
  %id_load_tmp1 = load double, double* %v, align 8
  call void @printf1202312982(double %id_load_tmp1)
  %id_load_tmp2 = load double, double* %d, align 8
  call void @printDouble-27409351(double %id_load_tmp2)
  ret i32 0
}

